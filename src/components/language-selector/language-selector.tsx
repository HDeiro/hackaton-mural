import * as React from "react";
import "./language-selector.css";
import { Language } from "../../../types/types";
import Select from "react-select";
import { getSupportedLanguages } from "../../service/translate.service";

export const DEFAULT_LANGUAGE: Language = { label: "English", value: "en" };

export interface LanguageSelectorProps {
  disabled: boolean;
  onLanguageSelected: (language: Language) => void;
}

interface LanguageSelectorState {
  supportedLanguages: Language[];
}

export default class LanguageSelector extends React.Component<
  LanguageSelectorProps,
  LanguageSelectorState
> {
  state = {
    supportedLanguages: [{ label: "English", value: "en" }],
  };

  componentDidMount() {
    getSupportedLanguages().then((languages) => {
      this.setState({
        supportedLanguages: languages,
      });
    });
  }

  render() {
    const { supportedLanguages } = this.state;

    return (
      <div className="language-selector-wrapper">
        <Select
          placeholder="Choose the language you would like to translate"
          options={supportedLanguages}
          onChange={this.props.onLanguageSelected}
          components={{
            IndicatorSeparator: () => null,
          }}
          isDisabled={this.props.disabled}
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
