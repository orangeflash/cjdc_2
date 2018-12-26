// zh_cjdianc/pages/wddd/ddxq.js
var app = getApp();
var util = require('../../utils/util.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     color:'#34aaff',
  },

  countdown: function (time) {
    var that = this;
    var EndTime = time || [];
    var NowTime = Math.round(new Date().getTime() / 1000);
    var total_micro_second = EndTime - NowTime || [];
    that.setData({
      clock: that.dateformat(total_micro_second)
    });
    if (total_micro_second <= 0) {
      that.setData({
        clock: false
      });
    } else if (total_micro_second > 0) {
      setTimeout(function () {
        total_micro_second -= 1000;
        that.countdown(time);
      }, 1000)
    }

  },

  // 时间格式化输出，如11:03 25:19 每1s都会调用一次
  dateformat: function (micro_second) {
    // 总秒数
    var second = Math.floor(micro_second);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);
    if (day < 10) {
      day = '0' + day
    }
    if (hr < 10) {
      hr = '0' + hr
    }
    if (sec < 10) {
      sec = '0' + sec
    }
    if (min < 10) {
      min = '0' + min
    }
    var time = {
      day: day,
      hr: hr,
      min: min,
      sec: sec
    }
    return time
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavigationBarColor(this);
    console.log(options)
    var that = this;
    app.util.request({
      'url': 'entry/wxapp/OrderInfo',
      'cachetime': '0',
      data: { order_id: options.oid },
      success: function (res) {
        console.log(res)
        // var date = new Date(res.data.order.time); //时间对象  
        // var timestamp = date.getTime(); //转换成时间戳   
        // timestamp = timestamp + 12 * 60 * 60 * 1000;
        // var dateAfter = new Date(timestamp);
        // console.log(dateAfter, timestamp);
        // that.countdown(Math.round(timestamp / 1000))
        if (res.data.order.pt_info != '') {
          var pt_info = JSON.parse(res.data.order.pt_info)
          res.data.order.pt_info = pt_info
        }
        if (res.data.order.dd_info != '') {
          var dd_info = JSON.parse(res.data.order.dd_info)
          res.data.order.dd_info = dd_info
        }
        if (res.data.order.kfw_info != '') {
          var kfw_info = JSON.parse(res.data.order.kfw_info)
          res.data.order.kfw_info = kfw_info
        }
        console.log(res.data, pt_info, dd_info, kfw_info)
        that.setData({
          odinfo: res.data
        })
      },
    })
  },
  lxqs: function (t) {
    var a = t.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: a,
    })
  },
  maketel:function(t){
    var a = t.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: a,
    })
  },
  copyText: function (t) {
    var a = t.currentTarget.dataset.text;
    wx.setClipboardData({
      data: a,
      success: function () {
        wx.showToast({
          title: "已复制"
        })
      }
    })
  },
  location: function () {
    var jwd = this.data.odinfo.store.coordinates.split(','), t = this.data.odinfo.store;
    console.log(jwd)
    wx.openLocation({
      latitude: parseFloat(jwd[0]),
      longitude: parseFloat(jwd[1]),
      address: t.address,
      name: t.name
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