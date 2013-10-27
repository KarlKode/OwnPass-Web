AppController = require 'controllers/base/appcontroller'
LocationsView = require 'views/locations-view'
LocationView = require 'views/location-view'
Collection = require 'models/base/collection'
Location = require 'models/location'

module.exports = class LocationsController extends AppController

  index: ->
    @locations = new Collection null, model: Location
    @locations.url = "#{window.api}logins"
    @view = new LocationsView collection: @locations, region: 'main'
    @view.render()
    @locations.fetch()