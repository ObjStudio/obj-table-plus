![](https://img.shields.io/badge/license-MIT-blue)![https://www.npmjs.com/package/obj-table-plus](https://img.shields.io/badge/npm-v1.x-yellow)![](https://img.shields.io/badge/ObjStudio-2020.10.21--Now-orange)

从1.0.10版本起，tabelCols不再需要配置id，如果配置了也会被组件内部生成的id所替换
从1.1.0版本起，tabelCols不再区分diy字段，将vxe原生的type与组件的type进行合并。
# 一、快速上手

# 1、引入组件并注册
```javascript
import Vue from 'vue'
//引入必要的vxe-table 具体配置请查看官方文档
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)
//引入必要的elementUI 具体配置请查看官方文档
import ElementUI from 'element-ui'; 
Vue.use(ElementUI);

import objTablePlus from 'obj-table-plus';
Vue.use(objTablePlus);
```
如果要使用jsx功能，请在babel.config.js中配置
```javascript
module.exports = {
    //presets中的插件用于配置语法，仅支持vue2.6
    presets: [
        //脚手架集成jsx增强语法
        '@vue/cli-plugin-babel/preset',
        [
            '@vue/babel-preset-jsx',
            { 
                'injectH': false 
            }
        ]
    ]
}
```
项目依赖
```javascript
//配置语法
"@vue/babel-helper-vue-jsx-merge-props": "^1.2.1",
"@vue/babel-preset-jsx": "^1.2.4"
```
# 2、添加表格组件必要参数如下：
```javascript
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
*(3)tableProp 参考文档中关于<vxe-table/> 的属性
*(4)tableEvent {click:this.funcA,tap:this.funcB} 具体事件参中的<vxe-table/> 的事件
```

示例代码：

1. 朴素表格——极致简单的表格

   ```vue
   <template>
   <obj-table-plus
                   ref="oTable"
                   @query="queryList"
                   v-model="tableData"
                   :tableCols="tableCols"
                   >
       </obj-table-plus>
   </template>
   <script>
       export default{
           data(){
               return {
                   //表格数据
                   tableData:[],
                   //定义表格结构
                   tableCols:[
                       { id: "1", field: "name",title:"姓名", width: 120 },
                       { id: "2", field: "age",title:"年龄", width: 120 },
                       { id: "3", field: "gender",title:"性别", width: 120 },
                       { id: "4", field: "phone",title:"联系电话", width: 120 }
                   ]
               }
           },
           methods:{
               queryList(pageNo,pageSize){
                   request(pageNo,pageSize)
                       .then(res=>{
                       this.$refs.oTable.complete(res.list,res.total/*此处要传入一个数据量总数*/);
                   })
                       .catch(err=>{
                       this.$refs.oTable.complete(false);
                   })
               }
           }
       }
   </script>
   ```

   

2. 自定义表格——携带自定义参数、jsx语法

   ```vue
   <template>
   <obj-table-plus
                   ref="oTable"
                   @query="queryList"
                   v-model="tableData"
                   :tableCols="tableCols"
                   :tableProp="tableProp"
                   :tableEvent="tableEvent"
                   >
       </obj-table-plus>
   </template>
   <script>
       export default{
           data(){
               return {
                   //表格数据
                   tableData:[],
                   //定义表格结构
                   tableCols:[
                       { id: "1", field: "name",title:"姓名", width: 120 },
                       { id: "2", field: "age",title:"年龄", width: 120 },
                       { id: "3", field: "gender",title:"性别", width: 120 },
                       { id: "4", field: "phone",title:"联系电话", width: 120 },
                       //自定义表格内容
                       {
                           id:"5",
                           field:"status",
                           title:"状态",
                           diy:true,//启用自定义渲染
                           type:"jsx",//类型是jsx渲染
                           render:({row})=>{
                               return (
                               	<el-button type={row.status==0?'danger':'primary'}>{row.status==0?'异常':'正常'}</el-button>
                               )
                           }
                       }
                   ],
                   //表格参数
                   tableProp:{
                       "auto-resize": true,
                       border: true,
                       "row-id": "id",
                       //带多选
                       "checkbox-config": { labelField: "", checkRowKeys: [10053, 23666] },
                       "max-height": "400px",
                       "highlight-current-row": true,
                       "show-overflow": true,
                   },
                   //表格事件
                   tableEvent:{
                       "checkbox-change": this.selectChangeEvent,
                   }
               }
           },
           methods:{
               queryList(pageNo,pageSize){
                   request(pageNo,pageSize)
                       .then(res=>{
                       this.$refs.oTable.complete(res.list,res.total/*此处要传入一个数据量总数*/);
                   })
                       .catch(err=>{
                       this.$refs.oTable.complete(false);
                   })
               },
               selectChangeEvent(e){
                   // TODO...选中事件
               }
           }
       }
   </script>
   ```

3. 多级表格

   ```vue
   <template>
   <obj-table-plus
                   ref="oTable"
                   @query="queryList"
                   v-model="tableData"
                   :tableCols="tableCols"
                   :tableProp="tableProp"
                   :tableEvent="tableEvent"
                   >
       </obj-table-plus>
   </template>
   <script>
       export default{
           data(){
               return {
                   //表格数据
                   tableData:[],
                   //定义表格结构
                   tableCols:[
                       { id: "1", field: "name",title:"姓名", width: 120 },
                       { id: "2", field: "age",title:"年龄", width: 120 },
                       { id: "3", field: "gender",title:"性别", width: 120 },
                       { id: "4", field: "phone",title:"联系电话", width: 120 },
                       {id:"5",
                        field:"location",
                        title:"所在地区",
                        childTableCols:[
                           {id:"51",field:"province",title:"省份"},
                           {id:"52",field:"city",title:"城市"},
                           {id:"53",field:"area",title:"区"},
                         ]
                       }
                   ],
                   //表格参数
                   tableProp:{
                       "auto-resize": true,
                       border: true,
                       "row-id": "id",
                       //带多选
                       "checkbox-config": { labelField: "", checkRowKeys: [10053, 23666] },
                       "max-height": "400px",
                       "highlight-current-row": true,
                       "show-overflow": true,
                   },
                   //表格事件
                   tableEvent:{
                       "checkbox-change": this.selectChangeEvent,
                   }
               }
           },
           methods:{
               queryList(pageNo,pageSize){
                   request(pageNo,pageSize)
                       .then(res=>{
                       /*注意：这边的list要对应上children才可以正确渲染
                       具体参考vxe-table文档https://vxetable.cn/v3/#/table/grid/group*/
                       this.$refs.oTable.complete(res.list,res.total/*此处要传入一个数据量总数*/);
                   })
                       .catch(err=>{
                       this.$refs.oTable.complete(false);
                   })
               },
               selectChangeEvent(e){
                   // TODO...选中事件
               }
           }
       }
   </script>
   ```

   



# 3、表格可选参数/插槽
```javascript
(1)tableHandles 基于elementUI的表格操作按钮
(2)slot insert 表格上插槽 一般用于插入一个表单来进行检索
```

# 4、全局配置

在src目录下创建config文件夹，再config文件夹下创建obj-table.config.js作为配置文件，可以根据不同的项目自定义默认配置

```javascript
module.exports={
    //对应tableProp的默认值
    'table-prop':{
        "auto-resize": true,
        border: true,
        "row-id": "id",
        //带多选
        "checkbox-config": { labelField: "", checkRowKeys: [10053, 23666] },
        "highlight-current-row": true,
        "show-overflow": true,
        "tree-config": { children: "children" },
    },
    //工具栏配置
    'toolbar-prop':{custom:true},
    //是否自动查询
    'enable-auto-query':false,
    //是否分页
    'is-pagination':false
}
```



# 二、Props

| 参数         | 说明         | 类型          | 默认值 | 可选值 |
| ------------ | ------------ | ------------- | ------ | ------ |
| tableData    | 表格内容数据 | Array<Object> | []     |        |
| tableCols    | 表格列的配置 | Array<Object> | []     |        |
| tableProp    | 表格配置项   | Object        | {}     |        |
| tableEvent   | 表格事件配置 | Object        | {}     |        |
| toolbarProp  | 工具栏配置   | Object        | {}     |        |
| toolbarEvent | 工具栏事件   | Object        | {}     |        |
| isPagination | 是否分页     | Boolean       | true   | false  |

# 三 、Method

| 方法名 | 说明     | 参数                             |
| ------ | -------- | -------------------------------- |
| query  | 请求参数 | 返回一个分页信息 pageNo,pageSize |
|        |          |                                  |
|        |          |                                  |



# 四、模板示例





敬请期待。。。





## 🎉 结束语

###  👋 我们需要你的贡献

我们深知它还有非常大的完善空间，所以我们始终欢迎你的贡献。

#### 👣 如何贡献

可以通过提交 [Issue](https://gitee.com/objstudio/obj-table-plus/issues/new?issue%5Bassignee_id%5D=0&issue%5Bmilestone_id%5D=0) 和 PR 的方式对「obj-table-plus」做出贡献或是提出需求，更详尽的步骤可以参考[贡献指南](https://gitee.com/objstudio/obj-table-plus/contributor-guidelines.md)。