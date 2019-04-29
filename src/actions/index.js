//Action creator
export const selectLocation = location => {
  //returns an action
  return {
    type: 'LOCATION_SELECTED',
    payload: location,
  };
};

export const updateHistory = location => {
  //returns an action
  return {
    type: 'HYSTORY_CHANGED',
    payload: location,
  };
};

export const highlightedLocations = locations => {
  //returns an action
  return {
    type: 'HIGHLIGHT_LOCATIONS',
    payload: locations,
  };
};
