import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";

import FileDropzone from "./components/FileDropzone";
import Table from "./components/Table";

const App = () => {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState(null);
  const [data, setData] = useState(null);
  const [hypotheticalValues, setHypotheticalValues] = useState({});
  const [selectedInputs, setSelectedInputs] = useState([]);
  const [selectedOutput, setSelectedOutput] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    async function getData() {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        const csv = Papa.parse(reader.result, { header: true });
        const parsedData = csv?.data;
        const columns = Object.keys(parsedData[0]);
        setColumns(columns);
        setData(parsedData);
      };
    }
    getData();
  }, [file]);

  const getValidInputs = (columns, data) => {
    const inputs = columns.filter((col) => {
      return !isNaN(data[0][col]);
    });
    return inputs;
  };
  const getValidOutputs = (columns, data) => {
    const outputs = columns.filter((col) => {
      return isNaN(data[0][col]);
    });
    return outputs;
  };

  const handleCheckboxToggled = (event, type) => {
    const { value, checked } = event.target;
    if (checked) {
      if (type === "output") {
        setSelectedOutput(value);
      } else if (type === "input") {
        setSelectedInputs([...selectedInputs, value]);
      }
    } else {
      // unchecked
      if (type === "input") {
        setSelectedInputs(selectedInputs.filter((item) => item !== value));
      }
    }
  };

  const renderInputFields = () =>
    selectedInputs.map((input, idx) => (
      <div key={idx}>
        <label>{input}</label>
        <input
          value={hypotheticalValues[input]}
          onChange={(e) =>
            setHypotheticalValues({
              ...hypotheticalValues,
              [input]: e.target.value,
            })
          }
          type="number"
          name="input-field"
          id="input-field"
          className="appearance-none rounded relative block
          w-full px-3 py-2 border border-gray-300
          placeholder-gray-500 text-gray-900 rounded-t-md
          focus:outline-none focus:ring-indigo-500
          focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
        />
      </div>
    ));

  const sendTrainRequest = async () => {
    const res = await axios
      .post("http://api-srv:8000/api/train", {
        inputs: selectedInputs,
        output: selectedOutput,
        rows: JSON.stringify(data),
        to_predict: hypotheticalValues,
      })
      .catch((err) => console.error(err));
    setPrediction(res.data.prediction);
  };

  return (
    <div className="container mx-auto p-5 pb-9">
      <h1 className="text-4xl font-bold">AutoML</h1>
      <div className="mt-2">
        Upload a spreadsheet <i>(in CSV format)</i> below to get started!
      </div>
      <FileDropzone setFile={setFile} />
      {file && data && (
        <span>
          <h2 className="text-2xl font-semibold mt-6">Uploaded Data</h2>
          <div className="mt-2">
            Here's a sample of the data you've uploaded in a nice-to-read table!
          </div>
          <Table columns={columns} data={data} />
          <h2 className="text-xl font-semibold mt-6">Field Selection</h2>
          <div className="mt-2">
            Select the fields you want to use as inputs, and one field you would
            like to use as an output field from the ones listed below.
          </div>
          <div className="flex w-full mt-4">
            <div className="w-full">
              <h4 className="text-lg font-medium mb-2">Inputs:</h4>
              {getValidInputs(columns, data).map((inputField, index) => (
                <div key={index}>
                  <input
                    onChange={(e) => handleCheckboxToggled(e, "input")}
                    value={inputField}
                    type="checkbox"
                    className="mr-2"
                  />
                  <label htmlFor={`${inputField}`}>{inputField}</label>
                </div>
              ))}
            </div>
            <div className="w-full">
              <h4 className="text-lg font-medium mb-2">Outputs:</h4>
              {getValidOutputs(columns, data).map((outputField, index) => (
                <div key={index}>
                  <input
                    name="output-selection-radio"
                    onChange={(e) => handleCheckboxToggled(e, "output")}
                    value={outputField}
                    type="radio"
                    className="mr-2"
                  />
                  <label htmlFor={`${outputField}`}>{outputField}</label>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-9">Train My Model</h2>
          <div className="my-2">
            Enter some test values for your selected input fields, and then
            click the button below to train your model and predict on the test
            values!
          </div>
          {renderInputFields()}
          <button
            onClick={sendTrainRequest}
            disabled={selectedInputs.length === 0 || !selectedOutput}
            className="disabled:pointer-events-none disabled:opacity-50 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded w-50 cursor-pointer mt-2"
          >
            Train & Predict
          </button>
          {prediction && (
            <div>
              <h2 className="text-xl font-semibold mt-9">Results</h2>
              <div className="my-2">
                With the provided input values of {selectedInputs.join(", ")},
                we think your output field of {selectedOutput} has a{" "}
                <b>{Math.round(prediction * 100)}%</b> chance of being true.
              </div>
            </div>
          )}
        </span>
      )}
    </div>
  );
};

export default App;
