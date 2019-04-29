import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLocation, updateHistory } from '../../actions';
import * as d3 from 'd3';
import LondonMapSvg from '../../assets/LondonMapSvg';
import './Map.scss';

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
    this.map = d3.select('#londonMap').attr('height', '100%');
    this.houses = this.map.selectAll("path[id^='L-']");
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

    let svg = d3.select('#wrapper').call(
      d3
        .zoom()
        .scaleExtent([1, 8])
        .on('zoom', function() {
          svg.attr('transform', d3.event.transform);
        }),
    );
  }

  updateD3() {
    // turn array visited places in a string
    this.resetD3Colors();
    this.colorLeads();
    this.colorSearchHightlights();
  }

  colorSearchHightlights() {
    if (this.props.hightlights.length !== 0) {
      let ids = this.props.hightlights.map(location => {
        // console.log(location);
        //fix later by switching id naming on the svg
        return '#L-' + location.address;
      });

      ids.join(',');
      //update colors
      this.map.selectAll(ids).style('fill', 'blue');
    }
  }

  colorLeads() {
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
    this.houses.style('fill', '#e8c329');
  }

  onBlockClicked(id) {
    let noPrefixId = id.slice(2);

    let location = this.props.locations.filter(location => {
      return location.address === noPrefixId;
    });

    this.props.selectLocation(location[0]);
    this.props.updateHistory(location[0]);
    this.updateD3();
  }

  render() {
    return <LondonMapSvg />;
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
  { selectLocation, updateHistory },
)(Map);
