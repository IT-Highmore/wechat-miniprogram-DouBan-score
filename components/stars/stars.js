// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rate:  {
      type: Number,
      value:  0
    },
    starsize:  {
      type:  Number,
      value:   20
    },
    fontsize: {
      type: Number,
      value: 20
    },
    fontcolor: {
      type: String,
      value: "#ccc"
    },
    isText:{
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes:  {
    attached: function() {
      const that = this;
      const rate = that.properties.rate;
      let intRate  =  parseInt(rate);
      let light = parseInt(intRate / 2);
      let half = intRate%2;
      let gray  = 5 - light -half;

      const lights = [];
      const halfs = [];
      const grays = [];
      for(let index = 1;index<=light;index++) {
        lights.push(index)
      }
      for (let index = 1; index <= half; index++) {
        halfs.push(index)
      }
      for (let index = 1; index <= gray; index++) {
        grays.push(index)
      }
      let  rateText =   rate  && rate>0 ?  rate.toFixed(1) :  "未评分"  
      that.setData({
        lights: lights,
        halfs: halfs,
        grays:  grays,
        rateText: rateText
      })
    }
  }
})
