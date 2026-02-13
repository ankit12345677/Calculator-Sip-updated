import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
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

const Sipreturn = () => {
  const [monthly, setMonthly] = useState(25000);
  const [years, setYears] = useState(3);
  const [rate, setRate] = useState(8);
  const [topup, setTopup] = useState(8);

  const months = years * 12;
  const r = rate / 100 / 12;

  // SIP future value formula
  const futureValue =
    monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

  const invested = monthly * months;
  const returns = futureValue - invested;

  // Dummy yearly chart data like image
  const bars = Array.from({ length: 5 }, (_, i) =>
    Math.round(futureValue / (i + 1.5))
  );

  const data = {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    datasets: [
      {
        type: "bar",
        label: "Investment Amount",
        data: bars.map(() => invested / 5),
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        borderRadius: 8,
      },
      {
        type: "bar",
        label: "Estimated Returns",
        data: bars,
        backgroundColor: "rgba(150, 170, 255, 0.4)",
        borderRadius: 8,
      },
      {
        type: "line",
        label: "Total Value",
        data: bars.map((v, i) => v + i * 5000),
        borderColor: "green",
        tension: 0.4,
        pointBackgroundColor: "green",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* LEFT */}
        <div className="col-md-5">
          <div className="mb-3">
            <label>Monthly Investment Amount: ₹{monthly}</label>
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
            <label>Investment Period: {years} Years</label>
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
            <label>Expected Annual Returns: {rate}%</label>
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
            <label>Top up (%): {topup}%</label>
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
            <label>Top up frequency:</label><br />
            <input type="radio" checked /> 6 Months
            &nbsp;&nbsp;
            <input type="radio" /> 1 Year
          </div>

          <small className="text-muted">
            Mutual fund investments are subject to market risks.
          </small>
        </div>

        {/* RIGHT */}
        <div className="col-md-7">
          <div className="card p-3 shadow-sm">
            <Bar data={data} />

            <div className="d-flex justify-content-around mt-3">
              <div>
                <span className="text-primary">●</span> Investment Amount
                <br />₹{Math.round(invested)}
              </div>
              <div>
                <span className="text-info">●</span> Estimated Returns
                <br />₹{Math.round(returns)}
              </div>
              <div>
                <span className="text-success">●</span> Total Value
                <br />₹{Math.round(futureValue)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sipreturn;
