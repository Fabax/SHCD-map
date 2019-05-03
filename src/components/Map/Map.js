import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectLocation,
  updateHistory,
  highlightedLocations,
} from '../../actions';
import * as d3 from 'd3';
import './Map.scss';
import londonMap from '../../assets/LondonMapSvg.svg';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedBlock: '', visitedBlocks: [] };
    this.color = {
      blue: ['#A4BDBA', '#0097C2'],
      orange: ['#DDA187', '#E94720'],
      yellow: ['#DEAC6F', '#FBBE00'],
      green: ['#9DB77A', '#1EB38B'],
      red: ['#C84753', 'red'],
    };
  }

  //Lifecycle ----------------------
  componentDidMount() {
    this.loadSvg();
  }

  componentDidUpdate() {
    this.updateD3();
  }

  render() {
    return <div className="londonMap" />;
  }

  // D3 stuff ----------------------
  loadSvg() {
    d3.xml(londonMap).then(data => {
      d3.select('.londonMap')
        .node()
        .append(data.documentElement);

      // binds event after loading the map
      this.bindD3MouseEvents();
    });
  }

  bindD3MouseEvents() {
    //set up variables for easy shortcuts later
    let _this = this;
    this.map = d3.select('.londonMap svg');
    this.houses = this.map.selectAll("path[id^='L-']");

    //Mouse events
    this.houses.on('click', function() {
      _this.onBlockClicked(this.id);
    });
    this.houses.on('mouseover', function() {
      d3.select(this).style('opacity', '0.7');
    });
    this.houses.on('mouseout', function() {
      d3.select(this).style('opacity', '1');
    });

    this.setZoom();
  }

  setZoom() {
    this.map.style('pointer-events', 'all').call(
      d3
        .zoom()
        .scaleExtent([1, 4])
        .on('zoom', this.zoom),
    );
  }

  zoom() {
    d3.select('#mapcontainer').attr('transform', d3.event.transform);
  }

  updateD3() {
    this.setColorHouses('path', 0); // reset style
    this.hightlight(this.props.hightlights, 1); // search
    this.hightlight(this.props.history, 1); //leads
  }

  // utils
  hightlight(store, index) {
    if (store.length > 0) {
      let query = store
        .map(location => {
          return '#L-' + location.address;
        })
        .join(',');

      this.setColorHouses(query, index);
    }
  }

  setColorHouses(ids = '', i) {
    this.map
      .selectAll("[id^='Red']")
      .selectAll(ids)
      .style('fill', this.color.red[i]);
    this.map
      .selectAll("[id^='Orange']")
      .selectAll(ids)
      .style('fill', this.color.orange[i]);
    this.map
      .selectAll("[id^='Yellow']")
      .selectAll(ids)
      .style('fill', this.color.yellow[i]);
    this.map
      .selectAll("[id^='Green']")
      .selectAll(ids)
      .style('fill', this.color.green[i]);
  }

  onBlockClicked(id) {
    let noPrefixId = id.slice(2);

    let location = this.props.locations.filter(location => {
      return location.address === noPrefixId;
    });

    //Update the store
    this.props.selectLocation(location[0]);
    this.props.updateHistory(location[0]);
    //refresh the map
    this.updateD3();
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations,
    history: state.history,
    selectedLocation: state.selectedLocation,
    hightlights: state.highlightedLocations,
  };
};

export default connect(
  mapStateToProps,
  { selectLocation, updateHistory, highlightedLocations },
)(Map);
