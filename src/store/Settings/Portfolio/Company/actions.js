import axios from "axios";

export const companyDataForPortfolio = () => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/company_setting`;
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
          type: "COMPANY_DATA",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "COMPANY_DATA",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const companyDataForPortfolioEdit = state => {
  console.log({ ...state });
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = `${process.env.REACT_APP_LOCALHOST}`;
  var url = `${newUrl}/company_setting`;

  const formData = {
    country: state.selectedCountry.value,
    region: state.selectedRegion.value,
    licence_number: state.licence_number,
    include_property_key_number: state.include_property_key_number,
    update_inspection_date: state.update_inspection_date,
    client_access: state.client_access,
    client_access_url: state.client_access_url,
    portfolio_id: state.portfolio_id,
    // working_hours:state.,
    rental_position_on_receipts: state.rental_position_on_receipts,
    show_effective_paid_to_dates: state.show_effective_paid_to_dates,
    include_paid_bills: state.include_paid_bills,
    bill_approval: state.bill_approval,
    join_the_test_program: state.join_the_test_program,
  };

  console.log(formData);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    // axios
    //   .post(url, formData, { headers: headers })
    //   .then(response => {
    //     dispatch({
    //       type: "COMPANY_DATA_EDIT",
    //       payload: response.data,
    //       status: "Success",
    //     });
    //   })
    //   .catch(error => {
    //     dispatch({
    //       type: "COMPANY_DATA_EDIT",
    //       payload: error,
    //       status: "Failed",
    //     });
    //   });
  };
};
