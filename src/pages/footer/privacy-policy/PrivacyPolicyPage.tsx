import React from "react";
import "./PrivacyPolicyPage.css";
import NavHeader from "../../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../../components/nav-categories/NavCategories";
import Footer from "../../../components/footer/Footer";
import PageWrapper from "../../../components/page-wrapper/PageWrapper";

const PrivacyPolicyPage = () => {
  return (
    <PageWrapper classname="privacy_container">
      <p className="privacy_title">Privacy Policy</p>

      <div className="privacy_content">
        <p>
          This Privacy Notice (“Notice”) describes how we collect, use, and
          disclose information about you when you use Saleko, including our
          website, mobile app, and any other online services that we offer
          (collectively, "Saleko”). We are committed to protecting your privacy
          and the confidentiality of your personal information. By using the
          Platform, you agree to the terms of this Notice.
        </p>

        <p>
          <b>Information We Collect</b>
          <br />
          We may collect the following types of information about you:
        </p>

        <p>
          <b>Personal Information:</b> This includes your name, email address,
          phone number, shipping address, and payment information.
        </p>

        <p>
          <b>User Content:</b> This includes any content that you submit to the
          Platform, such as product listings, reviews, or other materials
        </p>

        <p>
          <b>Usage Information:</b> This includes information about how you use
          the Platform, such as your search queries, the pages you visit, and
          the features you use.
        </p>

        <p>
          <b>Device Information:</b> This includes information about the device
          you use to access the Platform, such as your IP address, operating
          system, and browser type.
        </p>

        <p>
          <b>How We Use Your Information</b>
          <br></br>
          We may use your information for the following purposes:
          <ul>
            <li>To provide and maintain the Platform.</li>
            <li>To provide and maintain the Platform.</li>
            <li>To process transactions between buyers and sellers.</li>
            <li>
              To communicate with you about the Platform, including updates and
              changes.
            </li>
            <li>
              To personalise your experience on the Platform, such as by
              recommending products that you may be interested in.
            </li>
            <li>
              To improve the Platform, including by analysing how users use the
              Platform.
            </li>
            <li>
              To comply with legal obligations, such as responding to court
              orders or other legal requests.
            </li>
          </ul>
        </p>

        <p>
          <b>How We Share Your Information</b>
          <br />
          We may use your information with the following third parties:
        </p>

        <p>
          <b>Service Providers:</b> We may share your information with
          third-party service providers that help us provide and maintain the
          Platform, such as payment processors, hosting providers, and analytics
          providers.
        </p>

        <p>
          <b>Buyers and Sellers:</b> We may share your information with buyers
          and sellers in order to facilitate transactions on the Platform.
        </p>

        <p>
          <b>Legal and Regulatory Authorities:</b> We may share your information
          with legal and regulatory authorities as required by law or to protect
          our rights and interests.
        </p>

        <p>
          <b>Affiliates:</b> We may share your information with our affiliates,
          subsidiaries, or parent companies.
        </p>

        <p>
          <b>Data Security</b>
          <br /> We take reasonable measures to protect your information from
          unauthorized access, disclosure, or alteration. However, no data
          transmission over the Internet or electronic storage system can be
          guaranteed to be 100% secure. Please keep this in mind when disclosing
          any personal information to us on this platform.
        </p>

        <p>
          <b>Your Choices</b>
          <br></br> You may have certain rights with respect to your personal
          information, such as the right to access, correct, or delete your
          personal information. Please contact us using the information provided
          at the end of this Notice if you would like to exercise any of these
          rights.
        </p>

        <p>
          <b>Disputes and Arbitration</b> These Terms and Conditions are subject
          to, and shall be governed by, and construed in accordance with the
          laws of Nigeria, without reference to the principles of conflict of
          laws thereof.
        </p>

        <p>
          Any matters arising concerning the interpretation, validity or
          implementation of these Terms and Conditions not solved by mutual
          agreement between the Parties shall be submitted to Arbitration in the
          English language before a sole arbitrator to take place in Lagos,
          Nigeria as the seat of the arbitration.
        </p>

        <p>
          The Arbitration shall be conducted pursuant to the Arbitration and
          Conciliation Act Cap A18, LFN 2004 or any applicable law, rules in
          force as at the time of the dispute.
        </p>

        <p>
          The arbitral award shall be final and binding on the parties. Nothing
          in this Terms and Conditions will be deemed as preventing Saleko from
          seeking injunctive relief (or any other provisional remedy) from any
          court having jurisdiction over the Parties and the subject matter of
          the dispute as is necessary to protect our brand, proprietary
          information, trade secrets, know-how, or any other intellectual
          property rights.
        </p>

        <p>
          <b>Changes to this Notice</b>
          <br></br> We may update this Notice from time to time in response to
          changing legal, technical, or business developments. If we make
          material changes to this Notice, we will provide notice on the
          Platform or by other means.
        </p>

        <p>
          <b>Contact Us</b>
          <br></br> If you have any questions or concerns about this Notice or
          our privacy practices, please contact us at support@saleko.ng.
        </p>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPolicyPage;
