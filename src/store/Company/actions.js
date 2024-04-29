  import axios from "axios";
  
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  
  export const addCompany = company => {
    console.log(company);
    var url = process.env.REACT_APP_LOCALHOST+"/companies";
    const formData = {
      company_name: company.company,
      address: company.address,
      phone: company.phone,
    };
    
    return dispatch => {
      const headers = {
        "Content-Type": "application/json",
  
        "Access-Control-Allow-Origin": "*",
  
        Authorization: "Bearer " + authUser.token,
      };
      axios
        .post(url, formData, { headers: headers })
        .then(response => {
          dispatch({
            type: "company_add",
            payload:response.data,
            status: "Success",
          });
        })
        .catch(error => {
          dispatch({
            type: "company_add",
            payload: error,
            status: "Failed",
          });
        });
    };
  };


//   export const editCompany = user => {
//     console.log(user);
//     var url = "https://backend-myday.cliqpack.com/api/login";
//     const formData = {
//       email: user.email,
//       password: user.password,
//     };
//     return dispatch => {
//       const headers = {
//         "Content-Type": "application/json",
  
//         "Access-Control-Allow-Origin": "*",
//       };
//       axios
//         .post(url, formData, { headers: headers })
//         .then(response => {
//           dispatch({
//             type: MENU_EDIT_SUCCESS,
//             status: "Success",
//           });
//         })
//         .catch(error => {
//           dispatch({
//             type: MENU_EDIT_FAILED,
//             payload: error,
//             status: "Faild",
//           });
//         });
//     };
//   };


  export const companyList = () => {
    var url = process.env.REACT_APP_LOCALHOST+"/companies";
    const formData = {};
    return dispatch => {
      const headers = {
        "Content-Type": "application/json",
  
        "Access-Control-Allow-Origin": "*",
  
        Authorization: "Bearer " + authUser.token,
      };
      axios
        .get(url, { headers: headers })
        .then(response => {
          dispatch({
            type: "COMPANY_LIST",
            payload: response,
            status: "Success",
          });
        })
        .catch(error => {
          dispatch({
            type: "COMPANY_LIST",
            payload: error,
            status: "Failed",
          });
        });
    };
  };
  
  export const deleteCompany = (id) => {
    var url = process.env.REACT_APP_LOCALHOST+"/companies/"+id;
    const formData = {};
    return dispatch => {
      const headers = {
        "Content-Type": "application/json",
  
        "Access-Control-Allow-Origin": "*",
  
        Authorization: "Bearer " + authUser.token,
      };
      axios
        .delete(url, { headers: headers })
        .then(response => {
          dispatch({
            type: "COMPANY_DELETE",
            status: "Success",
          });
        })
        .catch(error => {
          dispatch({
            type: "COMPANY_DELETE",
            payload: error,
            status: "Faild",
          });
        });
    };
  };
  
  export const companyAddFresh = () => {
    return dispatch =>
      dispatch({
        type: "COMPANY_ADD_FRESH",
        payload: null,
        error: null,
        status: false,
      });
  };
//   export const menuEditFresh = () => {
//     return dispatch =>
//       dispatch({
//         type: MENU_EDIT_FRESH,
//         payload: null,
//         status: false,
//       });
//   };
  export const companyDeleteFresh = () => {
    return dispatch =>
      dispatch({
        type: "COMPANY_DELETE_FRESH",
        payload: null,
        status: false,
      });
  };
  export const companyListFresh = () => {
    return dispatch =>
      dispatch({
        type: "COMPANY_LIST_FRESH",
        payload: null,
        error: null,
        status: false,
      });
  };



  