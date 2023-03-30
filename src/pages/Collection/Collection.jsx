import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mockData from "../../mock/product/product";
import "./Collection.css";
import {TfiFilter} from "react-icons/tfi";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const catgoryList = [
  { name: "Giải độc mát gan", id: "shirt" },
  { name: "Giải nhiệt miệng", id: "pant" },
  { name: "Giải rượu", id: "dress" },
  // { name: "Tất cả sản phẩm", id: "all" },
];
const Collection = () => {
  const [productList, setProductList] = useState(mockData);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fetchData = (selectedCategory) => {
    try {
      fetch("localhost:8080/item/category/" + selectedCategory)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setProductList(data);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);
  const handleCatgoryClick = (e) => {
    e.preventDefault();
    setSelectedCategory(e.target.id);
    setProductList(
      mockData.filter(
        (product) => product.category === e.target.id || e.target.id === "all"
      )
    );
  };
  const catgoryListGen = catgoryList.map((catgory) => (
    <li>
      <a href="" id={catgory.id} onClick={handleCatgoryClick}>
        {catgory.name}
      </a>
    </li>
  ));
  const productListGen = productList.map((product) => (
    <div class="col-md-3 col-sm-6 col-xs-6 pro-loop animated zoomIn">
      <div class="product-block">
        <div class="product-img">
          {/* <div class="label-sale">-70%</div> */}

          <Link
            to={`${product.productId}`}
            title={product.name}
            class="image-resize"
          >
            <img
              class="img-loop"
              alt={product.name}
              src={product.detailImages[0]}
            />
          </Link>
        </div>
        <div class="product-detail clearfix">
          <div class="box-pro-detail">
            <p class="pro-name">
              <Link to={`${product.productId}`} title={product.name}>
                {product.name}
              </Link>
            </p>
            <div class="box-pro-prices">
              <p class="pro-price highlight">
                <span>{product.price}</span>
                <span class="pro-price-del">
                  <del class="compare-price">{product.ogPrice}</del>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  ));
return (
    <div id="collection" className="collection-page">
      <div className="padding-rl-40">
        <div className="main-content">
        <div className="padding-rl-40 breadcrumb-shop">
          <ol className="breadcrumb breadcrumb-arrows">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/collection">Thực phẩm chức năng</Link>
            </li>
          </ol>
        </div>
          <div class="breadcrumb-shop">
            <div
              class=""
              itemscope=""
              itemtype="http://data-vocabulary.org/Breadcrumb"
            >
            </div>{" "}
          </div>
          <div className=" banner-collection-header"></div>
          <div id="collection-body" className="wrap-collection-body clearfix">
            <div className="wrap-collection-title">
              <div className="heading-collection">
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                
                  {/* Menu */}
                  <ul className="menuCollection">
                    <a className="btn_item"><TfiFilter/>Lọc</a>
                    <a className="btn_item">Giải độc rượu</a>
                    <a className="btn_item">Giảm nhiệt miệng</a>
                    <a className="btn_item">Giải độc gan</a>
                  </ul>
                </div>
                
              </div>
            </div>
            <div className="clear-fix filter-here">
              <div className="alert-no-filter"></div>
              <div className="bigProductNoFilter content-product-list product-list filter clearfix">
                <div className="row">{productListGen}</div>
              </div>
            </div>
          </div>
        </div>

        <input
          type="text"
          className="hidden"
          id="coll-handle"
          value="(collectionid:product=1002349342)"
        />
        <input
          type="text"
          className="hidden"
          id="coll-url"
          value="/collections/san-pham"
        />
      </div>
    </div>
  );
};

export default Collection;
