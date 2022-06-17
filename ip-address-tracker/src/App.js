import { useState } from "react";
import './App.css';
import IpInfo from './IpInfo';
import IpSearch from './IpSearch';
import Map from './Map';

function App() {
  const [locationInfo, setLocationInfo] = useState({
    ip: "-",
    location: "-",
    timezone: "-",
    isp: "-",
    lat: 51.505,
    long: -0.09
  })

  const handleNewSearch = (info) => {
    setLocationInfo(info);
  };

  return (
    <>
      <header className="App-header">
      </header>
      <Map info={locationInfo} />
      <main className="overlay">
        <h1>IP Address Tracker</h1>
        <IpSearch onSubmit={handleNewSearch} />
        <IpInfo info={locationInfo} />
      </main>
      <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="#">John Higginson</a>.
      </footer>
    </>
  );
}

export default App;
