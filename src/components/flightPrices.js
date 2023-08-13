import React, { useState } from 'react';

const FlightPrices = ()=> {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flightPrices, setFlightPrices] = useState('');
  const [error, setError] = useState(null);

  const fetchFlightPrices = async () => {
    try {
        const response = await fetch('https://assignmetnflightaegiscovent.onrender.com/flight-prices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ source, destination, date })
        });
        
        const data = await response.json();
        setFlightPrices(data);
        console.log(data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError('Error fetching flight prices. Please check your input.');
        setFlightPrices(null);
      }
  };

  return (
    <div className="App">
      <h1>Flight Price Checker</h1>
      <div className="input-container">
        <label>Source: </label>
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Destination: </label>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Date: </label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button onClick={fetchFlightPrices}>Fetch Prices</button>
      {error && <p className="error">{error}</p>}
      {flightPrices && (
        <div className="flight-prices">
          <h2>Flight Prices</h2>
          <p>Indigo: {flightPrices.indigo}</p>
          <p>AirAsia: {flightPrices.airAsia}</p>
          <p>Vistara: {flightPrices.vistara}</p>
        </div>
      )}
    </div>
  );
}

export default FlightPrices;