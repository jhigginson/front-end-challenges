// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { useDebugValue } from "react";

const isDomain = (input) => {
  return /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$/.test(input);
}

const isIP = (input) => {
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(input);
}

function handler(req, res) {
  if (req.method === 'GET') { //do this for each verb you want to support in your api
    const ip = req.query.ipAddress ?? null;
    const domain = req.query.domain ?? null;
    let param = "";
    let requestField = "";
    if (ip && isIP(ip)) {
      requestField = '&ipAddress=';
      param = ip;
    } else if (domain && isDomain(domain)) {
      requestField = '&domain=';
      param = domain;
    } else {
      return res.status(404).json({ message: "ipAddress or domain query params required" });
    }
    const api_key = process.env.IPIFY_KEY;
    const api_url = process.env.IPIFY_URL;

    const url = `${api_url}apiKey=${api_key}${requestField}${param}`;



    fetch(url)
      .then((ipifyRes) => ipifyRes.json())
      .then((ipifyData) => {
        if (ipifyData.location) {
          return res.status(200).json({
            ip: ipifyData.ip,
            location: `${ipifyData.location.city}, ${ipifyData.location.region} ${ipifyData.location.postalCode}`,
            timezone: `UTC ${ipifyData.location.timezone}`,
            isp: ipifyData.isp,
            lat: ipifyData.location.lat,
            long: ipifyData.location.lng
          });
        } else {
          return res.status(404).json({ message: "couldn't fetch data from ipify" });
        }
      })
      .catch((error) => {
        return res.status(404).json({ message: "couldn't fetch data from ipify" });
      });
  }
};

export default handler;
