import { Language, StickyNote } from '../../types/types';

const { Translate } = require('@google-cloud/translate').v2;

let translateInstance: any;

export const getSupportedLanguages = async (): Promise<Language[]> => {
  const languages = await getInstance().getLanguages();

  return languages[0].map((option: any) => ({
    label: option.name,
    value: option.code
  }));
}

export const translateStickyNotes = async (
  stickyNotes: StickyNote[],
  language: string,
): Promise<StickyNote[]> => {

  await Promise.all(
    stickyNotes.map(async (note) => note.translatedText = await translate(note.text, language))
  );

  return stickyNotes;
}

export const getInstance = () => {
  if (translateInstance) {
    return translateInstance;
  }

  const credentials = JSON.parse(process.env.REACT_APP_GCP_CREDENTIALS || '');

  if (!credentials) {
    throw Error('GCP Credentials are not defined (utils/configurations.utils.ts)');
  }

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
