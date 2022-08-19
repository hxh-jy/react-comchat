import axios from 'axios'

// 请求拦截  就是在你的请求还没发送之前可以对你的请求做一些修改
// 响应拦截器  就是在你的接口返回数据后，拦截器会先获取可以判断是否正常或数据完好在把数据返回到发起请求的地方
const isPrd = process.env.NODE_ENV === 'production'   //代表的是线上的生产环境
let baseURL = isPrd ? 'https://pt-prod.lbian.cn/' : 'https://pt-qa.lbian.cn/'
export function request(config) {
    const instance = axios.create({
      baseURL,
      headers: {
        Authorization: window.token || `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOiIlN0IlMjJhdmF0YXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRndld29yay5xcGljLmNuJTJGd3dwaWMlMkY3MzQ4MTBfb0RxWDh3X01TVy1yWlp3XzE2NTUyMDI2NDclMkYwJTIyJTJDJTIyaW5kdXN0cnlUeXBlJTIyJTNBJTIybXl0eGwlMjIlMkMlMjJsb2dpblR5cGUlMjIlM0ElMjJub3JtYWwlMjIlMkMlMjJtZW1iZXJJZCUyMiUzQTE1MTgxMTY5NTgyMzc3NTMzNTAlMkMlMjJtZW1iZXJOYW1lJTIyJTNBJTIyJUU5JTlGJUE5JUU5JTlCJUFBJUU3JUJBJUEyLSVFNSU4RCU5MyVFNyU5QiU5RiVFNSU4OSU4RCVFNyVBQiVBRiUyMiUyQyUyMm1vYmlsZSUyMiUzQSUyMjE4ODkzNzk1NjA2JTIyJTJDJTIyb3JnSWQlMjIlM0EzMDAxMDAxMDAxMDAwMDA2JTJDJTIyb3JnTmFtZSUyMiUzQSUyMiVFNiU5RCVBRCVFNSVCNyU5RSVFNiVBRCVBMyVFNSU5RCU5QiVFNyVBNyU5MSVFNiU4QSU4MCVFNiU5QyU4OSVFOSU5OSU5MCVFNSU4NSVBQyVFNSU4RiVCOCVFRiVCQyU4OCVFNiVBRiU4RCVFNSVBOSVCNCVFRiVCQyU4OSUyMiUyQyUyMm9yZ1R5cGUlMjIlM0ElMjJnZW5lcmFsJTIyJTJDJTIycmVnaW9uQ29kZSUyMiUzQSUyMjMzMDEwMjAwMDAwMDAwMDAwMCUyMiUyQyUyMnNob3J0TmFtZSUyMiUzQSUyMiVFNiVBRCVBMyVFNSU5RCU5QiVFNyVBNyU5MSVFNiU4QSU4MCUyMiUyQyUyMnVzZXJJZCUyMiUzQTE1MTgxMTY5NTgyMzc3NTMzNTAlMkMlMjJ1c2VyTmFtZSUyMiUzQSUyMiVFOSU5RiVBOSVFOSU5QiVBQSVFNyVCQSVBMi0lRTUlOEQlOTMlRTclOUIlOUYlRTUlODklOEQlRTclQUIlQUYlMjIlMkMlMjJ1c2VyVHlwZSUyMiUzQSUyMmVtcGxveWVlJTIyJTdEIiwidXNlcl9uYW1lIjoiMzAwMTAwMTAwMTAwMDAwNkAxNTE4MTE2OTU4MjM3NzUzMzUwQGVtcGxveWVlQG5vcm1hbCIsIm9yZ19pZCI6MzAwMTAwMTAwMTAwMDAwNiwic2NvcGUiOlsid3JpdGUiXSwiZXhwIjoxNjYwOTE3MzMwLCJqdGkiOiJmMmEzN2MwNS0xYjczLTRhYmMtODc2Yi1kMzc3ZTVjZGQ1OTAiLCJjbGllbnRfaWQiOiJzaXQifQ.OTMBuNRq06ddUl2OMtgVJ1Br9lqQRhzyqAsaB2dpp3Lx8zE_Yas9jgHlFgtLhzaN-gXM7CGrtsuCX3h55Axff-NgVpcGjmzD7DodB5Ub_OiV0AIGYXkDcnl_l_REA5PTtSG-mHgdYUs0aGgsR-qEMrZUi89_FWX7CzusVjiRrRg`,
        'content-type':  'application/json',
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