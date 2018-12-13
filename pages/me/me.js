//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: [{
       id: "01",
       message: '我的资料',
    }, {
       id: "02",
       message: '购物车',
    }, {
       id: "03",
       message: '查看订单',
    }, {
       id: "04",
       message: '收藏夹',
    }, {
       id: "05",
       message: '商品分类',
    }, {
       id: "06",
      message: '设置',
    }]
  },

  changePage: function(e) {
    var $id = e.currentTarget.dataset.id;
    console.log($id);
    if ($id == "01") {
      wx.navigateTo({
        url: 'myinform/myinform'
      })
    } else if ($id == "02") {
      wx.navigateTo({
        url: 'trolley/trolley'
      })
    } else if ($id == "03") {
      wx.navigateTo({
        url: 'order/order'
      })
    } else if ($id == "04") {
      wx.navigateTo({
        url: 'favorite/favorite'
      })
    } else if ($id == "05") {
      wx.navigateTo({
        url: 'type/type'
      })
    } else if ($id == "06") {
      wx.navigateTo({
        url: 'setting/setting'
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
