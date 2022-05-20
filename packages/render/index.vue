<!--
 * @Author: chenkangxu
 * @Date: 2022-05-19 14:48:25
 * @LastEditTime: 2022-05-20 21:52:58
 * @LastEditors: chenkangxu
 * @Description: 
 * @Github: 
-->
<script>
export default {
  name: "custom-render",
  props: {
    //渲染函数
    render:{
      type:[Object],
      default:()=>{}
    }
  },
  render(){
    return this.render
  },
};
</script>