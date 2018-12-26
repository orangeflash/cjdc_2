//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function (options) {
    app.setNavigationBarColor(this);
    var that = this
    app.util.request({
      'url': 'entry/wxapp/system',
      'cachetime': '0',
      success: function (res) {
        that.setData({
          system: res.data
        })
      },
    })
    console.log(options)
    that.setData({
      state: options.state
    })
  },
  formSubmit: function (e) {
    var user_id = wx.getStorageSync('users').id;
    app.util.request({
      'url': 'entry/wxapp/AddFormId',
      'cachetime': '0',
      data: { user_id: user_id, form_id: e.detail.formId },
      success: function (res) {
        console.log(res.data)
      },
    })
    var that = this
    app.util.request({
      'url': 'entry/wxapp/CheckRz',
      'cachetime': '0',
      data: { user_id: user_id },
      success: function (res) {
        console.log(res.data)
        if (res.data != false) {
          if (res.data.state == 1) {
            wx.showModal({
              title: '',
              content: '系统正在审核中',
            })
          } else if (res.data.state == 2) {
            wx.showModal({
              title: '',
              content: '您已经入驻过了',
            })
          } else if (res.data.state == 3) {
            wx.showModal({
              title: '',
              content: '您的入驻申请已被拒绝，点击确定进行编辑',
              success: res => {
                if (res.confirm) {
                  wx.navigateTo({
                    url: 'info?form_id=' + e.detail.formId + '&state=3',
                  })
                }
              }
            })
          } else {
            wx.showModal({
              title: '',
              content: '您的入驻已经到期,请联系平台管理员续费',
            })
          }
        } else {
          wx.navigateTo({
            url: 'info?form_id=' + e.detail.formId + '&state=' + that.data.state,
          })
        }
      },
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
