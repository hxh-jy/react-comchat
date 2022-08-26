import axios from 'axios'

// 请求拦截  就是在你的请求还没发送之前可以对你的请求做一些修改
// 响应拦截器  就是在你的接口返回数据后，拦截器会先获取可以判断是否正常或数据完好在把数据返回到发起请求的地方
const isPrd = process.env.NODE_ENV === 'production'   //代表的是线上的生产环境
let baseURL = isPrd ? 'https://pt-prod.lbian.cn/' : 'https://pt-qa.lbian.cn/'
const suosiApiUrl = "https://gateway.sit.suosihulian.com/";
export function request(config,isSuosi = false,isFormData = false) {
    const instance = axios.create({
      baseURL: isSuosi ? suosiApiUrl : baseURL,
      headers: {
        Authorization: window.token || `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOiIlN0IlMjJhdmF0YXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRndld29yay5xcGljLmNuJTJGd3dwaWMlMkY2MDY3NjhfZEtRY0xHaTdSeXFRelpuXzE2NTk0ODcyODclMkYwJTIyJTJDJTIyaW5kdXN0cnlUeXBlJTIyJTNBJTIybXl0eGwlMjIlMkMlMjJsb2dpblR5cGUlMjIlM0ElMjJub3JtYWwlMjIlMkMlMjJtZW1iZXJJZCUyMiUzQTE1NjE5Njc4NDY3MjMyODUwNzAlMkMlMjJtZW1iZXJOYW1lJTIyJTNBJTIyJUU0JUJEJUIzJUU2JUFDJUEyJTIyJTJDJTIybW9iaWxlJTIyJTNBJTIyMTUyMDE4NzM3OTclMjIlMkMlMjJvcmdJZCUyMiUzQTMwMDEwMDEwMDEwMDAwMDYlMkMlMjJvcmdOYW1lJTIyJTNBJTIyJUU2JTlEJUFEJUU1JUI3JTlFJUU2JUFEJUEzJUU1JTlEJTlCJUU3JUE3JTkxJUU2JThBJTgwJUU2JTlDJTg5JUU5JTk5JTkwJUU1JTg1JUFDJUU1JThGJUI4JUVGJUJDJTg4JUU2JUFGJThEJUU1JUE5JUI0JUVGJUJDJTg5JTIyJTJDJTIyb3JnVHlwZSUyMiUzQSUyMmdlbmVyYWwlMjIlMkMlMjJyZWdpb25Db2RlJTIyJTNBJTIyMzMwMTAyMDAwMDAwMDAwMDAwJTIyJTJDJTIyc2hvcnROYW1lJTIyJTNBJTIyJUU2JUFEJUEzJUU1JTlEJTlCJUU3JUE3JTkxJUU2JThBJTgwJTIyJTJDJTIydXNlcklkJTIyJTNBMTU2MTk2Nzg0NjcyMzI4NTA3MCUyQyUyMnVzZXJOYW1lJTIyJTNBJTIyJUU0JUJEJUIzJUU2JUFDJUEyJTIyJTJDJTIydXNlclR5cGUlMjIlM0ElMjJlbXBsb3llZSUyMiU3RCIsInVzZXJfbmFtZSI6IjMwMDEwMDEwMDEwMDAwMDZAMTU2MTk2Nzg0NjcyMzI4NTA3MEBlbXBsb3llZUBub3JtYWwiLCJvcmdfaWQiOjMwMDEwMDEwMDEwMDAwMDYsInNjb3BlIjpbIndyaXRlIl0sImV4cCI6MTY2MTUyMTQyNiwianRpIjoiZjQ0NmE2Y2UtNWE1My00MWQwLWI0ZGYtZWUzMDBlOGUzYzY5IiwiY2xpZW50X2lkIjoic2l0In0.WXHR9-jLz4GmBI9SXpqLeRzCMaMn3GoNawOG7ruTiMobyY5Jr8UxpPoQWi5asZv0y8ACDopFSRQrV_CXRR1HuogLhjXdlJdj6WsX4RoVXexnJOo7vPSIJxs2HHtvu-AaRMCkQkYa7mZU8t2pMbjlPipzjTR2ZVfyg9s2rZPl6GE`,
        'content-type':  isFormData ? 'multipart/form-data' : 'application/json',
      },
      timeout: 10 * 1000,
    });
  
    // 拦截器
    // instance.interceptors.response.use((res) => res.data);
    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return error
      },
    );
  
    // axios的返回值本身是一个Promise对象
    return instance(config);
}
export default request;