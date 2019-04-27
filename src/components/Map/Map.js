import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLocation, updateHistory } from '../../actions';
import * as d3 from 'd3';
import LondonMapSvg from '../../assets/LondonMapSvg';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedBlock: '', visitedBlocks: [] };
  }

  componentDidMount() {
    this.bindD3();
    this.bindD3Events();
  }

  componentDidUpdate() {
    this.updateD3();
  }

  // D3 stuff;
  bindD3() {
    this.map = d3
      .select('#londonMap')
      .attr('width', '100%')
      .attr('height', '100%');

    this.houses = this.map
      .selectAll('#SW-Yellow, #SW-Orange')
      .selectAll('path');
  }

  bindD3Events() {
    let _this = this;
    this.houses.on('click', function() {
      _this.onBlockClicked(this.id);
    });

    this.houses.on('mouseover', function() {
      d3.select(this).style('opacity', '0.7');
    });
    this.houses.on('mouseout', function() {
      d3.select(this).style('opacity', '1');
    });
  }

  updateD3() {
    // turn array visited places in a string
    this.resetD3Colors();

    if (this.props.history.length !== 0) {
      let ids = this.props.history
        .map(blockId => {
          //fix later by switching id naming on the svg
          let id = blockId.address.slice(-2) + blockId.address.slice(0, -2);
          return '#' + id;
        })
        .join(',');

      //update colors
      d3.select('#londonMap')
        .select('#SW-Yellow')
        .selectAll(ids)
        .style('fill', 'green');
    }
  }

  resetD3Colors() {
    //reset color
    d3.select('#londonMap')
      .select('#SW-Yellow')
      .selectAll('path')
      .style('fill', '#e8c329');
  }

  onBlockClicked(id) {
    let quickFixedId = id.slice(2) + id.slice(0, 2);

    let location = this.props.locations.filter(location => {
      return location.address === quickFixedId;
    });

    this.props.selectLocation(location[0]);
    this.props.updateHistory(location[0]);
    this.updateD3();
  }

  render() {
    return (
      <div>
        <LondonMapSvg />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    locations: state.locations,
    history: state.history,
    selectedLocation: state.selectedLocation,
  };
};

export default connect(
  mapStateToProps,
  { selectLocation, updateHistory },
)(Map);
