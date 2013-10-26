View = require 'views/base/view'

module.exports = class LoginView extends View
  autoRender: true
  className: 'home-page'
  template: require './templates/login'

  initialize: (options) ->
    super
    @delegate 'click', '.login', @login

  login: (e)->
    e.preventDefault()
    $(e.target).button "loading"
    userdata = {email:@$el.find('.email').val(),password:@$el.find('.password').val()}
    $.ajax( {
    	url:"https://ownpass.marcg.ch/users",
    	beforeSend: (xhr)->
    		xhr.setRequestHeader("Authorization", "Basic " + btoa(userdata.email + ":" + userdata.password))
    	}).done (response) =>
        window.user = userdata
        Chaplin.helpers.redirectTo 'password#index', {}
      .error (response) =>
        alert "Error"
      .always (response) =>
        $(e.target).button "reset"

