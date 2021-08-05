/**
 * Public API mural.
 */
export interface Mural {
  id: string;
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
  translatedText: string;
  width: number;
}

export interface Language {
  label: string;
  code: string;
  flag: string;
}

export interface Configurations {
  gcp: any;
  muralId: string;
}
