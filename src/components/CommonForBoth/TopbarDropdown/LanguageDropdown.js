// import React, { Component } from "react";
// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import { map } from "lodash";
// import { connect } from "react-redux";
// import { selectLanguage } from 'store/actions'
// //i18n
// import i18n from "../../../i18n";
// import { withTranslation } from "react-i18next";

// import languages from "../../../common/languages";

// class LanguageDropdown extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       menu: false,
//       selectedLang: "en",
//     };
//   }

//   componentDidMount() {

//     const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
//     this.changeLanguageAction(currentLanguage)
//     this.setState({ selectedLang: currentLanguage });
//   }

//   changeLanguageAction = lang => {
//     //set language as i18n
//     i18n.changeLanguage(lang);
//     localStorage.setItem("I18N_LANGUAGE", lang);
//     this.setState({ selectedLang: lang });
//   };

//   toggle = () => {
//     this.setState(prevState => ({
//       menu: !prevState.menu,
//     }));
//   };



//   render() {
//     const { selectedLang, menu } = this.state;
//     const { select_language_loading, select_language_data } = this.props;
//     console.log(select_language_loading, select_language_data);

//     return (
//       <React.Fragment>
//         <Dropdown isOpen={menu} toggle={this.toggle} className="d-inline-block">
//           <DropdownToggle className="btn header-item" tag="button">
//             <img
//               src={languages[selectedLang]?.flag}
//               alt="Skote"
//               width='24px'
//               className="me-1"
//             />

//             {/* <span className="align-middle text-white">
//                 {languages[selectedLang].label}
//               </span> */}

//           </DropdownToggle>
//           <DropdownMenu className="language-switch dropdown-menu-end">
//             {map(Object.keys(languages), key => (
//               <DropdownItem
//                 key={key}
//                 onClick={() => this.changeLanguageAction(key)}
//                 className={`notify-item ${selectedLang === key ? "active" : "none"
//                   }`}
//               >
//                 <img
//                   src={languages[key].flag}
//                   alt="Skote"
//                   className="me-1"
//                   width='24px'
//                 />

//                 <span className="align-middle">{languages[key].label}</span>
//               </DropdownItem>
//             ))}
//           </DropdownMenu>
//         </Dropdown>
//       </React.Fragment>
//     );
//   }
// }

// // export default withTranslation()(LanguageDropdown);

// const mapStateToProps = gstate => {
//   const {
//     select_language_data, select_language_loading, get_select_language_data, get_select_language_loading

//   } = gstate.property;





//   return {
//     select_language_data, select_language_loading, get_select_language_data, get_select_language_loading
//   };
// };
// export default connect(mapStateToProps, {
//   selectLanguage
// })(LanguageDropdown);


import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { map } from "lodash";
import { connect, useDispatch } from "react-redux";
import { selectLanguage, selectLanguageFresh, getSelectedLanguage } from 'store/actions'
//i18n
import i18n from "../../../i18n";
import { withTranslation } from "react-i18next";
import toastr from "toastr";

import languages from "../../../common/languages";

const LanguageDropdown = (props) => {
  const { select_language_loading, select_language_data, get_select_language_loading, get_select_language_data } = props;
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState(get_select_language_data?.data?.data);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const userId = authUser.user.id

  const currentLanguage = get_select_language_data?.data?.data


  useEffect(() => {


    if (get_select_language_loading == false) {
      dispatch(getSelectedLanguage(userId))
    }
  }, [get_select_language_loading]);

  useEffect(() => {
    if (select_language_loading == 'Success') {
      toastr.success(`${currentLanguage == 'en' ? 'Mandarin' : 'English'} language selected`)
      dispatch(selectLanguageFresh())
      dispatch(getSelectedLanguage(userId))
      console.log(currentLanguage);

    }
    if (get_select_language_data?.data?.data) {

      setSelectedLang(currentLanguage);
      i18n.changeLanguage(currentLanguage);

    }
  }, [select_language_loading, get_select_language_data?.data?.data])

  const changeLanguageAction = (lang) => {
    //set language as i18n
    i18n.changeLanguage(lang);
    dispatch(selectLanguage(lang, userId))
  };

  const toggle = () => {
    setMenu(prevMenu => !prevMenu);
  };



  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
        <DropdownToggle className="btn header-item" tag="button">
          <img
            src={languages[selectedLang]?.flag}
            alt="Skote"
            width='24px'
            className="me-1"
          />
        </DropdownToggle>
        <DropdownMenu className="language-switch dropdown-menu-end">
          {map(Object.keys(languages), key => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${selectedLang === key ? "active" : "none"
                }`}
            >
              <img
                src={languages[key].flag}
                alt="Skote"
                className="me-1"
                width='24px'
              />

              <span className="align-middle">{languages[key].label}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}

const mapStateToProps = gstate => {
  const {
    select_language_data, select_language_loading, get_select_language_data, get_select_language_loading

  } = gstate.property;

  return {
    select_language_data, select_language_loading, get_select_language_data, get_select_language_loading
  };
};

export default connect(mapStateToProps, {
  selectLanguage, selectLanguageFresh, getSelectedLanguage
})(withTranslation()(LanguageDropdown));
