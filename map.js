require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
], function (Map, MapView, Graphic, GraphicsLayer) {
  var map = new Map({
    basemap: "streets-navigation-vector",
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.71511, 34.09042],
    zoom: 13,
  });

  var graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  var pointGraphic = new Graphic({
    geometry: {
      type: "point",
      longitude: -118.71511,
      latitude: 34.09042,
    },
    symbol: {
      type: "simple-marker",
      color: [226, 119, 40],
      outline: {
        color: [225, 225, 225],
        width: 1,
      },
    },
    attributes: {
      Name: "Available plans",
      Plans: {
        basic: {
          title: "BASIC",
          subtitle: "Monthly $10 50 GB",
        },
        premium: {
          title: "PREMIUM",
          subtitle: "Monthly $25 100 Mbps",
        },
      },
    },
    popupTemplate: {
      title: "{Name}",
      content: `<ul>
        <li><b>{Plans.basic.title}</b> {Plans.basic.subtitle}</li>
        <li><b>{Plans.premium.title}</b> {Plans.premium.subtitle}</li>
        </ul>`,
    },
  });

  graphicsLayer.add(pointGraphic);

  var textGraphic = new Graphic({
    geometry: {
      type: "point",
      longitude: -118.71511,
      latitude: 34.09042,
    },
    symbol: {
      type: "text",
      color: [249, 87, 56],
      text: "Our service is available at your location!",
      xoffset: 0,
      yoffset: -25,
      font: { size: 12 },
    },
  });
  graphicsLayer.add(textGraphic);

  view.ui.add(planCard, "top-right");

  document.getElementById("basic").addEventListener("click", function () {
    $(".progress").val(100);

    view.ui.empty("top-right");
    view.ui.add(success, "top-right");
  });

  document.getElementById("premium").addEventListener("click", function () {
    $(".progress").val(100);
    view.ui.empty("top-right");
    view.ui.add(success, "top-right");
  });
});
