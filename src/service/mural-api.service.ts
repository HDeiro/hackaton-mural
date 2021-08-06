import { clientConfig } from "../setupAPI";
import { Mural, StickyNote } from "../../types/types";

const API_BASE_URL = "https://app.mural.co/api/public/v1";

interface FetchPageResponse<T> {
  value: T[];
  next: string;
}

type FetchStickyNotesPageResponse = FetchPageResponse<StickyNote>;
type FetchMuralsPageResponse = FetchPageResponse<Mural>;

/**
 * Fetch a single page of sticky notes in a mural.
 */
const fetchStickyNotesPage = async (
  muralId: string,
  next?: string
): Promise<FetchStickyNotesPageResponse> => {
  const params = new URLSearchParams({
    filterBy: "sticky notes",
    ...(next && { next }),
  });
  const getWidgetsUrl = `${API_BASE_URL}/murals/${muralId}/widgets/?${params}`;
  const response = await clientConfig.fetchFn(getWidgetsUrl);
  if (!response.ok) {
    throw new Error("Error fetching sticky notes");
  }

  return await response.json();
};

/**
 * Fetch a single page of murals.
 */
const fetchMuralsPage = async (
  next?: string
): Promise<FetchMuralsPageResponse> => {
  const params = new URLSearchParams({
    filterBy: "active",
    sortBy: "lastModified",
    ...(next && { next }),
  });
  const getMuralsUrl = `${API_BASE_URL}/murals/?${params}`;
  const response = await clientConfig.fetchFn(getMuralsUrl);
  if (!response.ok) {
    throw new Error("Error fetching murals");
  }

  return await response.json();
};

/**
 * Fetch all the sticky notes in a mural.
 */
export const fetchStickyNotes = async (
  muralId: string
): Promise<StickyNote[]> => {
  let widgets: StickyNote[] = [];
  let next: string | undefined = undefined;

  do {
    // Fetch a page of sticky notes
    const result: FetchStickyNotesPageResponse = await fetchStickyNotesPage(
      muralId,
      next
    );

    // Add sticky notes to list
    widgets = widgets.concat(result.value);

    // Get the token to request the next page
    next = result.next;
  } while (next !== undefined);

  return widgets;
};

/**
 * Fetch murals.
 */
export const fetchMurals = async (): Promise<Mural[]> => {
  let murals: Mural[] = [];
  let next: string | undefined = undefined;

  do {
    // Fetch a page of murals
    const result: FetchMuralsPageResponse = await fetchMuralsPage(next);

    // Add murals to list
    murals = murals.concat(result.value);

    // Get the token to request the next page
    next = result.next;
  } while (next !== undefined);

  return murals;
};
