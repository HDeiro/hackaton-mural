import React, { Component } from "react";
import fontColorContrast from "font-color-contrast";
import "./sticky-note-card.css";
import { StickyNote } from "../../../types/types";

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

    const classNames = ["sticky-note-card"];

    if (shape === "circle") {
      classNames.push("sticky-note-card-circle");
    }

    if (border) {
      classNames.push("sticky-note-card-border");
    }

    if (bold) {
      classNames.push("sticky-note-card-bold");
    }

    if (italic) {
      classNames.push("sticky-note-card-italic");
    }

    if (strike) {
      classNames.push("sticky-note-card-strike");
    }

    if (underline) {
      classNames.push("sticky-note-card-underline");
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
