"use client";
import React, { useEffect } from "react";
import Link from "next/link";
const page = () => {
  useEffect(() => {
    document.body.classList.add("headeBorder");
    return () => {
      document.body.classList.remove("headeBorder");
    };
  }, []);

  return (
    <>
      <div id="main">
        <div className="breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ul>
                  <li>
                    <Link href="/">Back To Homepage</Link>
                  </li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section className="margin-bottom-900 mt-3">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h1 className="heading1 text-md-center">Privacy Policy</h1>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <p>
                  Ingenium Food Ventures Private Limited ("Rooted", "Company",
                  "We", "Us", and "Our") are committed to protecting your
                  privacy. The terms You" or "User" shall mean any natural or
                  legal person who visits Our platform, either just for the
                  purpose of browsing the Website/App or engages to buy Our
                  products and services ("Service"). This privacy policy
                  ("Privacy Policy") outlines how We collect, use, disclose, and
                  safeguard your information when You visit Our website
                  rootedtoyou.com ("Website"), and when You use Our Services.
                  Only data collected by Rooted through its Services, including
                  emails, texts, and other electronic communications sent
                  through or in connection with those Services, is covered by
                  this Privacy Policy. This Privacy Policy should be read in
                  conjunction with the terms and conditions ("Terms of
                  Service"), since it is an integral element of them.
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <h2 className="heading3">SECTION 1. COOKIES</h2>
                <ul className="numberPointList">
                  <li num="1.1">
                    <p>
                      Our Website uses cookies to improve and personalise your
                      experience. Cookies are small data files that are stored
                      on your device. Using your browser settings, You can
                      choose your cookie preferences.
                    </p>
                  </li>
                  <li num="1.2">
                    <p>
                      To know more about cookies, please refer to Our{" "}
                      <Link href="">Cookie Policy.</Link>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <h2 className="heading3">SECTION 2. DATA YOU GIVE US </h2>
                <p>
                  The information we collect on or through our Services may
                  include:
                </p>
                <ul className="numberPointList">
                  <li num="2.1">
                    <p>
                      Your account details such as your full name, your profile
                      picture, email address, postal code, password and other
                      information You may provide with your account, such as
                      your gender, mobile phone number, location preference,
                      your reviews, search and order history, domain names, web
                      address of the previous page you viewed before coming to
                      our websites, the time your spent browsing through the
                      Website/ App. You may also provide Us with this
                    </p>
                    <p>
                      information through third party sign-in services. By using
                      the social media interface to sign in to your account or
                      connect your social media account in any other way with
                      the Services, You agree to the collection, storage, and
                      use of the information You provide to Us through the
                      social media interface, in compliance with this Privacy
                      Policy. This may comprise, without limitation, any
                      information that You have shared with Us via social media,
                      information that You have made public through your
                      account, and information that You reveal to Us when
                      logging in. When you choose to connect your account,
                      please go to the privacy policy and help center of your
                      social network provider for further details on how they
                      share information.
                    </p>
                    <p>
                      In order to personalize the Services with location-based
                      content and features, We collect and process information
                      about your mobile device's GPS location and the time the
                      location information is recorded when You use one of Our
                      location-enabled services (such as when you access
                      Services from a mobile device). For some features to
                      function, some of these Services require your personal
                      data, and We might link location data to other information
                      We have about You and your device ID.
                    </p>
                  </li>
                  <li num="2.2">
                    <p>
                      With reference to your comments and posts about the food
                      in the review section, We may display this information on
                      the Services, share it with businesses, and further
                      distribute it to a wider audience through third party
                      sites and services. You should be careful about revealing
                      any sensitive details about yourself in such postings.
                    </p>
                  </li>
                  <li num="2.3">
                    <p>
                      Metadata and other information connected to files saved on
                      your mobile device may also be accessed by Our App.
                      Photos, audio and video recordings, contacts from your
                      address book, and personal information are a few examples
                      of what this could contain.
                    </p>
                  </li>
                  <li num="2.4">
                    <p>
                      Your transactional information may be shared with third
                      parties which assist in processing and fulfilling your
                      requests, including PCI compliant payment gateway
                      processors. Such services shall be provided by Razorpay
                      Software Private Limited ("Razorpay") whereby the token
                      details of the card shall be saved on the Razorpay
                      platform, which We neither monitor nor We have any control
                      nor input.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <h2 className="heading3">
                  SECTION 3. PRECAUTIONS FOR DATA SECURITY
                </h2>
                <ul className="numberPointList">
                  <li num="3.1">
                    <p>
                      We have adequate technical and security measures to
                      safeguard the information collected by Us.
                    </p>
                  </li>
                  <li num="3.2">
                    <p>
                      To safeguard the sensitive personal data You have
                      submitted, We use vault and tokenization services from
                      outside service providers. Regarding Our vault and
                      tokenization services, as well as Our payment gateway and
                      payment processing, the third party service providers
                      comply with the payment card industry standard; these
                      service providers are commonly known as PCI compliant
                      service providers. It is recommended that You avoid
                      transmitting your entire credit/debit card number via
                      unencrypted online channels. You are responsible for
                      maintaining the confidentiality of any username and
                      password that We may have given You—or that You have
                      chosen—to allow You to access particular areas of the
                      Rooted platform. Please refrain from disclosing your
                      password to anybody.{" "}
                    </p>
                  </li>
                  <li num="3.3">
                    <p>
                      Please be advised that information cannot be transmitted
                      via the internet in a perfectly secure manner. We cannot
                      ensure the security of your data communicated through the
                      Rooted platform, despite Our best efforts to protect your
                      personal information. After receiving your information, We
                      will attempt to prevent unauthorised access by
                      implementing stringent physical, electronic, and
                      procedural measures.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <h2 className="heading3">SECTION 4. WITHDRAWAL OPTION</h2>
                <ul className="numberPointList">
                  <li num="4.1">
                    <p>
                      By creating an account, You consent to receiving emails
                      and SMS from Rooted and any of its affiliated sites. You
                      can "unsubscribe" by sending an email to
                      info@rootedtoyou.com, however, please be noted that Rooted
                      will still send You certain administrative, service, and
                      legal notices.
                    </p>
                  </li>
                  <li num="4.2">
                    <p>
                      Please send an email to info@rootedtoyou.com to notify Us
                      about withdrawing your consent from the use and
                      dissemination of your personal information as described in
                      this Privacy Policy. Please be aware that We could need
                      some time to process your request. It will become
                      effective no later than 5 (five) business days after We
                      receive it. After that, We won't use your personal
                      information for any processing unless We really have to in
                      order to meet Our legal requirements. Following your
                      consent to withdraw, We might not be able to provide You
                      with any or all Services.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <h2 className="heading3">
                  SECTION 5. USES OF YOUR INFORMATION
                </h2>
                <ul className="numberPointList">
                  <li num="5.1">
                    <p>
                      We use the information we collect for following purposes,
                      including:
                    </p>
                    <ul>
                      <li>
                        <p>
                          For legitimate reasons that are deemed reasonably
                          required to look into, stop, or take action in
                          relation to potential illegal activity or to follow
                          the law. Additionally, We might disclose your
                          information to look into and resolve threats or
                          possible threats to someone's physical safety, to look
                          into and resolve infractions of the Terms of Service
                          or this Privacy Policy, and resolve violations of
                          third parties' rights, and/or to defend the property,
                          rights, and safety of Rooted, Our workers, Users, and
                          the general public.
                        </p>
                      </li>
                      <li>
                        <p>
                          Providing, personalizing, maintaining, and enhancing
                          Our Services. This encompasses facilitating deliveries
                          and other Services, as well as enabling features that
                          tailor your Rooted account to your preferences.{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          Fulfilling Our obligations under any agreements made
                          between You and Us, ensuring that You receive the
                          pertinent information and Services associated with
                          those contracts.{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          Managing and improving the security of the Rooted
                          platform, as well as conducting internal operations
                          such as troubleshooting, data analysis, testing,
                          research, and statistical surveys.{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          Keep You informed about Services that We believe are
                          similar to those You currently utilize, have inquired
                          about, or may find appealing. If You are a registered
                          user, We will reach out to You through electronic
                          means (such as email, SMS, or telephone) to provide
                          information regarding these Services.{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          Understanding how You engage with Our Services—what
                          actions You take, which features You prefer, and how
                          You utilize them—enables Us to enhance the content and
                          functionality of Our Services, process and finalize
                          your transactions, offer special promotions, deliver
                          User support, and address your inquiries.
                        </p>
                      </li>
                      <li>
                        <p>
                          Examine the log files of Our Rooted platform, which
                          may include IP addresses, browser types and languages,
                          Internet service providers (ISPs), referring URLs, app
                          crashes, OS systems, date/time stamps, clickstream
                          data, and websites and applications seen and exited.
                          This assists Us in managing the Website, gaining
                          insight into User behaviour on the Website, enhancing
                          Our Services, and compiling demographic data about Our
                          User Base in general
                        </p>
                      </li>
                      <li>
                        <p>
                          Generate and analyze reports and data concerning Our
                          User base and the patterns of Service usage to inform
                          Our strategies.{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          Facilitate participation should You wish to engage
                          with interactive features of Our Services.{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          Assess the effectiveness of the advertisements We
                          present to You and others, ensuring that the
                          advertising delivered is relevant to your interests.
                        </p>
                      </li>
                      <li>
                        <p>
                          Monitor the progress of deliveries and the status of
                          orders placed by Our Users for partner restaurants,
                          merchants, or delivery partners.
                        </p>
                      </li>
                      <li>
                        <p>
                          To engage in academic research in collaboration with
                          academic partners.
                        </p>
                      </li>
                      <li>
                        <p>
                          Integrate information obtained from third parties with
                          the data You provide and the information We gather
                          about You for the aforementioned purposes.
                          Additionally, We may anonymize and/or de-identify the
                          information collected from You through Our Services or
                          other channels, including the use of third party web
                          analytics tools. Consequently, Our use and disclosure
                          of aggregated data will be managed accordingly.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <h2 className="heading3">SECTION 6. MISCELLANEOUS</h2>
                <ul className="numberPointList">
                  <li num="6.1">
                    <p>
                      As laws change, so do Our data collecting and processing
                      procedures, Service features, technological advancements,
                      and We reserve the right to make periodic changes to this
                      Privacy Policy. For updates or modifications, kindly check
                      this page from time to time. Information that We gather is
                      used in accordance with the Privacy Policy that is in
                      force at the time of use. Any significant changes We make
                      to Our Privacy Policy will be posted here, and if the law
                      requires it, We may also contact You. Please take a close
                      look at the revisions. When modifications to this Privacy
                      Policy are posted, your continuing use of the Services
                      will be interpreted as your approval and acceptance of
                      those changes.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <h2 className="heading3">SECTION 7. YOUR AGREEMENT</h2>
                <ul className="numberPointList">
                  <li num="7.1">
                    <p>
                      You accept and consent to the collection, transfer, use,
                      storage, disclosure, and sharing of your information as
                      specified and gathered by Us in compliance with this
                      Privacy Policy by using the Rooted platform and the
                      Services. Please do not use or access the Rooted platform
                      if You do not agree with the Terms of Service.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
