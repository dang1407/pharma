import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import useToken from "../../hooks/useToken";

async function registerUser(credentials) {
  return fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Register = () => {
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();

  const { setToken } = useToken();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await registerUser({
      phone,
      password,
      email,
      address,
      name,
    });
    setToken(token);
    navigate("/account");
  };

  return (
    <div className="register">
      <div className="layout-account">
        
        {/* path */}
        <div className="padding-rl-40">
          <div class="breadcrumb-shop">
            <div
              class=""
              itemscope=""
              itemtype="http://data-vocabulary.org/Breadcrumb"
            >
              <ol class="breadcrumb breadcrumb-arrows">
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/account">Tài khoản</Link>
                </li>
                <li class="active">
                  <span>Ðăng ký</span>
                </li>
              </ol>
            </div>{" "}
          </div>
        </div>

        {/* name-page */}
        <div className="col-md-6 col-xs-12 wrapbox-heading-page">
          <div className="header-page clearfix">
            <h1>Tạo tài khoản</h1>
          </div>
        </div>

        <div className="col-md-6 col-xs-12 wrapbox-content-page">

          {/* register-box */}
          <div id="register" className="userbox">
            <div className="accounttype">
              <h2 className="title">Nhập thông tin</h2>
            </div>

            {/* form */}
            <form
              acceptCharset="UTF-8"
              action="/account"
              id="create_customer"
              method="post"
              onSubmit={handleSubmit}
            >
              <input name="form_type" type="hidden" value="create_customer" />
              <input name="utf8" type="hidden" />

              {/* name box */}
              <div id="name" className="clearfix large_form">
                <label htmlFor="name" className="label icon-field">
                  <i className="icon-login icon-user"></i>
                </label>
                <input
                  type="text"
                  name="customer[name]"
                  placeholder="Tên"
                  id="name"
                  className="text"
                  size="30"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* email box */}
              <div id="email" className="clearfix large_form">
                <label htmlFor="email" className="label icon-field">
                  <i className="icon-login icon-user"></i>
                </label>
                <input
                  type="text"
                  name="customer[email]"
                  placeholder="Email"
                  id="email"
                  className="text"
                  size="30"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* phone box */}
              <div id="phone" className="clearfix large_form">
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

              {/* address box */}
              <div id="address" className="clearfix large_form">
                <label htmlFor="address" className="label icon-field">
                  <i className="icon-login icon-user"></i>
                </label>
                <input
                  type="text"
                  name="customer[address]"
                  placeholder="Địa chỉ"
                  id="address"
                  className="text"
                  size="30"
                  onChange={(e) => setAddress(e.target.value)}
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

              {/* button  */}
              <div className="clearfix action_account_customer">
                <div className="action_bottom button dark">
                  <input
                    type="submit"
                    className="btn btn-signin"
                    value="Đăng ký"
                  />
                </div>
              </div>
              <div className="clearfix req_pass">
                <Link to="/" className="comeback">
                  <i className="fa fa-long-arrow-left"></i> Quay lại trang chủ
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
