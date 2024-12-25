/**
 * 判读数据类型
 * @param {*} data 需要判断的数据
 * @param {*} type 类型
 */
function determineType(data,type){
    if(!type||!data){
        throw new TypeError('传参错误')
    }
    let typeValue=type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    return Object.prototype.toString.call(data).includes(typeValue)
}
/**
 * 将Object转为FormData数据类型
 * @param {Object} data 
 * @returns FormData类型数据
 */
function transformToFormData(data={}){
    let param=new FormData();
    for(const key in data){
        if(data[key] === '') {
            param.append(key,data[key]);
        }
        if(!data[key]||data[key]===[]||data[key]==={}){
            continue;
        }
        param.append(key,data[key]);
    } 
    return param;
}

module.exports={
    determineType,
    transformToFormData
}