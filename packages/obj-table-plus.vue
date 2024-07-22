<!--
 * @Author: chenkangxu
 * @Date: 2021-11-01 18:43:30
 * @LastEditTime: 2022-08-14 12:46:33
 * @LastEditors: chenkangxu
 * @Description: 基于vxe-table v3.x 快速表格生成组件
 * @Github: https://xuliangzhan_admin.gitee.io/vxe-table
 使用指南:
 1、引入组件并注册
 2、添加表格组件必要参数如下：
    (1) tableData:[
      {userId:"233",userName:"小明",userGender:"男",userAge:18},
      ...
      // 树型 其他的看文档中有关于tableData的参数 https://xuliangzhan_admin.gitee.io/vxe-table
      {userId:"234",userName:"小红",userGender:"女",userAge:19,children:[{...}]},
    ]
    (2) tabelCols:[
        { id: "8", field: "createNumber",title:"生产批号", width: 120 },
        { id: "2", field: "patternCreateTime",title:"款号", width: 150 },
        ...
        // 具体参考文档中的 <vxe-column/> 属性
    ]
    (3)tableProp 参考文档中关于<vxe-table/> 的属性
    (4)tableEvent {click:this.funcA,tap:this.funcB} 具体事件参考文档中的<vxe-table/> 的事件
  3、表格可选参数/插槽
      (1)tableHandles 基于elementUI的表格操作按钮
      (2)slot insert 表格上插槽 一般用于插入一个表单来进行检索
      (3)slot tableTop 紧贴表格上方的插槽
      (4)slot tableBottom 紧贴表格下方的插槽
-->
<template>
  <div
    class="objstudio-container"
    :style="{ height: height === 'auto' ? '100%' : height, width: _tableWidth }"
  >
    <div class="table-handle" ref="tableHandles" id="tableHandles">
      <el-row class="operate" v-if="tableHandles.length > 0">
        <el-col :span="24">
          <el-button
            v-for="item in tableHandles"
            :key="item.label"
            :type="item.type"
            :icon="item.icon"
            :disabled="item.disabled"
            @click="item.handle()"
            >{{ item.label }}</el-button
          >
        </el-col>
      </el-row>
      <el-row class="operate">
        <slot name="insert"></slot>
      </el-row>
    </div>
    <!-- 数据表格 -->
    <!-- 工具栏 建议用toolbarProp和toolbarEvent来构建简单的操作按钮-->
    <template v-if="toolbarProp && JSON.stringify(toolbarProp) != '{}'">
      <!-- 如果传的是空对象 就不显示工具栏;只有非空才显示工具栏 -->
      <vxe-toolbar
        ref="objstudio-xToolbar"
        id="objstudio-xToolbar"
        v-bind="_mergeProps('toolbar')"
        v-on="toolbarEvent"
      ></vxe-toolbar>
    </template>
    <!-- 插槽，介于工具栏和表格之间;即表格上方插槽 -->
    <div ref="tableTop" id="tableTop" v-if="$slots.tableTop">
      <slot name="tableTop"></slot>
    </div>
    <!-- 表格主体 -->
    <div
      :style="{ height: _tableHeight, width: '100%' }"
      v-loading="mode == 'flex' && loading"
      :class="mode == 'flex' ? 'flex-mode-class' : ''"
    >
      <vxe-table
        v-if="mode != 'flex'"
        ref="vxeTable"
        class="vxeTable"
        :class="[enableElementStyle ? 'element_style' : 'vxe_style']"
        resizable
        :data="_tableData"
        :loading="loading"
        v-bind="_mergeProps('table')"
        v-on="tableEvent"
      >
        <child-table-plus
          v-for="item in _tableCols"
          :key="item.id"
          :col="item"
          :size="size"
        >
        </child-table-plus>
      </vxe-table>
      <template v-else>
        <render
          v-for="(item, index) in _tableData"
          :key="index"
          :render="_tableCols[0] && _tableCols[0].render(item, index)"
        ></render>
        <div
          class="flex-empty"
          :style="{ height: _tableHeight, width: '100%' }"
          v-if="_tableData.length <= 0"
        >
          <span>暂无数据</span>
        </div>
      </template>
    </div>
    <!-- 表格下方插槽 -->
    <div ref="tableBottom" id="tableBottom" v-if="$slots.tableBottom">
      <slot name="tableBottom"></slot>
    </div>
    <!-- 分页 -->
    <template v-if="isPagination">
      <obj-vxe-pager
        id="xPager"
        ref="xPager"
        v-bind="pagerStyle"
        @page-change="_handlePageChange"
        :current-page.sync="tablePage.currentPage"
        :page-size.sync="tablePage.pageSize"
        :total="tablePage.total"
      >
      </obj-vxe-pager>
    </template>
  </div>
