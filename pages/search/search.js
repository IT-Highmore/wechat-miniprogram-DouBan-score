// pages/search/search.js
import { network} from '../../utils/network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    histories: null
  },

  methods: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'searched',
      success: (res) => {
        let movies = res.data;
        this.setData({
          histories: movies
        })
      }
    })
  },

  onSearchInputEvent: function(event) {
    let value = event.detail.value;
    if(!value || value === '') {
      this.setData({
        subjects: null
      })
      return;
    }
    network.getSearch({
      q: value,
      success: (subjects)=> {
        this.setData({
          subjects: subjects
        })
      }
    })
  },

  onItemTapEvent: function(event) {
    let id = event.currentTarget.dataset.id;
    let title = event.currentTarget.dataset.title;
    let histories = this.data.histories;
    let isExisted = histories.some(item => {
      item.id === id
    })
    console.log(isExisted);
    if(!isExisted) {
      histories.push({id: id, title:title});
      wx.setStorage({
        data: histories,
        key: 'searched',
        success: () => {
          console.log('保存成功')
        }
      })
    }
    
     wx.navigateTo({
       url: '/pages/detail/detail?type=movie&id=' + id,
     })
  },

  onClearEvent: function(event) {
    wx.removeStorage({
      key: 'searched',
      success: (res) => {
        console.log('删除成功！')
      }
    })
    this.setData({
      histories: null
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