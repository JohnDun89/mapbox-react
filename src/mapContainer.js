import DeckGL, { LineLayer } from "deck.gl";
import React, { Component } from "react";
import MapGL from "react-map-gl";

const viewport = {
  width: 500,
  height: 500,
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781]
  }
];

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoiam9obmR1bjg5IiwiYSI6ImNqaG0xa2NzdDBmd3ozZHMxa2NzYW9pOTUifQ.bwlBFOMZKolwnsdBNF4KUA";

class MapContainer extends Component {
  render() {
    return (
      <div className="MapContainer">
        <p>I am a map</p>
        <MapGL {...viewport} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}>
          <DeckGL
            {...viewport}
            layers={[new LineLayer({ id: "line-layer", data })]}
          />
        </MapGL>
      </div>
    );
  }
}

export default MapContainer;
