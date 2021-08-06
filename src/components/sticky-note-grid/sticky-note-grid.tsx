import React, { Component } from "react";
import "./sticky-note-grid.css";
import { StickyNote } from "../../../types/types";
import { StickyNoteCard } from "../sticky-note-card/sticky-note-card";

const PLACEHOLDER_STICKY_NOTE: StickyNote = {
  id: "placeholder",
  height: 138,
  shape: "rectangle",
  style: {
    backgroundColor: "#fcfe7d",
    bold: false,
    border: false,
    fontSize: 19,
    italic: false,
    strike: false,
    underline: false,
    textAlign: "center",
  },
  text: "Choose a mural to see your sticky notes",
  width: 138,
};

export interface StickyNoteGridProps {
  disabled: boolean;
  loading: boolean;
  stickyNotes: StickyNote[];
}

/**
 * Component to display a list of sticky notes as a grid.
 */
export class StickyNoteGrid extends Component<StickyNoteGridProps> {
  render() {
    return this.props.loading ? (
      <progress />
    ) : (
      <div className="sticky-note-grid">
        {this.props.disabled ? (
          <StickyNoteCard stickyNote={PLACEHOLDER_STICKY_NOTE} />
        ) : this.props.stickyNotes.length ? (
          this.props.stickyNotes.map((stickyNote) => (
            <StickyNoteCard key={stickyNote.id} stickyNote={stickyNote} />
          ))
        ) : (
          <div>
            <h3>The selected mural has no sticky notes.</h3>
            <p>Add some sticky notes and try again!</p>
          </div>
        )}
      </div>
    );
  }
}
