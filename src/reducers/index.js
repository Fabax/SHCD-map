import { combineReducers } from 'redux';
import directory from '../assets/directory.json';

const locationsReducer = () => {
  return directory;
};

const selectedLocationReducer = (selectedLocation = {}, action) => {
  if (action.type === 'LOCATION_SELECTED') {
    return action.payload;
  }
  return selectedLocation;
};

const historyReducer = (history = [], action) => {
  if (action.type === 'HYSTORY_CHANGED') {
    if (history.indexOf(action.payload) === -1) {
      return [...history, action.payload];
    } else {
      return history;
    }
  }
  return history;
};

export default combineReducers({
  locations: locationsReducer,
  selectedLocation: selectedLocationReducer,
  history: historyReducer,
});
