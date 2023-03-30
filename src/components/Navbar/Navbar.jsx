import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import {TfiAngleDown} from "react-icons/tfi";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const Navbar = () => {
  return (
    <div className="fix-position padding-lr-0 hidden-xs hidden-sm hidden-md col-lg-7">
      <div className="main-menu hidden-xs hidden-sm hidden-md">
        <div id="nav">
          <nav className="main-nav">
            <ul className="clearfix" >
              <li>
                <a href="/collection" >Thuốc<TfiAngleDown className="i_angle_down"/></a>
              </li><li>
                <a href="/collection" >Thực phẩm chức năng<TfiAngleDown className="i_angle_down"/></a>
              </li><li>
                <a href="/collection" >Thiết bị, dụng cụ y tế<TfiAngleDown className="i_angle_down"/></a>
              </li><li>
                <a href="/collection" >Mỹ phẩm<TfiAngleDown className="i_angle_down"/></a>
              </li><li>
                <a href="/collection" >Chăm sóc cá nhân<TfiAngleDown className="i_angle_down"/></a>
              </li>
            </ul>
            
          </nav>
        </div>{" "}
      </div>
    </div>
  );
};

export default Navbar;
