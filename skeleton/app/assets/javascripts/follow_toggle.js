$.FollowToggle = function (el) {
  this.$el = $(el);
  this.following = this.$el.data("following");
  this.userId = this.$el.data("user-id");
  this.render()
  this.$el.on("click", this.handleClick.bind(this))
};

$.FollowToggle.prototype.render = function () {
  this.$el.prop("disabled", false);
  if (this.following === "followed") {
    this.$el.empty();
    this.$el.append("unfollow")
  } else {
    this.$el.empty();
    this.$el.append("follow")
  }


};


$.FollowToggle.prototype.handleClick = function (e) {
  this.$el.prop("disabled", true);
  e.preventDefault();

  var userURL = "/users/" + this.userId + "/follow"
  if (this.following === "followed") {
    $.ajax({
      type: "DELETE",
      url: userURL,
      dataType: "JSON",
      success: function () {
        this.following = "unfollowed";
        this.render.apply(this)
      }.bind(this),
      error: function () {alert("fail");}
    });
  } else {
    $.ajax({
      type: "POST",
      url: userURL,
      dataType: "JSON",
      success: function () {
        this.following = "followed";
        this.render.apply(this)
      }.bind(this),
      error: function () {alert("fail");}
    });
  }

  ;
}

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});

// $(function () {
//   $(".users").followToggle();
// });
