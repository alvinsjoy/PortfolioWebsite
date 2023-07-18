import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import arrow from "../../Assets/arrow.png";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="blue">Alvin Joy </span>
            from <span className="blue"> Kerala, India.</span>
            <br /> I am a <span className="blue"> Computer Science and Engineering</span> Undergrad at Govt. Model Engineering College, Kochi.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
            <img src={arrow} className="img-fluid logo" alt="arrow"/> Playing Games
            </li>
            <li className="about-activity">
            <img src={arrow} className="img-fluid logo" alt="arrow"/> Watching Movies
            </li>
            <li className="about-activity">
            <img src={arrow} className="img-fluid logo" alt="arrow"/> Travelling
            </li>
          </ul>

          <p style={{ color: "#4f8aff97" }}>
            "Measuring programming progree by lines of code is like measuring aircraft building progree by weight."{" "}
          </p>
          <footer className="blockquote-footer">Bill Gates</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
