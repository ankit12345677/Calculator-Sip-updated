import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Revenue = () => {
  const [currentAmount, setCurrentAmount] = useState(25000);
  const [sipBook, setSipBook] = useState(25000);
  const [lumpsumSales, setLumpsumSales] = useState(25000);
  const [newSip, setNewSip] = useState(25000);
  const [rate, setRate] = useState(25);   // for future growth use
  const [trail, setTrail] = useState(25); // brokerage %

  const years = 10;

  const rows = Array.from({ length: years }, (_, i) => {
    const year = i + 1;

    // SIP & Lumpsum AUM
    const sipBOOK = sipBook;
    const sipAUM = sipBook + (newSip * year * 12);
    const lumpsumAUM = currentAmount + lumpsumSales * year * 12;

    // Total AUM
    const totalAUM = sipAUM + lumpsumAUM;

    // Brokerage calculation (using trail %)
    const cumulativeBrokerage = (totalAUM * trail) / 100;

    // Monthly trail income
    const monthlyTrail = cumulativeBrokerage / 12;

    return {
      year,
      sipBookValue: sipBOOK,
      lumpsumAUM,
      sipAUM,
      totalAUM,
      cumulativeBrokerage,
      monthlyTrail,
    };
  });

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {/* LEFT INPUT PANEL */}
        <div className="col-md-3">
          <div className="mb-3">
            <label>Current Amount</label>
            <input
              type="number"
              className="form-control"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(+e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Current SIP Book</label>
            <input
              type="number"
              className="form-control"
              value={sipBook}
              onChange={(e) => setSipBook(+e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Net Lumpsum Sales / month</label>
            <input
              type="number"
              className="form-control"
              value={lumpsumSales}
              onChange={(e) => setLumpsumSales(+e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>New SIPs Registered / month</label>
            <input
              type="number"
              className="form-control"
              value={newSip}
              onChange={(e) => setNewSip(+e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Rate of Return (%)</label>
            <input
              type="number"
              className="form-control"
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Trails (%)</label>
            <input
              type="number"
              className="form-control"
              value={trail}
              onChange={(e) => setTrail(+e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT TABLE */}
        <div className="col-md-9">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>Year</th>
                  <th>SIP Book</th>
                  <th>Lumpsum AUM</th>
                  <th>SIP AUM</th>
                  <th>Total AUM</th>
                  <th>Cumulative Brokerage</th>
                  <th>Monthly Trail</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.year}>
                    <td>{r.year}</td>
                    <td>₹{r.sipBookValue.toLocaleString()}</td>
                    <td>₹{r.lumpsumAUM.toLocaleString()}</td>
                    <td>₹{r.sipAUM.toLocaleString()}</td>
                    <td>₹{r.totalAUM.toLocaleString()}</td>
                    <td>₹{r.cumulativeBrokerage.toLocaleString()}</td>
                    <td>₹{r.monthlyTrail.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <small className="text-muted">
            The calculators provided are for illustration purposes only and do not represent actual returns. Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
