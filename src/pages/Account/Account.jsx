import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { CheckError } from "../../utils/CheckError";
import { getAuthHeaders } from "../../utils/GetAuthHeaders";
const Account = () => {
  const [user, setUser] = useState({});
  const { token } = useToken();
  //call API
  useEffect(() => {
    fetch("http://localhost:8080/account", {
      method: "GET",
      headers: getAuthHeaders(),
    })
      .then(CheckError)
      .then((result) => {
        setUser(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    alert("Bạn sẽ đăng xuất sau 5 giây");
    setTimeout(() => {
      window.location.href = "/account/login";
    }, 5);
  };

  return (
    token && (
      <div class="layout-info-account">
        <div class="title-infor-account text-center">
          <h1>Tài khoản của bạn </h1>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-3 sidebar-account">
              <div class="AccountSidebar">
                <h3 class="AccountTitle titleSidebar">Tài khoản</h3>
                <div class="AccountContent">
                  <div class="AccountList">
                    <ul class="list-unstyled">
                      <li class="current">
                        <Link to="/account">Thông tin tài khoản</Link>
                      </li>
                      <li class="last">
                        <a href="/account/logout" onClick={(e) => logOut(e)}>
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>{" "}
            </div>
            <div class="col-xs-12 col-sm-9">
              <div class="row">
                <div class="col-xs-12" id="customer_sidebar">
                  <p class="title-detail">Thông tin tài khoản</p>
                  <h2 class="name_account">{user.name}</h2>
                  <div class="address ">
                    <p></p>
                    <p></p>
                    <p> Vietnam</p>
                    <p>{user.phone}</p>
                    <p>{user.address}</p>
                  </div>
                </div>
                {/* <div class="col-xs-12">
                <div class="customer-table-wrap" id="customer_orders">
                  <div class="customer_order customer-table-bg">
                    <p>Bạn chưa đặt mua sản phẩm.</p>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Account;
