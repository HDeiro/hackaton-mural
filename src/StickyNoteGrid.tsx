import React, { Component } from "react";
import "./StickyNoteGrid.css";
import { StickyNote } from "./types";
import { StickyNoteCard } from "./StickyNoteCard";

export interface StickyNoteGridProps {
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
      <div className="StickyNoteGrid">
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
