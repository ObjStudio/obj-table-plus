/*
 * @Author: chenkangxu
 * @Date: 2022-05-21 14:54:45
 * @LastEditTime: 2022-05-21 18:20:22
 * @LastEditors: chenkangxu
 * @Description: 
 * @Github: 
 */
import { v4 as uuidv4 } from 'uuid';


//读取全局配置文件,约定在src目录下的config目录中创建obj-table.config.js文件
let config=null;
try{
    const contextKey=require.context('/src/config',false,/\obj-table.config$/).keys();
    console.log(contextKey);
    //有找到文件
    if(contextKey.length>0){
        const suffix='.js';
        config=require('/src/config/obj-table.config'+suffix);
        console.log(config);
    }
}catch(e){
    // console.log(e);
    console.warn('没有读取到配置文件');
}


const utils = {
    //获取唯一id
    getUid(){
        return uuidv4();
    },
    //读取配置项信息
    getConfig(key,defaultValue){
        //判断是否有这个键
        if(config&&config.hasOwnProperty(key)){
            return config[key];
        }else{
            return defaultValue;
        }
    },
    //驼峰转短横线
    _toKebab(value) {
        return value.replace(/([A-Z])/g, "-$1").toLowerCase();
    }
}
export default utils;