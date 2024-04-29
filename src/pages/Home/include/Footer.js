import { React, useState } from "react";
import {
  Col,
  Container,
  Row,
} from "reactstrap";
import random from "./css/front.module.css";
const Footer = props => {
  const [state, setState] = useState();
  return (
    <footer className={`${random['footer']} ${random['section']} ${random['pt-6']} ${random['pt-md-8']} ${random['pt-lg-10']} ${random['pb-3']} ${random['navbar-theme-primary']} ${random['text-white']} ${random['overflow-hidden']}`} style={{ width: "100%", left: -15, minHeight: "500px" }}>
      <div className={`${random['pattern']} ${random['pattern-soft']} ${random['top']}`}></div>
      <div className={random['container']}>
        <div className={random['row']}>
          <div className={`${random['col-md-4']} ${random['mb-4']} ${random['mb-lg-0']}`}>
            <a
              className={`${random['footer-brand']} ${random['mr-lg-5']} ${random['d-flex']}`}
              href="https://demos.creative-tim.com/impact-design-system-pro/index.html"
            >
              <img
                src="https://frontend-myday.cliqpack.com/static/media/logo-dark.c7b586a981eaa4d4fb67.png"
                height="35"
                className={random['mr-3']}
                alt="Footer logo"
              />
            </a>
            <p className={random['my-4']}>
              Create, prototype, collaborate and turn your ideas into incredible
              products with the definitive platform for digital design.
            </p>
            <div className={`${random['dropdown']} ${random['mb-4']} ${random['mb-lg-0']}`}>
              <a
                id="langsDropdown"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className={`${random['dropdown-toggle']} ${random['footer-language-link']}`}
              >
                <img
                  src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/flags/united-states-of-america.svg"
                  alt="USA Flag"
                  className={random['language-flag']}
                />{" "}
                English <i className={`fas fa-chevron-down ${random['ml-1']}`}></i>
              </a>
              <div
                aria-labelledby="langsDropdown"
                className={`${random['home-dropdown-menu']} ${random['home-dropdown-menu-center']}`}
              >
                <a href="#" className={`${random['dropdown-item']} ${random['text-gray']} ${random['text-sm']}`}>
                  <img
                    src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/flags/germany.svg"
                    alt="Germany Flag"
                    className={random['language-flag']}
                  />{" "}
                  German
                </a>{" "}
                <a href="#" className={`${random['dropdown-item']} ${random['text-gray']} ${random['text-sm']}`}>
                  <img
                    src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/flags/spain.svg"
                    alt="Spain Flag"
                    className={random['language-flag']}
                  />{" "}
                  Spanish
                </a>{" "}
                <a href="#" className={`${random['dropdown-item']} ${random['text-gray']} ${random['text-sm']}`}>
                  <img
                    src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/flags/france.svg"
                    alt="France Flag"
                    className={random['language-flag']}
                  />{" "}
                  French
                </a>
              </div>
            </div>
          </div>
          <div className={`${random['col-md-6']} ${random['col-sm-3']} ${random['col-lg-2']} ${random['mb-4']} ${random['mb-lg-0']}`}>
            <ul className={random['links-vertical']}>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://themesberg.com/blog?ref=creative-tim-impact-pro-footer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://themesberg.com/themes?ref=creative-tim-impact-pro-footer"
                >
                  Themes
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://themesberg.com/contact?ref=creative-tim-impact-pro-footer"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className={`${random['col-md-6']} ${random['col-sm-3']} ${random['col-lg-2']} ${random['mb-4']} ${random['mb-lg-0']}`}>
            <ul className={random['links-vertical']}>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.creative-tim.com/blog"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.creative-tim.com/templates"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.creative-tim.com/support-terms"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.creative-tim.com/license"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
          <div className={`${random['col-sm-12']} ${random['col-lg-4']}`}>
            <p className={random['font-small']}>
              The latest Rocket news, articles, and resources, sent straight to
              your inbox every month.
            </p>
            <form action="#">
              <div className={random['form-row']}>
                <div className={random['col-8']}>
                  <input
                    type="email"
                    className={`${random['form-control']} ${random['mb-2']}`}
                    placeholder="Email Address"
                    name="email"
                    required=""
                  />
                </div>
                <div className={random['col-4']}>
                  <button type="submit" className={`${random['btn']} ${random['btn-secondary']} ${random['btn-block']}`}>
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </form>
            <small className={`${random['mt-2']} ${random['form-text']}`}>
              We’ll never share your details. See our{" "}
              <a href="terms.html" className={`${random['font-weight-bold']} ${random['text-underline']}`}>
                Privacy Policy
              </a>
            </small>
          </div>
        </div>
        <hr className={`${random['my-4']} ${random['my-lg-5']}`} />
        <div className={random['row']}>
          <div className={`${random['col']} ${random['pb-4']} ${random['mb-md-0']}`}>
            <div className={`${random['d-flex']} ${random['text-center']} ${random['justify-content-center']} ${random['align-items-center']}`}>
              <p className={`${random['font-weight-normal']} ${random['mb-0']}`}>
                Copyright ©{" "}
                {/* <a
                  href="https://themesberg.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                > */}
                  CliqProperty {" "}
                {/* </a>{" "}
                &amp; <a href="https://creative-tim.com/">Creative Tim</a>{" "} */}
                <span className={random['current-year']}>2022</span>. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
