<script>
export default {
  name: "render",
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