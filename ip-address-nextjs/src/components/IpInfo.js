import React from "react";

const IpInfo = ({ info }) => {
  return (
    <section className="ip-info">
      <div className="ip-info__item">
        <h6 className="ip-info__item--heading">IP Address</h6>
        <p className="ip-info__item--text">{info.ip}</p>
      </div>
      <div className="ip-info__item">
        <h6 className="ip-info__item--heading">Location</h6>
        <p className="ip-info__item--text">{info.location}</p>
      </div>
      <div className="ip-info__item">
        <h6 className="ip-info__item--heading">Timezone</h6>
        <p className="ip-info__item--text">{info.timezone}</p>
      </div>
      <div className="ip-info__item">
        <h6 className="ip-info__item--heading">ISP</h6>
        <p className="ip-info__item--text">{info.isp}</p>
      </div>
    </section>
  );
};

export default IpInfo;