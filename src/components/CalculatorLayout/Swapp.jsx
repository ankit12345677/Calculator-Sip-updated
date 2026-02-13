import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Swapp = () => {
  const [monthly, setMonthly] = useState(25000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(8);
  const [topup, setTopup] = useState(10);
  const [freq, setFreq] = useState(12); // 6 or 12 months

  const r = rate / 100 / 12;

  let invested = 0;
  let value = 0;
  let currentMonthly = monthly;

  const yearLabels = [];
  const investedData = [];
  const returnsData = [];
  const totalData = [];

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      value = (value + currentMonthly) * (1 + r);
      invested += currentMonthly;

      if ((y * 12 + m) % freq === 0) {
        currentMonthly += (currentMonthly * topup) / 100;
      }
    }

    yearLabels.push(`Year ${y}`);
    investedData.push(Math.round(invested));
    totalData.push(Math.round(value));
    returnsData.push(Math.round(value - invested));
  }

  const data = {
    labels: yearLabels,
    datasets: [
      {
        type: "bar",
        label: "Investment Amount",
        data: investedData,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderRadius: 8,
      },
      {
        type: "bar",
        label: "Estimated Returns",
        data: returnsData,
        backgroundColor: "rgba(150, 170, 255, 0.6)",
        borderRadius: 8,
      },
      {
        type: "line",
        label: "Total Value",
        data: totalData,
        borderColor: "green",
        pointBackgroundColor: "green",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* LEFT */}
        <div className="col-md-5">
          <div className="mb-3">
            <label>Monthly Investment: ₹{monthly}</label>
            <input
              type="range"
              min="1000"
              max="100000"
              value={monthly}
              onChange={(e) => setMonthly(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Years: {years}</label>
            <input
              type="range"
              min="1"
              max="20"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Return Rate: {rate}%</label>
            <input
              type="range"
              min="1"
              max="20"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Top-up: {topup}%</label>
            <input
              type="range"
              min="0"
              max="20"
              value={topup}
              onChange={(e) => setTopup(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Top-up Frequency:</label><br />
            <input
              type="radio"
              checked={freq === 6}
              onChange={() => setFreq(6)}
            /> 6 Months &nbsp;&nbsp;
            <input
              type="radio"
              checked={freq === 12}
              onChange={() => setFreq(12)}
            /> 1 Year
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-7">
          <div className="card p-3 shadow-sm">
            <Bar data={data} />

            <div className="d-flex justify-content-around mt-3">
              <div>
                <span className="text-primary">●</span> Invested
                <br />₹{Math.round(invested)}
              </div>
              <div>
                <span className="text-info">●</span> Returns
                <br />₹{Math.round(value - invested)}
              </div>
              <div>
                <span className="text-success">●</span> Total Value
                <br />₹{Math.round(value)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swapp;
