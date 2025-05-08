import React from "react";
import "./ApplyForALoanPage.css";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";
import apply_for_loan_img from "../../../assets/images/svg/apply_for_loan_img.svg";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";

const ApplyForALoanPage = () => {
  return (
    <PageWrapper classname="apply_for_loan_container">
      <p className="apply_for_loan_title">Apply For a Loan</p>

      <div style={{ padding: "10px" }} />

      <div className="apply_for_loan_body_wrapper">
        <p className="apply_for_loan_text">
          Running a business is tough, we get it! But guess what? We've got your
          back! We've teamed up with Addosser Microfinance Bank, a top lending
          institution, to offer you access to loans that can help you fund your
          business operations and grow your customer base.
        </p>

        <div style={{ padding: "10px" }} />

        <div className="apply_for_loan_section">
          <div className="apply_for_loan_text_container">
            <p className="apply_for_loan_text">
              Our loans come with competitive interest rates and flexible
              repayment terms, so you can access the funds you need without
              worrying about stringent repayment requirements. With this kind of
              support, you can focus on what you do best - growing your business
              and meeting your customers' needs!
            </p>

            <p className="apply_for_loan_text">
              At Saleko, we're committed to supporting our merchants and helping
              them achieve their business goals. So, whether you're looking to
              expand your customer base, increase your brand visibility, or
              access funding to take your business to the next level, we're here
              to help.
            </p>

            <p className="apply_for_loan_text">
              If you have any questions about becoming a merchant or accessing
              our loan facilities, please don't hesitate to reach out to our
              awesome customer support team at {" "}
              <a href="">support@saleko.com</a>. We can't wait to see your
              business grow on Saleko!
            </p>
          </div>

          <img src={apply_for_loan_img} className="apply_for_loan_image" />
        </div>
      </div>

      <div style={{ padding: "10px" }} />
    </PageWrapper>
  );
};

export default ApplyForALoanPage;
