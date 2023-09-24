"use client";

import { useState } from "react";

const page = () => {
  const [selectedValue, setSelectedValue] = useState(""); // Initialize with an empty string or the default value

  // Define a function to handle radio button changes
  const handleRadioChange = (event: any) => {
    setSelectedValue(event.target.value); // Update the state with the selected value
  };
  return (
    <div>
      <label>
        <input
          type="radio"
          value="option1"
          checked={selectedValue === "option1"}
          onChange={handleRadioChange}
        />
        Option 1
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option2"
          checked={selectedValue === "option2"}
          onChange={handleRadioChange}
        />
        Option 2
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option3"
          checked={selectedValue === "option3"}
          onChange={handleRadioChange}
        />
        Option 3
      </label>
      <br />

      <p>Selected Value: {selectedValue}</p>
    </div>
  );
};

export default page;
