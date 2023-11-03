import React, { useState } from "react";
import ReactDOM from "react-dom";
import Select, { components, OptionProps } from "react-select";

const optionList = [
  { value: "Flavours", label: "Flavours", type: "group", name: "flavours" },
  { value: "Colors", label: "Colors", type: "group", name: "colors" },
  {
    label: "Flavours",
    options: [
      { value: "Vanilla", label: "Vanilla", group: "flavours" },
      { value: "Strawberry", label: "Strawberry", group: "flavours" },
    ],
  },
  {
    label: "Colors",
    options: [
      { value: "White", label: "White", group: "colors" },
      { value: "Orange", label: "Orange", group: "colors" },
    ],
  },
];
const playerPositions = [
  {
    value: "Goalkeeper",
    label: "Goalkeeper",
    type: "group",
    name: "goalkeeper",
  },
  {
    value: "Midfielder",
    label: "Midfielder",
    type: "group",
    name: "midfielder",
  },
  {
    value: "Forward",
    label: "Forward",
    type: "group",
    name: "forward",
  },
  {
    value: "Defender",
    label: "Defender",
    type: "group",
    name: "defender",
  },
  {
    label: "Midfielder",
    options: [
      {
        value: "Defensive Midfielder",
        label: "Defensive Midfielder",
        group: "midfielder",
      },
      {
        value: "Central Midfielder",
        label: "Central Midfielder",
        group: "midfielder",
      },
      {
        value: "Attacking Midfielder",
        label: "Attacking Midfielder",
        group: "midfielder",
      },
      {
        value: "Left Midfielder",
        label: "Left Midfielder",
        group: "midfielder",
      },
      {
        value: "Right Midfielder",
        label: "Right Midfielder",
        group: "midfielder",
      },
    ],
  },
  {
    label: "Forward",
    options: [
      { value: "Striker", label: "Striker", group: "forward" },
      { value: "Left Winger", label: "Left Winger", group: "forward" },
      { value: "Right Winger", label: "Right Winger", group: "forward" },
    ],
  },
  {
    label: "Defender",
    options: [
      { value: "Right Back", label: "Right Back", group: "defender" },
      { value: "Center Back", label: "Center Back", group: "defender" },
      { value: "Left Back", label: "Left Back", group: "defender" },
    ],
  },
];

export const CustomControl = () => {
  const [value, setValue] = useState([]);

  const handleChange = (newValues, { action, option }) => {
    console.log(newValues, option);
    if (option === undefined) {
      setValue(newValues);
    }
    if (option?.group) {
      setValue(newValues.filter((obj) => obj?.name !== option.group));
    }
    if (option?.type && option.type === "group") {
      setValue(newValues.filter((item) => item.group !== option.name));
    }
  };

  return (
    <>
      <Select
        value={value}
        options={playerPositions}
        onChange={handleChange}
        isMulti
      />
    </>
  );
};
