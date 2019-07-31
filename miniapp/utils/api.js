const baseUrl = "https://www.easy-mock.com/mock/5abf10708966673c04832664"

const urls = {//接口地址
  "activities_list":"/interface_get_activities_list",//所有团队动态
  "teams_list":"/interface_get_teams_list",//团队列表
  "team_details":"/team_details",//团队详情
}

const http = (url, method, params) => {
  wx.request({
    url:baseUrl+url,
    method:method,
    data:params.data?params.data:{},
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      params.success&&params.success(res.data)
    },
    fail(err) {
      params.fail&&params.fail(err)
    }
  })
}

const getTeams = (params)=>{//获取团队列表
  http(urls.teams_list,'post',params)
}
const getActiveList = (params)=>{//获取团队动态
  http(urls.activities_list,'post',params)
}

module.exports = {
  getTeams,
  getActiveList,
}