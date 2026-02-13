import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Nps = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [frequency, setFrequency] = useState("monthly");
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(60);
  const [rate, setRate] = useState(10);
  const [annuityRate, setAnnuityRate] = useState(40);

  const years = retirementAge - currentAge;

  const frequencyMap = {
    monthly: 12,
    quarterly: 4,
    yearly: 1,
  };

  const paymentsPerYear = frequencyMap[frequency];
  const totalPayments = years * paymentsPerYear;
  const periodicRate = rate / 100 / paymentsPerYear;

  // Future Value of SIP
  const corpus =
    monthlyInvestment *
    ((Math.pow(1 + periodicRate, totalPayments) - 1) / periodicRate) *
    (1 + periodicRate);

  const totalInvested = monthlyInvestment * totalPayments;

  const lumpSum = corpus * 0.6;
  const annuityAmount = corpus * 0.4;

  const monthlyPension = (annuityAmount * annuityRate) / 100 / 12;

  const gains = corpus - totalInvested;

  // Tax benefit (80CCD(1B)) max ₹50,000 per year
  const yearlyInvestment = monthlyInvestment * paymentsPerYear;
  const taxSaved = Math.min(yearlyInvestment, 50000);

  const data = {
    labels: ["Gains", "Amount Invested"],
    datasets: [
      {
        data: [gains, totalInvested],
        backgroundColor: ["#6ea8fe", "#b197fc"],
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* LEFT */}
        <div className="col-md-5">

          <div className="mb-3">
            <label>Investment Amount: ₹{monthlyInvestment}</label>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Investment Frequency</label>
            <select
              className="form-select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Expected Return: {rate}%</label>
            <input
              type="range"
              min="5"
              max="15"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Current Age: {currentAge} Years</label>
            <input
              type="range"
              min="18"
              max="50"
              value={currentAge}
              onChange={(e) => setCurrentAge(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Retirement Age: {retirementAge} Years</label>
            <input
              type="range"
              min="40"
              max="65"
              value={retirementAge}
              onChange={(e) => setRetirementAge(+e.target.value)}
              className="form-range"
            />
          </div>

          <div className="mb-3">
            <label>Annuity Rate: {annuityRate}%</label>
            <input
              type="range"
              min="4"
              max="10"
              value={annuityRate}
              onChange={(e) => setAnnuityRate(+e.target.value)}
              className="form-range"
            />
          </div>

        </div>

        {/* RIGHT */}
        <div className="col-md-7">
          <div className="card p-3 shadow-sm text-center">

            <div style={{ width: "280px", margin: "0 auto" }}>
              <Doughnut data={data} />
            </div>

            <h5 className="mt-3">Total Corpus</h5>
            <h4>₹{Math.round(corpus).toLocaleString()}</h4>

            <div className="row mt-3">
              <div className="col-4">
                <small>Amount Invested</small>
                <p>₹{Math.round(totalInvested).toLocaleString()}</p>
              </div>
              <div className="col-4">
                <small>Maturity Amount</small>
                <p>₹{Math.round(corpus).toLocaleString()}</p>
              </div>
              <div className="col-4">
                <small>Gains</small>
                <p>₹{Math.round(gains).toLocaleString()}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-start">Pension / month</div>
              <div className="col-6 text-end">
                ₹{Math.round(monthlyPension).toLocaleString()}
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-start">Lumpsum Withdrawal</div>
              <div className="col-6 text-end">
                ₹{Math.round(lumpSum).toLocaleString()}
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-start">Annuity Reinvested</div>
              <div className="col-6 text-end">
                ₹{Math.round(annuityAmount).toLocaleString()}
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-start">Tax Saved (Yearly)</div>
              <div className="col-6 text-end">
                ₹{taxSaved.toLocaleString()}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Nps;
