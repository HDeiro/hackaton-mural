import * as React from 'react';
import './language-selector.css';
import { Language } from '../../../types/types';
import { EventEmitter, EventList } from '../../service/event-emitter.service';
import Select from 'react-select'
import { getSupportedLanguages } from '../../service/translate.service';

let supportedLanguages: Language[] = [{ label: 'English', value: 'en' }];

export default class LanguageSelector extends React.Component {
  constructor (props) {
    super(props);

    getSupportedLanguages()
      .then(languages => supportedLanguages = languages);
  }

  state = {
    selectedLanguage: null
  }

  componentDidMount() {
    setTimeout(() => this.handleLanguageChange(supportedLanguages[0]), 0);
  }

  handleLanguageChange = (selectedLanguage: Language) => {
    if (this.state.selectedLanguage?.value === selectedLanguage.value) {
      return;
    }

    this.setState({selectedLanguage});
    EventEmitter.emit(EventList.LanguageChanged, selectedLanguage);
  };

  render() {
    return (
      <div className="language-selector-wrapper">
        <Select
          defaultValue={supportedLanguages[0]}
          options={supportedLanguages}
          onChange={this.handleLanguageChange}
          components={{
            IndicatorSeparator: () => null
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 4,
            colors: {
              ...theme.colors,
              primary25: '#F5F5F5',
              primary: '#FF0066',
            },
            spacing: {
              ...theme.spacing,
              controlHeight: 54,
            }
          })}
          styles={(base) => ({
            ...base,
            innerHeight: 400,
            height: 140
          })}
        />
      </div>
    );
  }
}
