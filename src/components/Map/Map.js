import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectLocation,
  updateHistory,
  highlightedLocations,
} from '../../actions';
import * as d3 from 'd3';
import LondonMapSvg from '../../assets/LondonMapSvg';
import './Map.scss';
import { runInThisContext } from 'vm';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedBlock: '', visitedBlocks: [] };
    this.color = {
      blue: ['#96D2D3', '#0097C2'],
      orange: ['#F9C265', '#E94720'],
      yellow: ['#E8C329', '#FBBE00'],
      green: ['#99A06A', '#1EB38B'],
    };
  }

  //Lifecycle ----------------------
  componentDidMount() {
    this.bindD3();
    this.bindD3Events();
  }

  componentDidUpdate() {
    this.updateD3();
  }

  render() {
    return <LondonMapSvg />;
  }

  // D3 stuff ----------------------
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
    this.setColorHouses('path', 0);
    this.colorSearchHightlights();
    this.colorLeads();
  }

  colorSearchHightlights() {
    if (this.props.hightlights.length !== 0) {
      let ids = this.props.hightlights.map(location => {
        return '#L-' + location.address;
      });

      ids.join(',');

      //update colors
      this.map.selectAll(ids).style('fill', 'red');
    }
  }

  colorLeads() {
    if (this.props.history.length !== 0) {
      let ids = this.props.history
        .map(location => {
          return '#L-' + location.address;
        })
        .join(',');

      //update colors
      this.setColorHouses(ids, 1);
    }

    if (this.props.hightlights.length !== 0) {
      let ids = this.props.hightlights.map(highlight => {
        if (highlight.disctrict === 'SW') {
          let id = highlight.address.slice(-2) + highlight.address.slice(0, -2);
          return '#' + id;
        }
      });

      var test = ids
        .filter(function(el) {
          return el != null;
        })
        .join(',');

      if (test) {
        d3.select('#londonMap')
          .select('#SW-Yellow')
          .selectAll(test)
          .style('fill', 'blue');
      }
    }
  }

  setColorHouses(ids = 'path', i) {
    this.map
      .selectAll('#SW-Blue, #NW-Blue')
      .selectAll(ids)
      .style('fill', this.color.blue[i]);
    this.map
      .selectAll('#SW-Orange, #NW-Orange')
      .selectAll(ids)
      .style('fill', this.color.orange[i]);
    this.map
      .selectAll('#SW-Yellow ,#NW-Yellow')
      .selectAll(ids)
      .style('fill', this.color.yellow[i]);
    this.map
      .selectAll('#SW-Green, #NW-Green')
      .selectAll(ids)
      .style('fill', this.color.green[i]);
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
