import {v4 as uuidv4} from 'uuid';
// 临时token
export const getUUID = () =>{
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 判断没有
  if(!uuid_token){
    // 生成临时身份
    uuid_token = uuidv4();
    // 本地存储
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }else{

  }

  return uuid_token;


}