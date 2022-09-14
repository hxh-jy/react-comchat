// 方式1: 使用时间戳
function throttle1(fn, wait) {
    let time = 0;
    return function () {
      let _this = this;
      let args = arguments;
      let now = Date.now();
      if (now - time > wait) {
        // 要进行的操作
        time = now;
      }
    };
  }
  // 方式2: 使用定时器
  function thorttle2(fn, wait) {
    let timer;
    return function () {
      let _this = this;
      let args = arguments;
  
      if (!timer) {
        timer = setTimeout(function () {
          timer = null;
          fn.apply(_this, args);
        }, wait);
      }
    };
  }