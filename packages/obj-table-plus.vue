<!--
 * @Author: chenkangxu
 * @Date: 2021-11-01 18:43:30
 * @LastEditTime: 2022-06-01 10:21:08
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
-->
<template>
  <div class="objstudio-container">
    <div class="table-handle">
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
    <template v-if="toolbarProp&&JSON.stringify(toolbarProp)!='{}'">
      <!-- 如果传的是空对象 就不显示工具栏;只有非空才显示工具栏 -->
      <vxe-toolbar ref="xToolbar" id="xToolbar" v-bind="toolbarProp" v-on="toolbarEvent"></vxe-toolbar>
    </template>
    <!-- 表格主体 -->
    <div :style="{height:_tableHeight}">
      <vxe-table
        ref="vxeTable"
        class="vxeTable"
        resizable
        :data="tableData"
        :loading="loading"
        v-bind="tableProp"
        v-on="tableEvent"
      >
        <child-table-plus 
          v-for="item in _tableCols"
          :key="item.id" :col="item" :size="size">
        </child-table-plus>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <template v-if="isPagination">
      <vxe-pager
        id="xPager"
        ref="xPager"
        v-bind="pagerStyle"
        @page-change="_handlePageChange"
        :current-page.sync="tablePage.currentPage"
        :page-size.sync="tablePage.pageSize"
        :total="tablePage.total">
      </vxe-pager>
    </template>
  </div>
</template>

