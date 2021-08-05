import { StickyNote } from '../../types/types';
import { fetchStickyNotes } from './mural-api.service';
import { configurations } from '../utils/configurations.utils';

const { Translate } = require('@google-cloud/translate').v2;

let translateInstance: any;

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

  if (!configurations.gcp) {
    throw Error('GCP Credentials are not defined (utils/configurations.utils.ts)');
  }

  translateInstance = new Translate({
    credentials: configurations.gcp,
    projectId: configurations.gcp.project_id
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
