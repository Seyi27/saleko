import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { Link, useNavigate } from "react-router-dom";
import NavHeader from "../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../components/nav-categories/NavCategories";
import CustomButton from "../../components/custom-button/CustomButton";
import CartItem from "../../components/cart-item/CartItem";
import { productData } from "../../helpers/Data";
import Footer from "../../components/footer/Footer";
import ProductSection from "../../components/product-section/ProductSection";
import { Product } from "../../types/types";
import { BsChevronDown } from "react-icons/bs";
import empty_cart from "../../assets/images/svg/empty_cart.svg";

const CartPage = () => {
  //   const data = productData.slice(0, 4);
  const data: Product[] = [];
  const [visibleRows, setVisibleRows] = useState(2);
  const [rowData, setRowData] = useState<Product[][]>([]);
  const navigate = useNavigate();

  const handleMoreButton = () => {
    setVisibleRows((prev) => prev + 1);
  };

  return (
    <div>
      <NavHeader />

      <NavHeaderSearch />

      <NavCategories />

      <div className="body_container">
        <div className="body_second_container">
          <div className="cart_main_container">
            <div className="cart_breadcrumbs_container">
              <Link to={"/"} className="cart_inactive_link">
                Home
              </Link>
              <span style={{ color: "#a3a9c2" }}>/</span>
              <Link to={"/cart"} className="cart_active_link">
                Cart
              </Link>
            </div>

            <div style={{ marginTop: "30px" }}>
              <h1>Cart(5)</h1>

              <div className="cart_body_container">
                {/* Cart items */}
                <div className="cart_items_container">
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <div key={index}>
                        <CartItem item={item} />

                        {index < data.length - 1 && (
                          <hr
                            style={{
                              border: "1px solid #E7E9EB",
                              marginTop: "15px",
                              marginBottom: "15px",
                            }}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="empty_cart_container">
                      <img src={empty_cart} className="empty_cart_image" />
                      <h3>Your shopping cart is empty</h3>
                      <p>Add your favorite items in it.</p>
                      <CustomButton
                        label="Start Shopping"
                        width={"30%"}
                        height="44px"
                        bgColor="#084c3f"
                        borderColor="#FFFFFF"
                        borderWidth="1px"
                        textColor="white"
                        fontSize={14}
                        fontWeight={700}
                        onClick={() => navigate("/")}
                      />
                    </div>
                  )}
                </div>

                {/* Cart Summary */}
                <div className="cart_summary">
                  <p className="cart_summary_text">Cart Summary</p>

                  <div style={{ border: "1px solid #E7E9EB" }} />

                  <div className="subtotal_container">
                    <p className="subtotal_text">Subtotal</p>
                    <p className="subtotal_amount">₦300,000.00</p>
                  </div>
                  <span className="delivery_fees_text">
                    Delivery fees not included yet.
                  </span>

                  <div style={{ marginTop: "30px" }}>
                    <CustomButton
                      label="Checkout (₦300,000.00)"
                      width={"100%"}
                      height="44px"
                      bgColor="#084c3f"
                      borderColor="#FFFFFF"
                      borderWidth="1px"
                      textColor="white"
                      fontSize={14}
                      fontWeight={700}
                      onClick={() => navigate("/checkout")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ProductSection
              name={"Recommended Products"}
              data={productData}
              type="related"
              visibleRows={visibleRows}
              setRowData={setRowData}
              viewAll
            />

            {/* {visibleRows < rowData.length && (
              <button className="view_more_buton" onClick={handleMoreButton}>
                View More
                <BsChevronDown size={12} color={"white"} />
              </button>
            )} */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
