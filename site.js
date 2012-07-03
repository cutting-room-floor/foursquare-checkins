function $(e) {
  return document.getElementById(e);
}


window.onload = function() {
  // load
  wax.tilejson('http://a.tiles.mapbox.com/v3/-tmcw.foursquare-density.jsonp', function(four_density) {
    wax.tilejson('http://a.tiles.mapbox.com/v3/tmcw.mapbox-streets-density.jsonp', function(streets_density) {
      map = new MM.Map('map', [
          (street_layer = new wax.mm.connector(streets_density)),
          (four_layer = new wax.mm.connector(four_density))
      ]);
      map.setZoomRange(3, 9).zoom(5).center({ lat: 40, lon: 20 });
      $('foursquare').onclick = function() {
        this.parentNode.className = this.id;
        street_layer.parent.style.opacity = 0;
        four_layer.parent.style.opacity = 1;
      };
      $('collapse').onclick = function() {
          if ($('block').className === 'collapsed') {
              $('block').className = '';
              this.innerHTML = '&#x2715;';
          } else {
              $('block').className = 'collapsed';
              this.innerHTML = '+';
          }
      };
      $('streets').onclick = function() {
        this.parentNode.className = this.id;
        street_layer.parent.style.opacity = 1;
        four_layer.parent.style.opacity = 0;
      };
      $('plus').onclick = function() {
        this.parentNode.className = this.id;
        street_layer.parent.style.opacity = 1;
        four_layer.parent.style.opacity = 1;
      };
    });
  });
};
