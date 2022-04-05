import { Input, message, Spin } from 'antd';
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

    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        // 960
        if (window.innerWidth <= 575) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
    }, [])

    window.addEventListener('resize', handleResize)


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

        if(window.innerWidth <= 575 || isMobile) {
            return
        }

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
                        country: res.data.results[0].components.country,
                        country_code: res.data.results[0].components.country_code
                    });
                })
                .then(() =>
                    setCoordinates({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                )
                .catch((error) => {
                    showWarning()
                });
        }

        function catchError(err) {
            message.error("ERROR(" + err.code + "): " + err.message);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(makeRequest, catchError);
        } else {
            message.error("Geolocation is not supported by this browser.");
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
                        res.data.results[0].components.town === undefined &&
                        res.data.results[0].components.state === undefined
                        )
                ) {
                    showWarning();
                    return;
                }

                setCoordinates(res.data.results[0].geometry);
                setLocationInfo({
                    city: res.data.results[0].components.city,
                    town: res.data.results[0].components.town,
                    state: res.data.results[0].components.state,
                    country: res.data.results[0].components.country,
                    country_code: res.data.results[0].components.country_code
                });
            })
            .catch((error) => {
                showWarning()
            });
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
            <div style={{ backgroundColor: 'rgb(115, 166, 206)', padding: 20,borderRadius:10 }} >
                <Input size='large' placeholder='city, state ...'
                    onChange={(e) => setTempSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{borderRadius:10}}
                />
                {Main[contentState]()}
            </div>

        </div>
    )
}
