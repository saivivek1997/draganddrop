import React, { useState } from "react";

import Modal from "./Modal";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import "./App.css";
import { useHistoryState } from "./hooks/useHistoryState";

const url = `https://safe-springs-353/06.herokuapp.com/api/formdata?cid=`;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const [jsonData, setJsonData] = useState([]);
  const { state, undo, redo, updatePresent, past, future } = useHistoryState(
    []
  );
  const onPost = (post) => {
    updatePresent(post.task_data);
  };

  function handleSubmit() {
    const finalData = [];
    state.forEach((element, elementIndex) => {
      finalData.push({
        headings: [{ heading: element.label }],
        position: elementIndex + 1,
        family: element.text,
        subtype: "vertical",
        ...(element["options"] && {
          answers: {
            choices: element.options.map((option) => ({ text: option.text })),
          },
        }),
      });
    });
    setIsModalOpen(false);
    console.log(finalData, "finalData");
    console.log(JSON.stringify(finalData), "finaldata with json");
    setJsonData(JSON.stringify(finalData));
  }

  return (
    <>
      <div className="App">
        <div className="button-container">
          <button
            onClick={() => setIsModalOpen((prevModalOpen) => !prevModalOpen)}
            className="btn btn-primary preview-form"
          >
            Preview Form
          </button>
        </div>
        <div className="container">
          <ReactFormBuilder onPost={onPost} url={url} />
        </div>

        {isModalOpen && (
          <Modal
            handleCloseModal={handleCloseModal}
            handleSubmit={handleSubmit}
            undo={undo}
            redo={redo}
            data={state}
            past={past}
            future={future}
          />
        )}
      </div>
    </>
  );
}

export default App;
