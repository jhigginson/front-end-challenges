import { useCallback, useEffect, useState } from "react";
import "./IpSearch.css";


const isDomain = (input) => {
  return /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$/.test(input);
}

const isIP = (input) => {
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input);
}

const callIpify = (input, doAfter) => {
  const api_key = process.env.REACT_APP_IPIFY_KEY;
  const api_url = 'https://geo.ipify.org/api/v2/country,city?';
  let requestField = "";
  if (isIP(input)) {
    requestField = '&ipAddress=';
  } else if (isDomain(input)) {
    requestField = '&domain=';
  } else if (input === "") {
    requestField = "";
  }
  else {
    alert("Please enter a valid ip or domain name");
    return false;
  }

  const url = `${api_url}apiKey=${api_key}${requestField}${input}`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(doAfter)
    .catch((e) => {
      console.error(e);
    });
}



const IpSearch = (props) => {

  const [inputText, setInputText] = useState("");

  const fillInfo = (data) => {
    if (data.ip) {
      // console.log(data);
      const locInfo = {
        ip: data.ip,
        location: `${data.location.city}, ${data.location.region} ${data.location.postalCode}`,
        timezone: `UTC ${data.location.timezone}`,
        isp: data.isp,
        lat: data.location.lat,
        long: data.location.lng
      };
      props.onSubmit(locInfo);
    } else {
      alert("Hmm... something went wrong with calling the API.");
    }
  };

  useEffect(() => {
    callIpify("", fillInfo);
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputText);
    callIpify(inputText, fillInfo);
    setInputText("");
  };



  return (
    <form onSubmit={handleSubmit} className="search-form" autoComplete="off">
      <input className="search-form__text"
        type="text"
        id="search-text"
        name="search-text"
        placeholder="Search for any IP address or domain"
        onChange={event => setInputText(event.target.value)}
        value={inputText}
        required
      />
      <button type="submit" className="button"><img src="/images/icon-arrow.svg" alt="" /></button>
    </form>
  );
};

export default IpSearch;