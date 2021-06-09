import React, { useEffect, useState } from "react";
import App from "./8DayForecast";
import CurrentForecast from "./CurrentForecast";
import HourlyChart from "./HourlyChart";
import "../App.css";
import {
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  FormControl,
  Button,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import axios from "axios";
import { locationData } from "../data";

let count = 0;
const WEATHER_API = "91420caffb02fc91f0ee976f3eeb549d";
const LOC_API =
  "pk.eyJ1Ijoic2hhc2hhbmtwYWwxOTA5IiwiYSI6ImNrY2xpbzFkYjI0YmozM284bWpscWE2dGkifQ.73L8TnT83Y5yAnBHfsaC0w";

function WeatherHomePage(props) {
  const [data, setData] = useState([]);
  const [locData, setLocData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState({
    name: "metric",
    temp: "°C",
    speed: "m/s",
  });

  async function getWeatherData(lat = 28.755, lon = 77.199, units = "metric") {
    console.log("API Called");
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${
          process.env.WEATHER_API || WEATHER_API
        }`
      );
      localStorage.setItem(
        "coords",
        JSON.stringify({ lat: res.data.lat, lon: res.data.lon })
      );
      return res.data;
    } catch (err) {
      return console.log(err);
    }
  }

  async function getLocation(city) {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          city
        )}.json?access_token=${process.env.LOC_API || LOC_API}&limit=1`
      );
      localStorage.setItem("locName", res.data.query[0]);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(count);
    if (count !== 0) {
      return 0;
    }
    count++;

    const locName = localStorage.getItem("locName");
    if (locName !== null) {
      getLocation(locName).then((res) => setLocData(res));
    } else {
      setLocData(locationData);
    }

    const coords = localStorage.getItem("coords");
    let lat = undefined,
      lon = undefined;
    if (coords !== null) {
      lat = JSON.parse(coords).lat;
      lon = JSON.parse(coords).lon;
    }

    getWeatherData(lat, lon, unit.name).then((res) => {
      console.log(res);
      setData(res);
      setLoading(false);
    });
  }, []);

  const updateWeather = (unit) => {
    setLoading(true);
    getWeatherData(
      locData.features[0].center[1],
      locData.features[0].center[0],
      unit
    ).then((res) => {
      console.log(res);
      setData(res);
      setUnit(
        unit === "metric"
          ? {
              name: "metric",
              temp: "°C",
              speed: "m/s",
            }
          : {
              name: "imperial",
              temp: "°F",
              speed: "mph",
            }
      );
      setLoading(false);
    });
  };

  const searchWeather = () => {
    const city = document.getElementsByClassName("city-input")[0].value;
    if (city === "") return 0;
    console.log(city);
    document.getElementsByClassName("city-input")[0].value = "";
    setLoading(true);
    getLocation(city)
      .then((res) => {
        setLocData(res);
        return res;
      })
      .then((res) => {
        console.log(res);
        getWeatherData(
          res.features[0].center[1],
          res.features[0].center[0],
          unit.name
        ).then((res) => {
          setData(res);
          setLoading(false);
        });
      });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Navbar
        bg="dark"
        variant="dark"
        style={{ justifyContent: "space-between" }}
        fixed="top"
      >
        <Navbar.Brand
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <img
            alt=""
            src="icons/logo.svg"
            width="64"
            height="64"
            className="d-inline-block align-top"
          />{" "}
          <h1 style={{ margin: "0 10px", fontWeight: "bold" }}>Weather</h1>
        </Navbar.Brand>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={`tooltip-bottom`}>Refresh Weather</Tooltip>}
        >
          <Button href="/" variant="link">
            <img
              alt=""
              src="icons/refresh.svg"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
          </Button>
        </OverlayTrigger>
      </Navbar>
      <Container>
        <Row style={{ marginTop: "10px" }}>
          <Form
            onSubmit={(e) => e.preventDefault()}
            style={{ width: "100%", margin: "10px 10px 0 10px" }}
          >
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search City"
                aria-label="search"
                aria-describedby="basic-addon2"
                className="city-input"
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  type="submit"
                  onClick={searchWeather}
                >
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Row>
        {loading ? (
          <Row style={{ justifyContent: "center" }}>
            <img src="icons/load.svg" alt="loading" />
          </Row>
        ) : (
          <Row>
            <Col style={{ padding: 0 }}>
              <CurrentForecast
                data={data}
                loc={locData}
                unit={unit}
                updateWeather={(unit) => updateWeather(unit)}
              />
              <HourlyChart data={data} unit={unit} />
            </Col>
            <Col style={{ padding: 0 }}>
              <App data={data} unit={unit} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default WeatherHomePage;
