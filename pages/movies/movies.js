// pages/movies/movies.js
var app = getApp();
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{}
  },
  onLoad:function(options){
        // 页面初始化 options为页面跳转所带来的参数
    var inTheatersUrl = app.globalData.doubanBase+ "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase+ "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase+ "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters");
    this.getMovieListData(comingSoonUrl,"comingSoon");
    this.getMovieListData(top250Url,"top250");
  },

  getMovieListData:function(url,settedKey){
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "json"
      },
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.processDoubanData(res.data,settedKey)
      },
      fail: function(error) {
        // fail
        console.log(error)
      }
    })
  },
 processDoubanData:function(moviesDouban,settedKey){
  var movies = [];
  for(var idx in moviesDouban.subjects){
    var subject = moviesDouban.subjects[idx];
    var title = subject.title;
    if(title.length >= 6){
      title = title.substring(0,6) + "...";
    }
    var temp= {
      title: title,
      average: subject.rating.average,
      coverageUrl: subject.images.large,
      movieId:subject.id
    }
    movies.push(temp)
  }
  var readyData = {};
  readyData[settedKey] = {movies:movies};
  this.setData(readyData);
 }
})