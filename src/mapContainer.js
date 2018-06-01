import DeckGL, { LineLayer } from "deck.gl";
import React, { Component } from "react";
import MapGL from "react-map-gl";

// const viewport = {
//   width: 500,
//   height: 500,
//   longitude: -122.41669,
//   latitude: 37.7853,
//   zoom: 13,
//   pitch: 0,
//   bearing: 0
// };

// const data = [
//   {
//     sourcePosition: [-122.41669, 37.7853],
//     targetPosition: [-122.41669, 37.781]
//   }
// ];

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoiam9obmR1bjg5IiwiYSI6ImNqaG0xa2NzdDBmd3ozZHMxa2NzYW9pOTUifQ.bwlBFOMZKolwnsdBNF4KUA";

const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v9';


class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        longitude: -74,
        latitude: 40.7,
        zoom: 11,
        maxZoom: 16
      }
    };
    this._resize = this._resize.bind(this)
  }

  componentDidMount(){ 
    window.addEventListener('resize', this._resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize)
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }

  _resize(){ 
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    return (
      <div className="MapContainer">cd ..
                <MapGL
          {...this.state.viewport}
          mapStyle={MAPBOX_STYLE}
          onViewportChange={viewport => this._onViewportChange(viewport)}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}>
        </MapGL>
      </div>

    );
  }

}

export default MapContainer;
