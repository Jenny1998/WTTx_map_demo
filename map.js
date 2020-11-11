require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/views/ui/UI",
], function (Map, MapView, Graphic, GraphicsLayer, UI) {
  var map = new Map({
    basemap: "streets",
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.71511, 34.09042],
    zoom: 11,
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
      type: "simple-marer",
      color: [75, 156, 211, 0.8],
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
    //   color: [241, 70, 104, 0.8],
      text: "We found your location!",
      xoffset: 0,
      yoffset: -25,
      font: { size: 14 },
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
