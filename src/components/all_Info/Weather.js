import { Input, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import getCoordinatesOfAddress from '../../api/forwardGeocoding';
import getAddressOfCoordinates from '../../api/reverseGeocoding';
import getWeatherAndForecast from '../../api/weatherAndForecast'
import WeatherAndForecast from '../weather/WeatherAndForecast';
import { LoadingOutlined } from '@ant-design/icons';
import Warning from '../weather/Warning';

export default function Weather() {
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({});
    const [weatherAndForecastInfo, setWeatherAndForecastInfo] = useState({});
    const [locationInfo, setLocationInfo] = useState({});
    const [contentState, setContentState] = useState("blank");

    const [tempSearch, setTempSearch] = useState("")

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#FFFFFF' }} spin />;


    function searchCity(target) {
        setAddress(target);
    }

    function handleButtonClick() {
        if (tempSearch.trim() === "") return;
        searchCity(tempSearch);
    }

    function handleKeyPress(e) {
        if (e.key === "Enter") handleButtonClick();
    }


    function showWarning() {
        setContentState("warning");
        setTimeout(() => setContentState("blank"), 3000);
    }

    useEffect(() => {
        function makeRequest(position) {
            setContentState("loading");
            getAddressOfCoordinates(
                position.coords.latitude,
                position.coords.longitude
            )
                .then((res) => {
                    setLocationInfo({
                        city: res.data.results[0].components.city,
                        town: res.data.results[0].components.town,
                        state: res.data.results[0].components.state,
                        country: res.data.results[0].components.country
                    });
                })
                .then(() =>
                    setCoordinates({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                )
                .catch((error) => showWarning());
        }

        function catchError(err) {
            alert("ERROR(" + err.code + "): " + err.message);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(makeRequest, catchError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        if (address === "") return;

        setContentState("loading");
        getCoordinatesOfAddress(address)
            .then((res) => {
                if (
                    res.data.results.length === 0 ||
                    (res.data.results[0].components.city === undefined &&
                        res.data.results[0].components.town === undefined)
                ) {
                    showWarning();
                    return;
                }

                setCoordinates(res.data.results[0].geometry);
                setLocationInfo({
                    city: res.data.results[0].components.city,
                    town: res.data.results[0].components.town,
                    state: res.data.results[0].components.state,
                    country: res.data.results[0].components.country
                });
            })
            .catch((error) => showWarning());
    }, [address]);

    useEffect(() => {
        if (Object.keys(coordinates).length === 0) return;

        getWeatherAndForecast(coordinates)
            .then((res) => {
                setWeatherAndForecastInfo(res.data);
                setContentState("weatherAndForecast");
            })
            .catch((error) => showWarning());
        setInterval(() => {
            console.log('ddd')
            getWeatherAndForecast(coordinates)
                .then((res) => {
                    setWeatherAndForecastInfo(res.data);
                    setContentState("weatherAndForecast");
                })
                .catch((error) => showWarning());
        }, 300000)
    }, [coordinates]);

    const Main = {
        blank: () => null,
        loading: () => <div className="loading-data" style={{ padding: 40 }}><Spin indicator={antIcon} /></div>,
        warning: () => <Warning />,
        weatherAndForecast: () => (
            <WeatherAndForecast
                weatherInfo={weatherAndForecastInfo}
                location={locationInfo}
            />
        )
    };

    return (
        <div className='weather__container'>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.30)', padding: 20 }} >
                <Input size='large' placeholder='city, state ...'
                    onChange={(e) => setTempSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                {Main[contentState]()}
            </div>

        </div>
    )
}
