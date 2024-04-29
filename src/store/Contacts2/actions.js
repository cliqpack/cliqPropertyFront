import axios from "axios";
import { property } from "lodash";

var authUser = JSON.parse(localStorage.getItem("authUser"));

export const addContact = (value, phone, contact, phy, pos, cId) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/contacts`;
  const formData = {
    reference: contact.reference,
    supplier: contact.type,
    contacts: contact.contacts,

    abn: contact.abn,
    notes: contact.notes,

    physical: phy,
    postal: pos,

    contact_id: cId
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
          type: "CONTACT_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "CONTACT_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const contactList = (
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null,
  ssr
) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  let url;
  if (ssr) {
    url = `${process.env.REACT_APP_LOCALHOST}/contacts-ssr?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;
  } else {
    url = `${process.env.REACT_APP_LOCALHOST}/contacts`;
  }

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
          type: "CONTACT_LIST",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "CONTACT_LIST",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const ContactListFresh = () => {
  return dispatch => {
    dispatch({
      type: "CONTACT_LIST_FRESH",
      status: null,
    });
  };
};

export const contactListType = (
  page,
  sizePerPage,
  search = null,
  sortField = null,
  sortValue = null,
  type
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/contactType-ssr/${type}?page=${page}&sizePerPage=${sizePerPage}&q=${search}&sortField=${sortField}&sortValue=${sortValue}`;

  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  if (type === "Owner") {
    return dispatch => {
      axios
        .get(url, { headers: headers })
        .then(response => {
          dispatch({
            type: "CONTACT_LIST_TYPE_OWNER",
            payload: response.data,
            status: "Success",
          });
        })
        .catch(error => {
          dispatch({
            type: "CONTACT_LIST_TYPE_OWNER",
            payload: error,
            status: "Failed",
          });
        });
    };
  } else if (type === "Tenant") {
    return dispatch => {
      axios
        .get(url, { headers: headers })
        .then(response => {
          dispatch({
            type: "CONTACT_LIST_TYPE_TENANT",
            payload: response.data,
            status: "Success",
          });
        })
        .catch(error => {
          dispatch({
            type: "CONTACT_LIST_TYPE_TENANT",
            payload: error,
            status: "Failed",
          });
        });
    };
  } else if (type === "Supplier") {
    return dispatch => {
      axios
        .get(url, { headers: headers })
        .then(response => {
          dispatch({
            type: "CONTACT_LIST_TYPE_SUPPLIER",
            payload: response.data,
            status: "Success",
          });
        })
        .catch(error => {
          dispatch({
            type: "CONTACT_LIST_TYPE_SUPPLIER",
            payload: error,
            status: "Failed",
          });
        });
    };
  } else if (type === "Seller") {
    return dispatch => {
      axios
        .get(url, { headers: headers })
        .then(response => {
          dispatch({
            type: "CONTACT_LIST_TYPE_SELLER",
            payload: response.data,
            status: "Success",
          });
        })
        .catch(error => {
          dispatch({
            type: "CONTACT_LIST_TYPE_SELLER",
            payload: error,
            status: "Failed",
          });
        });
    };
  }
};

export const ContactListOwnerFresh = () => {
  return dispatch => {
    dispatch({
      type: "CONTACT_LIST_TYPE_OWNER",
      status: false,
    });
  };
};

export const ContactListTenantFresh = () => {
  return dispatch => {
    dispatch({
      type: "CONTACT_LIST_TYPE_TENANT",
      status: false,
    });
  };
};

export const ContactListSupplierFresh = () => {
  return dispatch => {
    dispatch({
      type: "CONTACT_LIST_TYPE_SUPPLIER",
      status: false,
    });
  };
};

export const ContactListSellerFresh = () => {
  return dispatch => {
    dispatch({
      type: "CONTACT_LIST_TYPE_SELLER",
      status: false,
    });
  };
};

export const showContact = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/contacts/${id}`;
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
          type: "SHOW_CONTACT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SHOW_CONTACT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const showContactFresh = () => {
  return dispatch => {
    dispatch({
      type: "SHOW_CONTACT_FRESH",
      status: false,
    });
  };
};
export const getOwnerContact = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get/owner/contact/${id}`;
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
          type: "GET_OWNER_CONTACT",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_OWNER_CONTACT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const getOwnerContactFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_OWNER_CONTACT_FRESH",
      status: false,
    });
  };
};

export const addContactFresh = () => {
  return dispatch => {
    dispatch({
      type: "ADD_CONTACT_FRESH",
      status: false,
    });
  };
};

export const addSupplierFresh = () => {
  return dispatch => {
    dispatch({
      type: "ADD_SUPPLIER_FRESH",
      status: false,
    });
  };
};

export const addEditContact = contact => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/contacts`;
  const formData = {
    reference: contact.reference,

    first_name: contact.first_name,
    last_name: contact.last_name,
    salutation: contact.salutation,
    company_name: contact.company_name,
    mobile_phone: contact.mobile_phone,
    work_phone: contact.work_phone,
    home_phone: contact.home_phone,
    email: contact.email,
    communication: contact.communication,

    notes: contact.notes,

    physical_building_name: contact.physical_building_name,
    physical_unit: contact.physical_unit,
    physical_number: contact.physical_number,
    physical_street: contact.physical_street,
    physical_suburb: contact.physical_suburb,
    physical_postcode: contact.physical_postcode,
    physical_state: contact.physical_state,
    physical_country: contact.physical_country,

    postal_building_name: contact.postal_building_name,
    postal_unit: contact.postal_unit,
    postal_number: contact.postal_number,
    postal_street: contact.postal_street,
    postal_suburb: contact.postal_suburb,
    postal_postcode: contact.postal_postcode,
    postal_state: contact.postal_state,
    postal_country: contact.postal_country,
  };
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };
  console.log(formData);

  axios
    .post(url, formData, { headers: headers })
    .then(response => {
      dispatch({
        type: "EDIT_CONTACT_ADD",
        payload: response.data,
        status: "Success",
      });
    })
    .catch(error => {
      dispatch({
        type: "EDIT_CONTACT_ADD",
        payload: error,
        status: "Failed",
      });
    });
};

