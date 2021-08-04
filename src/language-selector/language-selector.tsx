import * as React from 'react';
import './language-selector.css';
import { Language } from './language';
import {EventEmitter, EventList} from '../event-emitter/event-emitter';

const supportedLanguages: Language[] = [
  {
    label: 'English',
    code: 'us',
    flag: '/flags/us.svg'
  },
  {
    label: 'Português',
    code: 'pt',
    flag: '/flags/br.svg'
  },
  {
    label: 'Español',
    code: 'es',
    flag: '/flags/ar.svg'
  },
  {
    label: 'Français',
    code: 'fr',
    flag: '/flags/fr.svg'
  },
  {
    label: 'বাংলা',
    code: 'bn',
    flag: '/flags/bd.svg'
  },
  {
    label: 'Українська',
    code: 'ua',
    flag: '/flags/ua.svg'
  }
]

export default class LanguageSelector extends React.Component {
  state = {
    selectedLanguage: supportedLanguages[0]
  }

  handleLanguageChange = (selectedLanguage: Language) => {
    if (this.state.selectedLanguage.code === selectedLanguage.code) {
      return;
    }

    this.setState({selectedLanguage});
    EventEmitter.emit(EventList.LanguageChanged, selectedLanguage);
  };

  render() {
    return (
      <div className="language-selector-wrapper">
        {supportedLanguages.map((language) =>
          <button key={language.code}
            onClick={(evt) => {evt.preventDefault(); this.handleLanguageChange(language)}}
            className={"language-selector-item " + (language.code === this.state.selectedLanguage.code ? "language-selector-item-active" : "")}
            title={language.label}>
            <img
              className="language-selector-flag noselect"
              src={language.flag}
              alt={language.label}/>
          </button>
        )}
      </div>
    );
  }
}
