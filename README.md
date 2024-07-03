![](https://img.shields.io/badge/license-MIT-blue)![https://www.npmjs.com/package/obj-table-plus](https://img.shields.io/badge/npm-v1.x-yellow)![](https://img.shields.io/badge/ObjStudio-2020.10.21--Now-orange)

# 文档地址 https://objstudio.github.io/docs/
从1.0.10版本起，tabelCols不再需要配置id，如果配置了也会被组件内部生成的id所替换
从1.1.0版本起，tabelCols不再区分diy字段，将vxe原生的type与组件的type进行合并。
# 一、快速上手
# 0、通过npm安装
```
npm install obj-table-plus --save
```
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
//Babel 7+. Babel 6 支持, 使用vuejs/babel-plugin-transform-vue-jsx
//Vue 3支持使用@ant-design-vue/babel-plugin-jsx
module.exports = {
    //presets中的插件用于配置语法，仅支持vue2.6
    presets: [
        //脚手架集成jsx增强语法
        '@vue/cli-plugin-babel/preset',
        [
            //支持jsx
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
//vue2官方表示：npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props --save
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




### 创业路上的荆棘

#### 第一章：梦想起航

在一个平静的小镇上，林枫是个普通的年轻人。他一直怀揣着创业的梦想，希望有一天能够改变自己的命运，为家乡带来繁荣。每天，他在家中的小书房里研究市场，学习各种商业知识。他的目标是创办一家科技公司，专注于智能家居设备。

一天，林枫决定不再等待，便把自己的想法告诉了他的好友李明。李明是个技术天才，听了林枫的计划后，他眼中闪烁着兴奋的光芒：“我早就想做点什么了，就算失败了，也比现在强！”

#### 第二章：起步困难

两人凑了点钱，租了一间简陋的办公室，开始了他们的创业之旅。然而，创业的道路并不像他们想象中那样平坦。他们遇到了第一个难题：资金不足。他们所有的积蓄很快就花光了，办公室的租金和设备的费用让他们捉襟见肘。

为了筹集资金，林枫和李明决定找投资人。可是，一个接一个的投资人都对他们的项目不感兴趣，甚至有人直言不讳地说：“你们的想法太天真了，这个市场早已被巨头们垄断，你们根本没有机会。”

#### 第三章：迎难而上

面对巨大的压力和不断的挫折，林枫并没有放弃。他每天工作到深夜，不断优化他们的产品设计。他相信，只要他们的产品足够优秀，就一定能打动投资人。

就在这时，一个意外的机会出现了。林枫在一次创业者聚会上结识了一位成功的企业家张总。张总对智能家居设备非常感兴趣，听了林枫的介绍后，他愿意给他们一次展示的机会。

#### 第四章：关键时刻

展示的那一天，林枫和李明紧张得手心冒汗。他们准备了数月的努力就在这一刻。然而，演示过程中突然出现了技术故障，设备无法正常运作。张总皱起了眉头，似乎失去了兴趣。

林枫深吸了一口气，他不能让机会就这样溜走。他走上前去，冷静地解释了设备的原理，并且诚恳地道歉：“这只是暂时的问题，我们会马上解决它。请给我们一点时间，我们一定会让您满意。”

张总看着林枫坚定的眼神，点了点头：“好，我给你们一周的时间。”

#### 第五章：峰回路转

林枫和李明连夜加班，终于在一周内解决了所有问题。再次展示时，设备完美地运行了。张总满意地点点头：“我看到了你们的潜力，我决定投资你们。”

有了资金支持，林枫和李明的公司迅速发展起来。虽然前进的道路依然充满挑战，但他们已经不再畏惧。正如林枫常说的：“创业之路注定艰难，但只要我们不放弃，就一定能看到希望的曙光。”

#### 第六章：未来可期

在经历了无数次的失败和挫折后，林枫和李明终于迎来了成功。他们的智能家居设备逐渐占据市场，并且获得了用户的一致好评。他们不仅实现了自己的梦想，也为家乡带来了新的希望。

林枫站在新办公室的窗前，看着远处的天空，心中充满了感慨：“这只是开始，未来的路还很长。无论遇到多少困难，我们都会继续前行。”

随着时间的推移，林枫和李明的公司不断壮大，成为了行业中的佼佼者。他们的故事也激励了无数年轻人，让更多人勇敢追逐自己的梦想。正如林枫所说：“只要心中有梦想，脚下的路就会一直延伸。”