var postsData = require('../../data/posts-data.js')

Page({
  data: {
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
    this.setData({
      posts_key:postsData.postList
    })
  },

  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is" + postId);
    wx.navigateTo({
      url:"post-detail/post-detail?id=" + postId
    })
  },

  onSwiperItemTap:function(event){
    var postId = event.target.dataset.postid;
    // console.log("on post id is" + postId);
    wx.navigateTo({
      url:"post-detail/post-detail?id=" + postId
    })
  }
})