/**
 * Public API mural.
 */
export interface Mural {
  id: string;
  roomId: string;
  thumbnailUrl: string;
  title: string;
  workspaceId: string;
}

/**
 * Public API sticky note.
 */
export interface StickyNote {
  id: string;
  height: number;
  shape: "rectangle" | "circle";
  style: {
    backgroundColor: string;
    bold: boolean;
    border: boolean;
    fontSize: number;
    italic: boolean;
    strike: boolean;
    underline: boolean;
    textAlign: "left" | "center" | "right";
  };
  text: string;
  translatedText?: string;
  width: number;
}

export interface Language {
  label: string;
  value: string;
}
