import * as React from "react";
import "./language-selector.css";
import { Language } from "../../../types/types";
import { EventEmitter, EventList } from "../../service/event-emitter.service";
import Select from "react-select";
import { getSupportedLanguages } from "../../service/translate.service";

export const DEFAULT_LANGUAGE: Language = { label: "English", value: "en" };

export interface LanguageSelectorProps {}

interface LanguageSelectorState {
  supportedLanguages: Language[];
  selectedLanguage: Language | null;
}

export default class LanguageSelector extends React.Component<
  LanguageSelectorProps,
  LanguageSelectorState
> {
  state = {
    supportedLanguages: [{ label: "English", value: "en" }],
    selectedLanguage: null,
  };

  componentDidMount() {
    getSupportedLanguages().then((languages) => {
      this.setState({
        supportedLanguages: languages,
      });
    });
  }

  handleLanguageChange = (selectedLanguage: Language) => {
    if (this.state.selectedLanguage?.value === selectedLanguage.value) {
      return;
    }

    this.setState({ selectedLanguage });
    EventEmitter.emit(EventList.LanguageChanged, selectedLanguage);
  };

  render() {
    const { supportedLanguages } = this.state;

    return (
      <div className="language-selector-wrapper">
        <Select
          defaultValue={supportedLanguages[0]}
          options={supportedLanguages}
          onChange={this.handleLanguageChange}
          components={{
            IndicatorSeparator: () => null,
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 4,
            colors: {
              ...theme.colors,
              primary25: "#F5F5F5",
              primary: "#FF0066",
            },
            spacing: {
              ...theme.spacing,
              controlHeight: 54,
            },
          })}
          styles={(base) => ({
            ...base,
            innerHeight: 400,
            height: 140,
          })}
        />
      </div>
    );
  }
}
