import { Col, Row } from "antd";
import React from "react";

import "../styles/Weather.css";

export default function Current({ weatherInfo, location, date }) {
  return (
    <Row className="Weather">
      <Col md={24} lg={24} xl={12} >
        <img
          className="Weather__icon"
          src={
            "https://openweathermap.org/img/wn/" +
            weatherInfo.current.weather[0].icon +
            "@2x.png"
          }
          // alt={weatherInfo.current.weather[0].main}
        />
        <h2 className="other-info__city">
          {/* {location.city || location.town},{" "} */}
          {location?.state?.toUpperCase() || location?.country?.toUpperCase()}
        </h2>
        <h3 className="other-info__clouds">{date}</h3>
        <h3 className="other-info__clouds">
          {weatherInfo.current.weather[0].description}
        </h3>
      </Col>
      <Col md={24} lg={24} xl={12} style={{textAlign:'center'}} >
        <Row className="Weather__list">
          <Col xs={24} className="list__temperature">
            {Math.round(weatherInfo.current.temp)}
            <sup className="list__temperature-symbol">°C</sup>
          </Col >
          <Col xs={24}> Humidity: {weatherInfo.current.humidity}% </Col>
          <Col xs={24}>
            {" "}
            Wind: {Math.round(weatherInfo.current.wind_speed * 3.6)} km/h{" "}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
