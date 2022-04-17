# 快速入门
# 1、引入组件并注册
```javascript
import Vue from 'vue'
import objTablePlus from 'obj-table-plus';
Vue.use(objTablePlus);
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
(3)tableProp 参考文档中关于<vxe-table/> 的属性
(4)tableEvent {click:this.funcA,tap:this.funcB} 具体事件参中的<vxe-table/> 的事件
```

# 3、表格可选参数/插槽
```javascript
(1)tableHandles 基于elementUI的表格操作按钮
(2)slot insert 表格上插槽 一般用于插入一个表单来进行检索
```

