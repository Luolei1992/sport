Page({
  data: {
    isEmpty:false,

  },
  handleClick(){
    console.log('团队页')
  },
  toggleTeam(){
    this.setData({
      isEmpty:true
    })
  }
})
