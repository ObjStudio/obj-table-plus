# vxe-table

[![star](https://gitee.com/xuliangzhan_admin/vxe-table/badge/star.svg?theme=gvp)](https://gitee.com/xuliangzhan_admin/vxe-table/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table)
[![npm build](https://travis-ci.com/x-extends/vxe-table.svg?branch=master)](https://travis-ci.com/x-extends/vxe-table)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

一个基于 [vue](https://www.npmjs.com/package/vue) 的 PC 端表格组件，支持增删改查、虚拟列表、虚拟树、懒加载、快捷菜单、数据校验、打印导出、表单渲染、数据分页、弹窗、自定义模板、渲染器、贼灵活的配置项、扩展接口等...  

* 设计理念
  * 面向现代浏览器，高效的简洁 API 设计
  * 模块化表格、按需加载、扩展接口
  * 为单行编辑表格而设计，支持增删改查及更多扩展，强大的功能的同时兼具性能

## QQ 交流群

![qq](https://vxetable.cn/static/donation/qq.png)

## 浏览器支持

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
11+ ✔ | 80+ ✔ | 80+ ✔ | 90+ ✔ | 75+ ✔ | 10+ ✔ |

## 功能点

* [x] 基础表格
* [x] 高级表格
* [x] 斑马线条纹
* [x] 多种边框
* [x] 单元格样式
* [x] 列宽拖动
* [x] 最大高度
* [x] 自适应宽高
* [x] 固定列
* [x] 多级表头
* [x] 表尾数据
* [x] 高亮行或列
* [x] 序号
* [x] 单选框
* [x] 复选框
* [x] 下拉选项
* [x] 开关
* [x] 排序
* [x] 多字段组合排序
* [x] 筛选
* [x] 合并单元格
* [x] 合并表尾
* [x] 导入/导出/打印
* [x] 显示/隐藏列
* [x] 加载中
* [x] 格式化内容
* [x] 自定义插槽 - 模板
* [x] 快捷菜单
* [x] 展开行
* [x] 分页
* [x] 表单
* [x] 工具栏
* [x] 下拉容器
* [x] 虚拟列表
* [x] 虚拟树
* [x] 增删改查
* [x] 数据校验
* [x] 数据代理
* [x] 键盘导航
* [x] 弹窗
* [x] 渲染器
* [x] 虚拟滚动
* [x] 虚拟合并
* [x] (pro) 单元格区域选取
* [x] (pro) 单元格复制/粘贴
* [x] (pro) 单元格查找和替换

## 安装

版本：[vue](https://www.npmjs.com/package/vue) 2.6.x, 依赖库：[xe-utils](https://www.npmjs.com/package/xe-utils)

```shell
npm install xe-utils vxe-table@3
```

Get on [unpkg](https://unpkg.com/vxe-table/) and [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/)

### npm

```javascript
import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)
```

### CDN

不建议将公共的 CDN 地址用于生产，因为该连接随时都可能会失效，导致项目挂掉;  
使用 CDN 方式记得锁定版本号，避免受到非兼容性更新的影响

```HTML
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/vxe-table/lib/style.css">
<!-- 引入脚本 -->
<script src="https://unpkg.com/xe-utils"></script>
<script src="https://unpkg.com/vxe-table"></script>
```

## 示例

```html
<template>
  <div>
    <vxe-table :data="tableData">
      <vxe-column type="seq" title="Seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-colgroup title="Group1">
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="address" title="Address"></vxe-column>
      </vxe-colgroup>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' }
      ]
    }
  }
}
</script>
```

## 文档

👉 [查看文档](https://vxetable.cn)  

## 运行项目

安装依赖

```shell
npm install
```

启动本地调试

```shell
npm run serve
```

编译打包，生成编译后的目录：lib

```shell
npm run lib
```

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
