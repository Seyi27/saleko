import React, { useEffect, useState } from "react";
import "./AboutUsPage.css";
import about_saleko_img from "../../../assets/images/svg/about_saleko_img.svg";
import brand_story_img from "../../../assets/images/svg/brand_story_img.svg";
import vision_mission from "../../../assets/images/svg/vision_mission_img.svg";
import saleko_core_img from "../../../assets/images/svg/saleko_core_img.svg";
import for_sellers_img from "../../../assets/images/svg/for_sellers_img.svg";
import for_buyers_img from "../../../assets/images/svg/for_buyers_img.svg";
import { Link, Element, scrollSpy } from "react-scroll";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";

const AboutUsPage = () => {
  const [offset, setOffset] = useState(-180);

  useEffect(() => {
    scrollSpy.update();
  }, []);

  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth < 600) {
        setOffset(-140); // Adjust for mobile screens
      } else {
        setOffset(-180); // Adjust for desktop screens
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset); // Update on resize

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <>
      <NavHeader />

      <NavHeaderSearch />

      <NavCategories />

      <div className="body_container">
        <div className="body_second_container about_us_container">
            <p className="about_us_title">About Us</p>

            <div className="about_us_content_wrapper">
              <div className="about_us_left_container">
                <Link
                  to="about_saleko"
                  smooth={true}
                  duration={500}
                  className="about_us_link_items first_item"
                  offset={offset}
                  spy={true}
                  activeClass="about_us_active_link"
                >
                  About Saleko
                </Link>

                <Link
                  to="saleko_brand_story"
                  smooth={true}
                  duration={500}
                  className="about_us_link_items"
                  offset={offset}
                  spy={true}
                  activeClass="about_us_active_link"
                >
                  Saleko Brand Story
                </Link>

                <Link
                  to="vision_and_mission"
                  smooth={true}
                  duration={500}
                  className="about_us_link_items"
                  offset={offset}
                  spy={true}
                  activeClass="about_us_active_link"
                >
                  Vision & Mission
                </Link>

                <Link
                  to="saleko_core_value"
                  smooth={true}
                  duration={500}
                  className="about_us_link_items"
                  offset={offset}
                  spy={true}
                  activeClass="about_us_active_link"
                >
                  Saleko Core Value
                </Link>

                <Link
                  to="for_sellers"
                  smooth={true}
                  duration={500}
                  className="about_us_link_items"
                  offset={offset}
                  spy={true}
                  activeClass="about_us_active_link"
                >
                  For Sellers
                </Link>

                <Link
                  to="for_buyers"
                  smooth={true}
                  duration={500}
                  className="about_us_link_items last_item"
                  offset={offset}
                  spy={true}
                  activeClass="about_us_active_link"
                >
                  For Buyers
                </Link>
              </div>

              <div className="about_us_right_container">
                {/* About Saleko */}
                <Element name="about_saleko">
                  <div className="about_us_item_container">
                    <p className="about_us_item_title">About Saleko</p>

                    <hr className="about_us_divider" />

                    <div className="about_us_item_body_container about_us_layout_reverse">
                      <div className="about_us_text_container">
                        <p>
                          Saleko is Nigeria’s online marketplace that features
                          authentic products from the heart of our community
                          markets. Our focus is to help promote small businesses
                          by providing a platform for them to showcase and sell
                          their products to a global audience while empowering
                          them with the tools and resources required to succeed.
                        </p>

                        <p>
                          We are also committed to providing our customers with
                          a familiar shopping experience, as a result, Saleko
                          has been designed to replicate the authenticity of the
                          real Nigerian local market, allowing customers the
                          freedom to bargain, compare prices and make bulk
                          purchases from various sellers across all the major
                          markets.
                        </p>

                        <p>
                          With Saleko, you are assured of more reach,
                          convenience, best pricing and a safe and secure
                          ecosystem for online merchants and shoppers that is
                          built on trust and confidence.
                        </p>
                      </div>

                      <div className="about_us_image_container">
                        <img src={about_saleko_img} className="about_us_img"/>
                      </div>
                    </div>
                  </div>
                </Element>

                <div style={{ padding: "20px" }} />

                {/* Saleko Brand Story */}
                <Element name="saleko_brand_story">
                  <div className="about_us_item_container">
                    <p className="about_us_item_title">Saleko Brand Story</p>

                    <hr className="about_us_divider" />

                    <div className="about_us_item_body_container">
                      <div className="about_us_image_container">
                        <img src={brand_story_img} className="about_us_img"/>
                      </div>

                      <div className="about_us_text_container">
                        <p>
                          In a world where convenience often overshadows
                          authenticity, we decided to bring the heart of the
                          marketplace to your fingertips. We believe that the
                          marketplace is more than just a place to buy and sell
                          goods; it's a place where communities come together,
                          cultures collide, and traditions are preserved. It's a
                          treasure trove of unique and captivating products,
                          from handcrafted gems to locally and globally sourced
                          delights. That's why we created our online marketplace
                          platform - a gateway to an extraordinary shopping
                          experience without leaving the comfort of your home.
                          Immerse yourself in the iconic market scenes, let your
                          eyes dance with the vibrant hues of traditional
                          fabrics, and feel the spirit of the marketplace come
                          alive. Engage with vendors, negotiate for the best
                          deals, and embark on a treasure hunt amidst a vast
                          array of products.
                        </p>

                        <p>
                          At the heart of our endeavor lie the small and
                          medium-sized enterprises (SMEs), the lifeblood of our
                          virtual community. We are dedicated to empowering SMEs
                          to not only showcase their unique creations but also
                          to narrate their compelling stories to the world.
                          Beyond just offering a platform, we are steadfast in
                          our commitment to arming them with the essential
                          knowledge, skills, and tools needed to thrive in their
                          entrepreneurial endeavors.
                        </p>

                        <p>
                          Our commitment goes beyond a transaction to our
                          customers. We believe in building lasting
                          relationships based on loyalty. The loyalty that
                          exists between our platform and customers is a bond
                          founded on trust, reliability, and a shared passion
                          for authentic experiences.
                        </p>

                        <p>
                          We believe that the joy of the marketplace should be
                          accessible to all. That's why we're committed to
                          making our platform open and inclusive, regardless of
                          location or income level. There is always something
                          for everyone.
                        </p>

                        <p>
                          More so, our platform is a testament to our belief
                          that technology should enhance, not replace, human
                          connections. We've meticulously designed our platform
                          to preserve the essence of the local market
                          experience. From the lively ambiance to the
                          interactive bargaining system, we want you to
                          experience the thrill of discovery and the warmth of
                          human connection that comes with shopping in a
                          traditional market.
                        </p>

                        <p>
                          <b>
                            So come join us and experience the magic of the
                            marketplace. You won't be disappointed.
                          </b>
                        </p>
                      </div>
                    </div>
                  </div>
                </Element>

                <div style={{ padding: "20px" }} />

                {/* Vision & Mission */}
                <Element name="vision_and_mission">
                  <div className="about_us_item_container">
                    <p className="about_us_item_title">Vision & Mission</p>

                    <hr className="about_us_divider" />

                    <div
                      className="about_us_item_body_container about_us_layout_reverse"
                      style={{ alignItems: "center" }}
                    >
                      <div className="about_us_text_container">
                        <p>
                          <b style={{ color: "#084c3f", fontSize: "16px" }}>
                            Our Vision:
                          </b>
                          To be the leading Nigerian online marketplace creating
                          access to market for SMEs.
                        </p>

                        <p>
                          <b style={{ color: "#084c3f", fontSize: "16px" }}>
                            Our Mission:
                          </b>
                          To help Nigerian market sellers grow their business by
                          providing a platform  to promote their products to a
                          global audience while aiming to build Nigeria number
                          one safe and secure ecosystem for buyers and sellers.
                        </p>
                      </div>

                      <div className="about_us_image_container">
                        <img src={vision_mission} className="about_us_img"/>
                      </div>
                    </div>
                  </div>
                </Element>

                <div style={{ padding: "20px" }} />

                {/* Saleko Core Value */}
                <Element name="saleko_core_value">
                  <div className="about_us_item_container">
                    <p className="about_us_item_title">Saleko Core Value</p>

                    <hr className="about_us_divider" />

                    <div className="about_us_item_body_container">
                      <div className="about_us_image_container">
                        <img src={saleko_core_img} className="about_us_img"/>
                      </div>

                      <div className="about_us_text_container">
                        <p>
                          SIMPLICITY: We strive for a seamless and effortless
                          experience for both buyers and sellers, ensuring that
                          everyone can easily navigate our platform and achieve
                          their desired outcomes.
                        </p>

                        <p>
                          ACCESSIBILITY: We embrace inclusivity and open our
                          platform to individuals and businesses from diverse
                          backgrounds and cultures while ensuring that buyers
                          have access to a marketplace that caters to diverse
                          preferences.
                        </p>

                        <p>
                          LOYALTY: We cultivate strong and lasting relationships
                          with our buyers and sellers, demonstrating our
                          commitment through exceptional service, value, and a
                          supportive environment that nurtures mutual respect
                          and trust.
                        </p>

                        <p>
                          EMPOWERMENT: Our aim is to empower local businesses
                          with the tools, resources and platform to showcase
                          their unique offerings and achieve success in their
                          entrepreneurial journey.
                        </p>

                        <p>
                          KNOWLEDGE: We facilitate learning, share insights, and
                          provide resources to empower sellers with the
                          expertise needed to excel. For buyers, we ensure they
                          have access to information that enriches their
                          shopping experience, creating informed and satisfied
                          customers.
                        </p>

                        <p>
                          ORIGINALITY: Our commitment to our platform is to
                          remain true to our roots, mirroring the real-life
                          experience of a bustling Nigerian local market and
                          showcasing unique and authentic products.
                        </p>
                      </div>
                    </div>
                  </div>
                </Element>

                <div style={{ padding: "20px" }} />

                {/* For Sellers */}
                <Element name="for_sellers">
                  <div className="about_us_item_container">
                    <p className="about_us_item_title">For Sellers</p>

                    <hr className="about_us_divider" />

                    <div className="about_us_item_body_container about_us_layout_reverse">
                      <div className="about_us_text_container">
                        <p>
                          <b style={{ fontSize: "16px" }}>
                            We help you reach more customers and grow your
                            business.
                          </b>
                        </p>

                        <p>
                          As a seller on Saleko, you have access to connect with
                          millions of online shoppers all around Nigeria who are
                          looking for unique and authentic products that match
                          what you offer. On the other hand, Saleko will provide
                          a variety of tools and the expertise required to help
                          you grow your business successfully and an opportunity
                          to join a growing community of sellers. Whether you
                          are just starting or looking to expand your business,
                          Saleko makes available to you all you need to
                          flourish.
                        </p>

                        <p>
                          Enjoy:
                          <ul>
                            <li> Full onboarding assistance</li>
                            <li>
                              Access to credit Marketing support Easy and safe
                            </li>
                            <li>
                              payment solution Secure delivery options Quick
                              dispute
                            </li>
                            <li> resolution</li>
                          </ul>
                        </p>

                        <p>
                          <b>Become a Seller Today.</b>
                        </p>
                      </div>

                      <div className="about_us_image_container">
                        <img src={for_sellers_img} className="about_us_img"/>
                      </div>
                    </div>
                  </div>
                </Element>

                <div style={{ padding: "20px" }} />

                {/* For Buyers */}
                <Element name="for_buyers">
                  <div className="about_us_item_container">
                    <p className="about_us_item_title">For Buyers</p>

                    <hr className="about_us_divider" />

                    <div className="about_us_item_body_container">
                      <div className="about_us_image_container">
                        <img src={for_buyers_img} className="about_us_img"/>
                      </div>

                      <div className="about_us_text_container">
                        <p>
                          <b style={{ fontSize: "16px" }}>
                            Shop from your peculiar local market and feel free
                            to bargain price.
                          </b>
                        </p>

                        <p>
                          At Saleko, we have designed our platform to make it as
                          easy and convenient for you to enjoy a stress-free
                          shopping experience from your comfort zone. From
                          secure payment options to fast and reliable delivery,
                          we have made it possible for you to shop from your
                          peculiar favourite local market and have your items
                          delivered at your doorstep.
                        </p>

                        <p>
                          Imagine being able to shop for fresh tomatoes from
                          Mile12, spare parts from Ladipo, electronics from
                          Alaba, okirika from Yaba, etc. You can also bargain
                          prices, compare products and make bulk purchases while
                          enjoying unbelievable discounts from your everyday
                          market.
                        </p>

                        <p>
                          <b>Shop on Saleko today!</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </Element>
              </div>
            </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUsPage;
