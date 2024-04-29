import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
} from "reactstrap";

const example = () => {
  const [inputFields, setInputFields] = useState([
    { id: Math.round(Math.random() * 10), firstName: "", lastName: "" },
  ]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: Math.round(Math.random() * 10), firstName: "", lastName: "" },
    ]);
  };

  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(
      values.findIndex(value => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <div className="m-5 p-5">
      <h1>Add New Member</h1>
      <form className="" onSubmit={handleSubmit}>
        {inputFields.map(inputField => {
          <div key={inputField.id}>
            {/* <div className="mb-3 row">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Text
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  name="name"
                  value={inputField.name}
                  type="text"
                  defaultValue="Artisanal kale"
                  onChange={event => handleChangeInput(inputField.id, event)}
                />
              </div>
            </div> */}
            <div className="mb-3 row">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Text
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue="Artisanal kale"
                  value={inputField.firstName}
                  onChange={event => handleChangeInput(inputField.id, event)}
                />
              </div>
            </div>
            <button onClick={() => handleRemoveFields(inputField.id)}>
              add
            </button>
            <button onClick={() => handleRemoveFields(inputField.id)}>
              remove
            </button>
            <button>remove</button>
          </div>;
        })}
      </form>
    </div>
  );
};

export default example;
