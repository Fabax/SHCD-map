import React, { Component } from 'react';
import Map from '../../components/Map/Map';
import './MapPage.scss';
import History from '../../components/History/History';
import Directory from '../../components/Directory/Directory';

export default class MapPage extends Component {
  render() {
    return (
      <div className="mapPage">
        <div className="mapContainer">
          <Map />
        </div>
        <History />
        <Directory />
      </div>
    );
  }
}
