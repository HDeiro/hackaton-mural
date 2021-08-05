import React, { Component } from "react";
import fontColorContrast from "font-color-contrast";
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
      translatedText,
    } = this.props.stickyNote;

    const color = fontColorContrast(backgroundColor);

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
          color,
          fontSize,
          justifyContent: textAlign,
          height,
          width,
        }}
      >
        {translatedText || text}
      </div>
    );
  }
}
