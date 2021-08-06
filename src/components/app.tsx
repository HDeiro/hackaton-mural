import * as React from "react";
import "./app.css";
import { StickyNoteGrid } from "./sticky-note-grid/sticky-note-grid";
import { Mural, StickyNote, Language } from "../../types/types";
import LanguageSelector from "./language-selector/language-selector";
import { fetchStickyNotes } from "../service/mural-api.service";
import { translateStickyNotes } from "../service/translate.service";
import { MuralSelector } from "./mural-selector/mural-selector";

type AppState = {
  loadedApp: boolean;
  loadingStickyNotes: boolean;
  muralId: string;
  language: Language | null;
  stickyNotes: StickyNote[];
};

export default class App extends React.Component<
  { loadedApp: boolean },
  AppState
> {
  state = {
    loadedApp: true,
    muralId: "",
    language: null,
    loadingStickyNotes: false,
    stickyNotes: [],
  };

  loadStickyNotes = async () => {
    this.setState({ loadingStickyNotes: true });

    let stickyNotes: AppState["stickyNotes"] = [];

    try {
      stickyNotes = await fetchStickyNotes(this.state.muralId);
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

  translateStickyNotes = async (language: Language) => {
    this.setState({ loadingStickyNotes: true });

    let stickyNotes: AppState["stickyNotes"] = [];

    try {
      stickyNotes = await translateStickyNotes(
        this.state.stickyNotes,
        language.value
      );
    } catch (error) {
      // TODO: Improve error handling
      console.log(`An error occurred while translating sticky notes: ${error}`);
    } finally {
      this.setState({
        loadingStickyNotes: false,
        stickyNotes,
      });
    }
  };

  onMuralSelected = (mural: Mural) => {
    // Set active mural, reset language selection, and load the mural's sticky
    // notes
    this.setState(
      {
        muralId: mural.id,
        language: null,
      },
      this.loadStickyNotes
    );
  };

  onLanguageSelected = (language: Language) => {
    // Translate the mural's sticky notes to the selected language
    this.setState({ language });
    this.translateStickyNotes(language);
  };

  render() {
    if (!this.props.loadedApp) {
      return <h1>Loading</h1>;
    }

    return (
      <div className="app-wrapper">
        <div className="logo-wrapper">
          <img src="mural.gif" alt="MURAL animated gif" className="logo" />
        </div>

        <div className="main">
          <div className="main-title">MURAL Translator</div>
          <div className="main-subtitle">
            Translate sticky notes to another language
          </div>
        </div>

        <div className="common-title">Selected Mural</div>

        <div className="app-mural-selector-container">
          <MuralSelector
            muralId={this.state.muralId}
            onMuralSelected={this.onMuralSelected}
          />
        </div>

        <div className="common-title">Selected Language</div>

        <LanguageSelector
          disabled={!this.state.muralId}
          language={this.state.language}
          onLanguageSelected={this.onLanguageSelected}
        />

        <div className="common-title">Sticky note previews</div>
        <div className="sticky-note-grid-container">
          <StickyNoteGrid
            disabled={!this.state.muralId}
            loading={this.state.loadingStickyNotes}
            stickyNotes={this.state.stickyNotes}
          />
        </div>
      </div>
    );
  }
}
