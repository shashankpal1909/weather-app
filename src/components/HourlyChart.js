import React from "react";
import moment from "moment";
import CanvasJSReact from "../canvasjs-3.2.6/canvasjs.react";
import { Button, ButtonGroup } from "react-bootstrap";
import "../App.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data, label: props.unit.temp };
  }
  render() {
    const options = {
      animationEnabled: true,
      animationDuration: 1000,
      height: 600,
      theme: "light2",
      toolTip: {
        content: "{label}: {y}" + this.state.label,
        fontFamily: "Montserrat, Roboto",
        fontSize: 12,
        fontWeight: "bold",
      },
      axisX: {
        margin: 5,
        valueFormatString: "DDD, hh:00 TT",
        interval: 1,
        intervalType: "hour",
        labelFontFamily: "Montserrat, Roboto",
        labelFontSize: 12,
        labelTextAlign: "center",
        labelFontColor: "black",
        labelFontWeight: "normal",
      },
      axisY: {
        suffix: this.state.label,
        margin: 10,
        labelFontFamily: "Montserrat, Roboto",
        labelFontSize: 12,
        labelTextAlign: "center",
        gridThickness: 1,
        labelFontColor: "black",
      },
      dataPointMaxWidth: 12,
      data: [
        {
          type: "bar",
          reversed: true,
          indexLabel: " {y}" + this.state.label,
          indexLabelFontFamily: "Montserrat, Roboto",
          indexLabelFontSize: 12,
          indexLabelFontColor: "black",
          dataPoints: this.state.data,
        },
      ],
    };

    return (
      <div style={{ maxWidth: "100%", margin: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5 style={{ margin: "0", fontWeight: "bold" }}>Hourly Forecast</h5>
            <ButtonGroup size="sm">
              <Button
                variant="outline-secondary"
                onClick={(state) => {
                  this.setState({
                    data: this.props.data,
                    label: this.props.unit.temp,
                  });
                }}
              >
                Temperature
              </Button>
              <Button
                variant="outline-secondary"
                onClick={(state) => {
                  this.setState({ data: this.props.newData, label: "%" });
                }}
              >
                Precipitation
              </Button>
            </ButtonGroup>
          </div>
          <CanvasJSChart options={options} className="graph" />
        </div>
      </div>
    );
  }
}

function HourlyChart(props) {
  const data = props.data.hourly.map((item) => {
    return {
      y: parseInt(item.temp.toFixed(0)),
      label: moment.unix(item.dt).format("ddd, hh:mm A"),
    };
  });

  const newData = props.data.hourly.map((item) => {
    return {
      y: parseInt(item.pop * 100),
      label: moment.unix(item.dt).format("ddd, hh:mm A"),
    };
  });

  data.splice(25, 24);
  data.reverse();
  newData.splice(25, 24);
  newData.reverse();

  return (
    <div>
      <App data={data} newData={newData} unit={props.unit} />
    </div>
  );
}

export default HourlyChart;
