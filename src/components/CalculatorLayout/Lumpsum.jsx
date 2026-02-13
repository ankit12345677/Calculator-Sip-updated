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

const Lumpsum = () => {
  const [amount, setAmount] = useState(25000);
  const [years, setYears] = useState(3);
  const [rate, setRate] = useState(8);

  const yearlyData = [];
  let total = amount;

  for (let i = 1; i <= years; i++) {
    total = total * (1 + rate / 100);
    yearlyData.push(Math.round(total));
  }

  const finalValue = yearlyData[yearlyData.length - 1] || amount;
  const estimatedReturn = finalValue - amount;

  const investedData = yearlyData.map(() => amount);
  const returnData = yearlyData.map((value) => value - amount);

  const data = {
    labels: yearlyData.map((_, i) => `Year ${i + 1}`),
    datasets: [
      {
        type: "bar",
        label: "Investment Amount",
        data: investedData,
        backgroundColor: "rgba(128, 150, 255, 1)",
        stack: "stack1",
      },
      {
        type: "bar",
        label: "Estimated Return",
        data: returnData,
        backgroundColor: "rgba(181, 194, 254, 1)",
         borderRadius: 12,
        stack: "stack1",
      },
      {
        type: "line",
        label: "Total Value",
        data: yearlyData,
        borderColor: "green",
        backgroundColor: "green",
        tension: 0.4,   // 👈 this makes the curve
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "white",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-md-5">
          <div className="mb-4">
            <label>Investment Amount: ₹{amount}</label>
            <input
              type="range"
              className="form-range"
              min="500"
              max="10000000"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Investment Period: {years} Years</label>
            <input
              type="range"
              className="form-range"
              min="1"
              max="40"
              value={years}
              onChange={(e) => setYears(+e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Expected Annual Returns: {rate}%</label>
            <input
              type="range"
              className="form-range"
              min="1"
              max="30"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
            />
          </div>

          <small className="text-muted">
            The calculators provided are for illustration purposes only and do
            not represent actual returns. Mutual fund investments are subject to
            market risks.
          </small>
        </div>

        {/* RIGHT SIDE GRAPH */}
        <div className="col-md-7">
          <div className="card p-3 shadow-sm">
            <Bar data={data} options={options} />

            <div className="d-flex justify-content-around mt-3">
              <div>
                <span style={{color:'rgba(128, 150, 255, 1)'}}>●</span> Investment Amount
                <br />₹{amount}
              </div>

              <div>
                <span style={{color:'rgba(181, 194, 254, 1)'}}>●</span> Estimated Returns
                <br />₹{estimatedReturn}
              </div>

              <div>
                <span className="text-success">●</span> Total Value
                <br />₹{finalValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lumpsum;
