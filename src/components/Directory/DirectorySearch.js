import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DirectorySearch.scss';
import Autosuggest from 'react-autosuggest';

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

    if (suggestionList.length > 10) {
      suggestionList = suggestionList.splice(0, 10);
    }
    return suggestionList;
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  getSuggestionValue = suggestion => {
    return suggestion.name + ' - ' + suggestion.address;
  };
  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div class="list is-hoverable">
      <a class="list-item">
        {suggestion.name} - {suggestion.address}
      </a>
    </div>
    // <div>
    //   {suggestion.name} - {suggestion.address}
    // </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
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

export default connect(mapStateToProps)(DirectorySearch);
