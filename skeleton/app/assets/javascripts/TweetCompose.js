$.TweetCompose = function(el) {
  this.$el = $(el);


  this.$el.on("submit", this.submit)



}
 $.TweetCompose.prototype.submit = function(e) {
   e.preventDefault()
   debugger
   $.ajax("/tweets", {
     type: "POST",
     data: {"tweet[content]": e.target[1].value},
     success: alert("success")
   })
 }



$.fn.tweetCompose = function() {
  return this.each(function(){
    new $.TweetCompose(this);
  });
};

$(function () {
  $(".tweet-compose").tweetCompose();
});
