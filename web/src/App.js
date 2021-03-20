import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";
import "./App.css";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import TripList from "./TripList";

// Styles
const TravelTextfield = withStyles({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#39a2dd",
    },
    width: 500,
    bottom: 30,
  },
})(TextField);

const textfieldStyle = {
  fontFamily: "Prompt",
  fontWeight: "Bold",
  textAlign: "center",
};

const override = css`
  display: block;
  margin: 0 auto;
`;
var tripList = [];

function App() {
  // States
  const [lists, setList] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultDiv, setResultDiv] = useState(false);

  // Functionals
  const search = async (keyword) => {
    if (keyword.length > 0) {
      setText(keyword);

      //set loading to be false when response is successfully loaded.
      setLoading(true);
      setResultDiv(true);
      setTimeout(() => {
        setLoading(false);
      }, 100)

      // find trip from keyword
      const url = `http://localhost:9010/api/trips?keyword=${keyword}`;
      try {
        let response = await fetch(url, {
          method: "GET",
          // headers: {
          //   Accept: "application/json",
          //   "Content-Type": "application/json",
          //   "Access-Control-Allow-Origin": "*",
          // },
        });
        tripList = await response.json();
        setList(...[tripList]);
      } catch (error) {
        tripList = [];
      }
      
    }
    setResultDiv(true);
  };
  const handleChange = (event) => {
    var value = event.target.value;
    setText(value);
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    if (event.key === "Enter") {
      search(text);
      event.target.blur();
    }
  };

  return (
    <div className="App">
      <div>
        <p className="App-title">เที่ยวไหนดี</p>
        <TravelTextfield
          id="standard-basic"
          placeholder="หาที่เที่ยวแล้วไปกัน"
          InputProps={{ style: textfieldStyle }}
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          value={text}
          onChange={handleChange}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "หาที่เที่ยวแล้วไปกัน...")}
          onKeyDown={handleSubmit}
        />
      </div>
      {resultDiv
        ? lists.map((list) => (
            <TripList
              key={list.eid}
              title={list.title}
              url={list.url}
              description={list.description}
              photos={list.photos}
              tags={list.tags}
              search={search}
            />
          ))
        : null}
      {lists.length === 0 && resultDiv ? 
        <p className="Not-found">ไม่พบรายการ</p>

      : null}

      <div>
        <ClipLoader
          color="#39a2dd"
          loading={loading}
          css={override}
          size={150}
        />
      </div>
    </div>
  );
}

export default App;
