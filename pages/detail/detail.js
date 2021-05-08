// pages/detail/detail.js

import {network} from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const type = options.type;
    const id = options.id;
    that.setData({
      type: type,
      id: id
    })

    network.getItemDetail({
      type: type,
      id: id,
      success: function(item){
        let genres = item.genres;
        genres = genres.join("/");
        item.genres = genres;

        let actors = item.actors;
        let actorsName = [];
        if(actors.length  > 3) {
          actors = actors.slice(0,3);
        }
        for(let i = 0; i < actors.length; i++) {
          actorsName.push(actors[i].name)
        }
        actorsName = actorsName.join("/");

        let director = item.directors[0].name;
        let authors = director + "(导演)/" + actorsName;
        item.authors = authors;
        console.log(item);
        that.setData({
          item: item
        });
      }
    });

    network.getItemTags({
      type: type,
      id: id,
      success: function(tags) {
        that.setData({
          tags: tags
        });
      }
    });

    network.getItemComments({
      type: type,
      id: id,
      success: function (data) {
        const  totalComment = data.total;
        const comments = data.interests;
        that.setData({
          totalComment: totalComment,
          comments: comments
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})