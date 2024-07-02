/*
 * @Author: chenkangxu
 * @Date: 2022-04-17 14:34:42
 * @LastEditTime: 2022-07-15 16:58:29
 * @LastEditors: chenkangxu
 * @Description: 入口文件
 * @Github: 
 */
import objTablePlus from './packages/obj-table-plus.vue';
/**因存在局部使用render组件的需求，故暴露出obj-render组件使用
 * 注意一定要加上括号进行自执行
 * 使用方式：<obj-render :render="renderFun()" />
 *          renderFun:()=>{
 *              return <el-button>jsx</el-button>
 *          }
 */
import ObjRender from './packages/components/render/index.vue'
export default {
    install: function (Vue) {
        Vue.component('ObjTablePlus', objTablePlus);
        Vue.component('obj-render', ObjRender);
        //事件总线暴露组件方法到全局下
        Vue.directive('objExpose', {
            bind(el, binding, vNode) {
                const methodName = binding.arg;
                if (vNode.context && methodName) {
                    Vue.prototype[`$${methodName}`] = vNode.context[methodName].bind(vNode.context);
                }
            }
        });
    }
}