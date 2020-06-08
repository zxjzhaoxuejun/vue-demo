/**
 * 前端曝光埋点
 * new IntersectionObserver() 实例化一个全局observer；
 * 结合Vue指令让每个DOM自行把自己加入到observer的观察列表；
 * 当某个DOM进入视窗，收集对应的信息，上报；
 * 取消对该DOM的观察；
 */
import 'intersection-observer';
import apiAxios from './../network/axios'

// 可以把节流的时间调大一点，默认是100ms
IntersectionObserver.prototype['THROTTLE_TIMEOUT'] = 300;

export default class Exposures {
  constructor(maxNum = 30) {
    // 当前收集的  尚未上报的数据  也就是已经进入视窗的DOM节点的数据
    this.dotDataArr = [];
    this.maxNum = maxNum;
    this._timer = null;
    this.observer = IntersectionObserver | undefined; //可以理解为观察者的集合吧
    // 全局只会实例化一次Exposure类，init方法也只会执行一次
    this.init();
  }

  init() {
    const self = this;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(items => {
        if (items.isIntersecting) {
          const data = items.target.attributes['data-dot'];
          console.log(data)
          console.log(items.target)
          // 把收集到的数据添加进待上报的数据数组中
          self.dotDataArr.push(data);
          console.log(self.dotDataArr)
          // 收集到该商品的数据后，取消对该商品DOM的观察
          self.observer.unobserve(items.target);

          // 超过一定数量打点曝光，打完点会删除这一批
          if (self.dotDataArr.length >= self.maxNum) {
            console.log('超过一定数量打点， 打完点会删除这一批');
            self.upload(self.dotDataArr); //提交数据
          }
        }
      })
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1 // 不一定非得全部露出来  这个阈值可以小一点点
    })
  }

  add(el) {
    // 每个商品都会会通过全局唯一的Exposure的实例来执行该add方法,将自己添加进观察者中
    this.observer && this.observer.observe(el);
  }

  upload(data) {
    if (data) {
      // 。。。如果有数据，就上报打点
      // apiAxios({
      //   type: 'GET',
      //   url: '/dist',
      //   data,
      //   loading: true
      // })
      console.log('如果有数据，就上报打点数据')
    }
  }

}