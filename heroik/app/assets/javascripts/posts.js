// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function () {

//append user information on user column
  var appendUserInformation = function(image, name, username, created_at, quote) {
    var userInfo =
    '<div class="col-xs-12" id="userinfo">' +
      '<img src=' + image + ' class="col-xs-12 photo">' +
      '<div class="col-xs-12">' + name + '</div>' +
      '<div class="col-xs-12">' + username + '</div>' +
      '<div class="col-xs-12">' + created_at + '</div>' +
      '<div class="col-xs-12">' + quote + '</div>' +
    '</div>';

    $('#usercolumn').append(userInfo);
  };

//append all the posts that belong to that user
  var appendOwnPosts = function(image, title, username, created_at) {
    var ownPosts =
    '<div class="col-xs-12 col-md-4 post">' +
      '<img src=' + image + ' class="col-xs-12 photo">' +
      '<div class="col-xs-12 title">' + title + '</div>' +
      '<div class="col-xs-12 username">' + username + '</div>' +
      '<div class="col-xs-12 date">' + created_at + '</div>' +
    '</div>';

    $('#showuserposts').append(ownPosts);
  };

    // get all posts, show user information on user column
  var showUserPage = function () {
    $.ajax({
      url: "/getprofileinfo.json",
      method: "GET",
      success: function (response, status) {
        appendUserInformation(response.image, response.username[0].name, response.username[0].username, response.username[0].created_at, response.username[0].quote);

        response.posts.forEach(function(elem, index) {
          appendOwnPosts(elem.image, elem.title, response.username[0].username, elem.created_at);
        })
      },
      error: function(response, status) {
        console.log(response);
        console.log("did not get post data")
      }
    })
  };

  var init = function() {
    showUserPage();
  }

  init();

});