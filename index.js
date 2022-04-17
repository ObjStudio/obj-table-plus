/*
 * @Author: chenkangxu
 * @Date: 2022-04-17 14:34:42
 * @LastEditTime: 2022-04-17 14:51:16
 * @LastEditors: chenkangxu
 * @Description: 入口文件
 * @Github: 
 */
import objTablePlus from './packages/obj-table-plus.vue';
export default {
    install: function (Vue) {
        Vue.component('ObjTablePlus', objTablePlus);
    }
}