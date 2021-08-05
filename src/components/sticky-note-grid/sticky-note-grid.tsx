import React, { Component } from "react";
import "./sticky-note-grid.css";
import { StickyNote } from "../../../types/types";
import { StickyNoteCard } from "../sticky-note-card/sticky-note-card";

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
    if (this.props.disabled) {
      return (
        <div>
          <p>Select a mural to see your sticky notes!</p>
        </div>
      );
    }

    return this.props.loading ? (
      <progress />
    ) : (
      <div className="sticky-note-grid">
        {this.props.stickyNotes.length ? (
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
