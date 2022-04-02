import React from "react";

import Weather from "./Weather";
import Forecast from "./Forecast";

import "../styles/WeatherAndForecast.css";
import { Col, Row } from "antd";
import ForecastHourly from "./ForcashHourly";
import ForecastHourlyNow from "./ForcashHourlyNow";

function WeatherAndForecast({ weatherInfo, location }) {
  const date = dateBuilder(new Date());

  function dateBuilder(d) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const date = [];

    for (let count = 0; count < 5; count++) {
      if (d.getDay() + count < 7) date[count] = d.getDay() + count;
      else if (d.getDay() + count === 7) date[count] = 0;
      else if (d.getDay() + count === 8) date[count] = 1;
      else if (d.getDay() + count === 9) date[count] = 2;
      else if (d.getDay() + count === 10) date[count] = 3;
    }

    return [
      days[date[0]],
      days[date[1]],
      days[date[2]],
      days[date[3]],
      days[date[4]]
    ];
  }

  return (
    <Row >
      <Col xs={24}>
        <Weather weatherInfo={weatherInfo} location={location} date={date[0]} />
      </Col>
      <Col xs={24}>
        <Row style={{ backgroundColor: 'rgba(255, 255, 255, 0.20)',borderRadius:10 }} >
          <Col xs={7} md={7} style={{fontSize:20,background:'rgba(70,130,180,0.50)',padding: '1.5rem 0rem 1.5rem 0rem',borderRadius:10 }}>
            <ForecastHourlyNow weatherInfo={weatherInfo.hourly[0]} />
          </Col>
          <Col xs={17} md={17} style={{padding: '1.5rem 0rem 1.5rem 0rem' }}>
            <Row>
              <Col xs={12} md={6}>
                <ForecastHourly weatherInfo={weatherInfo.hourly[1]} />
              </Col>
              <Col xs={12} md={6}>
                <ForecastHourly weatherInfo={weatherInfo.hourly[2]} />
              </Col>
              <Col xs={12} md={6}>
                <ForecastHourly weatherInfo={weatherInfo.hourly[3]} />
              </Col>
              <Col xs={12} md={6}>
                <ForecastHourly weatherInfo={weatherInfo.hourly[4]} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="WeatherAndForecast__container" style={{marginTop:10, backgroundColor: 'rgba(255, 255, 255, 0.20)',borderRadius:10 }}>
          <Col xs={4}>
            <Forecast weatherInfo={weatherInfo.daily[0]} date={date[0]} />
          </Col>
          <Col xs={4}>
            <Forecast weatherInfo={weatherInfo.daily[1]} date={date[1]} />
          </Col>
          <Col xs={4}>
            <Forecast weatherInfo={weatherInfo.daily[2]} date={date[2]} />
          </Col>
          <Col xs={4}>
            <Forecast weatherInfo={weatherInfo.daily[3]} date={date[3]} />
          </Col>
          <Col xs={4}>
            <Forecast weatherInfo={weatherInfo.daily[4]} date={date[4]} />
          </Col>

        </Row>
      </Col>
    </Row>
  );
}

export default WeatherAndForecast;
