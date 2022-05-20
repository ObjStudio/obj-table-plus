<!--
 * @Author: chenkangxu
 * @Date: 2021-11-01 18:43:30
 * @LastEditTime: 2022-05-20 21:13:57
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
  <section>
    <section class="table-handle">
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
    </section>
    <!-- 数据表格 -->
    <section>
      <!-- 工具栏 建议用toolbarProp和toolbarEvent来构建简单的操作按钮-->
      <template v-if="JSON.stringify(toolbarProp)!='{}'">
        <!-- 如果传的是空对象 就不显示工具栏;只有非空才显示工具栏 -->
        <vxe-toolbar ref="xToolbar" v-bind="toolbarProp" v-on="toolbarEvent"></vxe-toolbar>
      </template>
      <!-- 表格主体 -->
      <vxe-table
        ref="vxeTable"
        resizable
        :data="tableData"
        :loading="loading"
        v-bind="tableProp"
        v-on="tableEvent"
      >
        <template v-for="item in _tableCols">
          <child-table-plus :key="item.id" :col="item" :size="size">
          </child-table-plus>
        </template>
      </vxe-table>
    </section>
    <!-- 分页 -->
    <section v-if="isPagination">
      <vxe-pager
        @page-change="_handlePageChange"
        background
        :current-page.sync="tablePage.currentPage"
        :page-size.sync="tablePage.pageSize"
        :total="tablePage.total"
        :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      </vxe-pager>
    </section>
  </section>
</template>

<script>
import childTablePlus from "./child-table-plus.vue";
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
      default: () => {
        return {};
      },
    },
    //工具栏配置项
    toolbarProp:{
      type:Object,
      default:()=>{
        return {custom:true,print:true,buttons:[{name:'搜索',type:'button'}]}
      }
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
    isPagination: { type: Boolean, default: true },
    //是否自动请求数据
    enableAutoQuery:{type:Boolean,default:true}
  },
  data() {
    return {
      // 分页数据
      tablePage: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
        pageSizeRange: [5, 10, 20, 50, 100],
      },
      //加载动画
      loading:false,
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
    }
  },
  computed:{
    //暴力解决下表格列排版问题
    _tableCols(){
      return [{ id: "custableplus", width: '0%' }].concat(this.tableCols)
    }
  },
  created(){
    this.$nextTick(() => {
      // 手动将表格和工具栏进行关联
      this.$refs.vxeTable.connect(this.$refs.xToolbar)
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
  },
};
</script>

<style scoped>
.table-handle {
  /* margin: 10px 0; */
}

</style>