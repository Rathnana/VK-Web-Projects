import { Col, Row } from "antd";
import React from "react";
import moment from "moment";
import "../styles/Forecast.css";

export default function ForecastHourly({ weatherInfo }) {

    let hour = moment.unix(weatherInfo.dt).format('ha')

    return (
        <Row>
            <Col xs={24} style={{textAlign:'center'}}>
                <h1 className="Forecast__title">{hour}</h1>
                <img
                    className={"Forecast__weather-icon"}
                    src={"https://openweathermap.org/img/wn/" + weatherInfo.weather[0].icon + ".png"}
                />
                <center>
                    <div style={{fontSize:14,color:'lightblue'}}>{weatherInfo?.humidity}%</div>
                    <span className="temperature__min">
                        {Math.round(weatherInfo.temp)}
                        <sup className="temperature__symbol">°</sup>
                    </span>
                </center>
            </Col>
        </Row>
    );
}
