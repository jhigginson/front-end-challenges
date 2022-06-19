import Head from 'next/head';
import Image from 'next/image';
import { useState } from "react";
import IpInfo from '/src/components/IpInfo.js';
import IpSearch from '/src/components/IpSearch.js';
// import Map from '/src/components/Map';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('/src/components/Map'), {ssr: false});

export default function Home() {
  const [locationInfo, setLocationInfo] = useState({
    ip: "-",
    location: "-",
    timezone: "-",
    isp: "-",
    lat: 51.505,
    long: -0.09
  });

  const handleNewSearch = (info) => {
    setLocationInfo(info);
  };

  return (
    <>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
        <meta
          name="description"
          content="IP Address Tracker - A Frontend Mentor Challenge coded by John Higginson"
        />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <header className="App-header">
      </header>
      <DynamicMap info={locationInfo} />
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
};
