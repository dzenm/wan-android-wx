// pages/me/me.js

var app = getApp();

var pageIndex = 0;    // 加载的页数

Page({

  /**
   * 页面的初始数据
   */
  data: {
      articalData: [],    // 所有文章数据 
      bannerData:[],      // banner数据
      scrollTop: 0,       // scroll距离上部的高度
      scrollHeight: 0,    // scroll距离高度
      tip: "",            // 提示文字内容
  },  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.showLoading({
      title: '正在加载中...',
    })
    this.bannerRequest(that);     // Banner数据请求
    wx.getSystemInfo({            // 监听滑动到底部
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      },
    });
    this.homeRequest(that);       // 主页文章数据请求
    
  },

  /**
   * 首页的banner数据
   */
  bannerRequest: function (that) {
    wx.request({
      url: 'http://www.wanandroid.com/banner/json',
      headers: {
        'content-type': 'application/json'    
      },
      success: function (res) {       // 解析成功的回调函数
        that.setData({            
          bannerData: res.data.data,  // Banner图片数据和跳转网址数据
        })
      }
    })
  },

  /**
   * 首页加载的列表数据
   */
  homeRequest: function (that){   
    if (pageIndex !== 0) {
      that.setData({    // 滑到底部之后设置提示内容，提示文字和显示加载的图标
        tip: "正在加载..."
      })
    } 
    wx.request({    
      url: 'http://www.wanandroid.com/article/list/' + pageIndex + '/json',
      headers: {
        'content-type': 'application/json'    
      },
      success: function (res) {   // 成功请求的回调函数
        var data = res.data.data.datas;

        if (data.length <= 0) {   // 请求返回的结果长度等于0 说明到底部了
          that.setData({          // 加载到最底部，设置提示文字，隐藏加载的图标   
            tip: "已经加载到底了",
          })
          return;
        }

        var temp = that.data.articalData;  // 临时存储数据
        for (var i = 0; i < data.length; i++) {
          temp.push(data[i]);
        }
      
        that.setData({         // 数据回调成功
          articalData: temp,   // 滑动加载成功后追加的数据
          tip: "加载更多",      // 提示文字
        });
      }
    })
    wx.hideLoading();
  },

  /**
   * 页面滑动到底部
   */
  bindDownload: function() {
    // for (var t = Date.now(); Date.now() - t <= 1000;);    // 休眠1秒再加载下一页
    pageIndex++;                                          // 翻页
    this.homeRequest(this);                               //滑到底部时请求数据
  },

  /**
   * 
   */
  scroll: function(event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },

  /**
   * 列表点击事件
   */
  detailClick: function (e) {
    var url = e.currentTarget.dataset.url;   // 获取点击列表的列表的link
    wx.navigateTo({
      url: '../html5/html5?link=' + url,   // 页面跳转传值，通过在url后面加？表示在另一个页面用来接收值的参数，=之后表示要传的值
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
    // var that = this;

    // pageIndex = 0;
    // that.setData({
    //   listData: [],
    //   listBanner: [],
    // })
    // this.banner(that);
    // this.homeData(that);   
    // wx.stopPullDownRefresh()
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