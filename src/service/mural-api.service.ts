import { clientConfig } from "../setupAPI";
import { StickyNote } from "../../types/types";

const API_BASE_URL = "https://app.mural.co/api/public/v1";

interface FetchStickyNotesPageResponse {
  value: StickyNote[];
  next: string;
}

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

    /* eslint-disable no-loop-func */
    new Array(30).fill(10).forEach((_i, index) => {
      const copy = JSON.parse(JSON.stringify(widgets[0]));
      copy.id = `a${index}`;
      widgets.push(copy);
    })
    // Get the token to request the next page
    next = result.next;
  } while (next !== undefined);

  return widgets;
};
