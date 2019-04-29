import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLocation, updateHistory } from '../../actions';
import './History.scss';

class History extends Component {
  componentDidMount() {}

  displayList() {
    return this.props.history.map((currentValue, index, arr) => {
      return (
        <div className="lead " key={currentValue.address}>
          <span>
            <b>{currentValue.address}</b>
          </span>
          <span>{currentValue.name}</span>
          <span>
            <b>{index + 1}</b>
          </span>
        </div>
      );
    });
  }

  render() {
    return <div className="history">{this.displayList()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    history: state.history,
  };
};

export default connect(
  mapStateToProps,
  { selectLocation, updateHistory },
)(History);
