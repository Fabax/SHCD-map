import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DirectorySearch.scss';
import Autosuggest from 'react-autosuggest';
import { highlightedLocations } from '../../actions';

class DirectorySearch extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let hasNumber = /\d/.test(inputValue);
    let suggestionList = null;

    if (hasNumber) {
      suggestionList =
        inputLength === 0
          ? []
          : this.props.locations.filter(loc => {
              return loc.address.toLowerCase().includes(inputValue);
            });
    } else {
      suggestionList =
        inputLength === 0
          ? []
          : this.props.locations.filter(loc => {
              return loc.name.toLowerCase().includes(inputValue);
            });
    }

    if (suggestionList.length > 20) {
      suggestionList = suggestionList.splice(0, 20);
    }

    this.props.highlightedLocations(suggestionList);
    return suggestionList;
  };

  getSuggestionValue = suggestion => {
    return suggestion.name + ' - ' + suggestion.address;
  };

  renderSuggestion = suggestion => (
    <div className="list is-hoverable">
      <a className="list-item">
        {suggestion.name} - {suggestion.address}
      </a>
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.props.highlightedLocations([]);
    this.setState({
      suggestions: [],
    });

    this.props.highlightedLocations([]);
  };

  renderInputComponent = inputProps => (
    <div>
      <input {...inputProps} className="input" />
    </div>
  );
  // -------
  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a name or an adress',
      value,
      onChange: this.onChange,
    };
    return (
      <div className="directorySearch">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderInputComponent={this.renderInputComponent}
          inputProps={inputProps}
          className="input"
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    locations: state.locations,
  };
};

export default connect(
  mapStateToProps,
  { highlightedLocations },
)(DirectorySearch);
