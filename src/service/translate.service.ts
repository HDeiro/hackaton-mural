import { StickyNote } from '../types';
import { fetchStickyNotes } from './mural-api.service';
const { Translate } = require('@google-cloud/translate').v2;

let translateInstance: any;
const credentials = {};

export const fetchTranslatedStickyNotes = async (
  muralId: string,
  language: string
): Promise<StickyNote[]> => {
  const stickyNotes = await fetchStickyNotes(muralId);

  if (language === 'en') {
    return stickyNotes;
  }

  await Promise.all(
    stickyNotes.map(async (note) => note.translatedText = await translate(note.text, language))
  );

  return stickyNotes;
}

export const getInstance = () => {
  if (translateInstance) {
    return translateInstance;
  }

  console.log('CREDDENTIALS', credentials);

  translateInstance = new Translate({
    credentials,
    projectId: credentials.project_id
  });

  return translateInstance;
}

export const translate = async (
  text: string,
  target: string
): Promise<string> => {
  const [translated] = await getInstance().translate(text, target);
  return translated;
}
