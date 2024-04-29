import axios from "axios";
  
var authUser = JSON.parse(localStorage.getItem("authUser"));

export const addProPic = company => {
//   console.log(company);
//   var url = "https://backend-myday.cliqpack.com/api/companies";
//   const formData = {
//     company_name: company.company,
//     address: company.address,
//     phone: company.phone,
//   };
  
  return dispatch => {
    dispatch({
        type: "propic_add",
        payload:response.data,
        status: "Success",
    });
  };
};

