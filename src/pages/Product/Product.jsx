import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import mockData from "../../mock/product/product";
import useToken from "../../hooks/useToken";
import { CheckError } from "../../utils/CheckError";
import { getAuthHeaders } from "../../utils/GetAuthHeaders";
import NotFound from "../NotFound/NotFound";
const sizeList = ["S", "M", "L", "XL"];
async function addProductToCart(orderInfo, token) {
  return fetch("http://localhost:8080/item/" + orderInfo.itemId, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderInfo),
  })
    .then(CheckError)
    .catch((error) => {
      console.log(error);
    });
}
const Product = () => {
  const navigate = useNavigate();
  let { productId } = useParams();
  const product = mockData.find((product) => product.productId === (productId+""));
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const { token } = useToken();
  const minusQuantity = () => {
    if (selectedQuantity > 1) setSelectedQuantity(selectedQuantity - 1);
  };
  const plusQuantity = () => {
    if (selectedQuantity < 5) setSelectedQuantity(selectedQuantity + 1);
  };
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const handleBuyClick = () => {
    if (!token) {
      alert("Bạn cần đăng nhập để mua hàng.");
      navigate("/account/login");
    } else {
      if (selectedSize === "") alert("Bạn chưa chọn size");
      else {
        addProductToCart(
          { itemId: productId, size: selectedSize, quantity: selectedQuantity },
          token
        );
        setTimeout(() => {
          navigate("/cart");
        }, 400);
      }
    }
  };
  return (
    <>
      {product ? (
        <div id="product" className="productDetail-page">
          <div
            itemprop="offers"
            itemscope=""
            itemtype="http://schema.org/Offer"
          >
            <div className="padding-rl-40">
              <div className="main-content">
                <div className="product-detail-wrapper">
                  <div className="padding-rl-40 breadcrumb-shop">
                    <ol className="breadcrumb breadcrumb-arrows">
                      <li>
                        <Link to="/">Trang chủ</Link>
                      </li>
                      <li>
                        <Link to="/collection/:productId">Thực phẩm chức năng</Link>
                      </li>
                    </ol>
                  </div>
                  <div className="clearfix product-detail-main pr_style_01">
                    <div className="no-pd-l col-md-8 col-sm-12 col-xs-12">
                      <div className="product-gallery">
                        <div className="product-gallery__thumbs-container hidden-sm hidden-xs">
                          <div className="product-gallery__thumbs thumb-fix">
                            {product.thumbImages.map((imgURL) => (
                              <div className="product-gallery__thumb">
                                <div className="product-gallery__thumb-placeholder">
                                  <img alt={product.name} src={imgURL} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="product-image-detail box__product-gallery scroll">
                          <ul
                            id="sliderproduct"
                            className="site-box-content slide_product"
                          >
                            {product.detailImages.map((imgURL) => (
                              <li className="product-gallery-item gallery-item">
                                <img
                                  className="flyImg product-image-feature"
                                  src={imgURL}
                                  alt={product.name}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      className="no-pd-r col-md-4 col-sm-12 col-xs-12 product-content-desc"
                      id="detail-product"
                    >
                      <div className="nameProductDetail" itemprop="name">
                        <h1 style={{ height: 100 }}>{product.name}</h1>
                      </div>
                      {/* <div className="skuProduct">
                        <label>SKU:</label>
                        <span>{product.sku}</span>
                      </div> */}
                      <div className="infoLine1">
                        <div className="product-price" id="price-preview">
                          <span className="pro-price">{product.price}</span>
                          <del>{product.ogPrice}</del>
                        </div>
                      </div>
                      <div className="desProduct" itemprop="description">
                        <h2 className="titleDesProduct">
                          <span>Thông tin sản phẩm:</span>
                        </h2>
                        <div
                          id="ega-uti-editable-content"
                          data-platform="haravan"
                          data-id="1040226379"
                        >
                          <p> <b>Công dụng: </b> {product.congdung}</p>
                          <p> <b>Đối tượng: </b> {product.doituong}</p>
                          <p> <b>Thương hiệu: </b> {product.thuonghieu}</p>
                          <p> <b>Nhà sản xuất: </b> {product.nhasanxuat}</p>
                          <p> <b>Nơi sản xuất: </b> {product.noisanxuat}</p>
                          <p> <b>Dạng bào chế: </b> {product.dangbaoche}</p>
                          <p> <b>Cách đóng gói: </b> {product.cachdonggoi}</p>
                          <p> <b>Hạn sử dụng: </b> {product.hansudung}</p>
                        </div>
                      </div>
                      <form
                        id="add-item-form"
                        action="/cart/add"
                        method="post"
                        className="variants clearfix"
                      >
                        <div className="infoLine2">
                          <div className="select-swatch clearfix ">
                            <div
                              id="variant-swatch-1"
                              className="- checksize  swatch clearfix"
                              data-option="option2"
                              data-option-index="1"
                            >
                              {/* <div className="header hide">Kích thước:</div> */}
                              {/* <div className="select-swap sizeEachSwatch ">
                                {sizeList.map((size) => (
                                  <div className="n-sd swatch-element">
                                    <input
                                      className="variant-1"
                                      id={"swatch-1" + size}
                                      type="radio"
                                      name="option2"
                                      value={size}
                                    />
                                    <label
                                      for={"swatch-1" + size}
                                      className={
                                        selectedSize === size ? "sd" : ""
                                      }
                                      onClick={() => handleSizeSelect(size)}
                                    >
                                      <span>{size}</span>
                                    </label>
                                  </div>
                                ))}
                              </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="selector-actions">
                          <div className="quantity-area clearfix ">
                            <input
                              type="button"
                              value="-"
                              onClick={minusQuantity}
                              className="btn-number qty-btn"
                            />
                            <input
                              type="number"
                              id="quantity"
                              name="quantity"
                              value={selectedQuantity}
                              className="input-number quantity-selector"
                            />
                            <input
                              type="button"
                              value="+"
                              onClick={plusQuantity}
                              className="btn-number qty-btn"
                            />
                          </div>
                          <div className="wrap-addcart clearfix">
                            <button
                              type="button"
                              id="add-to-cart"
                              className="add-to-cartProduct button dark btn-addtocart addtocart-modal"
                              name="add"
                              onClick={handleBuyClick}
                            >
                              Mua ngay
                            </button>
                          </div>
                        </div>
                      </form>
                      <div
                        className="hotlineProduct"
                        style={{ textAlign: "center" }}
                      >
                        <span className="titleHotlineProduct">
                          Mua hàng Online
                          <a
                            style={{ color: "#f00" }}
                            href="tel:1800 1732"
                            title="1800 1732"
                          >
                            1800 1732
                          </a>
                        </span>
                        <span className="timeWorkProduct">
                          Miễn phí từ (8:30 - 17:30) mỗi ngày
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="clear-fix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Product;
