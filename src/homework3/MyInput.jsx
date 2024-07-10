import React from "react";

const MyInput = ({ value, setValue }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="add">Add to Text</label>
        <input
          id="add"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button type="submit">Add Text</button>
      </form>
    </div>
  );
};

export default MyInput;
