import React, { Component } from "react";
import Select from "react-select";
import "./mural-selector.css";
import { Mural } from "../../../types/types";
import { fetchMurals } from "../../service/mural-api.service";

// TODO: Display mural thumbnails
// TODO: Loading state
// TODO: Refactor Select theme, styles

export interface MuralSelectorProps {
  muralId: string;
  onMuralSelected: (mural: Mural) => void;
}

interface MuralSelectorState {
  murals: Mural[];
}

/**
 * Component to allow the user to select a mural from a list.
 */
export class MuralSelector extends Component<
  MuralSelectorProps,
  MuralSelectorState
> {
  state = {
    murals: [],
  };

  componentDidMount() {
    this.loadMurals();
  }

  loadMurals = async () => {
    let murals: MuralSelectorState["murals"] = [];

    try {
      murals = await fetchMurals();
    } catch (error) {
      // TODO: Improve error handling
      console.log(`An error occurred while fetching murals: ${error}`);
    } finally {
      this.setState({
        murals,
      });
    }
  };

  handleMuralSelected = (mural: Mural) => {
    this.props.onMuralSelected(mural);
  };

  render() {
    return (
      <div>
        <Select
          placeholder="Choose a Mural to get it's sticky notes translated"
          options={this.state.murals}
          getOptionLabel={(mural) => mural.title || "Untitled mural"}
          getOptionValue={(mural) => mural.id}
          onChange={this.handleMuralSelected}
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
