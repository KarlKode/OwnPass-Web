CollectionView = require 'views/base/collection-view'
Location = require 'views/location-view'
LocationModel = require 'models/location'

module.exports = class LocationsView extends CollectionView
  container: 'body'
  listSelector:'.collection'
  autoRender: false
  itemView: Location
  template: require './templates/locations'
  initialize:()->
    super
    google.maps.visualRefresh = true;

  render:()->
    super
    mapOptions =
      zoom: 15
      center: new google.maps.LatLng(-34.397, 150.644)
      mapTypeId: google.maps.MapTypeId.ROADMAP

    @map = new google.maps.Map(@$el.find('.map-canvas')[0], mapOptions)

  renderItem: (model)->
    myLatlng = new google.maps.LatLng(model.get('latitude'), model.get('longitude'))
    marker = new google.maps.Marker({
        position: myLatlng,
        map: @map,
        animation: google.maps.Animation.DROP,
        title: model.get('ip')
    })
    self = @
    _.defer ()->
        self = self.map.panTo(myLatlng)
        google.maps.event.trigger(self.map, "resize")
    $(window).resize()
    super
  dispose:()->
    super
    if @map?
        @map = null