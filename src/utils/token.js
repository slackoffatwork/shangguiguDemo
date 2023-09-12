// 设置本地token
export const setToken = (token)=>{
  localStorage.setItem('TOKEN',token)
}
// 获取本地token
export const getToken = () =>{
  return localStorage.getItem('TOKEN')
}
// 删除本地token
export const removeToken = () =>{
  return localStorage.removeItem('TOKEN')
}