</template>

<script>
import utils from "./utils";
import childTablePlus from "./components/child-column/child-table-plus.vue";
import ObjVxePager from "./components/pager/index";
import render from "./components/render";
export default {
  name: "obj-table-plus",
  components: { childTablePlus, ObjVxePager, render },
  model: {
    prop: "tableData",
    event: "updateTableData",
  },
  props: {
    // 表格数据
    tableData: { type: Array, default: () => [] },
    // 表格列
    tableCols: { type: Array, default: () => [] },
    // 表格操作按钮
    tableHandles: { type: Array, default: () => [] },
    // 多个事件
    tableEvent: { type: Object, default: () => {} },
    /***
     * + 1.1.7 是否进行配置重写，默认不启用。
     * 若启用，则是在全局配置文件的基础上进行合并（相同属性全局配置文件优先级更低）
     * 若不启用，则是直接覆盖全局配置文件
     * */
    enableConfigOverwrite: {
      type: Boolean,
      default: utils.getConfig("enable-config-overwrite", false),
    },
    // 多个属性值
    tableProp: {
      type: Object,
      default: () => utils.getConfig("table-prop", {}),
    },
    //工具栏配置项
    toolbarProp: {
      type: Object,
      default: () =>
        utils.getConfig("toolbar-prop", { custom: true, print: true }),
    },
    //工具栏事件
    toolbarEvent: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 表格高度
    tableHeight: { type: String, default: null },
    // 表格型号：mini,medium,small
    size: { type: String, default: "medium" },
    // 是否显示分页
    isPagination: {
      type: Boolean,
      default: utils.getConfig("is-pagination", true),
    },
    //是否自动请求数据
    enableAutoQuery: {
      type: Boolean,
      default: utils.getConfig("enable-auto-query", true),
    },
    //自定义分页器样式
    pagerStyle: {
      type: Object,
      default: () =>
        utils.getConfig("pager-style", {
          layouts: [
            "PrevPage",
            "JumpNumber",
            "NextPage",
            "Sizes",
            "FullJump",
            "Total",
          ],
        }),
    },
    //是否缓存uuid,对于列变化比较大的时候启用可以提升性能
    enableCacheUuid: {
      type: Boolean,
      default: utils.getConfig("enable-cache-uuid", false),
    },
    //功能模式，可选值default(默认表格分页模式)，grid(宫格卡片布局模式,需要传入colNumber)，flex(弹性卡片布局,因为flex的特性，不再需要传入colNumber，且不再依赖vxe-table)
    mode: {
      type: String,
      default: utils.getConfig("mode", "default"),
    },
    //当mode=grid时需要传入colNumber,默认是4列
    colNumber: {
      type: Number,
      default: utils.getConfig("col-number", 4),
    },
    /**
     * 是否与elementUI样式对齐
     */
    enableElementStyle: {
      type: Boolean,
      default: utils.getConfig("enable-element-style", true),
    },
    /**
     * 完成时间，用于控制动画,
     * 比如请求太快动画来不及展示，就限定个延时进行展示动画
     * 单位：ms
     */
    completeTime: {
      type: [Number],
      default: utils.getConfig("complete-time", 0),
    },
    /**
     * 组件高度,这样就不用再在组件外加上style样式了。
     * 高度就是高度；若设置为auto将会自动盛满其父组件
     */
    height: {
      type: [String],
      default: utils.getConfig("height", "auto"),
    },
    /**
     * 组件宽度
     */
    width: {
      type: [String],
      default: utils.getConfig("width", "100%"),
    },
    /**
     * + 1.2.0 是否启用分页点击拦截器,默认不启用，若启用，当监听页码事件变化时，必须调用next方法，否则不会进行下去。
     */
    enablePagerInterceptors: {
      type: Boolean,
      default: utils.getConfig("enable-pager-interceptors", false),
    },
    /**
     * + 2.2.0 是否启用事件总线，默认关闭，若启用，则会在组件内部创建一个事件总线，并且必须在main.js下创建
     * 一个总线实例Vue.prototype.$objEventBus=new Vue();注意千万不要进行误挂载，该实例只为了实现总线通信。
     * 可以通过$emit("obj-event-bus",(functionName,functionParams,callback(result)))
     * 来触发事件来全局调用组件内部方法。
     */
    enableGlobalEventBus: {
      type: Boolean,
      default: utils.getConfig("enable-global-event-bus", false),
    },
    /**
     * + 2.2.0 开放属性参数，是否根据浏览器大小变化而实时重新计算绘制表格大小。默认为开启，假如浏览器大小一般不会改变，
     * 且对性能要求比较高，可以选择将其关闭
     */
    enableAutoResize:{
      type:Boolean,
      default:utils.getConfig("enable-auto-resize",true)
    },
    /**
     * + 2.2.0 开放属性参数，是否当初始化时进行计算窗口大小，默认时计算，且必须计算否则会出现表格高度异常
     * 如果性能要求非常高可以将初次计算关闭。也就是从不计算。
     */
    enableResizeWhenInit:{
      type:Boolean,
      default:utils.getConfig("enable-resize-when-init",true)
    }
  },
  update() {
    console.log("组件触发更新！！！！！");
  },
  data() {
    return {
      // 分页数据
      tablePage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      //加载动画
      loading: false,
      //当前渲染的列序号
      currentRenderColIndex: 0,
      //缓存的uuid
      cacheUid: [],
      //toolbar高度 工具栏高度
      toolbarHeight: 50,
      //分页器高度
      pagerHeight: 44,
      //表格操作按钮高度
      tableHandlesHeight: 0,
      //tableTop高度
      tableTopHeight: 0,
      //tableBottom高度
      tableBottomHeight: 0,
    };
  },
  methods: {
    //刷新，重新请求数据，重置分页值
    reload() {
      //重置到第一页
      this.$set(this.tablePage, "currentPage", 1);
      this._queryData();
    },
    //刷新，不改变分页值
    refresh() {
      this._queryData();
    },
    // 完成请求事件
    complete(data, total) {
      //用if判断的原因是当时间为0时，不再开启一个异步进程。保证一定是立即执行的
      if (this.completeTime > 0) {
        setTimeout(() => {
          //加载数据总数
          this.tablePage.total = total;
          if (data !== false) {
            if (data.length >= 0) {
              this.$emit("updateTableData", data);
            } else {
              // this.$emit("updateTableData", data);
            }
          } else {
            this.$emit("updateTableData", []);
          }
          this.loading = false;
        }, this.completeTime);
      } else {
        //加载数据总数
        this.tablePage.total = total;
        if (data !== false) {
          if (data.length >= 0) {
            this.$emit("updateTableData", data);
          } else {
            // this.$emit("updateTableData", data);
          }
        } else {
          this.$emit("updateTableData", []);
        }
        this.loading = false;
      }
    },
    //重新计算布局
    doLayout(reFull = true) {
      this._getToolbarAndPagerHeight();
      if (this.$refs.vxeTable) {
        return this.$refs.vxeTable.recalculate(reFull);
      } else {
        return false;
      }
    },
    //手动进行显示加载动画
    startLoading() {
      this.loading = true;
    },
    //手动关闭加载动画
    endLoading() {
      this.loading = false;
    },
    //方便全局调用obj函数
    objInvoke(functionName, functionParams) {
      return this[functionName](functionParams);
    },
    //vxetable
    _handlePageChange(e, e_next) {
      if (e.type === "current") {
        this._handleCurrentChange(e.currentPage, e_next);
      } else if (e.type === "size") {
        this._handleSizeChange(e.pageSize, e_next);
      }
    },
    // 改变页码
    _handleCurrentChange(val, e_next) {
      if (this.enablePagerInterceptors == false) {
        e_next();
        this.tablePage.currentPage = val;
        this._queryData();
        this.$emit("handleCurrentChange", val);
      }
      //启用拦截器
      else {
        const next = () => {
          const result = e_next();
          this.tablePage.currentPage = val;
          this._queryData();
          return result;
        };
        //有监听要执行next方法
        if (this.$listeners.handleCurrentChange) {
          this.$emit("handleCurrentChange", val, next);
        }
        //没监听就帮忙直接执行
        else {
          next();
        }
      }
    },
    //改变页数，改变页数需要重置page
    _handleSizeChange(val, e_next) {
      if (this.enablePagerInterceptors == false) {
        e_next();
        this.tablePage.pageSize = val;
        this.reload();
        this.$emit("handleSizeChange", val);
      } else {
        const next = () => {
          const result = e_next();
          this.tablePage.pageSize = val;
          this.reload();
          return result;
        };
        //有监听要执行next方法
        if (this.$listeners.handleSizeChange) {
          this.$emit("handleSizeChange", val, next);
        }
        //没监听就帮忙直接执行
        else {
          next();
        }
      }
    },
    // 请求
    _queryData() {
      // 请求数据queryList(pageNo,pageSize)
      this.$emit("query", this.tablePage.currentPage, this.tablePage.pageSize);
      this.loading = true;
    },
    /**
     * 不知道为啥第一列总是会跑到最后一列去
     */
    //递归处理下tableCols
    _handleChildTableCols(childTableCols) {
      // debugger;
      let newChildTableCols = [];
      childTableCols.forEach((col) => {
        // debugger;
        if (col.childTableCols && col.childTableCols.length > 0) {
          col.childTableCols = this._handleChildTableCols(col.childTableCols);
        }
        newChildTableCols.push({
          ...col,
          id: utils.getColumnUid(
            this.currentRenderColIndex,
            this.enableCacheUuid,
            this.cacheUid
          ),
        });
        this.currentRenderColIndex++;
      });
      return newChildTableCols;
    },
    //获取工具栏和分页器高度+tableHandle+tableTop+tableBottom
    _getToolbarAndPagerHeight() {
      this.$nextTick(() => {
        try {
          this.toolbarHeight = utils.getStyle(
            this.$refs["objstudio-xToolbar"].$el
          ).height;
        } catch (error) {
          this.toolbarHeight = 0;
        }
        try {
          this.pagerHeight = utils.getStyle(this.$refs["xPager"].$el).height;
        } catch (error) {
          this.pagerHeight = 0;
        }
        try {
          this.tableHandlesHeight = utils.getStyle(
            this.$refs["tableHandles"]
          ).height;
        } catch (error) {
          this.tableHandlesHeight = 0;
        }
        try {
          this.tableTopHeight = utils.getStyle(this.$refs["tableTop"]).height;
        } catch (error) {
          this.tableTopHeight = 0;
        }
        try {
          this.tableBottomHeight = utils.getStyle(
            this.$refs["tableBottom"]
          ).height;
        } catch (error) {
          this.tableBottomHeight = 0;
        }
      });
    },
    //浏览器大小变化
    _onResize() {
      window.onresize = () => {
        // console.log("noResize");
        this._getToolbarAndPagerHeight();
      };
    },
  },
  computed: {
    /**
     * 自动生成uuid有以下几个问题：
     * 1、当tableCols发生变化，如动态增加列，导致每个列都要重新获取一次uuid。
     *    可以这样做：第一次生成一个内部的tableCols数据，我们称之为_cacheTableCols
     * 2、当tableCols发生变化时，都要递归重新生成一遍_tableCols，这无疑增加了时间复杂度
     *
     * 拟解决的方法：
     *  分析这个问题，如果列发生变化，无论如何都需要递归处理，可以这样做：初次渲染后把uuid进行缓存处理
     *  如第一次渲染生成了8个uuid，当列发生变化时，这8个uuid可以复用，只需要再生成一个uuid即可
     *
     * let cacheUid=[]
     * const getColumnUid=(index)=>{
     *  let uid=null;
     *  if(cacheUid.length>0){
     *    if(index>cacheUid.length){
     *      uid=uuidv4();
     *      cacheUid.push(uid);
     *    }else{
     *      return cacheUid[index];
     *    }
     *  }else{
     *    uid=uuidv4();
     *    cacheUid.push(uid);
     *  }
     *  return uid;
     * }
     */
    //增加自生成id
    _tableCols() {
      let newTableCols = [];
      this.currentRenderColIndex = 0;
      if (this.mode == "default" || this.mode == "flex") {
        // debugger;
        this.tableCols.forEach((col) => {
          if (col.childTableCols && col.childTableCols.length > 0) {
            col.childTableCols = this._handleChildTableCols(col.childTableCols);
          }
          /**
           * + 2.2.1 tableCols的show属性可以直接控制列显示，再也不需要手动维护tableCols了。
           * 默认可以不写show，如果要让它消失就写show:false即可。
           */
          if (!(col.show == false)) {
            newTableCols.push({
              ...col,
              id: utils.getColumnUid(
                this.currentRenderColIndex,
                this.enableCacheUuid,
                this.cacheUid
              ),
            });
            this.currentRenderColIndex++;
          }
        });
      } else if (this.mode == "grid") {
        //grid宫格布局不支持多级表头，因为没有表头
        //宫格布局就是组件内部自己处理生成tableCols和处理tableData;
        //现在是内部处理生成tableCols,要求传入数组长度为1的宫格即可
        if (this.tableCols.length != 1) {
          utils.oTableWarn(
            "当前是grid模式,tableCols要求传入长度为1的数组,组件会以此为模板进行内部渲染。若长度大于1,将默认使用第一个作为模板。"
          );
        } else {
          for (let i = 1; i <= this.colNumber; i++) {
            newTableCols.push({
              ...this.tableCols[0],
              field: `col${i}`,
              id: utils.getColumnUid(
                this.currentRenderColIndex,
                this.enableCacheUuid,
                this.cacheUid
              ),
            });
          }
        }
      } else {
        utils.oTableWarn("mode属性错误,无法正常渲染表格,请检查。");
      }

      return newTableCols;
    },
    //设定表格外容器高度
    _tableHeight() {
      if (this.tableHeight != null) {
        return this.tableHeight;
      } else {
        return `calc(100% - ${this.toolbarHeight}px - ${this.pagerHeight}px - ${this.tableBottomHeight}px - ${this.tableHandlesHeight}px - ${this.tableTopHeight}px )`;
      }
    },
    /**
     * 设定表格外容器宽度
     */
    _tableWidth() {
      return this.width;
    },
    //表格数据
    _tableData() {
      let newTableData = [];
      if (this.mode == "default" || this.mode == "flex") {
        newTableData = this.tableData;
      } else if (this.mode == "grid") {
        let tempObj = {};
        for (let i = 1; i <= this.tableData.length; i++) {
          //到达边界值，换行
          if (i % this.colNumber == 0) {
            tempObj[`col${this.colNumber}`] = this.tableData[i - 1];
            newTableData.push(tempObj);
            tempObj = {};
          } else {
            tempObj[`col${i % this.colNumber}`] = this.tableData[i - 1];
          }
          //如果最后一行满不了了就直接添加了。
          if (this.tableData.length == i && i % this.colNumber != 0) {
            newTableData.push(tempObj);
          }
        }
      }
      return newTableData;
    },
    //合并属性 type: table|toolbar
    _mergeProps() {
      return (type) => {
        //不启用配置重写（默认）
        /**
         * 全局配置<私有配置
         */
        if (this.enableConfigOverwrite === false) {
          let mergeProps = {};
          if (type == "table") {
            mergeProps = {
              ...utils.getConfig("table-prop"),
              height: "auto",
              ...this.tableProp,
            };
            //fix1.1.16 兼容性更新：若原项目使用了tableProp的height就应当优先
            //表格本体的height永远是auto，高度由height属性定义
            // mergeProps["height"]="auto";
          } else {
            mergeProps = {
              ...utils.getConfig("toolbar-prop"),
              ...this.toolbarProp,
            };
          }
          // console.log("mergeProps",mergeProps);
          return mergeProps;
        }
        //启用配置重写
        /**
         * 全局配置>私有配置;全局配置直接将其私有配置覆盖
         */
        else {
          // console.log("mergeProps",this.tableProp);
          return {
            height: "auto",
            ...this.tableProp,
          };
        }
      };
    },
  },
  created() {
    this.$nextTick(() => {
      if (
        this.$refs.vxeTable &&
        this.toolbarProp &&
        JSON.stringify(this.toolbarProp) != "{}"
      ) {
        // 手动将表格和工具栏进行关联
        this.$refs.vxeTable.connect(this.$refs["objstudio-xToolbar"]);
      }
    });
  },
  activated() {
    this.doLayout();
  },
  mounted() {
    // ============= 此段代码貌似没有任何作用 START ==============
    // try {
    //   // 遍历所有的事件名称
    //   Object.keys(this.tableEvent).forEach((event) => {
    //     // 监听事件触发
    //     this.$on(event, (e) => {
    //       // 发送事件到父组件
    //       this.$emit(event, e);
    //     });
    //   });
    // } catch (e) {
    //   console.warn(e);
    // }

    // try{
    //   Object.keys(this.toolbarEvent).forEach((event)=>{
    //     this.$on(event,(e)=>{
    //       this.$emit(event,e);
    //     })
    //   })
    // }catch(e){
    //   console.warn(e)
    // }
    // ============= 此段代码貌似没有任何作用 END ==============
    if (this.enableAutoQuery === true) this._queryData();
    if (this.enableResizeWhenInit === true) this._getToolbarAndPagerHeight();
    if (this.enableAutoResize === true) this._onResize();
    if (this.enableElementStyle === true) {
      this.$nextTick(() => {
        if (
          this.$refs.vxeTable &&
          this.$refs.vxeTable.$el.querySelector(
            ".vxe-table--loading.vxe-loading .vxe-loading--chunk"
          )
        ) {
          //这里应当使用$refs使用，以免出现影响别的组件的问题
          this.$refs.vxeTable.$el.querySelector(
            ".vxe-table--loading.vxe-loading .vxe-loading--chunk"
          ).innerHTML = `
          <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
          `;
        }
      });
    }
    if (this.enableGlobalEventBus) {
      if (this.$objEventBus) {
        this.$objEventBus.$on(
          "obj-event-bus",
          (functionName, functionParams, callback) => {
            console.log(functionName);
            callback(this.objInvoke(functionName, functionParams));
          }
        );
      } else {
        utils.oTableError(
          "使用事件总线，必须在main.js下注册Vue.prototype.$objEventBus=new Vue();"
        );
      }
    }
  },
  watch: {
    //当插槽内的是异步的或者动态变化的时候
    $slots: {
      handler(newVal) {
        // console.log(newVal);
        this._getToolbarAndPagerHeight();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
.vxe-toolbar,
.vxe-pager {
  -moz-flex-shrink: 0;
  -ms-flex-shrink: 0;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
}
.objstudio-container {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.flex-1 {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
#xPager {
  height: auto !important;
  padding: 10px 0;
}
.flex-mode-class {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  overflow-y: scroll;
}
.flex-empty {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-empty span {
  color: #666;
}
/* ================element样式start================= */
/* elementTable拉齐 */
/* .element_style /deep/ .vxe-checkbox--icon::before{
  border-width: 1px !important;
  border-style: solid !important;
  border-color:#dcdfe6 !important;
  transition: border-color 0.15s ease-in-out;
}
.element_style /deep/ .vxe-checkbox--icon:hover::before{
  border-color:#409EFF !important;
  transition: border-color 0.15s ease-in-out;
} */

/* 重写loading */
.element_style /deep/ .vxe-loading {
  background-color: rgba(255, 255, 255, 0.9) !important;
  transition: opacity 0.3s !important;
}
.element_style /deep/ .vxe-loading .vxe-loading--chunk {
  top: 50% !important;
  margin-top: -21px !important;
  width: 100% !important;
  text-align: center !important;
  position: absolute !important;
}
.element_style /deep/ .vxe-loading--chunk .circular {
  height: 42px !important;
  width: 42px !important;
  -webkit-animation: loading-rotate 2s linear infinite;
  animation: loading-rotate 2s linear infinite;
}
.element_style /deep/ .vxe-loading--chunk .circular .path {
  -webkit-animation: loading-dash 1.5s ease-in-out infinite;
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}
.element_style /deep/ .vxe-table--loading .vxe-loading--chunk::before,
.element_style /deep/ .vxe-table--loading .vxe-loading--chunk::after {
  content: none !important;
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
@keyframes loading-rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
/* ================element样式end================= */
</style>