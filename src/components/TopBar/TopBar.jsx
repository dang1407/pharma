import React from "react";
import "./TopBar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const TopBar = () => {
  return (
    <div className="topbar">
      <div className="padding-lr-0 col-xs-12 col-sm-8 col-md-8 col-lg6">
        <div className="innerTopbar">
          <span className="hight-space">-</span>
          <span>
            <a
              href="tel:18001731"
              title="Mọi thắc mắc hoặc phản hồi dịch vụ, xin liên hệ hotline CSKH:  18001731 "
            >
              Mọi thắc mắc hoặc phản hồi dịch vụ, xin liên hệ hotline CSKH:{" "}
              <b>18001731 </b>
            </a>
          </span>
          <span>-</span>
          <span>
            <a href="tel:18001732." title="Mua hàng Online: 18001732.">
              Mua hàng Online: <b>18001732.</b>
            </a>
          </span>
        </div>
      </div>
      <div className="padding-lr-0 col-xs-12 col-sm-4 col-md-4 col-lg6">
        <div className="innerTopbar text-right"></div>
      </div>
    </div>
  );
};

export default TopBar;