<script>
import utils from "./utils";
import childTablePlus from "./components/child-column/child-table-plus.vue";
export default {
  name:"obj-table-plus",
  components: { childTablePlus },
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
    // 多个属性值
    tableProp: {
      type: Object,
      default: ()=>utils.getConfig('table-prop',{})
    },
    //工具栏配置项
    toolbarProp:{
      type:Object,
      default:()=>utils.getConfig('toolbar-prop',{custom:true,print:true})
    },
    //工具栏事件
    toolbarEvent:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    // 表格高度
    tableHeight: { type: String, default: null },
    // 表格型号：mini,medium,small
    size: { type: String, default: "medium" },
    // 是否显示分页
    isPagination: { 
      type: Boolean,
      default:utils.getConfig('is-pagination',true)
    },
    //是否自动请求数据
    enableAutoQuery:{
      type:Boolean,
      default:utils.getConfig('enable-auto-query',true)
    },
    //自定义分页器样式
    pagerStyle:{
      type:Object,
      default:()=>
      utils.getConfig('pager-style',{
        background:true,
        layouts:['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']
      })
    },
    //是否缓存uuid,对于列变化比较大的时候启用可以提升性能
    enableCacheUuid:{
      type:Boolean,
      default:utils.getConfig('enable-cache-uuid',false)
    }
  },
  data() {
    return {
      // 分页数据
      tablePage: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      //加载动画
      loading:false,
      //当前渲染的列序号
      currentRenderColIndex:0,
      //缓存的uuid
      cacheUid:[],
      //toolbar高度 工具栏高度
      toolbarHeight:50,
      //分页器高度
      pagerHeight:44
    };
  },
  methods: {
    //刷新，重新请求数据
    reload(){
      this._queryData();
    },
    // 完成请求事件
    complete(data,total) {
      //加载数据总数
      this.tablePage.total=total;
      if(data!==false){
        if(data.length>=0){
          this.$emit("updateTableData", data);
        }else{
          // this.$emit("updateTableData", data);
        }
      }else{
        this.$emit("updateTableData", []);
      }
      this.loading=false;
    },
    //vxetable
    _handlePageChange(e){
      if(e.type==='current'){
        this._handleCurrentChange(e.currentPage)
      }else if(e.type==='size'){
        this._handleSizeChange(e.pageSize)
      }
    },
    // 改变页码
    _handleCurrentChange(val) {
      this.tablePage.currentPage = val;
      this._queryData();
      this.$emit("handleCurrentChange", val);
    },
    //改变页数
    _handleSizeChange(val) {
      this.tablePage.pageSize = val;
      this._queryData();
      this.$emit("handleSizeChange", val);
    },
    // 请求
    _queryData(){
      // 请求数据queryList(pageNo,pageSize)
      this.$emit("query",this.tablePage.currentPage,this.tablePage.pageSize);
      this.loading=true;
    },
    /**
     * 不知道为啥第一列总是会跑到最后一列去
     */
    //递归处理下tableCols
    _handleChildTableCols(childTableCols){
      // debugger;
      let newChildTableCols=[];
      childTableCols.forEach(col=>{
      // debugger;
        if(col.childTableCols&&col.childTableCols.length>0){
          col.childTableCols=this._handleChildTableCols(col.childTableCols);
        }
        newChildTableCols.push({
          ...col,
          id:utils.getUid(this.currentRenderColIndex,this.enableCacheUuid,this.cacheUid)
        })
        this.currentRenderColIndex++;
      })
      return newChildTableCols;
    },
    //获取工具栏和分页器高度
    _getToolbarAndPagerHeight(){
      this.$nextTick(()=>{
        try {
          this.toolbarHeight=utils.getStyle(document.getElementById("xToolbar")).height;
        } catch (error) {
          this.toolbarHeight=0;
        }
        try {
          this.pagerHeight=utils.getStyle(document.getElementById("xPager")).height;
        } catch (error) {
          this.pagerHeight=0;
        }
        
      })
    }
  },
  computed:{
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
     * const getUid=(index)=>{
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
    _tableCols(){
      this.currentRenderColIndex=0;
      // debugger;
      let newTableCols=[];
      this.tableCols.forEach(col=>{
        if(col.childTableCols&&col.childTableCols.length>0){
          col.childTableCols=this._handleChildTableCols(col.childTableCols);
        }
        newTableCols.push({
          ...col,
          id:utils.getUid(this.currentRenderColIndex,this.enableCacheUuid,this.cacheUid)
        })
        this.currentRenderColIndex++;

      })
      return newTableCols;
    },
    //设定表格外容器高度
    _tableHeight(){
      if(this.tableHeight!=null){
        return this.tableHeight;
      }else{
        return `calc(100% - ${this.toolbarHeight}px - ${this.pagerHeight}px)`
      }

    }
  },
  created(){
    this.$nextTick(() => {
      if(this.toolbarProp&&JSON.stringify(this.toolbarProp)!='{}'){
        // 手动将表格和工具栏进行关联
        this.$refs.vxeTable.connect(this.$refs.xToolbar)
      }
    })
  },
  mounted() {
    try {
      // 遍历所有的事件名称
      Object.keys(this.tableEvent).forEach((event) => {
        // 监听事件触发
        this.$on(event, (e) => {
          // 发送事件到父组件
          this.$emit(event, e);
        });
      });
    } catch (e) {
      console.warn(e);
    }

    try{
      Object.keys(this.toolbarEvent).forEach((event)=>{
        this.$on(event,(e)=>{
          this.$emit(event,e);
        })
      })
    }catch(e){
      console.warn(e)
    }
    if(this.enableAutoQuery==true) this._queryData();
    if(true) this._getToolbarAndPagerHeight();
  },
};
</script>

<style scoped>
.vxe-toolbar,.vxe-pager{
  -moz-flex-shrink:0;
  -ms-flex-shrink:0;
  -webkit-flex-shrink:0;
  flex-shrink:0;
}
.objstudio-container{
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.flex-1{
  -webkit-box-flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;  
}
/* 默认样式与elementTable拉齐 */
.vxeTable ::v-deep .vxe-checkbox--icon:before{
  border-width: 1px !important;
  border-style: solid !important;
  border-color:#dcdfe6 !important;
  transition: border-color 0.15s ease-in-out;
}
.vxeTable ::v-deep .vxe-checkbox--icon:hover:before{
  border-color:#409EFF !important;
  transition: border-color 0.15s ease-in-out;
}
</style>