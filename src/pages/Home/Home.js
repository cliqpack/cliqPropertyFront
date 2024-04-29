import { React, useState } from "react";
import NavHome from "./include/NavHome";
import Preloader from "./include/Preloader";
import Footer from "./include/Footer";
import random from "./include/css/front.module.css";

const Home = props => {
  const [state, setState] = useState(true);
    setTimeout(()=>{setState(false)},2000);
  return (
    <>
      <NavHome />
      <main>
        {state?
        <Preloader />:null}
        <section className={`${random['section-header']} ${random['pb-7']} ${random['pb-lg-11']} ${random['bg-soft']}`}>
          <div className={`${random['container']}`}>
            <div className={`${random['row']} ${random['justify-content-between']} ${random['align-items-center']}`}>
              <div className={`${random['col-12']} ${random['col-md-6']} ${random['order-2']} ${random['order-lg-1']}`}>
                <img
                  src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/illustrations/hero-illustration.svg"
                  alt=""
                />
              </div>
              <div className={`${random['col-12']} ${random['col-md-5']} ${random['order-1']} ${random['order-lg-2']}`}>
                <h2 className={`${random['display-2']} ${random['mb-3']}`}>
                  Australia&apos;s property management software
                </h2>
                <p className={`${random['lead']}`}>
                  Used to successfully manage over 1.4 million properties across
                  Australia and New Zealand
                </p>
                <div className={`${random['mt-4']}`}>
                  {/* <form action="#" className="d-flex flex-column mb-5 ${random['mb-lg-0']}">
                    <input
                      className="form-control"
                      type="text"
                      name="full-name"
                      placeholder="Full name"
                      required
                    />{" "}
                    <input
                      className="form-control my-3"
                      type="email"
                      name="email"
                      placeholder="Your email"
                      required
                    />{" "}
                    <button className="btn btn-primary" type="submit">
                      Create your account
                    </button>
                    <div className="${random['form-group']} form-check mt-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />{" "}
                      <label
                        className="form-check-label form-check-sign-white"
                        htmlFor="exampleCheck1"
                      >
                        I agree to the{" "}
                        <a href="terms.html">Terms & Conditions</a>
                      </label>
                    </div>
                  </form> */}
                </div>
              </div>
            </div>
          </div>
          <div className={`${random['pattern']} ${random['bottom']}`}></div>
        </section>
        <section className={`${random['section']} ${random['section-lg']} ${random['pt-6']}`}>
          <div className={`${random['container']}`}>
            <div className={`${random['row']} ${random['justify-content-center']} ${random['mb-5']} ${random['mb-md-7']}`}>
              <div className={`${random['col-12']} ${random['col-md-8']} ${random['text-center']}`}>
                <h2 className={`${random['h1']} ${random['font-weight-bolder']} ${random['mb-4']}`}>
                  Meet our intuitive platform
                </h2>
                <p className={`${random['lead']}`}>
                  Self-Service Analytics or ad hoc reporting gives users the
                  ability to develop rapid reports, empowering users to analyze
                  their data.
                </p>
              </div>
            </div>
            <div className={`${random['row']} ${random['row-grid']} ${random['align-items-center']} ${random['mb-5']} ${random['mb-md-7']}`}>
              <div className={`${random['col-12']} ${random['col-md-5']}`}>
                <h2 className={`${random['font-weight-bolder']} ${random['mb-4']}`}>Site Audit</h2>
                <p className={random['lead']}>
                  Site Audit crawls all the pages it finds on your website –
                  then provides an overall SEO health score, visualises key data
                  in charts, flags all possible SEO issues and provides
                  recommendations on how to fix them.
                </p>
                <p className={random['lead']}>Have a huge website? Not an issue.</p>
                <a
                  href="about.html"
                  className={`${random['btn']} ${random['btn-primary']} ${random['mt-3']} ${random['animate-up-2']}`}
                >
                  Learn More{" "}
                  <span className={`${random['icon']} ${random['icon-xs']} ${random['ml-2']}`}>
                    <i className="fas fa-external-link-alt"></i>
                  </span>
                </a>
              </div>
              <div className={`${random['col-12']} ${random['col-md-6']} ${random['ml-md-auto']}`}>
                <img
                  src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/illustrations/feature-illustration.svg"
                  alt=""
                />
              </div>
            </div>
            <div className={`${random['row']} ${random['row-grid']} ${random['align-items-center']} ${random['mb-5']} ${random['mb-md-7']}`}>
              <div className={`${random['col-12']} ${random['col-md-5']} ${random['order-md-2']}`}>
                <h2 className={`${random['font-weight-bolder']} ${random['mb-4']}`}>Rank Tracker</h2>
                <p>
                  We track your desktop and mobile keyword rankings from any
                  location and plot your full ranking history on a handy graph.
                </p>
                <p>
                  You can set up automated ranking reports to be sent to your
                  email address, so you’ll never forget to check your ranking
                  progress.
                </p>
                <a
                  href="about.html"
                  className={`${random['btn']} ${random['btn-primary']} ${random['mt-3']} ${random['animate-up-2']}`}
                >
                  Rank Tracker Tool{" "}
                  <span className={`${random['icon']} ${random['icon-xs']} ${random['ml-2']}`}>
                    <i className="fas fa-external-link-alt"></i>
                  </span>
                </a>
              </div>
              <div className={`${random['col-12']} ${random['col-md-6']} ${random['mr-lg-auto']}`}>
                <img
                  src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/illustrations/feature-illustration-2.svg"
                  alt=""
                />
              </div>
            </div>
            <div className={random['row']}>
              <div className={`${random['col-12']} ${random['col-md-6']} ${random['col-lg-4']} ${random['mb-4']}`}>
                <div className={`${random['card']} ${random['border-light']} ${random['p-4']}`}>
                  <div className={random['card-body']}>
                    <h2 className={`${random['display-2']} ${random['mb-2']}`}>98%</h2>
                    <span>
                      Average satisfaction rating received in the past year
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${random['col-12']} ${random['col-md-6']} ${random['col-lg-4']} ${random['mb-4']}`}>
                <div className={`${random['card']} ${random['border-light']} ${random['p-4']}`}>
                  <div className={random['card-body']}>
                    <h2 className={`${random['display-2']} ${random['mb-2']}`}>24/7</h2>
                    <span>
                      Our support team is a quick chat or email away — 24 hours
                      a day
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${random['col-12']} ${random['col-md-6']} ${random['col-lg-4']} ${random['mb-4']}`}>
                <div className={`${random['card']} ${random['border-light']} ${random['p-4']}`}>
                  <div className={random['card-body']}>
                    <h2 className={`${random['display-2']} ${random['mb-2']}`}>220k+</h2>
                    <span>
                      Extension installs from the two major mobile app stores
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${random['section']} ${random['section-lg']} ${random['bg-soft']}`}>
          <div className={random['container']}>
            <div className={`${random['row']} ${random['justify-content-center']} ${random['mb-5']} ${random['mb-md-7']}`}>
              <div className={`${random['col-12']} ${random['col-md-8']} ${random['text-center']}`}>
                <h2 className={`${random['h1']} ${random['font-weight-bolder']} ${random['mb-4']}`}>
                  SEO solutions for every need
                </h2>
                <p className={random['lead']}>
                  We build best-in-class SEO software for every situation, from
                  our all-in-one SEO platform to tools for local SEO, enterprise
                  SERP analytics, and a powerful API.
                </p>
              </div>
            </div>
            <div className={random['row']}>
              <div className={`${random['col-12']} ${random['col-md-6']} ${random['col-lg-4']} ${random['mb-5']}`}>
                <div className={`${random['card']} ${random['shadow-soft']} ${random['border-light']}`}>
                  <div className={`${random['card-header']} ${random['p-0']}`}>
                    <img
                      src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/saas-platform-3.jpg"
                      className={`${random['card-img-top']} ${random['rounded-top']}`}
                      alt="image"
                    />
                  </div>
                  <div className={random['card-body']}>
                    <h3 className={`${random['card-title']} ${random['mt-3']}`}>Rocket Local</h3>
                    <p className={random['card-text']}>
                      Moz Local distributes your business information across the
                      web for maximum search engine visibility.
                    </p>
                    <ul className={`${random['list-group']} ${random['d-flex']} ${random['justify-content-center']} ${random['mb-4']}`}>
                      <li className={`${random['list-group-item']} ${random['d-flex']} ${random['pl-0']} ${random['pb-1']}`}>
                        <span className={random['mr-2']}>
                          <i className={`fas fa-check-circle ${random['text-success']}`}></i>
                        </span>
                        <div>Real-time distribution</div>
                      </li>
                      <li className={`${random['list-group-item']} ${random['d-flex']} ${random['pl-0']} ${random['pb-1']}`}>
                        <span className={random['mr-2']}>
                          <i className={`fas fa-check-circle ${random['text-success']}`}></i>
                        </span>
                        <div>Duplicate closure</div>
                      </li>
                      <li className={`${random['list-group-item']} ${random['d-flex']} ${random['pl-0']} ${random['pb-1']}`}>
                        <span className={random['mr-2']}>
                          <i className={`fas fa-check-circle ${random['text-success']}`}></i>
                        </span>
                        <div>Review management</div>
                      </li>
                    </ul>
                    <a href="about.html" className={`${random['btn']} ${random['btn-primary']}`}>
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className={`${random['col-12']} ${random['col-md-6']} ${random['col-lg-4']} ${random['mb-5']}`}>
                <div className={`${random['card']} ${random['shadow-soft']} ${random['border-light']}`}>
                  <div className={`${random['card-header']} ${random['p-0']}`}>
                    <img
                      src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/saas-platform-4.jpg"
                      className={`${random['card-img-top']} ${random['rounded-top']}`}
                      alt="image"
                    />
                  </div>
                  <div className={random['card-body']}>
                    <h3 className={`${random['card-title']} ${random['mt-3']}`}>Rocket Pro</h3>
                    <p className={random['card-text']}>
                      Our SEO solution to help you rank higher, drive qualified
                      traffic to your website, and run high-impact SEO
                      campaigns.
                    </p>
                    <ul className={`${random['list-group']} ${random['d-flex']} ${random['justify-content-center']} ${random['mb-4']}`}>
                      <li className={`${random['list-group-item']} ${random['d-flex']} ${random['pl-0']} ${random['pb-1']}`}>
                        <span className={random['mr-2']}>
                          <i className={`fas fa-check-circle ${random['text-success']}`}></i>
                        </span>
                        <div>Keyword & link research</div>
                      </li>
                      <li className={`${random['list-group-item']} ${random['d-flex']} ${random['pl-0']} ${random['pb-1']}`}>
                        <span className={random['mr-2']}>
                          <i className={`fas fa-check-circle ${random['text-success']}`}></i>
                        </span>
                        <div>Technical site audits</div>
                      </li>
                      <li className={`${random['list-group-item']} ${random['d-flex']} ${random['pl-0']} ${random['pb-1']}`}>
                        <span className={random['mr-2']}>
                          <i className={`fas fa-check-circle ${random['text-success']}`}></i>
                        </span>
                        <div>SEO insights & reporting</div>
                      </li>
                    </ul>
                    <a href="about.html" className={`${random['btn']} ${random['btn-primary']}`}>
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className={`${random['col-12']} ${random['col-md-6']} ${random['col-lg-4']} ${random['mb-5']}`}>
                <div className={`${random['card']} ${random['shadow-soft']} ${random['border-light']}`}>
                  <div className={`${random['card-header']} ${random['p-0']}`}>
                    <img
                      src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/saas-platform-5.jpg"
                      className={`${random['card-img-top']} ${random['rounded-top']}`}
                      alt="image"
                    />
                  </div>
                  <div className={random['card-body']}>
                    <h3 className={`${random['card-title']} ${random['mt-3']}`}>Rocket STAT</h3>
                    <p className={random['card-text']}>
                      STAT offers serious SERP tracking for experts. Track
                      thousands to millions of keywords across any location.
                    </p>
                    <ul className={`${random['list-group']} ${random['d-flex']} ${random['justify-content-center']} ${random['mb-4']}`}>
                      <li className={`${random['list-group-item']} ${random['d-flex']} ${random['pl-0']} ${random['pb-1']}`}>
                        <span className={random['mr-2']}>
                          <i className={`fas fa-check-circle ${random['text-success']}`}></i>
                        </span>
                        <div>Daily tracking</div>
                      </li>
                      <li className={`${random['list-group-item']} ${random['d-flex']} ${random['pl-0']} ${random['pb-1']}`}>
                        <span className={random['mr-2']}>
                          <i className={`fas fa-check-circle ${random['text-success']}`}></i>
                        </span>
                        <div>Local and mobile SERPs</div>
                      </li>
                      <li className={`${random['list-group-item']} ${random['d-flex']} ${random['pl-0']} ${random['pb-1']}`}>
                        <span className={random['mr-2']}>
                          <i className={`fas fa-check-circle ${random['text-success']}`}></i>
                        </span>
                        <div>Competitor intelligence</div>
                      </li>
                    </ul>
                    <a href="about.html" className={`${random['btn']} ${random['btn-primary']}`}>
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${random['section']} ${random['section-lg']} ${random['navbar-theme-primary']} ${random['text-center']} ${random['text-white']}`}>
          <div className={random['container']}>
            <div className={`${random['row']} ${random['justify-content-center']} ${random['mb-4']} ${random['mb-lg-6']}`}>
              <div className={random['col-12']}>
                <h1 className={`${random['display-3']} ${random['mb-4']} ${random['mb-lg-5']}`}>
                  The worlds most accurate SEO data.
                </h1>
                <div className={`${random['row']} ${random['text-white']}`}>
                  <div className={`${random['col-12']} ${random['col-lg-4']} ${random['px-md-0']} ${random['mb-4']} ${random['mb-lg-0']}`}>
                    <div className={`${random['card-body']} ${random['text-center']} ${random['navbar-theme-primary']} ${random['border-right']} ${random['border-default']} ${random['py-4']}`}>
                      <h2 className={random['font-weight-bold']}>
                        <span className={`${random['h1']} ${random['mr-2']}`}>36.5 trillion</span>
                      </h2>{" "}
                      <span className={`${random['h5']} ${random['font-weight-normal']}`}>
                        links indexed by Link Explorer with our tools
                      </span>
                    </div>
                  </div>
                  <div className={`${random['col-12']} ${random['col-lg-4']} ${random['px-md-0']} ${random['mb-4']} ${random['mb-lg-0']}`}>
                    <div className={`${random['card-body']} ${random['text-center']} ${random['navbar-theme-primary']} ${random['border-right']} ${random['border-default']} ${random['py-4']}`}>
                      <h2 className={random['font-weight-bold']}>
                        <span className={`${random['h1']} ${random['mr-2']}`}>500 million</span>
                      </h2>{" "}
                      <span className={`${random['h5']} ${random['font-weight-normal']}`}>
                        keyword suggestions in Keyword Explorer
                      </span>
                    </div>
                  </div>
                  <div className={`${random['col-12']} ${random['col-lg-4']} ${random['px-md-0']}`}>
                    <div className={`${random['card-body']} ${random['text-center']} ${random['navbar-theme-primary']} ${random['py-4']}`}>
                      <h2 className={random['font-weight-bold']}>
                        <span className={`${random['h1']} ${random['mr-2']}`}>250,000</span>
                      </h2>{" "}
                      <span className={`${random['h5']} ${random['font-weight-normal']}`}>
                        local business listings optimized with Moz Local
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${random['row']} ${random['justify-content-center']}`}>
              <div className={`${random['col-12']} ${random['col-md-8']}`}>
                <form
                  action="https://demos.creative-tim.com/impact-design-system-pro/dashboard/pages/dashboards/dashboard.html"
                  className={`${random['form-group']} ${random['mb-4']}`}
                >
                  <div className={`${random['d-flex']} ${random['flex-row']} ${random['justify-content-center']}`}>
                    <div className={random['input-group']}>
                      <input
                        className={`${random['form-control']} ${random['form-control-xl']} ${random['border-light']}`}
                        placeholder="Enter a domain"
                        type="text"
                      />
                      <div className={random['input-group-prepend']}>
                        <button
                          type="submit"
                          className={`${random['btn']} ${random['btn-secondary']} ${random['rounded-right']}`}
                        >
                          Analyze domain
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <span className={random['small']}>
                  Rocket also offers access to our best-in-class proprietary
                  metrics including Keyword Difficulty, Spam Score, Page
                  Authority, and Domain Authority — the most highly correlated
                  metric with actual Google rankings available today.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className={`${random['section']} ${random['section-lg']}`}>
          <div className={random['container']}>
            <div className={`${random['row']} ${random['justify-content-center']} ${random['mb-5']} ${random['mb-lg-7']}`}>
              <div className={`${random['col-12']} ${random['col-md-8']} ${random['text-center']}`}>
                <h1 className={`${random['h1']} ${random['font-weight-bolder']} ${random['mb-4']}`}>
                  Recommended by leading experts in marketing and SEO
                </h1>
                <p className={random['lead']}>
                  Our products are loved by users worldwide
                </p>
              </div>
            </div>
            <div className={`${random['row']} ${random['mb-lg-5']}`}>
              <div className={`${random['col-12']} ${random['col-lg-6']}`}>
                <div className={`${random['customer-testimonial']} ${random['d-flex']} ${random['mb-5']}`}>
                  <img
                    src="../assets/img/team/profile-picture-1.jpg"
                    className={`${random['image']} ${random['image-sm']} ${random['mr-3']} ${random['rounded-circle']} ${random['shadow']}`}
                    alt=""
                  />
                  <div className={`${random['content']} ${random['bg-soft']} ${random['shadow-soft']} ${random['border']} ${random['border-light']} ${random['rounded']} ${random['position-relative']} ${random['p-4']}`}>
                    <div className={`${random['d-flex']} ${random['mb-4']}`}>
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>
                    </div>
                    <p className={random['mt-2']}>
                      We use Rocket mainly for its site explorer, and its
                      immensely improved how we find link targets. We use it
                      both for getting quick analysis of a site, as well as
                      utilizing its extensive index when we want to dive deep.
                    </p>
                    <span className={`${random['h6']}`}>
                      - James Curran{" "}
                      <small className={`${random['ml-0']} ${random['ml-md-2']}`}>
                        General Manager Spotify
                      </small>
                    </span>
                  </div>
                </div>
                <div className={`${random['customer-testimonial']} ${random['d-flex']} ${random['mb-5']}`}>
                  <img
                    src="../assets/img/team/profile-picture-2.jpg"
                    className="${random['image']} ${random['image-sm']} ${random['mr-3']} ${random['rounded-circle']} ${random['shadow']}"
                    alt=""
                  />
                  <div className="${random['content']} ${random['bg-soft']} ${random['shadow-soft']} border ${random['border-light']} ${random['rounded']} ${random['position-relative']} ${random['p-4']}">
                    <div className="${random['d-flex']} ${random['mb-4']}">
                      <span className="${random['text-warning']} ${random['mr-2']}">
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className="${random['text-warning']} ${random['mr-2']}">
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className="${random['text-warning']} ${random['mr-2']}">
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className="${random['text-warning']} ${random['mr-2']}">
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className="${random['text-warning']} ${random['mr-2']}">
                        <i className="star fas fa-star"></i>
                      </span>
                    </div>
                    <p className="${random['mt-2']}">
                      We use Rocket mainly for its site explorer, and it’s
                      immensely improved how we find link targets. We use it
                      both for getting quick analysis of a site, as well as
                      utilizing its extensive index when we want to dive deep.
                    </p>
                    <span className={`${random['h6']}`}>
                      - Richard Thomas{" "}
                      <small className={`${random['ml-0']} ${random['ml-md-2']}`}>
                        Front-end developer Oracle
                      </small>
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${random['col-12']} ${random['col-lg-6']} ${random['pt-lg-6']}`}>
                <div className={`${random['customer-testimonial']} ${random['d-flex']} ${random['mb-5']}`}>
                  <img
                    src="../assets/img/team/profile-picture-4.jpg"
                    className={`${random['image']} ${random['image-sm']} ${random['mr-3']} ${random['rounded-circle']} ${random['shadow']}`}
                    alt=""
                  />
                  <div className={`${random['content']} ${random['bg-soft']} ${random['shadow-soft']} border ${random['border-light']} ${random['rounded']} ${random['position-relative']} ${random['p-4']}`}>
                    <div className={`${random['d-flex']} ${random['mb-4']}`}>
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>
                    </div>
                    <p className={random['mt-2']}>
                      We use Rocket mainly for its site explorer, and it’s
                      immensely improved how we find link targets. We use it
                      both for getting quick analysis of a site, as well as
                      utilizing its extensive index when we want to dive deep.
                    </p>
                    <span className={random['h6']}>
                      - Jose Evans{" "}
                      <small className={`${random['ml-0']} ${random['ml-md-2']}`}>
                        Chief Engineer Apple
                      </small>
                    </span>
                  </div>
                </div>
                <div className={`${random['customer-testimonial']} ${random['d-flex']} ${random['mb-5']}`}>
                  <img
                    src="../assets/img/team/profile-picture-6.jpg"
                    className={`${random['image']} ${random['image-sm']} ${random['mr-3']} ${random['rounded-circle']} ${random['shadow']}`}
                    alt=""
                  />
                  <div className={`${random['content']} ${random['bg-soft']} ${random['shadow-soft']} border ${random['border-light']} ${random['rounded']} ${random['position-relative']} ${random['p-4']}`}>
                    <div className={`${random['d-flex']} ${random['mb-4']}`}>
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>{" "}
                      <span className={`${random['text-warning']} ${random['mr-2']}`}>
                        <i className="star fas fa-star"></i>
                      </span>
                    </div>
                    <p className={random['mt-2']}>
                      We use Rocket mainly for its site explorer, and it’s
                      immensely improved how we find link targets. We use it
                      both for getting quick analysis of a site, as well as
                      utilizing its extensive index when we want to dive deep.
                    </p>
                    <span className={random['h6']}>
                      - Richard Thomas{" "}
                      <small className={`${random['ml-0']} ${random['ml-md-2']}`}>Manager IBM</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={random['row']}>
              <div className={`${random['col']} ${random['text-center']}`}>
                <a
                  href="testimonials.html"
                  className={`${random['btn']} ${random['btn-primary']} ${random['animate-up-2']}`}
                >
                  <span className={random['mr-2']}>
                    <i className="fas fa-book-open"></i>
                  </span>{" "}
                  See all stories
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className={`${random['section']} ${random['section-lg']} pb-5 ${random['bg-soft']}`}>
          <div className={random['container']}>
            <div className={random['row']}>
              <div className={`${random['col-12']} ${random['text-center']} ${random['mb-5']}`}>
                <h2 className={random['mb-4']}>Faster growth starts with Rocket</h2>
                <p className={`${random['lead']} ${random['mb-5']}`}>
                  Join over <span className={random['font-weight-bolder']}>300,000+</span>{" "}
                  users
                </p>
                <a href="#" className={`${random['icon']} ${random['icon-lg']} ${random['text-gray']} ${random['mr-3']}`}>
                  <i className="fab fa-mailchimp"></i>{" "}
                </a>
                <a href="#" className={`${random['icon']} ${random['icon-lg']} ${random['text-gray']} ${random['mr-3']}`}>
                  <i className="fab fa-cpanel"></i>{" "}
                </a>
                <a href="#" className={`${random['icon']} ${random['icon-lg']} ${random['text-gray']} ${random['mr-3']}`}>
                  <i className="fab fa-dhl"></i>{" "}
                </a>
                <a href="#" className={`${random['icon']} ${random['icon-lg']} ${random['text-gray']} ${random['mr-3']}`}>
                  <i className="fab fa-github-alt"></i>{" "}
                </a>
                <a href="#" className={`${random['icon']} ${random['icon-lg']} ${random['text-gray']} ${random['mr-3']}`}>
                  <i className="fab fa-aws"></i>{" "}
                </a>
                <a href="#" className={`${random['icon']} ${random['icon-lg']} ${random['text-gray']}`}>
                  <i className="fab fa-node"></i>
                </a>
              </div>
              <div className={`${random['col-12']} ${random['text-center']}`}>
                {" "}
                <button
                  className={`${random['btn']} ${random['btn-secondary']} ${random['animate-up-2']}`}
                  data-toggle="modal"
                  data-target=".pricing-modal"
                >
                  <span className={random['mr-2']}>
                    <i className="fas fa-hand-pointer"></i>
                  </span>
                  Start 30-days trial
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* <div id="pricing-modal" className="modal fade pricing-modal" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content ${random['py-4']}">
          <div className="px-3">
            <div className="${random['col-12']} ${random['d-flex']} justify-content-end d-lg-none"><i className="fas fa-times" data-dismiss="modal"
                aria-label="Close"></i></div>
          </div>
          <div className="modal-header ${random['text-center']} text-black">
            <div className="col-12">
              <h4 className="px-lg-6">Our 30-days trial gives you full access to all tools and features of your chosen plan.
              </h4>
            </div>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12 ${random['col-lg-6']} text-left">
                <div className="form-check card ${random['border-light']} p-3"><input className="form-check-input" type="radio"
                    name="exampleRadios" id="exampleRadios1" value="option1"/> <label className="form-check-label"
                    htmlFor="exampleRadios1"><span className="${random['h6']} text-black d-block">Free</span> <span
                      className="small text-gray">30 days for free, then $99/mo</span> <span
                      className="text-gray ${random['mt-3']} d-block p">Suits freelance marketers and solopreneurs. Get full access to
                      Ahrefs core tools and features with enough data to do SEO for your personal
                      projects.</span></label></div>
              </div>
              <div className="col-12 ${random['col-lg-6']} text-left">
                <div className="form-check card ${random['border-light']} p-3"><input className="form-check-input" type="radio"
                    name="exampleRadios" id="exampleRadios2" value="option2" checked="checked"/> <label
                    className="form-check-label" htmlFor="exampleRadios2"><span className="${random['h6']} text-black d-block">Premium</span>
                    <span className="small text-gray">200$/mo</span> <span className="text-gray ${random['mt-3']} d-block p">Perfect for SEO
                      consultants and in-house marketers. Get everything in Lite with more features and increased data
                      limits to research a large number of websites.</span></label></div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 ${random['text-center']}">
            <div className="col text-gray"><a href="checkout.html" className="btn ${random['btn-primary']} ${random['mb-4']}">Continue</a>
              <p className="small mb-0">You can upgrade, downgrade, or cancel your subscription anytime.<br/>No contracts, no
                hidden charges.</p>
            </div>
          </div>
        </div>
      </div>
    </div> */}
        <Footer />
      </main>
    </>
  );
};
export default Home;
