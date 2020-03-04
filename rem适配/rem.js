// 基准大小
// const baseSize = 37.5
    // 设置 rem 函数
    function setRem() {
      // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
      // const scale = document.documentElement.clientWidth / 375
      //     // 设置页面根节点字体大小
      // document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
      // // document.documentElement.style.fontSize = (baseSize *scale) + 'px'
      // console.log( document.documentElement.style.fontSize)
  
      ;(function(designWidth, maxWidth) {
          var doc = document,
          win = window,
          docEl = doc.documentElement,
          remStyle = document.createElement("style"),
          tid;
      
          function refreshRem() {
              var width = docEl.getBoundingClientRect().width;
              // maxWidth = maxWidth || 540;
              // width>maxWidth && (width=maxWidth);
              var rem = width * 100 / designWidth;
              // remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
              document.documentElement.style.fontSize=rem+"px"
          }
      
          if (docEl.firstElementChild) {
              docEl.firstElementChild.appendChild(remStyle);
          } else {
              var wrap = doc.createElement("div");
              wrap.appendChild(remStyle);
              doc.write(wrap.innerHTML);
              wrap = null;
          }
          //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
          refreshRem();
      
          win.addEventListener("resize", function() {
              clearTimeout(tid); //防止执行两次
              tid = setTimeout(refreshRem, 300);
          }, false);
      
          win.addEventListener("pageshow", function(e) {
              if (e.persisted) { // 浏览器后退的时候重新计算
                  clearTimeout(tid);
                  tid = setTimeout(refreshRem, 300);
              }
          }, false);
          if (doc.readyState === "complete") {
              doc.body.style.fontSize = "16px";
          } else {
              doc.addEventListener("DOMContentLoaded", function(e) {
                  // console.log(doc.readyState)
                  doc.body.style.fontSize = "16px";
              }, false);
          }
      })(375, 375);
  
      // const oHtml = document.getElementsByTagName('html')[0]
      // const width = oHtml.clientWidth;
      // // 320px的屏幕基准像素为12px
      // oHtml.style.fontSize = 12 * (width / 320) + "px";
  }
  // 初始化
  setRem()
      // 改变窗口大小时重新设置 rem
  window.onresize = function() {
      setRem()
  }
  