import React,{useRef,useEffect} from 'react'

export default function Base() {
    let txtRef = useRef()
    let handleTxt = () => {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // txtRef.current.innerHTML = this.responseText
                let xmlDoc = this.responseXML;
                let txt = "";
                let x = xmlDoc.getElementsByTagName("ARTIST");
                for (let i = 0; i < x.length; i++) {
                    txt += x[i].childNodes[0].nodeValue + "<br>";
                }
                txtRef.current.innerHTML = txt;
                console.log('测试ajax的返回--本地文件',this)
            }
        }
        // 普通字符串
        // xhr.open('GET','/resource/index.txt',true)
        xhr.open('GET','/resource/index.xml',true)
        xhr.send()
    }
    // useEffect(() => {
    //     // get请求的模拟
    //     var http = new XMLHttpRequest()
    //     http.onreadystatechange = function() {
    //         if (this.readyState === 4 && this.status === 200) {
    //             // txtRef.current.innerHTML = this.responseText
    //             console.log('测试ajax的返回',this.responseText)
    //         }
    //     }
    //     http.open('GET','https://api.ourplay.net/opseoapi/gamethemerecommend?cnt=20',true)
    //     http.send()
    // }, [])
    useEffect(() => {
        let params = {pageIndex: 1, pageSize: 100, WxIds: ["1688855187378464"], LastTimestamp: 1}
        // post请求的模拟
        var http = new XMLHttpRequest()
        http.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // txtRef.current.innerHTML = this.responseText
                console.log('测试ajax的返回',this.getAllResponseHeaders())
            }
        }
        http.open('POST','https://pt-prod.lbian.cn/Contact/AllContactListWithstatus',true)
        // 为请求添加请求头 
        // 设置token
        http.setRequestHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOiIlN0IlMjJhdmF0YXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRndld29yay5xcGljLmNuJTJGd3dwaWMlMkYzNTg0MzVfc3NtR1Z0UGRUZU9oRDY1XzE2NjIwMzY3OTklMkYwJTIyJTJDJTIyaW5kdXN0cnlUeXBlJTIyJTNBJTIybXl0eGwlMjIlMkMlMjJsb2dpblR5cGUlMjIlM0ElMjJub3JtYWwlMjIlMkMlMjJtZW1iZXJJZCUyMiUzQTE1MjI0MDgzMzg5Mzk1MTg5ODIlMkMlMjJtZW1iZXJOYW1lJTIyJTNBJTIyJUU5JTlGJUE5JUU5JTlCJUFBJUU3JUJBJUEyLSVFNSU4RCU5MyVFNyU5QiU5RiVFNSU4OSU4RCVFNyVBQiVBRiUyMiUyQyUyMm1vYmlsZSUyMiUzQSUyMjE4ODkzNzk1NjA2JTIyJTJDJTIyb3JnSWQlMjIlM0EzMzAxMDAxMDAwMDA1JTJDJTIyb3JnTmFtZSUyMiUzQSUyMiVFNiU5RCVBRCVFNSVCNyU5RSVFNiU4OSU4MCVFNiU4MCU5RCVFNCVCQSU5MiVFOCVCRiU5RSVFNyVBNyU5MSVFNiU4QSU4MCVFNiU5QyU4OSVFOSU5OSU5MCVFNSU4NSVBQyVFNSU4RiVCOCUyMiUyQyUyMm9yZ1R5cGUlMjIlM0ElMjJnZW5lcmFsJTIyJTJDJTIycmVnaW9uQ29kZSUyMiUzQSUyMjMzMDEwMDAwMDAwMDAwMDAwMCUyMiUyQyUyMnNob3J0TmFtZSUyMiUzQSUyMiVFOSVBMiU4NCVFNSU4RiU5MSVFNyU4RSVBRiVFNSVBMiU4MyUyMiUyQyUyMnVzZXJJZCUyMiUzQTE1MjI0MDgzMzg5Mzk1MTg5ODIlMkMlMjJ1c2VyTmFtZSUyMiUzQSUyMiVFOSU5RiVBOSVFOSU5QiVBQSVFNyVCQSVBMi0lRTUlOEQlOTMlRTclOUIlOUYlRTUlODklOEQlRTclQUIlQUYlMjIlMkMlMjJ1c2VyVHlwZSUyMiUzQSUyMmVtcGxveWVlJTIyJTdEIiwidXNlcl9uYW1lIjoiMzMwMTAwMTAwMDAwNTsxNTIyNDA4MzM4OTM5NTE4OTgyO2VtcGxveWVlO25vcm1hbCIsIm9yZ19pZCI6MzMwMTAwMTAwMDAwNSwic2NvcGUiOlsiYWxsIl0sImV4cCI6MTY2NDIxOTM0NSwianRpIjoiODg1MjI5Y2EtY2I3Yi00ZWUyLWE0YmItN2ZiMmI3NWRlNjZjIiwiY2xpZW50X2lkIjoicHJlIn0.NgyNg6pacK3axSTzU96gVs-IpbeDtaRDF3Dl5wkjia9B2bCCNv9LSMg2-fdNgvtbSVrekD7HknNUQ8HsEP8_u1jC7hDL6UQL2lHfNNg4_phdEe6h5iWZTEm3Hbpf3c0A_3rl5YFJMwezAUP_EnFHI10y5SW4vUy7hw7TXUkP0FA")
        // 设置请求参数的类型 (此处的意思是需要传一个json类型的请求参数)
        http.setRequestHeader( "Content-type", "application/json")
        http.send(JSON.stringify(params))
    }, [])
    return (
        <>
         <h1>ajax的初始</h1>
         <div onClick={handleTxt} ref={txtRef}>ajax请求TXT文件成功返回</div>   
        </>
    )
}
