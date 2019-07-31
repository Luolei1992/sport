const app = getApp()
import {getActiveList,getTeams} from '../../utils/api'

Page({
  data: {
    select: false,
    teamId:app,
    teamList:app,
    teamActiveList:[],
    selectName:'团队动态',
    motto: '动态',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tmpTitle: '',
    current: 'team' //own
  },
  handleImgClick(){
    wx.previewImage({
      current: 'http://pic1.win4000.com/wallpaper/2018-01-19/5a61d0ccb439e.jpg', // 当前显示图片的http链接
      urls: [
        "http://pic1.win4000.com/wallpaper/e/59bb468446b1c.jpg",
        "http://pic1.win4000.com/wallpaper/2018-01-23/5a669e431688c.jpg", 
        "http://pic1.win4000.com/wallpaper/0/58a10fe4c159b.jpg"
      ] // 需要预览的图片http链接列表
    })
  },
  hideSlide(e){
    this.setData({
      select: false
    });
  },
  mySelect(e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      teamId: id,
      selectName:name,
      select: false
    })
  },
  handleClick(e) { //切换tab
    let cur = e.currentTarget.dataset.val
    if (cur == 'team') {
      this.setData({
        current: cur
      });
    } else {
      this.setData({
        current: cur
      });
    }
  },
  handleSlide(e) { //切换tab
    if(this.current == 'own'){return}
    this.setData({
      select: !this.data.select,
      current: 'team'
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  setTitle: function () {
    wx.setNavigationBarTitle({
      title: app.globalData.userInfo.nickName,
      success: function () {
        // console.log("success");
      },
      complete: function () {
        // console.log("动态修改微信小程序的页面标题-complete");
      }
    });
  },
  getStr(e){
    let lis = e.currentTarget.dataset.list
    return lis.join('、')
  },
  onLoad: function () {
    getActiveList({ // 调用接口，传入参数
      // data:{
      //   page:this.globalData.userInfo
      // },
      success:res=>{
        this.setData({
          teamActiveList:res.data.activities
        })
        console.log('success')
      },
      fail:err=>{
        console.log('失败',err)
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      }, () => {
        this.setTitle()
      })
    } else if (this.data.canIUse) {
      wx.hideTabBar({})
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        }, () => {
          this.setTitle()
        })
      }
    } else {
      wx.hideTabBar({})
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
  getUserInfo: function (e) {
    wx.showTabBar({})
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})