import { Col, Row, Typography } from "antd";
import React from "react";
import moment from "moment";
import "../styles/Forecast.css";

export default function ForecastHourlyNow({ weatherInfo }) {

    let hour = moment.unix(weatherInfo.dt).format('ha')

    return (
        <Row>
            <Col xs={24} style={{textAlign:'center'}}>
                <div style={{fontSize:20}}>{hour}</div>
                <img
                    width={80}
                    src={"https://openweathermap.org/img/wn/" + weatherInfo.weather[0].icon + "@2x.png"}
                />
                <center>
                    <span className="temperature__min">
                        {Math.round(weatherInfo.temp)}
                        <sup className="temperature__symbol">°</sup>
                    </span>
                </center>
            </Col>
        </Row>
    );
}
