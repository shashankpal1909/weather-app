import React from "react";
import moment from "moment";
import { Accordion, Card, Table } from "react-bootstrap";

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

function App(props) {
  const weather = props.data.daily.map((day) => {
    return {
      date: day.dt,
      forecast: day.weather[0],
      temp: [day.temp.min, day.temp.max],
      other: day,
    };
  });

  function WeatherCard(item) {
    return (
      <div key={item.date} style={{ textAlign: "center" }}>
        <Card.Body style={{ padding: "0rem 1rem 0.1rem 1rem " }}>
          <div>
            <div style={{ display: "flex" }}>
              <div>
                <img
                  alt="weather-icon"
                  src={`/icons/${item.forecast.icon}.svg`}
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
                {item.forecast.main}, {item.forecast.description} <br />
                The high will be {item.temp[1].toFixed(0)}
                {props.unit.temp} and low will be {item.temp[0].toFixed(0)}
                {props.unit.temp}
              </div>
            </div>
          </div>
          <div>
            <img alt="weather-icon" src="/icons/09d.svg" width="50px" />
            {item.other.rain ? item.other.rain + "mm/h" : undefined}
            {item.other.rain
              ? "(" + item.other.clouds + "%)"
              : item.other.clouds + "%"}
            <img alt="weather-icon" src="/icons/wind.svg" width="50px" />
            {item.other.wind_speed}
            {props.unit.speed}
            <img alt="weather-icon" src="/icons/compass.svg" width="50px" />
            {degToCompass(item.other.wind_deg)}
          </div>
          <div>
            {item.other.pressure}hPa Humidity: {item.other.humidity}% UV:{" "}
            {item.other.uvi.toFixed(0)} Dew point:{" "}
            {item.other.dew_point.toFixed(0)}°C
          </div>
          <Table
            hover
            size={"sm"}
            style={{ marginTop: "1rem", marginBottom: "0" }}
          >
            <tbody>
              <tr>
                <td></td>
                <td>Temperature</td>
                <td>Feels Like</td>
              </tr>
              <tr>
                <td>Morning</td>
                <td>
                  {item.other.temp.morn.toFixed(0)}
                  {props.unit.temp}
                </td>
                <td>
                  {item.other.feels_like.morn.toFixed(0)}
                  {props.unit.temp}
                </td>
              </tr>
              <tr>
                <td>Afternoon</td>
                <td>
                  {item.other.temp.day.toFixed(0)}
                  {props.unit.temp}
                </td>
                <td>
                  {item.other.feels_like.day.toFixed(0)}
                  {props.unit.temp}
                </td>
              </tr>
              <tr>
                <td>Evening</td>
                <td>
                  {item.other.temp.eve.toFixed(0)}
                  {props.unit.temp}
                </td>
                <td>
                  {item.other.feels_like.eve.toFixed(0)}
                  {props.unit.temp}
                </td>
              </tr>
              <tr>
                <td>Night</td>
                <td>
                  {item.other.temp.night.toFixed(0)}
                  {props.unit.temp}
                </td>
                <td>
                  {item.other.feels_like.night.toFixed(0)}
                  {props.unit.temp}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </div>
    );
  }

  return (
    <div style={{ margin: "10px" }}>
      <h5 style={{ fontWeight: "bold" }}>8-day Forecast</h5>
      <Accordion
        defaultActiveKey={weather[0].date}
        style={{ maxWidth: "100%" }}
      >
        {weather.map((item) => {
          return (
            <Card key={item.date}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={item.date}
                style={{ cursor: "pointer", padding: "0.25rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {moment.unix(item.date).format("ddd")}
                  <br />
                  {moment.unix(item.date).format("MMM Do")}
                  <img
                    alt="weather-icon"
                    src={`/icons/${item.forecast.icon}.svg`}
                    width={60}
                    height={60}
                  />
                  {item.temp[0].toFixed(0)}
                  {props.unit.temp}
                  <br />
                  {item.temp[1].toFixed(0)}
                  {props.unit.temp}
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={item.date}>
                {WeatherCard(item)}
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </div>
  );
}

export default App;
