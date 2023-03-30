import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CheckError } from "../../utils/CheckError";
import useToken from "../../hooks/useToken";
import "./LogIn.css";
async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then(CheckError)
    .catch((error) => {
      console.log(error);
    });
}

const LogIn = () => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { setToken } = useToken();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      phone,
      password,
    });
    console.log(token);
    setToken(token);
    navigate("/collections/");
  };

  function showRecoverPasswordForm() {
    document.getElementById("recover-password").style.display = "block";
    document.getElementById("login").style.display = "none";
  }

  function hideRecoverPasswordForm() {
    document.getElementById("recover-password").style.display = "none";
    document.getElementById("login").style.display = "block";
  }

  return (
    <div className="login">
      <div className="layout-account">
        {/* path */}
        <div className="padding-rl-40 breadcrumb-shop">
          <ol className="breadcrumb breadcrumb-arrows">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/account">Tài khoản</Link>
            </li>
            <li className="active">
              <span>Đăng nhập</span>
            </li>
          </ol>
        </div>

        {/* name-page */}
        <div className="col-md-6 col-xs-12 wrapbox-heading-page">
          <div className="header-page clearfix">
            <h1>Đăng nhập</h1>
          </div>
        </div>

        <div className="col-md-6 col-xs-12 wrapbox-content-page">
          {/* login box */}
          <div id="login" className="userbox">
            <div className="accounttype">
              <h2 className="title">Nhập thông tin</h2>
            </div>

            {/* form */}
            <form
              acceptCharset="UTF-8"
              action="/account/login"
              id="customer_login"
              method="post"
              onSubmit={handleSubmit}
            >
              <input name="form_type" type="hidden" value="customer_login" />
              <input name="utf8" type="hidden" />

              {/* phone box */}
              <div className="clearfix large_form">
                <label htmlFor="phone" className="label icon-field">
                  <i className="icon-login icon-phone"></i>
                </label>
                <input
                  required
                  type="text"
                  name="customer[phone]"
                  placeholder="Số điện thoại"
                  id="phone"
                  className="text"
                  size="30"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* password box */}
              <div className="clearfix large_form">
                <label htmlFor="customer_password" className="icon-field">
                  <i className="icon-login icon-shield"></i>
                </label>
                <input
                  required
                  type="password"
                  name="customer[password]"
                  id="customer_password"
                  placeholder="Mật khẩu"
                  className="text"
                  size="16"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* button */}
              <div className="clearfix action_account_customer">
                <div className="action_bottom button dark">
                  <input
                    type="submit"
                    className="btn btn-signin"
                    value="Đăng nhập"
                  />
                </div>
                <div className="req_pass">
                  <Link to="/account/login" onClick={showRecoverPasswordForm}>
                    Quên mật khẩu?
                  </Link>
                  <br />
                  hoặc{" "}
                  <Link to="/account/register" title="Đăng ký">
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>

          {/* recover password box */}
          <div
            id="recover-password"
            className="userbox"
            style={{ display: "none" }}
          >
            <div className="accounttype">
              <h2>Khôi phục mật khẩu</h2>
            </div>

            <form acceptCharset="UTF-8" action="/account/recover" method="post">
              <input
                name="form_type"
                type="hidden"
                value="recover_customer_pasword"
              />
              <input name="utf8" type="hidden" />

              {/* phone box */}
              <div id="phone" className="clearfix large_form">
                <label htmlFor="phone" className="label icon-field">
                  <i className="icon-login icon-phone"></i>
                </label>
                <input
                  required
                  onkeyup="this.value=this.value.replace(/[^a-z,0-9]/g,'');"
                  type="text"
                  name="customer[phone]"
                  placeholder="Số điện thoại"
                  id="phone"
                  className="text"
                  size="30"
                />
              </div>

              {/* button */}
              <div className="clearfix action_account_customer">
                <div className="action_bottom button dark">
                  <input type="submit" className="btn" value="Gửi" />
                </div>
                <div className="req_pass">
                  <Link to="/account/login" onClick={hideRecoverPasswordForm}>
                    Hủy
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
