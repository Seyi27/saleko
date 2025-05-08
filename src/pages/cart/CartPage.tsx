import React, { useEffect, useMemo, useState } from "react";
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
import { BsChevronDown } from "react-icons/bs";
import empty_cart from "../../assets/images/svg/empty_cart.svg";
import { Product } from "../../types/productTypes";
import PageWrapper from "../../components/page-wrapper/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { formatPrice } from "../../helpers/helper";
import { showCustomToast } from "../../components/custom-toast/CustomToast";
import { useLazyGetAllProductsByCategoryQuery } from "../../services/productsApi";
import { TailSpin } from "react-loader-spinner";
import AuthModal from "../../components/auth/auth-modal/AuthModal";
import { addActiveScreen } from "../../slice/authValueSlice";

const CartPage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [totalFetchedCategoryData, setTotalFetchedCategoryData] =
    useState<number>(0);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] =
    useState<number>(12);
  const [viewMoreLoader, setViewMoreLoader] = useState(false);
  const [categoryName, setCategoryName] = useState<string | undefined>("");

  const [getAllProductsByCategory, { isLoading: categoryLoader }] =
    useLazyGetAllProductsByCategoryQuery();

  const [price, setPrice] = useState(0);

  const user = useSelector((state: RootState) => state.userDetails.user);
  const cartItems = useSelector(
    (state: RootState) => state.cart.user_cart?.items
  );
  const guestPrice = useSelector((state: RootState) => state.cart.total_price);
  const cart = useSelector((state: RootState) => state.cart.user_cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart?.sub_total || guestPrice) {
      setPrice(
        Number(cart?.sub_total) > 0
          ? Number(cart?.sub_total)
          : Number(guestPrice) || 0
      );
    }

    if (cartItems && cartItems?.length == 0) {
      setPrice(0); // logged in users because of cart?.sub_total from the cart
    }
  }, [cart?.sub_total, guestPrice, cartItems]);

  const handleMoreButton = () => {
    setViewMoreLoader(true);
    setNumberOfDisplayedProducts((prev) => prev + 12);
  };

  const categoryPaginationProduct = {
    per_page: numberOfDisplayedProducts,
    page: 1,
    categoryName: categoryName,
  };

  const fetchAllProductsByCategory = async () => {
    try {
      const res = await getAllProductsByCategory(
        categoryPaginationProduct
      ).unwrap();
      if (res) {
        setCategoryProducts(res.data.products);
        setTotalFetchedCategoryData(res.data.pagination.total);
        setViewMoreLoader(false);
      }
    } catch (error) {
      // showCustomToast({
      //   message: "Error loading products. Kindly reload..",
      //   type: "error",
      // });
      setViewMoreLoader(false);
    }
  };

  useEffect(() => {
    if (cartItems) {
      setCategoryName(cartItems[0]?.category_name ?? "Babies");
    }

    fetchAllProductsByCategory();
  }, [categoryName, numberOfDisplayedProducts]);

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      setIsOpen(true);
      dispatch(addActiveScreen("login_form"));
    }
  };

  return (
    <PageWrapper classname="cart_main_container">
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
        <h1>Cart({cartItems?.length})</h1>

        <div className="cart_body_container">
          {/* Cart items */}
          <div className="cart_items_container">
            {cartItems && cartItems?.length > 0 ? (
              cartItems?.map((item, index) => (
                <div key={index}>
                  <CartItem item={item} />

                  {index < cartItems?.length - 1 && (
                    <hr
                      style={{
                        border: "0.5px solid #E7E9EB",
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
                  width={"35%"}
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
              <p className="subtotal_amount">₦{formatPrice(Number(price))}</p>
            </div>
            <span className="delivery_fees_text">
              Delivery fees not included yet.
            </span>

            <div style={{ marginTop: "30px" }}>
              <CustomButton
                label={`Checkout (₦${formatPrice(Number(price) || 0)})`}
                width={"100%"}
                height="44px"
                bgColor="#084c3f"
                borderColor="#FFFFFF"
                borderWidth="1px"
                textColor="white"
                fontSize={14}
                fontWeight={700}
                onClick={handleCheckout}
                disabled={cartItems?.length == 0}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px" }} />

      <div>
        <ProductSection
          name={"Recommended Products"}
          data={categoryProducts}
          type="related"
          nameContainer
          viewAll
          sectionLoader={categoryLoader}
        />

        {numberOfDisplayedProducts < totalFetchedCategoryData && (
          <button className="view_more_buton" onClick={handleMoreButton}>
            View More
            {viewMoreLoader ? (
              <TailSpin
                visible={true}
                height={"20"}
                width={"20"}
                color={"white"}
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                wrapperClass=""
                strokeWidth={2} // Adjust thickness
              />
            ) : (
              <BsChevronDown size={12} color={"white"} />
            )}
          </button>
        )}
      </div>

      <AuthModal isOpen={isOpen} handleCloseModal={() => setIsOpen(false)} />
    </PageWrapper>
  );
};

export default CartPage;
