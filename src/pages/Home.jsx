import React, { useEffect, useState } from "react";
import Select from "react-select";
import HOC from "../components/hoc";
import { CustomControl } from "../components/CustomContorl";

const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState(["a"]);
  // const [groupOption, setGroupOption] = useState([]);
  // const Midfielder = [
  //   {
  //     value: "Midfielder",
  //     label: "Midfielder",
  //     color: "#FF0000",
  //   },
  //   { value: "Defensive Midfielder", label: "Defensive Midfielder" },
  //   { value: "Central Midfielder", label: "Central Midfielder" },
  //   { value: "Attacking Midfielder", label: "Attacking Midfielder" },
  //   { value: "Left Midfielder", label: "Left Midfielder" },
  //   { value: "Right Midfielder", label: "Right Midfielder" },
  // ];
  // const Forward = [
  //   { value: "Forward", label: "Forward", color: "#FF0000" },
  //   { value: "Striker", label: "Striker" },
  //   { value: "Left winger", label: "Left winger" },
  //   { value: "Right Winger", label: "Right Winger" },
  // ];

  // const Defender = [
  //   { value: "Defender", label: "Defender", color: "#FF0000" },
  //   { value: "Right back", label: "Right back" },
  //   { value: "Center back", label: "Center back" },
  //   { value: "Left Back", label: "Left Back" },
  // ];
  // const GroupOptions = [
  //   {
  //     label: "Midfielder",
  //     value: "Midfielder",
  //     options: Midfielder.map((option) => ({
  //       ...option,
  //       isDisabled: selectedOptions.some(
  //         (selected) => selected.value === option.value
  //       ),
  //     })),
  //   },
  //   {
  //     label: "Forward",
  //     options: Forward.map((option) => ({
  //       ...option,
  //       isDisabled: selectedOptions.some(
  //         (selected) => selected.value === option.value
  //       ),
  //     })),
  //   },
  //   {
  //     label: "Defender",
  //     options: Defender.map((option) => ({
  //       ...option,
  //       isDisabled: selectedOptions.some(
  //         (selected) => selected.value === option.value
  //       ),
  //     })),
  //   },
  // ];

  // const handleSelectChange = (selected) => {
  //   setSelectedOptions(selected);
  //   setGroupOption(GroupOptions);
  // };
  // useEffect(() => {
  //   setGroupOption([...GroupOptions]);
  // }, []);
  useEffect(() => {
    console.log("useEff");
  }, [selectedOptions]);
  const a = () => {
    setSelectedOptions(["a"]);
  };
  console.log("state", selectedOptions);
  return (
    <>
      <h1 className="text-center mt-3">Home</h1>
      <button onClick={() => setSelectedOptions(["a"])}>okk</button>
      <br />
      {/* <Select
        options={groupOption}
        isMulti
        onChange={handleSelectChange}
        value={selectedOptions}
        defaultMenuIsOpen
      /> */}
      <CustomControl />
    </>
  );
};

export default HOC(Home);
