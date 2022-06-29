import { useEffect, useState } from "react";
import { publicIpv4 } from 'public-ip';

const isDomain = (input) => {
  return /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$/.test(input);
}

const isIP = (input) => {
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input);
}

const callApi = async (input, doAfter) => {
  // console.log("local api called");
  const api_url = '/api/ipinfo?';
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

  const url = `${api_url}${requestField}${input}`;
  // console.log(url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}



const IpSearch = ({ onSubmit }) => {

  const [inputText, setInputText] = useState("");
  const [isInitialIPLoaded, setIsInitialIPLoaded] = useState(false);

  useEffect(() => {
    if (!isInitialIPLoaded) {
      publicIpv4()
        .then((userIP) => {
          return callApi(userIP);
        })
        .then((info) => {
          onSubmit(info ?? false);
          setIsInitialIPLoaded(true);
        })
        .catch((error) => console.log(error));
    }
  }, [isInitialIPLoaded, onSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    callApi(inputText).then((info) => {
      onSubmit(info ?? false);
      setInputText("");
    });

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