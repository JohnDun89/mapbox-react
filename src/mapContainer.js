import { LayerControls, SCATTERPLOT_CONTROLS } from './layer-controls';
import DeckGL, { ScatterplotLayer } from 'deck.gl';
import React, { Component } from "react";
import MapGL from "react-map-gl";
import DeckGLOverlay from "./deckgl-overlay"
import taxiData from './data/taxi';
import { tooltipStyle } from './style';

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

const MAPBOX_TOKEN =
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
      },
      points: [],
      settings: Object.keys(SCATTERPLOT_CONTROLS).reduce((accu, key) => ({
        ...accu,
        [key]: SCATTERPLOT_CONTROLS[key].value
      }), {}),
      // hoverInfo
      x: 0,
      y: 0,
      hoveredObject: null,
      status: 'LOADING'
    };
    this._resize = this._resize.bind(this);
  }


  componentDidMount(){ 
    console.log(taxiData)
    this._processData()
    window.addEventListener('resize', this._resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize)
  }

  _processData() {
    if (taxiData) {
      this.setState({ status: 'LOADED' });
      const points = taxiData.reduce((accu, curr) => {
        accu.push({
          position: [Number(curr.pickup_longitude), Number(curr.pickup_latitude)],
          pickup: true
        });
        accu.push({
          position: [Number(curr.dropoff_longitude), Number(curr.dropoff_latitude)],
          pickup: false
        });
        return accu;
      }, []);
      this.setState({
        points,
        status: 'READY'
      });
    }
  }

  _onHover({ x, y, object }) {
    this.setState({ x, y, hoveredObject: object });
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

  _updateLayerSettings(settings) {
    this.setState({ settings });
  }

  render() {
    return (
      <div>
        {this.state.hoveredObject &&
          <div style={{
            ...tooltipStyle,
            transform: `translate(${this.state.x}px, ${this.state.y}px)`
          }}>
            <div>{JSON.stringify(this.state.hoveredObject)}</div>
          </div>}
        <LayerControls
          settings={this.state.settings}
          propTypes={SCATTERPLOT_CONTROLS}
          onChange={settings => this._updateLayerSettings(settings)} />
        <MapGL
          {...this.state.viewport}
          mapStyle={MAPBOX_STYLE}
          onViewportChange={viewport => this._onViewportChange(viewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}>
          <DeckGLOverlay
            viewport={this.state.viewport}
            data={this.state.points}
            onHover={hover => this._onHover(hover)}
            {...this.state.settings}
          />
        </MapGL>
      </div>
    );
  }

}

export default MapContainer;

