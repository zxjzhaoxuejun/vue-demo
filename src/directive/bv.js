// polyfill
import 'intersection-observer';
// 自行封装数据上报方法,其实就是网络请求
// import {
//   DotData
// } from './DotData'

// 可以把节流的时间调大一点，默认是100ms
IntersectionObserver.prototype['THROTTLE_TIMEOUT'] = 300;

class Exposure {
  // dotDataArr = [];
  // maxNum = null;
  // _observer可以理解为观察者的集合吧
  // _observer;
  // _timer = null;

  constructor(maxNum = 20) {
    // 当前收集的  尚未上报的数据  也就是已经进入视窗的DOM节点的数据
    this.dotDataArr = [];
    this.maxNum = maxNum;
    this._timer = 0;
    this._observer = ''
    // 全局只会实例化一次Exposure类，init方法也只会执行一次
    this.init();
  }

  init() {
    const self = this;
    // init只会执行一次，所以这两边界处理方法放这就行
    // 把浏览器localStorage里面的剩余数据打完
    this.dotFromLocalStorage();
    // 注册客户端webview的关闭生命钩子事件
    this.beforeLeaveWebview();

    this._observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        // 这段逻辑，是每一个商品进入视窗时都会触发的
        if (entry.isIntersecting) {
          // 清楚当前定时器
          clearTimeout(self._timer);
          // 我这里是直接把商品相关的数据直接放DOM上面了  比如 <div {...什么id  class style等属性} :data-dot="渲染商品流时自行加上自身属性" ></div>
          const ctm = entry.target.attributes['data-dot'];
          console.log(ctm)
          // 把收集到的数据添加进待上报的数据数组中
          self.dotDataArr.push(ctm);
          console.log(self.dotDataArr)
          // 收集到该商品的数据后，取消对该商品DOM的观察
          self._observer.unobserve(entry.target);
          // 超过一定数量打点，打完点会删除这一批
          if (self.dotDataArr.length >= self.maxNum) {
            self.dot();
          } else {
            self.storeIntoLocalstorage(self.dotDataArr);
            if (self.dotDataArr.length > 0) {
              //，只要有新的ctm进来  接下来如果没增加  自动2秒后打
              self._timer = window.setTimeout(function () {
                self.dot();
              }, 2000)
            }
          }
        }
      })
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5 // 不一定非得全部露出来  这个阈值可以小一点点
    });

  }

  // 每个商品都会会通过全局唯一的Exposure的实例来执行该add方法,将自己添加进观察者中
  add(entry) {
    console.log(2)
    console.log(entry.el)
    this._observer && this._observer.observe(entry.el)
  }

  dot() {
    // 同时删除这批打点的ctms
    const dotDataArr = this.dotDataArr.splice(0, this.maxNum);
    // DotData(dotDataArr);
    console.log(dotDataArr)
    // 打完点，也顺便更新一下localStorage
    this.storeIntoLocalstorage(this.dotDataArr);
  }

  storeIntoLocalstorage(dotDataArr) {
    // 。。。 存进localStorage中，具体什么格式的字符串自行定义就好
    console.log(dotDataArr)
  }

  dotFromLocalStorage() {
    const ctmsStr = window.localStorage.getItem('dotDataArr');
    if (ctmsStr) {
      // 。。。如果有数据，就上报打点
    }
  }

  beforeLeaveWebview() {
    // let win = window;
    // 自行跟客户端童鞋约定该钩子的实现就好
    // injectEvent("webviewWillDisappear", () => {
    //   if (this.dotDataArr.length > 0) {
    //     // DotData(this.dotDataArr);
    //     console.log(this.dotDataArr)
    //   }
    // })
  }
}

export default Exposure;