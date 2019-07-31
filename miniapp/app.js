//app.js
import {getActiveList,getTeams} from './utils/api'

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.getUserInfo({//获取用户权限
           success: (res)=> {
             var userInfo = res.userInfo
             this.globalData.userInfo = userInfo
           }
         })
        }
      }
    })

    getTeams({ // 调用接口，传入参数
      data:{
        page:this.globalData.userInfo
      },
      success:res=>{
        this.globalData.teamList = res.data.teams
      },
      fail:err=>{
        console.log('失败',err)
      }
    })
    // getActiveList({ // 调用接口，传入参数
    //   data:{
    //     page:this.globalData.userInfo
    //   },
    //   success:res=>{
    //     this.globalData.activitiesList = res.data.activities
    //   },
    //   fail:err=>{
    //     console.log('失败',err)
    //   }
    // })
     wx.getUserInfo({//获取用户权限
      success: (res)=> {
        console.log(res,78587)
        var userInfo = res.userInfo
        this.globalData.userInfo = userInfo
        wx.showTabBar({})
      }
    })
  },
  
  globalData: {
    userInfo: null,
    activitiesList:null,//所有团队动态
    teamList:null,//团队列表
  }
})