import * as React from 'react';
import './App.css';
import MuralPicker, { PropTypes } from 'mural-integrations-mural-picker'
import {apiClient} from "./setupAPI";
import { fetchStickyNotes } from "./api";

const handleMural = async (mural: any) => {
  console.log(`Got Mural!`, mural);

  const widgets = await fetchStickyNotes(mural.id);
  console.dir(widgets);
}

const handleError = (_: Error, message: string) => {
  console.log(message);
};

const muralPickerProps: PropTypes = {
  apiClient: apiClient,
  onCreateMural: handleMural,
  onMuralSelect: handleMural,
  handleError: handleError,
}

type AppState = {
  loaded: boolean;
}

class App extends React.Component<{loaded: boolean}, AppState> {
  render() {
    return (
      this.props.loaded
      ? <MuralPicker {...muralPickerProps} />
      : <h1>Loading</h1>
    )
  }
}

export default App;
