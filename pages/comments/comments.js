// pages/comments/comments.js
import { network } from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    start: 1,
    count: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData(options)
    that.getComments(1);
  },

  getComments: function (start) {
    const that = this;
    const type = that.data.type;
    const id = that.data.id;

    if(start > that.data.start) {
      that.setData({
        nextLoading: true
      });
    } else {
      that.setData({
        preLoading: true
      });
    }


    network.getItemComments({
      type: type,
      id: id,
      start: start,
      count: 20,
      success: function (data) {
        const total = data.total;
        const comments = data.interests;
        that.setData({
          total: total,
          comments: comments,
          start: start,
          nextLoading: false,
          preLoading: false
        });
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    })
  },

  onItemTapEvent: function (event) {
    wx.navigateBack({
    })
  },
  
  onPrePageTap: function (event) {
    const that = this;
    const oldStart = that.data.start;
    if (oldStart - that.data.count > 0) {
      const start = oldStart - that.data.count;
      that.getComments(start)
    } 
  },

  onNextPageTap: function (event){
    const that = this;
    const oldStart = that.data.start;
    const start = oldStart + that.data.count;
    that.getComments(start)
  }
 
})