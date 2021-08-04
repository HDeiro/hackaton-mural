import * as React from "react";
import "./App.css";
import MuralPicker from "mural-integrations-mural-picker";
import { apiClient } from "./setupAPI";
import { fetchStickyNotes } from "./api";
import { StickyNoteGrid } from "./StickyNoteGrid";
import { Mural, StickyNote } from "./types";

const handleError = (_: Error, message: string) => {
  console.log(message);
};

type AppState = {
  loaded: boolean;
  muralId: string | undefined;
  loadingStickyNotes: boolean;
  stickyNotes: StickyNote[];
};

class App extends React.Component<{ loaded: boolean }, AppState> {
  state = {
    loaded: false,
    muralId: undefined,
    loadingStickyNotes: false,
    stickyNotes: [],
  };

  handleMural = (mural: Mural) => {
    this.setState(
      {
        muralId: mural.id,
      },
      this.loadStickyNotes
    );
  };

  reset = () => {
    this.setState({
      muralId: undefined,
      loadingStickyNotes: false,
      stickyNotes: [],
    });
  };

  loadStickyNotes = async () => {
    this.setState({
      loadingStickyNotes: true,
    });

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

  render() {
    if (!this.props.loaded) {
      return <h1>Loading</h1>;
    }

    if (this.state.muralId === undefined) {
      return (
        <MuralPicker
          apiClient={apiClient}
          onCreateMural={this.handleMural}
          onMuralSelect={this.handleMural}
          handleError={handleError}
        />
      );
    }

    return (
      <div>
        <div>
          <button onClick={this.reset}>Back to mural list</button>
        </div>

        <div>
          <button onClick={this.loadStickyNotes}>Refresh</button>
        </div>

        <div className="stickyNoteGridContainer">
          <StickyNoteGrid
            loading={this.state.loadingStickyNotes}
            stickyNotes={this.state.stickyNotes}
          />
        </div>
      </div>
    );
  }
}
