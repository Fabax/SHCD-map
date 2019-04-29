import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Directory.scss';
import Autosuggest from 'react-autosuggest';

class Directory extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
    };
  }
  //auto complete stuf
  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    //contains number
    let hasNumber = /\d/.test(inputValue);

    if (hasNumber) {
      return inputLength === 0
        ? []
        : this.props.locations.filter(loc => {
            return loc.address.toLowerCase().includes(inputValue);
          });
    } else {
      return inputLength === 0
        ? []
        : this.props.locations.filter(loc => {
            return loc.name.toLowerCase().includes(inputValue);
          });
    }
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    return suggestion.name + ' - ' + suggestion.address;
  };
  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.name} - {suggestion.address}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
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
  // -------
  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange,
    };
    return (
      <div className="directory">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
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

export default connect(mapStateToProps)(Directory);