export const addSupplier = (
  supplier,
  folio,
  physicalAddress,
  postalAddress,
  payment,
  contact_id = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/property/supplier/store`;
  var pay = payment;

  const formData = {
    contact_id: contact_id,
    reference: supplier.reference,

    contacts: supplier.contacts,

    physical: physicalAddress,
    postal: postalAddress,

    notes: supplier.notes,
    communication: supplier.communication,

    abn: folio.abn,
    website: folio.website,
    account: folio.account,
    priority: folio.bill_priority,
    auto_approve_bills: folio.auto_approve_bill,

    payment: pay,
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
          type: "SUPPLIER_ADD",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SUPPLIER_ADD",
          payload: error,
          status: "Failed",
        });
      });
  };
};

// export const addSupplierFresh = () => {
//   return dispatch => {
//     dispatch({
//       type: "ADD_SUPPLIER_FRESH",
//       status: false,
//     });
//   };
// };

export const editContact = (value, id, phone, contact, phy, pos) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/contacts/${id}`;

  const formData = {
    reference: contact.reference,
    supplier: contact.type,
    contacts: contact.contacts,

    abn: contact.abn,
    notes: contact.notes,

    physical: phy,
    postal: pos,
  };

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "EDIT_CONTACT",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EDIT_CONTACT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editContactFresh = () => {
  return dispatch => {
    dispatch({
      type: "EDIT_CONTACT_FRESH",
      payload: null,
      status: false,
    });
  };
};

export const SupplierInfoFresh = () => {
  return dispatch =>
    dispatch({
      type: "SUPPLIER_INFO_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const getSupplierInfo = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  let url = `${process.env.REACT_APP_LOCALHOST}/supplier/${id}`;
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
          type: "SUPPLIER_INFO",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SUPPLIER_INFO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editSupplier = (
  supplier,
  folio,
  payment,
  id,
  physical,
  postal,
  check
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/property/supplier/contact/${id}`;
  var pay = payment;
  const formData = {
    // supplier_id: supplier_id,

    // Supplier Contact
    supplier_id: id,
    reference: supplier.reference,

    contacts: supplier.contacts,

    physical: physical,
    postal: postal,

    notes: supplier.notes,
    communication: check,

    // Supplier Folio
    abn: folio.abn,
    website: folio.website,
    account: folio.account,
    priority: folio.bill_priority,
    auto_approve_bills: folio.auto_approve_bill,

    //payment
    payment: pay,
  };

  // console.log(supplier);
  console.log(check);

  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",

      Authorization: "Bearer " + authUser.token,
    };
    console.log(formData);

    axios
      .put(url, formData, { headers: headers })
      .then(response => {
        dispatch({
          type: "SUPPLIER_UPDATE",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SUPPLIER_UPDATE",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const editSupplierFresh = () => {
  return dispatch => {
    dispatch({
      type: "SUPPLIER_UPDATE_FRESH",
      payload: null,
      error: null,
      status: false,
    });
  };
};

export const lebelContact = (insId, lebels) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newUrl = process.env.REACT_APP_LOCALHOST;
  var url = newUrl + "/contact/info/label";
  const headers = {
    "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",

    Authorization: "Bearer " + authUser.token,
  };

  const formData = {
    contact_id: insId,
    labels: lebels,
  };

  console.log(formData);

  return dispatch => {
    axios
      .post(url, formData, { headers: headers })
      .then(response => {
        dispatch(showContact(insId));
      })
      .catch(error => {
        dispatch({
          type: "CONTACT_LABEL",
          error: error,
          status: "Failed",
        });
      });
  };
};

export const getMessageTemplatesForContactBySelect = (
  data = null,
  query = null
) => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  const newData = data.map(item => item.label);

  let url = `${process.env.REACT_APP_LOCALHOST}/contacts/message/mail/template/filter`;
  const formData = {
    trigger_to: data,
    trigger_to2: newData,
    query: query,
  };
  console.log(formData);
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
          type: "GET_MESSAGE_TEMPLATES_FOR_CONTACTS_BY_SELECT",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_MESSAGE_TEMPLATES_FOR_CONTACTS_BY_SELECT",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendMailFromTemplatesInContacts = (id, sub, contactId) => {
  console.log(id, sub, contactId);
  var authUser = JSON.parse(localStorage.getItem("authUser"));
  var url = `${process.env.REACT_APP_LOCALHOST}/contacts/message/mail/template/activity`;
  const formData = {
    contact_id: contactId,
    template_id: id,
    subject: sub,
  };
  console.log(formData);
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
          type: "SEND_MAIL_TO_ACTIVITY_CONTACTS",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SEND_MAIL_TO_ACTIVITY_CONTACTS",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const sendMailFromTemplatesInContactsFresh = () => {
  return dispatch =>
    dispatch({
      type: "SEND_MAIL_TO_ACTIVITY_CONTACTS_FRESH",
    });
};

export const emailValidationCheck = (data, text) => {
  console.log(text);
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  let url = `${process.env.REACT_APP_LOCALHOST}/contact/email/check`;
  const formData = {
    email: data,
    check: text == "owner" ? "owner" : text == "tenant" ? "tenant" : "contact",
  };
  console.log(formData);

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
          type: "EMAIL_VALIDATION_CHECK",
          payload: response,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "EMAIL_VALIDATION_CHECK",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const emailValidationCheckFresh = () => {
  return dispatch =>
    dispatch({
      type: "EMAIL_VALIDATION_CHECK_FRESH",
      payload: null,
      error: null,
      status: false,
    });
};

export const showContactFolio = id => {
  var authUser = JSON.parse(localStorage.getItem("authUser"));

  var url = `${process.env.REACT_APP_LOCALHOST}/get_ownerFolio/${id}`;
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
          type: "SHOW_CONTACT_FOLIO",
          payload: response.data,
          status: "Success",
        });
      })
      .catch(error => {
        dispatch({
          type: "SHOW_CONTACT_FOLIO",
          payload: error,
          status: "Failed",
        });
      });
  };
};

export const showContactFolioFresh = () => {
  return dispatch => {
    dispatch({
      type: "SHOW_CONTACT_FOLIO",
      status: false,
    });
  };
};
