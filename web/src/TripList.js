import React from "react";
import "./App.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
var len = 70;
function TripList({ eid, title, url, description, photos, tags, search }) {
  return (
    <div style={{ justifyContent: "center" }}>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Row className="App-row1">
          <Col>
            <img className="img-left" src={photos[0]} alt="Logo" />
          </Col>
        </Row>
        <Row style={{ textAlign: "left", width: 300 }}>
          <p className="Detail-title">
            <a href={url} className="Title-link">
              {title}
            </a>
          </p>
          <p className="Detail-amplify">
            {description.substring(0, len)}
                <span> </span>.... <a href={url}>อ่านต่อ</a>
          </p>
          <p className="Categories">
            หมวด -
            {tags.map((tag, index) => {
              if (index === tags.length - 1) {
                return (
                  <span>
                    {" "}
                    และ
                        {" "}
                    <label
                      onClick={() => search(tag)}
                      className="Detail-categories"
                    >
                      {tag}
                    </label>
                  </span>
                );
              } else {
                return (
                  <span>
                    {" "}
                    <label
                      onClick={() => search(tag)}
                      className="Detail-categories"
                    >
                      {tag}
                    </label>{" "}
                  </span>
                );
              }
            })}
          </p>
          <Container
            style={{
              display: "flex",
              textAlign: "left",
            }}
          >
            <Row>
              <img className="img-right" src={photos[1]} alt="Logo" />
            </Row>
            <Row>
              <img className="img-right" src={photos[2]} alt="Logo" />
            </Row>
            <Row>
              <img className="img-right" src={photos[3]} alt="Logo" />
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
}

export default TripList;
