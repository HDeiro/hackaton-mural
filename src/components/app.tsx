import * as React from "react";
import "./app.css";
import { StickyNoteGrid } from "./sticky-note-grid/sticky-note-grid";
import { StickyNote, Language } from "../../types/types";
import LanguageSelector from './language-selector/language-selector';
import { EventEmitter, EventList } from '../service/event-emitter.service';
import { fetchTranslatedStickyNotes } from '../service/translate.service';

require('dotenv').config();

console.log(process.env);

type AppState = {
  loadedApp: boolean;
  loadingStickyNotes: boolean;
  muralId: string | undefined;
  stickyNotes: StickyNote[];
};

export default class App extends React.Component<{ loadedApp: boolean }, AppState> {
  state = {
    loadedApp: true,
    muralId: process.env.REACT_APP_MURAL_ID,
    loadingStickyNotes: false,
    stickyNotes: [],
  };

  componentDidMount() {
    EventEmitter.subscribe(
      'app.tsx',
      EventList.LanguageChanged,
      this.loadStickyNotes,
    );
  }

  loadStickyNotes = async (language: Language) => {
    this.setState({ loadingStickyNotes: true });

    let stickyNotes: AppState["stickyNotes"] = [];

    try {
      stickyNotes = await fetchTranslatedStickyNotes(
        this.state.muralId,
        language.code
      );
    } catch (error) {
      // TODO: Improve error handling
      console.log(`An error occurred while fetching sticky notes: ${error}`);
    } finally {
      this.setState({
        loadingStickyNotes: false,
        stickyNotes,
      });
    }
  };

  render() {
    if (!this.props.loadedApp) {
      return <h1>Loading</h1>;
    }

    return (
      <div>
        <div className="app-header">
          Translation Tool
        </div>

        <div className="app-content">
          <div className="common-title">
            Select a language to translate
          </div>

          <LanguageSelector></LanguageSelector>

          <div className="common-title">
            Sticky Notes present on Mural
          </div>

          <div className="sticky-note-grid-container">
            <StickyNoteGrid
              loading={this.state.loadingStickyNotes}
              stickyNotes={this.state.stickyNotes}
            />
          </div>
        </div>
      </div>
    );
  }
}
