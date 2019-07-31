//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: '打卡',
    userInfo: {},
    current_text:'选择打卡团队',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    selectArray:[
      {
        team_logo: 'https://www.baidu.com',
        team_name: '杭州西湖',
        team_target: '我要瘦，我要瘦，我要瘦',
        team_manifesto: '今天今天几天呢今天今天',
        team_id: 3,
        team_member:['https://www.baidu.com','https://www.baidu.com','https://www.baidu.com'],
        team_status: 1 // 1进行中 2未开始 0已结束
      },
      {
          team_logo: 'https://www.baidu.com',
          team_name: '西湖',
          team_target: '我要瘦，我要瘦，我要瘦',
          team_manifesto: '今天今天几天呢今天今天',
          team_id: 3,
          team_member:['https://www.baidu.com','https://www.baidu.com','https://www.baidu.com'],
          team_status: 0 // 1进行中 2未开始 0已结束
      }
    ],
    inputType:'',
    inputDone:'',
    inputTime:'',
    words:''
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value,'文本域')
    this.setData({
      words: e.detail.value
    })
  },
  clockCommit(e){//提交
    console.log(e,26262)
  },
  bindKeyInput: function(e) {
    let type=e.currentTarget.dataset.type
    console.log(type)
    if(type==1){
      this.setData({
        inputType: e.detail.value
      })
    }else if(type==2){
      this.setData({
        inputDone: e.detail.value
      })
    }else if(type == 3){
      this.setData({
        inputTime: e.detail.value
      })
    }
  },
  getCurrentTextAction:function(e){
    let item = e.detail;
    console.log("打印数据",e.detail)
    this.setData({
      current_text: item.currentText
    });
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '打卡详情',
      success: function () {
        // console.log("success");
      },
      complete: function () {
        // console.log("动态修改微信小程序的页面标题-complete");
      }
    });
  },
  handleClick(){
    console.log(app)
    setTimeout(() => {
      console.log(this.data.canIUse)
    }, 1000);
  }
})
