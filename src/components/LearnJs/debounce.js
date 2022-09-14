function debounce(fn,wait) {
    if (timer) {
        clearTimeout(timer);
    }
    let timer = setTimeout(() => {
        // 在该时间段内需要进行的操作
    },wait)
}