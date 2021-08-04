import * as React from 'react';
import './App.css';
import MuralPicker, { PropTypes } from 'mural-integrations-mural-picker'
import {apiClient} from "./setupAPI";
import axios from 'axios';
import LanguageSelector from './language-selector/language-selector';
import {EventEmitter, EventList} from './event-emitter/event-emitter';
import { Language } from './language-selector/language';

// ##########################
// Handlers
// ##########################
const handleMural = async (mural: any) => {
  console.log(`Got Mural!`, mural);

  const r = await axios.get(`http://localhost:5000/get-stickies`);
  console.log(r);
}

const handleError = (_: Error, message: string) => {
  console.log(message);
};

const onLanguageChange = (language: Language) => {
  console.log('Language changed to ', language);
}

// ##########################
// Subscriptions
// ##########################
EventEmitter.subscribe(
  'app.tsx',
  EventList.LanguageChanged,
  onLanguageChange,
);

// ##########################
// Props & Types
// ##########################
const muralPickerProps: PropTypes = {
  apiClient: apiClient,
  onCreateMural: handleMural,
  onMuralSelect: handleMural,
  handleError: handleError,
}

type AppState = {
  loaded: boolean;
}

// ##########################
// Class Definition & export
// ##########################

export default class App extends React.Component<AppState> {
  render() {
    return (
      this.props.loaded
      ? <div>
          <MuralPicker {...muralPickerProps} />
          <LanguageSelector></LanguageSelector>
        </div>
      : <h1>Loading</h1>
    )
  }
}
