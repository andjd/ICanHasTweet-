$.UserSearch = function (el) {
  this.$el = $(el);
  this.$input = $(this.$el.find(".search-input"));
  this.$users = $(this.$el.find(".users"));
  this.$el.on("input", this.handleInput.bind(this));

}

$.UserSearch.prototype.handleInput = function (e) {
  e.preventDefault();
  $.ajax({
    type: "GET",
    url: "/users/search",
    dataType: "JSON",
    data: {query: this.$input.val()},
    success: this.renderResults.bind(this),
    error: function () {alert("fail");}
  });
}

$.UserSearch.prototype.renderResults = function (e) {
  var that = this;

  var injectLI = function(name) {
    var html = ('<li><a href="/users/' + name.id + '/">'+ name.username + '</a>');
      html += (' <button class="follow-toggle" data-user-id="' + name.id + '" data-following=');
      html += ((name.followed ? "'followed'" : "'unfollowed'") + '> </button></li>');
      that.$users.append(html);
      that.$el.find("li:last-child > button").followToggle();
  };

  this.$users.empty();
  e.forEach( function (el){
    injectLI(el);
  });
};



$.fn.userSearch = function () {
  return this.each(function () {
    new $.UserSearch(this);
  });
};

$(function () {
  $("div.users-search").userSearch();
});
