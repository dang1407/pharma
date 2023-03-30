import { Link } from "react-router-dom";
import "./Cart.css";
import React, { useState, useEffect } from "react";
import useToken from "../../hooks/useToken";
import { CheckError } from "../../utils/CheckError";
import mockData from "../../mock/product/product";
import { getAuthHeaders } from "../../utils/GetAuthHeaders";
const Cart = () => {
  const [productList, setProductList] = useState([]);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const { token } = useToken();
  //call API
  useEffect(() => {
    fetch("http://localhost:8080/cart", {
      method: "GET",
      headers: getAuthHeaders(),
    })
      .then(CheckError)
      .then((result) => {
        //copy item to listProduct
        // set State

        setProductList(
          result.cartItems.map((item) => {
            return {
              ...item,
              price: parseInt(item.price),
              quantity: parseInt(item.quantity),
              cartImage: mockData.find(
                (product) => product.productId == item.itemId
              ).cartImage,
            };
          })
        );
        setTotalPurchase(
          result.cartItems.reduce(
            (accumulator, item) =>
              accumulator + parseInt(item.quantity) * parseInt(item.price),
            0
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function addProduct(index) {
    setProductList(
      [...productList].map((item, _index) => {
        if (_index == index && item.quantity < 5) {
          item.quantity += 1;
          setTotalPurchase(totalPurchase + item.price);
        }
        return item;
      })
    );
  }

  function removeProduct(index) {
    setProductList(
      [...productList].map((item, _index) => {
        if (_index == index && item.quantity > 1) {
          item.quantity -= 1;
          setTotalPurchase(totalPurchase - item.price);
        }
        return item;
      })
    );
  }

  const handlePayment = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/cart", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(CheckError)
      .then((result) => {
        alert("Thanh toán thành công");
        setProductList([]);
        setTotalPurchase(0);
      })
      .catch((error) => {
        console.log(error);
        alert("Thanh toán không thành công");
      });
  };

  return (
    token && (
      <div className="layout-cart">
        <div className="padding-rl-40">
          <div className="breadcrumb-shop">
            <div className="" itemType="http://data-vocabulary.org/Breadcrumb">
              <ol className="breadcrumb breadcrumb-arrows">
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="active">
                  <span>Giỏ hàng</span>
                </li>
              </ol>
            </div>{" "}
          </div>
        </div>
        <div className="padding-rl-40">
          <div className="wrapbox-content-cart">
            {/* <div
            hidden
            className=" span12 expanded-message text-center"
            style={{ margin: "80px auto" }}
          >
            Giỏ hàng của bạn đang trống
            <p className="link-continue">
              <Link to="/collection/all" className="button dark">
                <i className="fa fa-reply"></i> Tiếp tục mua hàng
              </Link>
            </p>
          </div> */}

            <div className="cart-container">
              <div className="cart-col-left ">
                <div className="main-content-cart">
                  <form id="cartformpage" onSubmit={(e) => handlePayment(e)}>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div id="cart">
                          <table className="table-cart">
                            <thead className="hidden-xs">
                              <tr>
                                <th className="remove tableDelete">
                                  <span></span>
                                </th>
                                <th className="image tableImage">
                                  <span>Hình ảnh</span>
                                </th>
                                <th className="tableName">
                                  <span>Sản phẩm</span>
                                </th>
                                <th className="price tablePrice">
                                  <span>Giá</span>
                                </th>
                                <th className="qty tableQuantity">
                                  <span>Số lượng</span>
                                </th>
                                <th className="total tableTotal">
                                  <span></span>
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {productList.map((product, index) => (
                                <tr
                                  key={product.index}
                                  className="line-item-container"
                                >
                                  <td className="remove text-center hidden-xs">
                                    <a
                                      href=""
                                      onClick={(e) => {
                                        e.preventDefault();
                                        alert(
                                          "Bạn không thể xóa vì tính năng này chưa có :))"
                                        );
                                      }}
                                    >
                                      <svg
                                        width="20"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="auto"
                                        viewBox="0 0 64 64"
                                        enableBackground="new 0 0 64 64"
                                      >
                                        <g>
                                          <path
                                            fill="#1D1D1B"
                                            d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"
                                          ></path>
                                        </g>
                                      </svg>
                                    </a>
                                  </td>
                                  <td className="image text-center">
                                    <div className="product_image_cart">
                                      <Link
                                        to={"/collections/" + product.itemId}
                                      >
                                        <img
                                          src={product.cartImage}
                                          alt={product.name}
                                        />
                                      </Link>
                                      <p className="visible-xs">
                                        <a
                                          className="btnDeleteCart"
                                          href="/cart/change?line=1&amp;quantity=0"
                                        >
                                          Xóa
                                        </a>
                                      </p>
                                    </div>
                                  </td>
                                  <td className="tableName">
                                    <span className="nameInCart">
                                      <Link
                                        to={"/collections/" + product.itemId}
                                      >
                                        <h3>{product.name}</h3>
                                      </Link>
                                      <p className="variant">
                                        <span className="variant_title">
                                          {product.size}
                                        </span>
                                      </p>
                                    </span>
                                    <div className="visible-xs">
                                      <p>
                                        <span>{product.price}đ</span>
                                      </p>
                                      <p className="visible-xs">
                                        Thành tiền:{" "}
                                        <span className="line-item-total">
                                          {product.price * product.quantity}đ
                                        </span>
                                      </p>
                                    </div>
                                  </td>
                                  <td className="price text-center priceLine hidden-xs">
                                    <p>
                                      <span>{product.price}đ</span>
                                    </p>
                                  </td>
                                  <td className="qty text-center">
                                    <div className="qty quantity-partent qty-click clearfix">
                                      <button
                                        onClick={() => removeProduct(index)}
                                        type="button"
                                        className="qtyminus qty-btn"
                                      >
                                        -
                                      </button>
                                      <input
                                        readOnly=""
                                        type="text"
                                        size="4"
                                        name="updates[]"
                                        min="1"
                                        id={"updates" + product.itemId}
                                        value={productList[index].quantity}
                                        className="tc line-item-qty item-quantity"
                                      />

                                      <button
                                        onClick={() => addProduct(index)}
                                        type="button"
                                        className="qtyplus qty-btn"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className="total text-center hidden-xs">
                                    <p className="price">
                                      <span className="line-item-total">
                                        {product.price * product.quantity}đ
                                      </span>
                                    </p>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-9 col-sm-12 col-xs-12">
                        <div className="checkout-note clearfix">
                          <label className="clearfix">Ghi chú: </label>
                          <textarea
                            id="note"
                            name="note"
                            rows="8"
                            cols="50"
                          ></textarea>
                          <div className="promotion304">
                            <ul>
                              <li>
                                <img
                                  src="https://file.hstatic.net/200000000133/file/checked_policy_88963cf2ccb048e89303d8799c47c3e0.png"
                                  alt="Vận chuyển"
                                />
                                Miễn phí giao hàng cho hóa đơn từ 699.000đ
                              </li>
                              <li>
                                <img
                                  src="https://file.hstatic.net/200000000133/file/checked_policy_88963cf2ccb048e89303d8799c47c3e0.png"
                                  alt="Vận chuyển"
                                />
                                Phí giao hàng 20.000đ cho hóa đơn dưới 699.000đ
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-12 col-xs-12 text-right">
                        <p className="order-infor">
                          Tổng cộng:
                          <span className="total_price">
                            <b>{totalPurchase}đ</b>
                          </span>
                        </p>

                        <div className="cart-buttons">
                          <button
                            type="submit"
                            id="checkout"
                            className="checkLimitCart btnStyle"
                            name="checkout"
                          >
                            Thanh toán
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;
