import React, { Component } from "react";
import "./StickyNoteCard.css";
import { StickyNote } from "./types";

export interface StickyNoteProps {
  stickyNote: StickyNote;
}

/**
 * Component to display a sticky note.
 */
export class StickyNoteCard extends Component<StickyNoteProps> {
  render() {
    const {
      height,
      width,
      shape,
      style: {
        backgroundColor,
        bold,
        border,
        italic,
        fontSize,
        strike,
        textAlign,
        underline,
      },
      text,
    } = this.props.stickyNote;

    const classNames = ["StickyNoteCard"];

    if (shape === "circle") {
      classNames.push("StickyNoteCard-circle");
    }

    if (border) {
      classNames.push("StickyNoteCard-border");
    }

    if (bold) {
      classNames.push("StickyNoteCard-bold");
    }

    if (italic) {
      classNames.push("StickyNoteCard-italic");
    }

    if (strike) {
      classNames.push("StickyNoteCard-strike");
    }

    if (underline) {
      classNames.push("StickyNoteCard-underline");
    }

    return (
      <div
        className={classNames.join(" ")}
        style={{
          backgroundColor,
          fontSize,
          justifyContent: textAlign,
          height,
          width,
        }}
      >
        {text}
      </div>
    );
  }
}
