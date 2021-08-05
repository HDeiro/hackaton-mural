import * as React from "react";
import "./App.css";
import { StickyNoteGrid } from "./StickyNoteGrid";
import { StickyNote } from "./types";
import LanguageSelector from './language-selector/language-selector';
import { EventEmitter, EventList } from './event-emitter/event-emitter';
import { Language } from './language-selector/language';
import { fetchTranslatedStickyNotes } from './service/translate.service';

type AppState = {
  loadingApp: boolean;
  loadingStickyNotes: boolean;
  muralId: string | undefined;
  stickyNotes: StickyNote[];
};

export default class App extends React.Component<{ loadingApp: boolean }, AppState> {
  state = {
    loadingApp: false,
    muralId: 'htti6785.1628084527320',
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
    this.setState({
      loadingStickyNotes: true,
    });

    let stickyNotes: AppState["stickyNotes"] = [];

    try {
      // stickyNotes = await fetchStickyNotes(this.state.muralId);
      stickyNotes = await fetchTranslatedStickyNotes(this.state.muralId, language.code);
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
    if (!this.props.loadingApp) {
      return <h1>Loading</h1>;
    }

    return (
      <div>
        <div className="app-header">
          App title
        </div>
        <div className="app-content">
          <div className="common-title">
            Select a language to translate
          </div>

          <LanguageSelector></LanguageSelector>

          <div className="common-title">
            Sticky Nodes present on Mural
          </div>

          <div className="stickyNoteGridContainer">
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
