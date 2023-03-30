import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div id="404" class="pageAbout-us page404 page-layout">
      <div class="padding-rl-40">
        <div class="main-content">
          <div class="breadcrumb-shop">
            <div
              class=""
              itemscope=""
              itemtype="http://data-vocabulary.org/Breadcrumb"
            >
              <ol class="breadcrumb breadcrumb-arrows">
                <li>
                  <Link to="/" target="_self">
                    Trang chủ
                  </Link>
                </li>
                <li class="active">Lỗi 404</li>
              </ol>
            </div>{" "}
          </div>
          <div class="page-wrapper margin-tb-50">
            <div class="content-pagenot">
              <h1>Không tìm thấy trang</h1>
              <p class="subtext">Xin lỗi, chúng tôi không tìm thấy trang này</p>
              <Link to="/">Trở về trang chủ</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
