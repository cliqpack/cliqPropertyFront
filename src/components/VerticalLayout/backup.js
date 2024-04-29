import PropTypes from "prop-types";
import React, { Component } from "react";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import axios from 'axios';
import menu from "store/ACL/menu/reducer";


class SidebarContent extends Component {
  
  constructor(props) {
    super(props);
    this.refDiv = React.createRef();

    this.state = {
     menu : false,
     jsx:undefined
    };
    var jsxTool = undefined


   
  }

  

 

  componentDidMount() {
    this.initMenu(); 
    var authUser = JSON.parse(localStorage.getItem("authUser"));
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };


    axios.get(`${process.env.REACT_APP_LOCALHOST}/menu`,{ headers: headers })
    .then(res => {
       console.log(res.data);
       this.setState({menu:res.data})

       console.log(this.state)

    })




    
    

  
   
   

  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }

    if(this.state.menu !== prevState.menu){
      this.loadData()
    }

   
    
   

  

  }


  async loadData(){
    if(this.state.menu){

      console.log(this.state.menu)
     
      this.jsxTool =  await this.state.menu.data.map((item,key) =>(
        <li key={key}>
        <Link to={`/${item.slug}`}>
        
          <i className="bx bx bx-user" />
  
          <span>{this.props.t(item.menu_title)}</span>
        </Link>

{/* 
                <Link to="/listing">
                 
                  <i className="bx bx bx-user" />

                  <span>{this.props.t("Listings")}</span>
                </Link> */}
              
      </li>
      ));


    }

    this.setState({...this.state,jsx:this.jsxTool})
    
  }

  initMenu() {
    new MetisMenu("#side-menu");

    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }




    
    
  

 
   
  }

  // componentDidUpdate() {}

  scrollElement = item => {
    setTimeout(() => {
      if (this.refDiv.current !== null) {
        if (item) {
          const currentPosition = item.offsetTop;
          if (currentPosition > window.innerHeight) {
            if (this.refDiv.current)
              this.refDiv.current.getScrollElement().scrollTop =
                currentPosition - 300;
          }
        }
      }
    }, 300);
  };

  activateParentDropdown = item => {
    item.classList.add("active");
    const parent = item.parentElement;

    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      this.scrollElement(item);
      return false;
    }
    this.scrollElement(item);
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <SimpleBar className="h-100" ref={this.refDiv}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{this.props.t("Menu")}</li>
              <li>
                <Link to="/#">
                  <i className="bx bx-home-circle" />
                  <span className="badge rounded-pill bg-info float-end">
                    04
                  </span>
                  <span>{this.props.t("Dashboards")}</span>
                </Link>

                {/* <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/dashboard">{this.props.t("Default")}</Link>
                  </li>
                  <li>
                    <Link to="/dashboard-saas">{this.props.t("Saas")}</Link>
                  </li>
                  <li>
                    <Link to="/dashboard-crypto">{this.props.t("Crypto")}</Link>
                  </li>
                  <li>
                    <Link to="/dashboard-blog">{this.props.t("Blog")}</Link>
                  </li>
                </ul> */}
              </li>

              <li className="menu-title">{this.props.t("Apps")}</li>

     
            
              {this.jsxTool}
              {/* <li>
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-store" />
                  <span>{this.props.t("Access Control List")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/menus">{this.props.t("Menu")}</Link>
                  </li>
                  <li>
                    <Link to="/modules">{this.props.t("Modules")}</Link>
                  </li>
                  <li>
                    <Link to="/roles">{this.props.t("Roles")}</Link>
                  </li>
                  <li>
                    <Link to="/user-role">{this.props.t("User Roles")}</Link>
                  </li>
                </ul>
              </li>
              

              <li>
                <Link to="/#" className="has-arrow">
                 
                  <i className="bx bxs-contact"></i>
                  <span>{this.props.t("Real Estate Companies")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/companies">{this.props.t("Company")}</Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-store" />
                  <span>{this.props.t("Properties")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/propertylist">{this.props.t("Properties")}</Link>
                  </li>
                </ul>
              </li>
              */}
                         
              <li>
                <Link to="/contactList">
                 
                  <i className="bx bx bx-user" />

                  <span>{this.props.t("Contact")}</span>
                </Link>
              </li>
              {/*
              <li>
                <Link to="/listing">
                 
                  <i className="bx bx bx-user" />

                  <span>{this.props.t("Listings")}</span>
                </Link>
              </li>
              <li>
                <Link to="/inspections">
                  <i className="bx bx-comment-x"></i>
                  
                  <span>{this.props.t("Inspections")}</span>
                </Link>
              </li> */}
              
              <li>
                <Link to="/admin-register">
                  <i className="bx bx-home-circle" />
                  {/* <span className="badge rounded-pill bg-info float-end">
                    04
                  </span> */}
                  <span>{this.props.t("Users")}</span>
                </Link>
            
            
              </li>
              
            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    );
  }
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  type: PropTypes.string,
};

export default withRouter(withTranslation()(SidebarContent));
