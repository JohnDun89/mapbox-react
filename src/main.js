import React, { Component } from "react";
import MapContainer from "./mapContainer.js";
import ParticleSystem from "./particleSystem.js";
class Main extends Component {
  render() {
    return (
      <div className="Main">
        {/* <MapContainer /> */}
        <ParticleSystem />
      </div>
    );
  }
}

export default Main;
