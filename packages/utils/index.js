/*
 * @Author: chenkangxu
 * @Date: 2022-05-21 14:54:45
 * @LastEditTime: 2022-05-30 16:42:23
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
    getUid(currentRenderColIndex,enableCacheUuid,cacheUid/*缓存的uuid*/){
        if(enableCacheUuid==true){
            let uid=null;
            if(cacheUid.length>0){
              if(currentRenderColIndex>cacheUid.length-1){
                uid=uuidv4();
                cacheUid.push(uid);
              }else{
                return cacheUid[currentRenderColIndex];
              }
            }else{
              uid=uuidv4();
              cacheUid.push(uid);
            }
            return uid;
        }else{
            return uuidv4();
        }

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
    },
    //获取dom数据样式
    getStyle(dom){
        return dom.getBoundingClientRect();
    }
}
export default utils;