import React from "react";
import "./Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const Footer = () => {
  return (
    <footer id="sectionFooter" className="clear-fix">
      <div className="padding-rl-40">
        <div className="innerFooter">
          <div className="col-xs-12 col-footer-two">
            <div className="innerMenuFooter">
              <h4>
                Tổng đài
                <i className=""></i>
              </h4>
              <ul>
                <li className="about">Số điện thoại: 0123456789</li>
                <li className="about">Khiếu nại: 0123456789</li>
              </ul>
            </div>
          </div>

          <div className="col-xs-12 col-footer-two">
            <div className="innerMenuFooter">
              <h4>Hệ thống nhà thuốc</h4>
              <ul>
                <li className="about">Hệ thống 232 nhà thuốc</li>
                <li className="about">Nội quy nhà thuốc</li>
                <li className="about">Chất lượng phục vụ</li>
                <li className="about">Chính sách đổi trả</li>
                <li className="about">Tích điểm quà tặng</li>
              </ul>
            </div>
          </div>

          <div className="col-xs-12 col-footer-two">
            <div className="innerMenuFooter">
              <h4>Hỗ trợ khách hàng</h4>
              <ul>
                <li className="about">Điều kiện giao dịch</li>
                <li className="about">Hướng dẫn mua hàng online</li>
                <li className="about">Chính sách giao hàng</li>
                <li className="about">Chính sách thanh toán</li>
              </ul>
            </div>
          </div>
          
          <div className="col-xs-12 col-footer-two">
            <div className="innerMenuFooter">
              <h4>Về nhà thuốc Chanh Pharma</h4>
              <ul>
                <li className="about">Giới thiệu</li>
                <li className="about">Chính sách bảo mật thông tin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
