// pages/project/project.js

var pageIndex = 0;    // 页数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectTypeData: [],  // 项目分类数据
    projectData: [],      // 项目文章数据
    scrollTop: 0,         // 滚动加载的高度
    tip: "",              // 提示文字
    cid: 0                // project所在的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this;
    this.projectTypeDataRequest(that);

    wx.getSystemInfo({      // 监听滑动到底部
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      },
    });
  },

  /**
   * 项目分类数据请求
   */
  projectTypeDataRequest :function(that) {
    wx.request({
      url: 'http://www.wanandroid.com/project/tree/json',
      headers: {
        'content-type': 'application/json'
      },
      success:function(res) {
        that.setData({
          projectTypeData: res.data.data,  // 设置项目分类的数据
          cid: res.data.data[0].id,        // 设置project所在的id 
        });
        that.projectDataRequest(that);     // 打开项目页面时加载文章
      }
    });
    wx.hideLoading();
  },

  /**
   * 项目分类点击事件
   */
  projectType: function(e) {
    wx.showLoading({
      title: '正在加载中...',
    })
    var project = e.currentTarget.dataset.id;
    this.setData({
      cid: project,                 // 设置文章所在id的数据 
      projectData: [],              // 清空文章列表
    });
    pageIndex = 0;                  // 页数重设为0 
    this.projectDataRequest(this);  
  },

  /**
    * 文章数据加载请求
    */
  projectDataRequest: function (that) {
    if (pageIndex !== 0) {
      that.setData({        // 请求数据之后
        tip: "正在加载...",  // 提示文字
      })
    }
    wx.request({
      url: 'http://www.wanandroid.com/project/list/' + pageIndex + '/json?cid=' + that.data.cid,
      headers: {
        'content-type': 'application/json'
      },
      success: function (res) {   // 成功请求的回调函数
        var data = res.data.data.datas;

        if (data.length <= 0) {   // 请求返回的结果长度等于0 说明到底部了
          that.setData({
            tip: "已经加载到底了", // 提示文字
          })
          return;
        }

        var temp = that.data.projectData;  // 临时存储数据
        for (var i = 0; i < data.length; i++) {
          temp.push(data[i]);
        }

        that.setData({         // 数据回调成功
          projectData: temp,   // 滑动加载成功后追加的数据
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
    for (var t = Date.now(); Date.now() - t <= 1000;);    // 休眠1秒再加载下一页
    pageIndex++                                           // 翻页
    this.projectDataRequest(this)                         //滑到底部时请求数据
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