import * as React from "react";
import "./app.css";
import { StickyNoteGrid } from "./sticky-note-grid/sticky-note-grid";
import { StickyNote, Language } from "../../types/types";
import LanguageSelector from './language-selector/language-selector';
import { EventEmitter, EventList } from '../service/event-emitter.service';
import { fetchTranslatedStickyNotes } from '../service/translate.service';

type AppState = {
  loadedApp: boolean;
  loadingStickyNotes: boolean;
  muralId: string | undefined;
  stickyNotes: StickyNote[];
};

if (!process.env.REACT_APP_MURAL_ID) {
  throw new Error('Please define the REACT_APP_MURAL_ID');
}

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
        language.value
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
      <div className="app-wrapper">
        <div className="main">
          <div className="main-title">
            MURAL Translator
          </div>
          <div className="main-subtitle">
            Translate sticky notes to another language
          </div>
        </div>

        <div className="common-title">
          Selected Language
        </div>

        <LanguageSelector></LanguageSelector>

        <div className="common-title">
          Sticky note previews
        </div>

        <div className="sticky-note-grid-container">
          <StickyNoteGrid
            loading={this.state.loadingStickyNotes}
            stickyNotes={this.state.stickyNotes}
          />
        </div>
      </div>
    );
  }
}
