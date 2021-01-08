import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import { Button, ButtonGroup } from "react-bootstrap";
import "../App.css";
function degToCompass(num) {
  const val = parseInt(num / 22.5 + 0.5);
  const arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

function CurrentForecast(props) {
  const currentData = props.data.current;
  return (
    <div style={{ margin: "10px", maxWidth: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <h5 style={{ margin: "0", fontWeight: "bold" }}>Current Forecast</h5>
        <ButtonGroup size="sm">
          <Button
            variant="outline-secondary"
            onClick={() => {
              if (props.unit.name !== "metric") props.updateWeather("metric");
            }}
          >
            °C | m/s
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              if (props.unit.name !== "imperial")
                props.updateWeather("imperial");
            }}
          >
            °F | mph
          </Button>
        </ButtonGroup>
      </div>
      <Card className="text-center" style={{ maxWidth: "100%" }}>
        <Card.Header>
          {moment.unix(currentData.dt).format("hh:mm A, MMM Do, dddd")}
        </Card.Header>
        <Card.Body>
          <Card.Title style={{ fontWeight: "bold" }}>
            {props.loc.features[0].place_name}
          </Card.Title>
          <Card.Text>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h2
                style={{
                  display: "flex",
                  marginBottom: "0",
                  alignItems: "center",
                }}
              >
                <img src="/icons/heat.svg" alt="heat" width="70px" />
                {currentData.temp.toFixed(0)}
                {props.unit.temp}
              </h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <img
                    alt="weather-icon"
                    src={`/icons/${currentData.weather[0].icon}.svg`}
                    width="100px"
                    height="100px"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    textAlign: "left",
                    alignItems: "center",
                  }}
                >
                  {currentData.weather[0].main},{" "}
                  {currentData.weather[0].description} <br />
                  Feels like {currentData.feels_like.toFixed(0)}
                  {props.unit.temp}.{" "}
                </div>
              </div>
            </div>
            <div>
              <img alt="weather-icon" src="/icons/09d.svg" width="50px" />
              {currentData.rain ? `${currentData.rain["1h"]}mm/h` : undefined}
              {currentData.rain
                ? `(${currentData.clouds}%)`
                : `${currentData.clouds}%`}
              <img alt="weather-icon" src="/icons/wind.svg" width="50px" />
              {currentData.wind_speed}
              {props.unit.speed}{" "}
              <img alt="weather-icon" src="/icons/compass.svg" width="50px" />
              {degToCompass(currentData.wind_deg)}
            </div>
            <div>
              {currentData.pressure}hPa Humidity: {currentData.humidity}% UV:{" "}
              {currentData.uvi.toFixed(0)} Dew point:{" "}
              {currentData.dew_point.toFixed(0)}
              {props.unit.temp}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CurrentForecast;
