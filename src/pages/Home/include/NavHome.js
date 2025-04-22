import { React, useEffect, useState, } from "react";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  withRouter,
} from "react-router-dom";

import random from "./css/front.module.css";

const NavHome = props => {
  const [state, setState] = useState();
  const [styleState, setStyleState] = useState({
    showClass: false,
    headroom: false,
  });
  const history=useHistory();

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      if (window.scrollY > 400) {
        setStyleState((prev)=>{
          return {
            ...prev,
            headroom: true
          }
        });
      } else setStyleState((prev)=>{
        return {
          ...prev,
          headroom: false
        }
      });
    })
  }, []);

  const handleover = () => {
    setStyleState((prev) => {
      return {
        ...prev,
        showClass: true,
      }
    })
  }

  const handleLeave = () => {
    setStyleState((prev) => {
      return {
        ...prev,
        showClass: false,
      }
    })
  }

  return (
    <header className={random['header-global']}>
      <nav
        id="navbar-main"
        className={`${random['navbar']} ${random['navbar-main']} ${random['navbar-expand-lg']} ${random['headroom']} ${random['py-lg-3']} ${random['px-lg-6']} ${random['navbar-light']} ${random['navbar-theme-primary']}  ${styleState.headroom? `${random['headroom--pinned']} ${random['headroom--not-top']}`: `${random['headroom--pinned']} ${random['headroom--top']}`}`}
      >
        <div className={random['container']}>
          <a className={`${random['navbar-brand']} @@logo_classes`} href="#">
            <img
              className="navbar-brand-dark common"
              src="https://frontend-myday.cliqpack.com/static/media/logo-dark.c7b586a981eaa4d4fb67.png"
              height="35"
              alt="Logo light"
            />{" "}
            {/* <img
              className="navbar-brand-light common"
              src="https://frontend-myday.cliqpack.com/static/media/logo-dark.c7b586a981eaa4d4fb67.png"
              height="35"
              alt="Logo dark"
            /> */}
          </a>
          <div
            className={`${random['navbar-collapse']} ${random['collapse']} ${random['justify-content-center']}`}
            id="navbar_global"
          >
            <div className={random['navbar-collapse-header']}>
              <div className={random['row']}>
                <div className={`${random['col-6']} ${random['collapse-brand']}`}>
                  <a href="https://demos.creative-tim.com/impact-design-system-pro/index.html">
                    <img
                      src="https://demos.creative-tim.com/impact-design-system-pro/front/assets/img/brand/dark.svg"
                      height="35"
                      alt="Logo Impact"
                    />
                  </a>
                </div>
                <div className={`${random['col-6']} ${random['collapse-close']}`}>
                  <a
                    href="#navbar_global"
                    role="button"
                    className="fas fa-times"
                    data-toggle={random['collapse']}
                    data-target="#navbar_global"
                    aria-controls="navbar_global"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  ></a>
                </div>
              </div>
            </div>
            <ul className={`${random['navbar-nav']} ${random['navbar-nav-hover']} ${random['justify-content-center']}`}>
              <li className={random['nav-item']}>
                <a href="#" className={random['nav-link']}>
                  Features
                </a>
              </li>
              <li className={random['nav-item']}>
                <a href="#" className={random['nav-link']}>
                  Pricing
                </a>
              </li>
              <li className={random['nav-item']}>
                <a href="#" className={random['nav-link']}>
                  Blogs
                </a>
              </li>
              <li className={random['nav-item']}>
                <a href="#" className={random['nav-link']}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className={`${random['d-none']} ${random['d-lg-block']} ${random['@@cta_button_classes']}`}>
            <div
              className={`${random['navbar-collapse']} ${random['collapse']} ${random['justify-content-center']}`}
              id="navbar_global"
            >
              <ul className={`${random['navbar-nav']} ${random['navbar-nav-hover']} ${random['justify-content-center']}`}>
                <li onMouseLeave={handleLeave} className={`${random['nav-item']} ${random['dropdown']} ${styleState.showClass?random['show']:''}`}>
                  <a
                    href="#"
                    className={`${random['nav-link']} ${random['dropdown-toggle']}`}
                    aria-expanded="false"
                    data-toggle="dropdown"
                    onMouseOver={handleover}
                  >
                    <span className={`${random['nav-link-inner-text']} ${random['mr-1']}`}>Sign In</span>{" "}
                    <i className="fas fa-angle-down nav-link-arrow"></i>
                  </a>
                  <div className={`${random['home-dropdown-menu']} ${random['home-dropdown-menu-lg']}`}>
                    <div className={`${random['col-auto']} ${random['px-0']}`} data-dropdown-content>
                      <div className={`${random['list-group']} ${random['list-group-flush']}`}>
                        <a onClick={()=>{history.push('/login')}}
                          className={`${random['list-group-item']} ${random['list-group-item-action']} ${random['d-flex']} ${random['align-items-center']} ${random['p-0']} ${random['py-3']} ${random['px-lg-4']}`}
                        >
                          <span className={`${random['icon']} ${random['icon-sm']} ${random['icon-secondary']}`}>
                            <i className="fas fa-user"></i>
                          </span>
                          <div className={random['ml-4']}>
                            <span className={`${random['text-dark']} ${random['d-block']}`}>
                              Property Manager
                            </span>
                          </div>
                        </a>
                        <a
                          onClick={()=>{history.push('/owner-tenant-login')}}
                          className={`${random['list-group-item']} ${random['list-group-item-action']} ${random['d-flex']} ${random['align-items-center']} ${random['p-0']} ${random['py-3']} ${random['px-lg-4']}`}
                        >
                          <span className={`${random['icon']} ${random['icon-sm']} ${random['icon-primary']}`}>
                            <i className="fas fa-users"></i>
                          </span>
                          <div className={random['ml-4']}>
                            <span className={`${random['text-dark']} ${random['d-block']}`}>
                              Owner or Tenant
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${random['d-flex']} ${random['d-lg-none']} ${random['align-items-center']}`}>
            <button
              className={random['navbar-toggler']}
              type="button"
              data-toggle={random['collapse']}
              data-target="#navbar_global"
              aria-controls="navbar_global"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className={random['navbar-toggler-icon']}></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default NavHome;
