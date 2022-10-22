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
        Authorization: window.token || `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOiIlN0IlMjJhdmF0YXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRndld29yay5xcGljLmNuJTJGd3dwaWMlMkY5MDgyMzlfWDBZODBXLVVUTk9lOXFGXzE2NTk1MjcxNDElMkYwJTIyJTJDJTIyaW5kdXN0cnlUeXBlJTIyJTNBJTIybXl0eGwlMjIlMkMlMjJsb2dpblR5cGUlMjIlM0ElMjJub3JtYWwlMjIlMkMlMjJtZW1iZXJJZCUyMiUzQTE1NjE5Njc4NDY3MjMyODUwNzglMkMlMjJtZW1iZXJOYW1lJTIyJTNBJTIyJUU5JTlGJUE5JUU5JTlCJUFBJUU3JUJBJUEyLSVFNSU4RCU5MyVFNyU5QiU5RiVFNSU4OSU4RCVFNyVBQiVBRiUyMiUyQyUyMm1vYmlsZSUyMiUzQSUyMjE4ODkzNzk1NjA2JTIyJTJDJTIyb3JnSWQlMjIlM0EzMDAxMDAxMDAxMDAwMDA2JTJDJTIyb3JnTmFtZSUyMiUzQSUyMiVFNiU5RCVBRCVFNSVCNyU5RSVFNiVBRCVBMyVFNSU5RCU5QiVFNyVBNyU5MSVFNiU4QSU4MCVFNiU5QyU4OSVFOSU5OSU5MCVFNSU4NSVBQyVFNSU4RiVCOCVFRiVCQyU4OCVFNiVBRiU4RCVFNSVBOSVCNCVFRiVCQyU4OSUyMiUyQyUyMm9yZ1R5cGUlMjIlM0ElMjJnZW5lcmFsJTIyJTJDJTIycmVnaW9uQ29kZSUyMiUzQSUyMjMzMDEwMjAwMDAwMDAwMDAwMCUyMiUyQyUyMnNob3J0TmFtZSUyMiUzQSUyMiVFNiVBRCVBMyVFNSU5RCU5QiVFNyVBNyU5MSVFNiU4QSU4MCUyMiUyQyUyMnVzZXJJZCUyMiUzQTE1NjE5Njc4NDY3MjMyODUwNzglMkMlMjJ1c2VyTmFtZSUyMiUzQSUyMiVFOSU5RiVBOSVFOSU5QiVBQSVFNyVCQSVBMi0lRTUlOEQlOTMlRTclOUIlOUYlRTUlODklOEQlRTclQUIlQUYlMjIlMkMlMjJ1c2VyVHlwZSUyMiUzQSUyMmVtcGxveWVlJTIyJTdEIiwidXNlcl9uYW1lIjoiMzAwMTAwMTAwMTAwMDAwNjsxNTYxOTY3ODQ2NzIzMjg1MDc4O2VtcGxveWVlO25vcm1hbCIsIm9yZ19pZCI6MzAwMTAwMTAwMTAwMDAwNiwic2NvcGUiOlsid3JpdGUiXSwiZXhwIjoxNjY2NDYxNDYyLCJqdGkiOiJjOGVjM2I4NS0zNTA3LTQxZWEtYTY3MC00NDNmMzFmZWIyMWUiLCJjbGllbnRfaWQiOiJzaXQifQ.M64DeBXWaFESEu7Pe1lO2WpcxmFZQ8hOp6AWZ_HSVigLE9TGs6R1ntc0xTCAgTv562GQSHmJGiagvydgilKeK77MM_fEMZCb6jYgJwrb-ng8URuFUtQ8eA9eXaGfOdVV3QZi_gxp6_GlK2ABcv43SxN-0V_MrYeWlvle7AEboP0`,
        'content-type':  isFormData ? 'multipart/form-data' : 'application/json',
      },
      timeout: 10 * 1000,
    });
  
    // 拦截器y
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