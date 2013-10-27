Application = require 'application'
routes = require 'routes'
window.api = "https://ownpass.marcg.ch/"
# Initialize the application on DOM ready event.
$ ->
  $.ajaxSetup 
    beforeSend: (xhr) ->
      if window.user?
        xhr.setRequestHeader("Authorization", "Basic " + btoa(window.user.email + ":" + window.user.password))
    statusCode:
        400: (xhr)->
            json = $.parseJSON(xhr.responseText);
            if json.id? and json.device?
              Chaplin.helpers.redirectTo 'login#authorize', {devid:json.id,devhash:json.device}
              return
            alertify.error(json.message)
            Chaplin.helpers.redirectTo 'login#index', {}
        403: (xhr)->
            alertify.error("Invalid resource")
            Chaplin.helpers.redirectTo 'login#index', {}
        404: (xhr)->
            json = $.parseJSON(xhr.responseText);
            alertify.error(json.message)
        406: (xhr)->
            alertify.error("Please fill out the form")
        409: (xhr)->
            alertify.error("User name taken")
        500: (xhr)->
            alertify.error("OOPPSSS! Some thing unexpected happened!")
            Chaplin.helpers.redirectTo 'login#index', {}
    
  new Application {
    title: 'OwnPass',
    pushState: false,
    controllerSuffix: '-controller',
    routes
  }
