// import React, { Component } from 'react';
// import './History.scss';

// export default class History extends Component {
//   render() {
//     return (
//       <div className="history container">
//         <h1 className="title is-size-1">History</h1>
//         <p className="subtitle">leads:</p>
//       </div>
//     );
//   }
// }

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectLocation, updateHistory } from '../../actions';
import './History.scss';

class History extends Component {
  componentDidMount() {}

  displayList() {
    let counter = 1;
    return this.props.history.map(lead => {
      return (
        <div className="lead container" key={lead.address}>
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                <span>{lead.address}</span>
                <span>{lead.name}</span>
                <span>{counter}</span>
              </p>
            </header>

            <div className="card-content">
              <div className="content">take note here</div>
            </div>
          </div>
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
