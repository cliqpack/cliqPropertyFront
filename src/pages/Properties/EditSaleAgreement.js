import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Button,
} from "reactstrap";
import classnames from "classnames";
import { Formik, Field, Form, ErrorMessage } from "formik";
import toastr from "toastr";

import {
  addOwner,
  propertyOwnerInfoFresh,
  propertyListFresh,
  addSaleAgreement,
  addSaleAgreementFresh,
  SaleAgreementInfoForProperty,
  editSaleAgreement,
  editSaleAgreementFresh,
  editSaleAgreementInfo,
  editSaleAgreementInfoFresh,
  SaleAgreementInfoForPropertyFresh,
} from "../../store/Properties/actions";
import {
  contactList,
  showContactFresh,
  showContact,
} from "../../store/Contacts2/actions";

import { Link, useHistory, withRouter, useParams } from "react-router-dom";
import Breadcrumbs from "components/Common/Breadcrumb";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import ContactForm from "pages/Contacts2/MultipleReference/ContactForm";

const EditSaleAgreement = props => {
  const { id, saleId, tabId } = useParams(); // Property ID

  const [state, setState] = useState({});
  const [activeState, setActiveState] = useState(0);
  const [postalAddress, setPostalAddress] = useState([]);
  const [physicalAddress, setPhysicalAddress] = useState([]);

  const [step, setStep] = useState(0);
  const [btnRows, setBtnRows] = useState([]);
  const [countDelete, setCountDelete] = useState(1);
  const [forCheck, setForCheck] = useState([]);
  const [checkState, setCheckState] = useState([[]]);
  const [fullPhysicalAddress, setFullPhysicalAddress] = useState([]);
  const [fullPostalAddress, setFullPostalAddress] = useState([]);

  const [buyerState, setBuyerState] = useState({
    reference: "",
    abn: "",
    notes: "",
    contacts: [
      {
        reference: "",
        first_name: "",
        last_name: "",
        salutation: "",
        company_name: "",
        mobile_phone: "",
        work_phone: "",
        home_phone: "",
        email: "",
        check: [],
        work_phone: "",
        deleted: false,
        primary: true,
        email1: "",
        email1_send_type: "",
        email1_status: false,
        email2: "",
        email2_send_type: "",
        email2_status: false,
        email3: "",
        email3_send_type: "",
        email3_status: false,
        optionEmail: [
          { label: "All Email", value: "All Email" },
          { label: "Statements Only", value: "Statements Only" },
        ],
      },
    ],
  });
  const [activeStateBuyer, setActiveStateBuyer] = useState(0);
  const [postalAddressBuyer, setPostalAddressBuyer] = useState([
    {
      postal_building_name: "",
      postal_unit: "",
      postal_number: "",
      postal_street: "",
      postal_suburb: "",
      postal_postcode: "",
      postal_state: "",
      postal_country: "",
    },
  ]);
  const [physicalAddressBuyer, setPhysicalAddressBuyer] = useState([
    {
      physical_building_name: "",
      physical_unit: "",
      physical_number: "",
      physical_street: "",
      physical_suburb: "",
      physical_postcode: "",
      physical_state: "",
      physical_country: "",
    },
  ]);

  const [stepBuyer, setStepBuyer] = useState(0);
  const [btnRowsBuyer, setBtnRowsBuyer] = useState([{ btn: "" }]);
  const [countDeleteBuyer, setCountDeleteBuyer] = useState(1);
  const [forCheckBuyer, setForCheckBuyer] = useState([
    {
      smsCheck: false,
      emailCheck: false,
      printCheck: false,
    },
  ]);
  const [checkStateBuyer, setCheckStateBuyer] = useState([[]]);
  const [fullPhysicalAddressBuyer, setFullPhysicalAddressBuyer] = useState([
    { full: "" },
  ]);
  const [fullPostalAddressBuyer, setFullPostalAddressBuyer] = useState([
    { full: "" },
  ]);

  // Form Tab State
  const [tabState, setTabState] = useState({
    activeTab: tabId ? +tabId : 1,
    passedSteps: [+tabId],
  });

  // ---------
  const toggleTab = tab => {
    if (tabState.activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        let modifiedSteps = [...tabState.passedSteps, tab];
        setTabState({
          activeTab: tab,
          passedSteps: modifiedSteps,
        });
      }
    }
  };

  // Autocomplete address
  const autoCompleteRef = useRef();
  const autoCompleteRefBuyer = useRef();
  const inputRefBuyer = useRef();
  const inputRef = useRef();
  const options = {};

  const inputRefPostal = useRef();
  const inputRefPostalBuyer = useRef();
  const autoCompletePostalRef = useRef();
  const autoCompletePostalRefBuyer = useRef();
  // ------------------------

  const history = useHistory();

  const [formSubmitBtnState, setFormSubmitBtnState] = useState(
    tabId ? +tabId : 1
  ); // Form Submit Button State

  const [selectedId, setSelectedId] = useState();
  const [optionGroup, setOptionGroup] = useState();
  const [optionGroupState, setOptionGroupState] = useState(true);

  const [contactState, setContactState] = useState(false);
  const [contactId, setContactId] = useState(null);

  const [phone, setPhone] = useState({
    mobile_phone: null,
    work_phone: null,
    home_phone: null,
  });

  const date = moment().format("yyyy-MM-DD");

  const [state2, setState2] = useState({}); // Form 2 State

  const [postalAddForm, setPostalAddForm] = useState(false);
  const [physicalAddForm, setPhysicalAddForm] = useState(false);
  // const [postalAddress, setPostalAddress] = useState({});
  // const [physicalAddress, setPhysicalAddress] = useState({});
  //Buyer
  const [postalAddFormBuyer, setPostalAddFormBuyer] = useState(false);
  const [physicalAddFormBuyer, setPhysicalAddFormBuyer] = useState(false);

  // Payment method state
  const [accErr, setAccErr] = useState(false);
  const [rows5, setRows5] = useState([1]);
  const [state8, setState8] = useState([
    {
      selectedValues: { label: "EFT", value: "EFT" },
      method: "EFT",
      payee: state?.reference,
      payeeType: true,
      bsb: "",
      bsbType: true,
      account: "",
      accountType: true,
      split: 100,
      split_type_boolean: false,
      split_type: "%",
      errorState: false,
      error: "none",
    },
  ]);
  const [optionGroup8, setOptionGroup8] = useState([
    {
      options: [
        { label: "None", value: "None" },
        { label: "Cheque", value: "Cheque" },
        { label: "EFT", value: "EFT" },
      ],
    },
  ]);
  const [selectedGroup8, setSelectedGroup8] = useState(null);
  const [selectedId8, setSelectedId8] = useState();
  const [tableInfoShow8, setTableInfoShow8] = useState(false);
  const [enteredState, setEnteredState] = useState(false);

  const [buyerPhone, setBuyerPhone] = useState({
    mobile_phone: null,
    work_phone: null,
    home_phone: null,
  });

  // const [forCheckBuyer, setForCheckBuyer] = useState({
  //   smsCheck: false,
  //   emailCheck: false,
  //   printCheck: false,
  // });

  // const [checkStateBuyer, setCheckStateBuyer] = useState([]);

  const checkFalseHandlerForBuyer = (boolean, value) => {
    setForCheckBuyer({
      ...forCheckBuyer,
      [boolean]: false,
    });
    let val = [...checkStateBuyer];
    val = val.filter(item => item !== value);
    setCheckStateBuyer(val);
  };

  // ----------------------------

  const buyerInfo = props.edit_seller_info_property_data?.data?.data?.has_buyer;

  const buyerId = props.edit_seller_info_property_data?.data?.data?.buyer_id;
  const sellerId = props.edit_seller_info_property_data?.data?.data?.seller_id;

  const editSaleData =
    props.edit_seller_info_property_data?.data?.data?.sales_contact;
  const editBuyerData =
    props.edit_seller_info_property_data?.data?.data?.buyer_contact;

  const dateMoveInHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["agreement_start"]: dateStr });
  };
  const dateMoveInHandler2 = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["agreement_end"]: dateStr });
  };

  useEffect(() => {
    if (contactState) {
      props.showContact(selectedId);
    }
    if (props.contacts_list_loading === false) {
      // props.contactList();
    }
    if (props.edit_sale_agreement_loading === "Success") {
      props.editSaleAgreementFresh();
      props.SaleAgreementInfoForPropertyFresh();
      props.editSaleAgreementInfoFresh();
      toastr.success("Updated Successfully");
      history.push(`/propertyInfo/${id}`);
    }
    if (props.edit_seller_info_property_loading === false) {
      props.editSaleAgreementInfo(id, saleId);
    }

    if (props.property_owner_add_loading === "Failed") {
      toastr.error("Something went wrong");
    }
    if (props.property_owner_info_loading === "Success") {
      props.propertyOwnerInfoFresh();
    }

    //Seller
    if (props.edit_seller_info_property_data?.data?.data?.sales_contact) {
      let contacts = [];
      let contactsPhysical = [];
      let contactsPhysicalFull = [];
      let contactsPostal = [];
      let contactsPostalFull = [];
      let btn = [];
      let forChecks = [];

      props.edit_seller_info_property_data?.data?.data?.sales_contact?.contact_details?.map(
        (item, key) => {
          let check = [];
          let smsCheck =
            item.contact_details_communications[0]?.communication == "SMS" ||
              item.contact_details_communications[1]?.communication == "SMS" ||
              item.contact_details_communications[2]?.communication == "SMS"
              ? true
              : false;
          let emailCheck =
            item.contact_details_communications[0]?.communication == "Email" ||
              item.contact_details_communications[1]?.communication == "Email" ||
              item.contact_details_communications[2]?.communication == "Email"
              ? true
              : false;
          let printCheck =
            item.contact_details_communications[0]?.communication == "Print" ||
              item.contact_details_communications[1]?.communication == "Print" ||
              item.contact_details_communications[2]?.communication == "Print"
              ? true
              : false;
          let forCheck = {
            smsCheck: smsCheck,
            emailCheck: emailCheck,
            printCheck: printCheck,
          };
          item.contact_details_communications.map(item_c => {
            check.push(item_c.communication);
          });
          let contact = {
            reference: item.reference,
            first_name: item.first_name,
            last_name: item.last_name,
            salutation: item.salutation,
            company_name: item.company_name,
            email: item.email,
            mobile_phone: item.mobile_phone,
            work_phone: item.work_phone,
            home_phone: item.home_phone,
            check: check,
            deleted: false,
            primary: item.primary == 1 ? true : false,

            email1: item.email1,
            email1_send_type: item.email1_send_type
              ? { label: item.email1_send_type, value: item.email1_send_type }
              : "",
            email1_status: item.email1 ? true : false,
            email2: item.email2,
            email2_send_type: item.email2_send_type
              ? { label: item.email2_send_type, value: item.email2_send_type }
              : "",
            email2_status: item.email2 ? true : false,
            email3: item.email3,
            email3_send_type: item.email3_send_type
              ? { label: item.email3_send_type, value: item.email3_send_type }
              : "",
            email3_status: item.email3 ? true : false,
            optionEmail: [
              { label: "All Email", value: "All Email" },
              { label: "Statements Only", value: "Statements Only" },
            ],
          };
          contacts.push(contact);
          forChecks.push(forCheck);
          let btn_s = { btn: "" };
          btn.push(btn_s);
          setCountDelete(prev => prev + 1);
        }
      );

      let data = {
        reference: props.edit_seller_info_property_data?.data?.data?.sales_contact?.reference,
        abn: props.edit_seller_info_property_data?.data?.data?.sales_contact?.abn,
        notes: props.edit_seller_info_property_data?.data?.data?.sales_contact?.notes,
        contacts: contacts,
      };
      setState(data);
      setBtnRows(btn);
      setForCheck(forChecks);

      props.edit_seller_info_property_data?.data?.sellerPhysicalAddress?.map(
        (item, key) => {
          let physical = {
            physical_building_name: item.building_name,
            physical_unit: item.unit,
            physical_number: item.number,
            physical_street: item.street,
            physical_suburb: item.suburb,
            physical_postcode: item.postcode,
            physical_state: item.state,
            physical_country: item.country,
          };
          contactsPhysical.push(physical);
          let building = item.building_name ? item.building_name + " " : "";
          let unit = item.unit ? item.unit + "/" : "";
          let number = item.number ? item.number + " " : "";
          let street = item.street ? item.street + " " : "";
          let suburb = item.suburb ? item.suburb + ", " : "";
          let state = item.state ? item.state + " " : "";
          let postcode = item.postcode ? item.postcode + " " : "";
          let country = item.country ? item.country : "";
          let full =
            building +
            unit +
            number +
            street +
            suburb +
            state +
            postcode +
            country;
          contactsPhysicalFull.push({ full: full });
        }
      );
      props.edit_seller_info_property_data?.data?.sellerPostalAddress?.map(
        (item, key) => {
          let postal = {
            postal_building_name: item.building_name,
            postal_unit: item.unit,
            postal_number: item.number,
            postal_street: item.street,
            postal_suburb: item.suburb,
            postal_postcode: item.postcode,
            postal_state: item.state,
            postal_country: item.country,
          };
          contactsPostal.push(postal);
          let building = item.building_name ? item.building_name + " " : "";
          let unit = item.unit ? item.unit + "/" : "";
          let number = item.number ? item.number + " " : "";
          let street = item.street ? item.street + " " : "";
          let suburb = item.suburb ? item.suburb + ", " : "";
          let state = item.state ? item.state + " " : "";
          let postcode = item.postcode ? item.postcode + " " : "";
          let country = item.country ? item.country : "";
          let full =
            building +
            unit +
            number +
            street +
            suburb +
            state +
            postcode +
            country;
          contactsPostalFull.push({ full: full });
        }
      );
      setPhysicalAddress(contactsPhysical);
      setPostalAddress(contactsPostal);
      setFullPhysicalAddress(contactsPostalFull);
      setFullPostalAddress(contactsPhysicalFull);

      setState2({
        ...state2,
        agreement_start: editSaleData?.seller_folio?.agreement_start,
        agreement_end: editSaleData?.seller_folio?.agreement_end,
        asking_price: editSaleData?.seller_folio?.asking_price,
        commission: editSaleData?.seller_folio?.commission,
      });

      setRows5([...editSaleData?.seller_payment]);

      let lengthA = editSaleData?.seller_payment?.length;
      editSaleData?.seller_payment?.map((item, idx) => {
        item["selectedValues"] = { label: item.method, value: item.method };
        item["payeeType"] =
          item.method === "EFT" || item.method === "" ? true : false;
        item["bsbType"] = item.method === "EFT" ? true : false;
        item["accountType"] = item.method === "EFT" ? true : false;
        item["split_type_boolean"] =
          lengthA > 1 ? (idx === lengthA - 1 ? false : true) : false;
        item["errorState"] = false;
        item["error"] = "none";
      });

      setState8([...editSaleData?.seller_payment]);
    }
    //Seller & Buyer
    if (buyerInfo == "true") {
      let contacts = [];
      let contactsPhysical = [];
      let contactsPhysicalFull = [];
      let contactsPostal = [];
      let contactsPostalFull = [];
      let btn = [];
      let forChecks = [];

      props.edit_seller_info_property_data?.data?.data?.buyer_contact?.contact_details?.map(
        (item, key) => {
          let check = [];
          let smsCheck =
            item.contact_details_communications[0]?.communication == "SMS" ||
              item.contact_details_communications[1]?.communication == "SMS" ||
              item.contact_details_communications[2]?.communication == "SMS"
              ? true
              : false;
          let emailCheck =
            item.contact_details_communications[0]?.communication == "Email" ||
              item.contact_details_communications[1]?.communication == "Email" ||
              item.contact_details_communications[2]?.communication == "Email"
              ? true
              : false;
          let printCheck =
            item.contact_details_communications[0]?.communication == "Print" ||
              item.contact_details_communications[1]?.communication == "Print" ||
              item.contact_details_communications[2]?.communication == "Print"
              ? true
              : false;
          let forCheck = {
            smsCheck: smsCheck,
            emailCheck: emailCheck,
            printCheck: printCheck,
          };
          item.contact_details_communications.map(item_c => {
            check.push(item_c.communication);
          });
          let contact = {
            reference: item.reference,
            first_name: item.first_name,
            last_name: item.last_name,
            salutation: item.salutation,
            company_name: item.company_name,
            email: item.email,
            mobile_phone: item.mobile_phone,
            work_phone: item.work_phone,
            home_phone: item.home_phone,
            check: check,
            deleted: false,
            primary: item.primary == 1 ? true : false,

            email1: item.email1,
            email1_send_type: item.email1_send_type
              ? { label: item.email1_send_type, value: item.email1_send_type }
              : "",
            email1_status: item.email1 ? true : false,
            email2: item.email2,
            email2_send_type: item.email2_send_type
              ? { label: item.email2_send_type, value: item.email2_send_type }
              : "",
            email2_status: item.email2 ? true : false,
            email3: item.email3,
            email3_send_type: item.email3_send_type
              ? { label: item.email3_send_type, value: item.email3_send_type }
              : "",
            email3_status: item.email3 ? true : false,
            optionEmail: [
              { label: "All Email", value: "All Email" },
              { label: "Statements Only", value: "Statements Only" },
            ],
          };
          contacts.push(contact);
          forChecks.push(forCheck);
          let btn_s = { btn: "" };
          btn.push(btn_s);
          setCountDeleteBuyer(prev => prev + 1);
        }
      );

      let data = {
        reference:
          props.edit_seller_info_property_data?.data?.data?.buyer_contact
            ?.reference,
        abn: props.edit_seller_info_property_data?.data?.data?.buyer_contact
          ?.abn,
        notes:
          props.edit_seller_info_property_data?.data?.data?.buyer_contact
            ?.notes,
        contacts: contacts,
      };
      setBuyerState(data);
      setBtnRowsBuyer(btn);
      setForCheckBuyer(forChecks);

      props.edit_seller_info_property_data?.data?.buyerPhysicalAddress?.map(
        (item, key) => {
          let physical = {
            physical_building_name: item.building_name,
            physical_unit: item.unit,
            physical_number: item.number,
            physical_street: item.street,
            physical_suburb: item.suburb,
            physical_postcode: item.postcode,
            physical_state: item.state,
            physical_country: item.country,
          };
          contactsPhysical.push(physical);
          let building = item.building_name ? item.building_name + " " : "";
          let unit = item.unit ? item.unit + "/" : "";
          let number = item.number ? item.number + " " : "";
          let street = item.street ? item.street + " " : "";
          let suburb = item.suburb ? item.suburb + ", " : "";
          let state = item.state ? item.state + " " : "";
          let postcode = item.postcode ? item.postcode + " " : "";
          let country = item.country ? item.country : "";
          let full =
            building +
            unit +
            number +
            street +
            suburb +
            state +
            postcode +
            country;
          contactsPhysicalFull.push({ full: full });
        }
      );
      props.edit_seller_info_property_data?.data?.buyerPostalAddress?.map(
        (item, key) => {
          let postal = {
            postal_building_name: item.building_name,
            postal_unit: item.unit,
            postal_number: item.number,
            postal_street: item.street,
            postal_suburb: item.suburb,
            postal_postcode: item.postcode,
            postal_state: item.state,
            postal_country: item.country,
          };
          contactsPostal.push(postal);
          let building = item.building_name ? item.building_name + " " : "";
          let unit = item.unit ? item.unit + "/" : "";
          let number = item.number ? item.number + " " : "";
          let street = item.street ? item.street + " " : "";
          let suburb = item.suburb ? item.suburb + ", " : "";
          let state = item.state ? item.state + " " : "";
          let postcode = item.postcode ? item.postcode + " " : "";
          let country = item.country ? item.country : "";
          let full =
            building +
            unit +
            number +
            street +
            suburb +
            state +
            postcode +
            country;
          contactsPostalFull.push({ full: full });
        }
      );
      setPhysicalAddressBuyer(contactsPhysical);
      setPostalAddressBuyer(contactsPostal);
      setFullPhysicalAddressBuyer(contactsPostalFull);
      setFullPostalAddressBuyer(contactsPhysicalFull);
    }

    if (buyerInfo == "true") {
      setState2({
        ...state2,
        agreement_start: editBuyerData?.buyer_folio?.agreement_start,
        agreement_end: editBuyerData?.buyer_folio?.agreement_end,
        asking_price: editBuyerData?.buyer_folio?.asking_price,
        commission: editBuyerData?.buyer_folio?.commission,

        purchase_price: editBuyerData?.buyer_folio?.purchase_price,
        contract_exchange: editBuyerData?.buyer_folio?.contract_exchange,
        deposit_due: editBuyerData?.buyer_folio?.deposit_due,
        settlement_due: editBuyerData?.buyer_folio?.settlement_due,
      });
    } else {
      setState2({
        ...state2,
        agreement_start: editSaleData?.seller_folio?.agreement_start,
        agreement_end: editSaleData?.seller_folio?.agreement_end,
        asking_price: editSaleData?.seller_folio?.asking_price,
        commission: editSaleData?.seller_folio?.commission,
      });
    }
    // Autocomplete address
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      let unitN = "";

      let country = "";
      let statename = "";
      let postal_codeN = "";
      let suburbN = "";
      let streetN = "";
      let street_numberN = "";

      place.address_components.forEach(element => {
        let checkCountry = inArray("country", element.types);

        if (checkCountry == true) {
          country = element.long_name;
        }

        let unit = inArray("subpremise", element.types);
        if (unit == true) {
          unitN = element.long_name;
        }

        let administrative_area_level_1 = inArray(
          "administrative_area_level_1",
          element.types
        );
        if (administrative_area_level_1 == true) {
          statename = element.long_name;
        }

        let postal_code = inArray("postal_code", element.types);
        if (postal_code == true) {
          postal_codeN = element.long_name;
        }

        let suburb = inArray("locality", element.types);
        if (suburb == true) {
          suburbN = element.long_name;
        }

        let street = inArray("route", element.types);
        if (street == true) {
          streetN = element.long_name;
        }

        let street_number = inArray("street_number", element.types);
        if (street_number == true) {
          street_numberN = element.long_name;
        }
      });

      let u = unitN ? unitN + "/" : "";
      let c = country ? country + " " : "";
      let st = statename ? statename + " " : "";
      let pc = postal_codeN ? postal_codeN + " " : "";
      let sn = suburbN ? suburbN + ", " : "";
      let s = streetN ? streetN + ", " : "";
      let n = street_numberN ? street_numberN + " " : "";

      setFullPhysicalAddress(u + n + s + sn + st + pc + c);
      setPhysicalAddress({
        ...physicalAddress,
        physical_unit: unitN,
        physical_country: country,
        physical_state: statename,
        physical_postcode: postal_codeN,
        physical_suburb: suburbN,
        physical_street: streetN,
        physical_number: street_numberN,
      });
      setPhysicalAddForm(true);
    });

    autoCompleteRefBuyer.current = new window.google.maps.places.Autocomplete(
      inputRefBuyer.current,
      options
    );
    autoCompleteRefBuyer.current.addListener(
      "place_changed",
      async function () {
        const place = await autoCompleteRefBuyer.current.getPlace();

        let unitN = "";
        let country = "";
        let statename = "";
        let postal_codeN = "";
        let suburbN = "";
        let streetN = "";
        let street_numberN = "";

        place.address_components.forEach(element => {
          let checkCountry = inArray("country", element.types);

          let unit = inArray("subpremise", element.types);
          if (unit == true) {
            unitN = element.long_name;
          }

          if (checkCountry == true) {
            country = element.long_name;
          }

          let administrative_area_level_1 = inArray(
            "administrative_area_level_1",
            element.types
          );
          if (administrative_area_level_1 == true) {
            statename = element.long_name;
          }

          let postal_code = inArray("postal_code", element.types);
          if (postal_code == true) {
            postal_codeN = element.long_name;
          }

          let suburb = inArray("locality", element.types);
          if (suburb == true) {
            suburbN = element.long_name;
          }

          let street = inArray("route", element.types);
          if (street == true) {
            streetN = element.long_name;
          }

          let street_number = inArray("street_number", element.types);
          if (street_number == true) {
            street_numberN = element.long_name;
          }
        });

        let u = unitN ? unitN + "/" : "";
        let c = country ? country + " " : "";
        let st = statename ? statename + " " : "";
        let pc = postal_codeN ? postal_codeN + " " : "";
        let sn = suburbN ? suburbN + ", " : "";
        let s = streetN ? streetN + ", " : "";
        let n = street_numberN ? street_numberN + " " : "";

        setFullPhysicalAddressBuyer(u + n + s + sn + st + pc + c);
        setPhysicalAddressBuyer({
          ...physicalAddressBuyer,
          physical_unit: unitN,
          physical_country: country,
          physical_state: statename,
          physical_postcode: postal_codeN,
          physical_suburb: suburbN,
          physical_street: streetN,
          physical_number: street_numberN,
        });
        setPhysicalAddFormBuyer(true);
      }
    );

    autoCompletePostalRef.current = new window.google.maps.places.Autocomplete(
      inputRefPostal.current,
      options
    );
    autoCompletePostalRef.current.addListener(
      "place_changed",
      async function () {
        const place = await autoCompletePostalRef.current.getPlace();

        let unitN = "";
        let country = "";
        let statename = "";
        let postal_codeN = "";
        let suburbN = "";
        let streetN = "";
        let street_numberN = "";

        place.address_components.forEach(element => {
          let checkCountry = inArray("country", element.types);

          let unit = inArray("subpremise", element.types);
          if (unit == true) {
            unitN = element.long_name;
          }

          if (checkCountry == true) {
            country = element.long_name;
          }

          let administrative_area_level_1 = inArray(
            "administrative_area_level_1",
            element.types
          );
          if (administrative_area_level_1 == true) {
            statename = element.long_name;
          }

          let postal_code = inArray("postal_code", element.types);
          if (postal_code == true) {
            postal_codeN = element.long_name;
          }

          let suburb = inArray("locality", element.types);
          if (suburb == true) {
            suburbN = element.long_name;
          }

          let street = inArray("route", element.types);
          if (street == true) {
            streetN = element.long_name;
          }

          let street_number = inArray("street_number", element.types);
          if (street_number == true) {
            street_numberN = element.long_name;
          }
        });

        let u = unitN ? unitN + "/" : "";
        let c = country ? country + " " : "";
        let st = statename ? statename + " " : "";
        let pc = postal_codeN ? postal_codeN + " " : "";
        let sn = suburbN ? suburbN + ", " : "";
        let s = streetN ? streetN + ", " : "";
        let n = street_numberN ? street_numberN + " " : "";

        setFullPostalAddress(u + n + s + sn + st + pc + c);

        setPostalAddress({
          ...postalAddress,

          postal_unit: unitN,
          postal_country: country,
          postal_state: statename,
          postal_postcode: postal_codeN,
          postal_suburb: suburbN,
          postal_street: streetN,
          postal_number: street_numberN,
        });
        setPostalAddForm(true);
      }
    );

    autoCompletePostalRefBuyer.current =
      new window.google.maps.places.Autocomplete(
        inputRefPostalBuyer.current,
        options
      );
    autoCompletePostalRefBuyer.current.addListener(
      "place_changed",
      async function () {
        const place = await autoCompletePostalRefBuyer.current.getPlace();

        let unitN = "";
        let country = "";
        let statename = "";
        let postal_codeN = "";
        let suburbN = "";
        let streetN = "";
        let street_numberN = "";

        place.address_components.forEach(element => {
          let unit = inArray("subpremise", element.types);
          if (unit == true) {
            unitN = element.long_name;
          }

          let checkCountry = inArray("country", element.types);

          if (checkCountry == true) {
            country = element.long_name;
          }

          let administrative_area_level_1 = inArray(
            "administrative_area_level_1",
            element.types
          );
          if (administrative_area_level_1 == true) {
            statename = element.long_name;
          }

          let postal_code = inArray("postal_code", element.types);
          if (postal_code == true) {
            postal_codeN = element.long_name;
          }

          let suburb = inArray("locality", element.types);
          if (suburb == true) {
            suburbN = element.long_name;
          }

          let street = inArray("route", element.types);
          if (street == true) {
            streetN = element.long_name;
          }

          let street_number = inArray("street_number", element.types);
          if (street_number == true) {
            street_numberN = element.long_name;
          }
        });

        let u = unitN ? unitN + "/" : "";
        let c = country ? country + " " : "";
        let st = statename ? statename + " " : "";
        let pc = postal_codeN ? postal_codeN + " " : "";
        let sn = suburbN ? suburbN + ", " : "";
        let s = streetN ? streetN + ", " : "";
        let n = street_numberN ? street_numberN + " " : "";

        setFullPostalAddressBuyer(u + n + s + sn + st + pc + c);

        setPostalAddressBuyer({
          ...postalAddressBuyer,
          postal_unit: unitN,
          postal_country: country,
          postal_state: statename,
          postal_postcode: postal_codeN,
          postal_suburb: suburbN,
          postal_street: streetN,
          postal_number: street_numberN,
        });
        setPostalAddFormBuyer(true);
      }
    );
    //--------------------------------
  }, [
    props.contacts_list_loading,
    props.property_owner_add_loading,
    props.property_owner_info_loading,
    props.contacts_show_data,

    props.seller_add_loading,
    props.seller_info_property_loading,
    props.seller_info_property_loading,
    props.edit_seller_info_property_loading,
    props.edit_seller_info_property_data,
    props.edit_sale_agreement_loading,
  ]);

  // Autocomplete address
  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }
  // -----------------

  const handlePropertyFormValues = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handlePropertyFormValuesBuyer = e => {
    setBuyerState({ ...buyerState, [e.target.name]: e.target.value });
  };

  const handlePropertyFormTwoValues = e => {
    setState2({ ...state2, [e.target.name]: e.target.value });
  };

  const handleReferenceValues = e => {
    setState({ ...state, reference: e.target.value });
    setState8([
      {
        selectedValues: { label: "EFT", value: "EFT" },
        method: "EFT",
        payee: e.target.value,
        payeeType: true,
        bsb: "",
        bsbType: true,
        account: "",
        accountType: true,
        split: 100,
        split_type_boolean: false,
        split_type: "%",
        errorState: false,
        error: "none",
      },
    ]);
  };

  const handleReferenceValuesForBuyer = e => {
    setBuyerState({ ...buyerState, reference: e.target.value });
  };

  if (enteredState) {
    setEnteredState(false);

    // toggleTab(tabState.activeTab + 1);
    // setFormSubmitBtnState(formSubmitBtnState + 1);
  }
  // ---------------------

  // Payment method functions
  const handleChangeInput3 = async (idx, e, type) => {
    const values = [...state8];
    values[idx][type] = e.value;
    values[idx]["selectedValues"] = e;
    if (e.value === "None") {
      values[idx]["payeeType"] = false;
      values[idx]["bsbType"] = false;
      values[idx]["accountType"] = false;
    } else if (e.value === "Cheque") {
      values[idx]["payeeType"] = true;
      values[idx]["payee"] = state.reference;
      values[idx]["bsbType"] = false;
      values[idx]["accountType"] = false;
    } else if (e.value === "EFT") {
      values[idx]["payeeType"] = true;
      values[idx]["payee"] = state.reference;
      values[idx]["bsbType"] = true;
      values[idx]["accountType"] = true;
    }
    await setState8(values);

    setSelectedGroup8(e);
    setSelectedId8(e.value);
    setTableInfoShow8(true);
  };

  const handlePropertyFormValues8 = async (idx, e) => {
    let data = [...state8];
    let val = 100;
    let stateLength = data.length;

    data[idx][e.target.name] = e.target.value;
    if (e.target.name == "split" && data[idx]["split_type"] === "%") {
      val = splitCalculation(val, data, stateLength);
      data[stateLength - 1]["split"] = val;
    }
    setState8(data);
  };

  const splitCalculation = (val, data, stateLength) => {
    data.forEach((element, idx) => {
      if (
        stateLength > 1 &&
        idx < stateLength - 1 &&
        element.split_type === "%"
      ) {
        val = val - element.split > 0 ? val - element.split : 0;
      }
    });
    return val;
  };

  const handleRemoveRow8 = (e, idx) => {
    var rowIndex = [...rows5];
    var rowStateValue = [...state8];

    let removed = rowStateValue[idx];
    rowStateValue.splice(idx, 1);
    if (rowStateValue.length > 1) {
      rowStateValue[rowStateValue.length - 1]["split"] =
        +rowStateValue[rowStateValue.length - 1]["split"] + +removed["split"];
      rowStateValue[rowStateValue.length - 1]["split_type_boolean"] = false;
    } else if (rowStateValue.length === 1) {
      rowStateValue[rowStateValue.length - 1]["split"] = 100;
      rowStateValue[rowStateValue.length - 1]["split_type_boolean"] = false;
    }

    rowIndex.splice(idx, 1);
    setRows5(rowIndex);
    setState8(rowStateValue);
  };

  const handleAddRow8 = () => {
    const item = {
      name: "",
    };
    setRows5([...rows5, item]);
    const values = [...state8];
    if (rows5.length > 0) {
      values[rows5.length - 1]["split_type_boolean"] = true;
    }

    setState8([
      ...values,
      {
        selectedValues: { label: "EFT", value: "EFT" },
        method: "EFT",
        payee: state.reference,
        payeeType: true,
        bsb: "",
        bsbType: true,
        account: "",
        accountType: true,
        split: rows5.length === 0 ? 100 : 0,
        split_type_boolean: false,
        split_type: "%",
        errorState: false,
        error: "none",
      },
    ]);
  };

  const toggleDollorBtn = idx => {
    let data = [...state8];
    let splitval = data[idx]["split"];
    data[idx]["split_type"] = "৳";
    if (splitval) {
      let totalVal = 0;
      data.forEach(element => {
        totalVal += +element.split;
      });
      if (totalVal === 100) {
        data[data.length - 1]["split"] =
          +data[data.length - 1]["split"] + +splitval;
      }
    }
    data[idx]["split"] = "";
    setState8(data);
  };
  const togglePercentBtn = idx => {
    let data = [...state8];
    data[idx]["split_type"] = "%";
    data[idx]["split"] = "";
    setState8(data);
  };

  const handleRowResult2 = e => {
    e.preventDefault();
    if (state8.length === 0) {
      setEnteredState(true);
    } else {
      const values = [...state8];
      var split = 0;
      var lengthSp = state8.length;
      state8.forEach((element, idx) => {
        if (lengthSp > 1) {
          if (values[idx]["split_type"] == "%") {
            split += Number(element.split);
          }
          if (split > 100 || Number(element.split) === 0) {
            values[lengthSp - 1]["errorState"] = true;
            values[lengthSp - 1]["error"] = "Invalid Percentage";
            setState8(values);
            return;
          } else {
            values[idx]["errorState"] = false;
            values[idx]["error"] = "";
            setState8(values);
          }
        }
        if (element.method == "EFT") {
          if (element.payee == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a Payee for EFT payment";
            setState8(values);
            return;
          } else if (element.bsb.length < 6 || isNaN(element.bsb)) {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a 6-digit BSB";
            setState8(values);
            return;
          } else if (element.account == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = " Enter an Account number";
            setState8(values);
            return;
          } else if (isNaN(element.account)) {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Account number must be numeric";
            setState8(values);
            return;
          } else {
            values[idx]["errorState"] = false;
            values[idx]["error"] = "";
            setState8(values);
          }
        }
        if (element.method == "Cheque") {
          if (element.payee == "") {
            values[idx]["errorState"] = true;
            values[idx]["error"] = "Enter a Payee for Cheque payment";
            setState8(values);
            return;
          } else {
            values[idx]["errorState"] = false;
            values[idx]["error"] = "";
            setState8(values);
          }
        }
      });

      state8.forEach((element, idx) => {
        if (element.errorState == false) {
          setEnteredState(true);
        } else {
          setEnteredState(false);
        }
      });
    }
  };
  if (enteredState) {
    setEnteredState(false);
    props.editSaleAgreement(
      id,
      contactId,
      sellerId,
      buyerId,
      state,
      phone,
      checkState,
      postalAddress,
      physicalAddress,
      buyerState,
      buyerPhone,
      checkStateBuyer,
      postalAddressBuyer,
      physicalAddressBuyer,
      state2,
      state8
    );
  }
  const handleFocus = event => event.target.select();
  // -----------------------------

  let option;
  if (props.contacts_list_data && optionGroupState) {
    option = props.contacts_list_data.data.map(item => ({
      label: item.reference,
      value: item.id,
    }));

    setOptionGroup([
      {
        options: option,
      },
    ]);
    setOptionGroupState(false);
  }

  const dateContractHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["contract_exchange"]: dateStr });
  };
  const dateDepositHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["deposit_due"]: dateStr });
  };

  const dateSettleMentDueHandler = (selectedDates, dateStr, instance) => {
    setState2({ ...state2, ["settlement_due"]: dateStr });
  };

  //----------Multi-reference form hendler------------//
  const handleBtnRows = () => {
    const item = { btn: "" };
    setBtnRows([...btnRows, item]);
    let value = [...state["contacts"]];
    const length = btnRows.length;
    value.push({
      reference: "",
      first_name: "",
      last_name: "",
      salutation: "",
      company_name: "",
      mobile_phone: "",
      work_phone: "",
      home_phone: "",
      email: "",
      check: [],
      work_phone: "",
      deleted: false,
      primary: false,
      email1: "",
      email1_send_type: "",
      email1_status: false,
      email2: "",
      email2_send_type: "",
      email2_status: false,
      email3: "",
      email3_send_type: "",
      email3_status: false,
      optionEmail: [
        { label: "All Email", value: "All Email" },
        { label: "Statements Only", value: "Statements Only" },
      ],
    });
    setState({ ...state, contacts: value });
    setForCheck([
      ...forCheck,
      {
        smsCheck: false,
        emailCheck: false,
        printCheck: false,
      },
    ]);
    setCheckState([...checkState, []]);
    setPhysicalAddress([
      ...physicalAddress,
      {
        physical_building_name: "",
        physical_unit: "",
        physical_number: "",
        physical_street: "",
        physical_suburb: "",
        physical_postcode: "",
        physical_state: "",
        physical_country: "",
      },
    ]);

    setPostalAddress([
      ...postalAddress,
      {
        postal_building_name: "",
        postal_unit: "",
        postal_number: "",
        postal_street: "",
        postal_suburb: "",
        postal_postcode: "",
        postal_state: "",
        postal_country: "",
      },
    ]);
    setFullPhysicalAddress([...fullPhysicalAddress, { full: "" }]);
    setFullPostalAddress([...fullPostalAddress, { full: "" }]);
    setCountDelete(prev => prev + 1);

    setActiveState(length);
    setStep(length);
  };

  const communicationHandler = (e, idx) => {
    let val = e.target.value,
      checked = e.target.checked;
    if (val === "Print" && checked === true) {
      checkTrueHandler("printCheck", "Print", idx);
    } else if (val === "Print" && checked === false) {
      checkFalseHandler("printCheck", "Print", idx);
    } else if (val === "Email" && checked === true) {
      checkTrueHandler("emailCheck", "Email", idx);
    } else if (val === "Email" && checked === false) {
      checkFalseHandler("emailCheck", "Email", idx);
    } else if (val === "SMS" && checked === true) {
      checkTrueHandler("smsCheck", "SMS", idx);
    } else if (val === "SMS" && checked === false) {
      checkFalseHandler("smsCheck", "SMS", idx);
    }
  };

  const handleContactFormValues = (name, val, idx) => {
    let value = [...state.contacts];
    let contact = value[idx];
    contact[name] = val;
    value[idx] = contact;
    setState({ ...state, contacts: value });
  };

  const autoPostalFormValues = (
    idx,
    postal_country,
    postal_state,
    postal_postcode,
    postal_suburb,
    postal_street,
    postal_number,
    postal_unit,
    postal_building_name
  ) => {
    let postals = [...postalAddress];
    let postal = postals[idx];
    postal["postal_country"] = postal_country;
    postal["postal_state"] = postal_state;
    postal["postal_postcode"] = postal_postcode;
    postal["postal_suburb"] = postal_suburb;
    postal["postal_street"] = postal_street;
    postal["postal_number"] = postal_number;
    postal["postal_unit"] = postal_unit;
    postal["postal_building_name"] = postal_building_name;
    postals[idx] = postal;
    setPostalAddress(postals);

    let fullpostals = [...fullPostalAddress];
    let fullpostal = fullpostals[idx];
    let bld = postal_building_name ? postal_building_name + " " : "";
    let u = postal_unit ? postal_unit + "/" : "";
    let c = postal_country ? postal_country + " " : "";
    let st = postal_state ? postal_state + " " : "";
    let pc = postal_postcode ? postal_postcode + " " : "";
    let sn = postal_suburb ? postal_suburb + ", " : "";
    let s = postal_street ? postal_street + ", " : "";
    let n = postal_number ? postal_number + " " : "";

    let full = bld + u + n + s + sn + st + pc + c;
    fullpostal["full"] = full;
    fullpostals[idx] = fullpostal;
    setFullPostalAddress(fullpostals);
  };

  const autoPhysicalFormValues = (
    idx,
    physical_country,
    physical_state,
    physical_postcode,
    physical_suburb,
    physical_street,
    physical_number,
    physical_unit,
    physical_building_name
  ) => {
    let physicals = [...physicalAddress];
    let physical = physicals[idx];
    physical["physical_country"] = physical_country;
    physical["physical_state"] = physical_state;
    physical["physical_postcode"] = physical_postcode;
    physical["physical_suburb"] = physical_suburb;
    physical["physical_street"] = physical_street;
    physical["physical_number"] = physical_number;
    physical["physical_unit"] = physical_unit;
    physical["physical_building_name"] = physical_building_name;
    physicals[idx] = physical;
    setPhysicalAddress(physicals);

    let fullphysicals = [...fullPhysicalAddress];
    let fullphysical = fullphysicals[idx];
    let bld = physical_building_name ? physical_building_name + " " : "";
    let u = physical_unit ? physical_unit + "/" : "";
    let c = physical_country ? physical_country + " " : "";
    let st = physical_state ? physical_state + " " : "";
    let pc = physical_postcode ? physical_postcode + " " : "";
    let sn = physical_suburb ? physical_suburb + ", " : "";
    let s = physical_street ? physical_street + ", " : "";
    let n = physical_number ? physical_number + " " : "";

    let full = bld + u + n + s + sn + st + pc + c;
    fullphysical["full"] = full;
    fullphysicals[idx] = fullphysical;
    setFullPhysicalAddress(fullphysicals);
  };

  const handlePostalFormFieldValues = (e, idx) => {
    let postals = [...postalAddress];
    let postal = postals[idx];
    postal[e.target.name] = e.target.value;
    postals[idx] = postal;
    setPostalAddress(postals);
    let fullpostals = [...fullPostalAddress];
    let fullpostal = fullpostals[idx];
    let bld = "",
      u = "",
      c = "",
      st = "",
      pc = "",
      sn = "",
      s = "",
      n = "";
    if (e.target.name == "postal_building_name") {
      bld = e.target.value + " ";
    } else {
      bld = postal["postal_building_name"] + " ";
    }
    if (e.target.name == "postal_unit") {
      u = e.target.value + "/";
    } else {
      u = postal["postal_unit"] + "/";
    }
    if (e.target.name == "postal_country") {
      c = e.target.value + " ";
    } else {
      c = postal["postal_country"] + " ";
    }
    if (e.target.name == "postal_state") {
      st = e.target.value + " ";
    } else {
      st = postal["postal_state"] + " ";
    }
    if (e.target.name == "postal_postcode") {
      pc = e.target.value + " ";
    } else {
      pc = postal["postal_postcode"] + " ";
    }
    if (e.target.name == "postal_suburb") {
      sn = e.target.value + " ";
    } else {
      sn = postal["postal_suburb"] + " ";
    }
    if (e.target.name == "postal_street") {
      s = e.target.value + " ";
    } else {
      s = postal["postal_street"] + " ";
    }
    if (e.target.name == "postal_number") {
      n = e.target.value + " ";
    } else {
      n = postal["postal_number"] + " ";
    }

    let full = bld + u + n + s + sn + st + pc + c;
    fullpostal["full"] = full;
    fullpostals[idx] = fullpostal;
    setFullPostalAddress(fullpostals);
  };

  const handlePhysicalFormFieldValues = (e, idx) => {
    let physicals = [...physicalAddress];
    let physical = physicals[idx];
    physical[e.target.name] = e.target.value;
    physicals[idx] = physical;
    setPhysicalAddress(physicals);

    let fullphysicals = [...fullPhysicalAddress];
    let fullphysical = fullphysicals[idx];
    let bld = "",
      u = "",
      c = "",
      st = "",
      pc = "",
      sn = "",
      s = "",
      n = "";
    if (e.target.name == "physical_building_name") {
      bld = e.target.value + " ";
    } else {
      bld = physical["physical_building_name"] + " ";
    }
    if (e.target.name == "physical_unit") {
      u = e.target.value + "/";
    } else {
      u = physical["physical_unit"] + "/";
    }
    if (e.target.name == "physical_country") {
      c = e.target.value + " ";
    } else {
      c = physical["physical_country"] + " ";
    }
    if (e.target.name == "physical_state") {
      st = e.target.value + " ";
    } else {
      st = physical["physical_state"] + " ";
    }
    if (e.target.name == "physical_postcode") {
      pc = e.target.value + " ";
    } else {
      pc = physical["physical_postcode"] + " ";
    }
    if (e.target.name == "physical_suburb") {
      sn = e.target.value + " ";
    } else {
      sn = physical["physical_suburb"] + " ";
    }
    if (e.target.name == "physical_street") {
      s = e.target.value + " ";
    } else {
      s = physical["physical_street"] + " ";
    }
    if (e.target.name == "physical_number") {
      n = e.target.value + " ";
    } else {
      n = physical["physical_number"] + " ";
    }
    let full = bld + u + n + s + sn + st + pc + c;
    fullphysical["full"] = full;
    fullphysicals[idx] = fullphysical;
    setFullPhysicalAddress(fullphysicals);
  };

  const handleSameAddress = (
    idx,
    country = "",
    number = "",
    code = "",
    state = "",
    street = "",
    suburb = "",
    unit = "",
    bname = ""
  ) => {
    let physicals = [...physicalAddress];
    let physical = physicals[idx];
    physical.physical_building_name = bname;
    physical.physical_country = country;
    physical.physical_number = number;
    physical.physical_postcode = code;
    physical.physical_state = state;
    physical.physical_street = street;
    physical.physical_suburb = suburb;
    physical.physical_unit = unit;
    physicals[idx] = physical;
    setPhysicalAddress(physicals);

    let fullphysicals = [...fullPhysicalAddress];
    let fullphysical = fullphysicals[idx];
    let bld = "",
      u = "",
      c = "",
      st = "",
      pc = "",
      sn = "",
      s = "",
      n = "";
    bld = bname + " ";
    u = unit + "/";
    c = country + " ";
    st = state + " ";
    pc = code + " ";
    sn = suburb + " ";
    s = street + " ";
    n = number + " ";
    let full = bld + u + n + s + sn + st + pc + c;
    fullphysical["full"] = full;
    fullphysicals[idx] = fullphysical;
    setFullPhysicalAddress(fullphysicals);
  };

  const handleDeletedContact = idx => {
    let value = [...state["contacts"]];
    let newVal = value[idx];
    newVal["deleted"] = true;
    value[idx] = newVal;
    setState({
      ...state,
      contacts: value,
    });
    setCountDelete(prev => prev - 1);
  };

  const handleUndoContact = idx => {
    let value = [...state["contacts"]];
    let newVal = value[idx];
    newVal["deleted"] = false;
    value[idx] = newVal;
    setState({
      ...state,
      contacts: value,
    });
    setCountDelete(prev => prev + 1);
  };

  const handleContactReference = (e, statename, idx) => {
    let first = state.contacts[idx]["first_name"]
      ? state.contacts[idx]["first_name"] + " "
      : "";
    let last = state.contacts[idx]["last_name"]
      ? state.contacts[idx]["last_name"]
      : "";
    let company = state.contacts[idx]["company_name"]
      ? " - " + state.contacts[idx]["company_name"] + " "
      : "";
    if (statename === "first_name") {
      first = e.target.value + " ";
    } else if (statename === "last_name") {
      last = e.target.value;
    } else if (statename === "company_name") {
      company = " - " + e.target.value + " ";
    }
    let reference = first + last + company;
    let val = [...state["contacts"]];
    let con = val[idx];
    con["reference"] = reference;
    val[idx] = con;
    let ref = state.contacts.map((item, key) => {
      return (key > 0 && item.reference ? " & " : "") + item.reference;
    });
    let mainRef = ref.toString().replace(/ ,/g, "");
    setState({ ...state, reference: mainRef, contacts: val });
    setState8([
      {
        selectedValues: { label: "EFT", value: "EFT" },
        method: "EFT",
        payee: mainRef,
        payeeType: true,
        bsb: "",
        bsbType: true,
        account: "",
        accountType: true,
        split: 100,
        split_type_boolean: false,
        split_type: "%",
        errorState: false,
        error: "none",
      },
    ]);
  };

  const setPrimaryHandler = idx => {
    // Contact
    let contacts = [...state.contacts];
    let contact = contacts[0];
    contact["primary"] = false;
    contacts[0] = contact;
    let primaryContact = contacts[idx];
    primaryContact["primary"] = true;
    contacts.splice(idx, 1);
    contacts.splice(0, 0, primaryContact);
    setState({ ...state, contacts });

    // Physical Address
    let physicals = [...physicalAddress];
    let primaryPhysical = physicals[idx];
    physicals.splice(idx, 1);
    physicals.splice(0, 0, primaryPhysical);
    setPhysicalAddress(physicals);

    // Postal Address
    let postals = [...postalAddress];
    let primaryPostal = postals[idx];
    postals.splice(idx, 1);
    postals.splice(0, 0, primaryPostal);
    setPostalAddress(postals);

    setStep(0);
    setActiveState(0);
  };

  const checkTrueHandler = (boolean, value, idx) => {
    let check = [...forCheck];
    let newCheck = check[idx];
    newCheck[boolean] = true;
    check[idx] = newCheck;
    setForCheck(check);
    let val = [...state["contacts"]];
    let checkValue = val[idx]["check"];
    checkValue.push(value);
    val[idx]["check"] = checkValue;
    setState({ ...state, contacts: val });
  };

  const checkFalseHandler = (boolean, value, idx) => {
    let check = [...forCheck];
    let newCheck = check[idx];
    newCheck[boolean] = false;
    check[idx] = newCheck;
    setForCheck(check);
    let val = [...state["contacts"]];
    let checkValue = val[idx]["check"];
    let newcheckValue = checkValue.filter(item => item !== value);
    val[idx]["check"] = newcheckValue;
    setState({ ...state, contacts: val });
  };

  const checkHandler = (value, idx, checkstate, checkname) => {
    let check = [...forCheck];
    let idxCheck = check[idx];
    if (value === "") {
      if (idxCheck[checkstate] === false) {
        return;
      } else {
        checkFalseHandler(checkstate, checkname, idx);
      }
    } else {
      if (idxCheck[checkstate] === true) {
        return;
      } else {
        checkTrueHandler(checkstate, checkname, idx);
      }
    }
  };

  const handleSubmit = (e, idx) => {
    setActiveState(idx);
    setStep(idx);
  };

  const handleSelectGroupEmail1 = (e, idx) => {
    let value = [...state.contacts];
    let contact = value[idx];
    contact['email1_send_type'] = e;
    value[idx] = contact;
    setState({ ...state, contacts: value });
  };
  const handleSelectGroupEmail2 = (e, idx) => {
    let value = [...state.contacts];
    let contact = value[idx];
    contact['email2_send_type'] = e;
    value[idx] = contact;
    setState({ ...state, contacts: value });
  };
  const handleSelectGroupEmail3 = (e, idx) => {
    let value = [...state.contacts];
    let contact = value[idx];
    contact['email3_send_type'] = e;
    value[idx] = contact;
    setState({ ...state, contacts: value });
  };

  const handleDeletedAditionalEmail = (idx, field) => {
    let value = [...state["contacts"]];
    let newVal = value[idx];
    newVal[field] = false;
    value[idx] = newVal;
    setState({
      ...state,
      contacts: value,
    });
  };

  const handleAddAditionalEmail = (idx, field) => {
    let value = [...state["contacts"]];
    let newVal = value[idx];
    newVal[field] = true;
    value[idx] = newVal;
    setState({
      ...state,
      contacts: value,
    });
  };

  //----------Multi-reference form hendler Buyer------------//
  const handleBtnRowsBuyer = () => {
    const item = { btn: "" };
    setBtnRowsBuyer([...btnRowsBuyer, item]);
    let value = [...buyerState["contacts"]];
    const length = btnRowsBuyer.length;
    value.push({
      reference: "",
      first_name: "",
      last_name: "",
      salutation: "",
      company_name: "",
      mobile_phone: "",
      work_phone: "",
      home_phone: "",
      email: "",
      check: [],
      work_phone: "",
      deleted: false,
      primary: false,
      email1: "",
      email1_send_type: "",
      email1_status: false,
      email2: "",
      email2_send_type: "",
      email2_status: false,
      email3: "",
      email3_send_type: "",
      email3_status: false,
      optionEmail: [
        { label: "All Email", value: "All Email" },
        { label: "Statements Only", value: "Statements Only" },
      ],
    });
    setBuyerState({ ...buyerState, contacts: value });
    setForCheckBuyer([
      ...forCheckBuyer,
      {
        smsCheck: false,
        emailCheck: false,
        printCheck: false,
      },
    ]);
    setCheckStateBuyer([...checkStateBuyer, []]);
    setPhysicalAddress([
      ...physicalAddressBuyer,
      {
        physical_building_name: "",
        physical_unit: "",
        physical_number: "",
        physical_street: "",
        physical_suburb: "",
        physical_postcode: "",
        physical_state: "",
        physical_country: "",
      },
    ]);

    setPostalAddressBuyer([
      ...postalAddressBuyer,
      {
        postal_building_name: "",
        postal_unit: "",
        postal_number: "",
        postal_street: "",
        postal_suburb: "",
        postal_postcode: "",
        postal_state: "",
        postal_country: "",
      },
    ]);
    setFullPhysicalAddressBuyer([...fullPhysicalAddressBuyer, { full: "" }]);
    setFullPostalAddressBuyer([...fullPostalAddressBuyer, { full: "" }]);
    setCountDeleteBuyer(prev => prev + 1);

    setActiveStateBuyer(length);
    setStepBuyer(length);
  };

  const communicationHandlerBuyer = (e, idx) => {
    let val = e.target.value,
      checked = e.target.checked;
    if (val === "Print" && checked === true) {
      checkTrueHandlerBuyer("printCheck", "Print", idx);
    } else if (val === "Print" && checked === false) {
      checkFalseHandlerBuyer("printCheck", "Print", idx);
    } else if (val === "Email" && checked === true) {
      checkTrueHandlerBuyer("emailCheck", "Email", idx);
    } else if (val === "Email" && checked === false) {
      checkFalseHandlerBuyer("emailCheck", "Email", idx);
    } else if (val === "SMS" && checked === true) {
      checkTrueHandler("smsCheck", "SMS", idx);
    } else if (val === "SMS" && checked === false) {
      checkFalseHandlerBuyer("smsCheck", "SMS", idx);
    }
  };

  const handleContactFormValuesBuyer = (name, val, idx) => {
    let value = [...buyerState.contacts];
    let contact = value[idx];
    contact[name] = val;
    value[idx] = contact;
    setState({ ...buyerState, contacts: value });
  };

  const autoPostalFormValuesBuyer = (
    idx,
    postal_country,
    postal_state,
    postal_postcode,
    postal_suburb,
    postal_street,
    postal_number,
    postal_unit,
    postal_building_name
  ) => {
    let postals = [...postalAddressBuyer];
    let postal = postals[idx];
    postal["postal_country"] = postal_country;
    postal["postal_state"] = postal_state;
    postal["postal_postcode"] = postal_postcode;
    postal["postal_suburb"] = postal_suburb;
    postal["postal_street"] = postal_street;
    postal["postal_number"] = postal_number;
    postal["postal_unit"] = postal_unit;
    postal["postal_building_name"] = postal_building_name;
    postals[idx] = postal;
    setPostalAddressBuyer(postals);

    let fullpostals = [...fullPostalAddressBuyer];
    let fullpostal = fullpostals[idx];
    let bld = postal_building_name ? postal_building_name + " " : "";
    let u = postal_unit ? postal_unit + "/" : "";
    let c = postal_country ? postal_country + " " : "";
    let st = postal_state ? postal_state + " " : "";
    let pc = postal_postcode ? postal_postcode + " " : "";
    let sn = postal_suburb ? postal_suburb + ", " : "";
    let s = postal_street ? postal_street + ", " : "";
    let n = postal_number ? postal_number + " " : "";

    let full = bld + u + n + s + sn + st + pc + c;
    fullpostal["full"] = full;
    fullpostals[idx] = fullpostal;
    setFullPostalAddressBuyer(fullpostals);
  };

  const autoPhysicalFormValuesBuyer = (
    idx,
    physical_country,
    physical_state,
    physical_postcode,
    physical_suburb,
    physical_street,
    physical_number,
    physical_unit,
    physical_building_name
  ) => {
    let physicals = [...physicalAddressBuyer];
    let physical = physicals[idx];
    physical["physical_country"] = physical_country;
    physical["physical_state"] = physical_state;
    physical["physical_postcode"] = physical_postcode;
    physical["physical_suburb"] = physical_suburb;
    physical["physical_street"] = physical_street;
    physical["physical_number"] = physical_number;
    physical["physical_unit"] = physical_unit;
    physical["physical_building_name"] = physical_building_name;
    physicals[idx] = physical;
    setPhysicalAddressBuyer(physicals);

    let fullphysicals = [...fullPhysicalAddressBuyer];
    let fullphysical = fullphysicals[idx];
    let bld = physical_building_name ? physical_building_name + " " : "";
    let u = physical_unit ? physical_unit + "/" : "";
    let c = physical_country ? physical_country + " " : "";
    let st = physical_state ? physical_state + " " : "";
    let pc = physical_postcode ? physical_postcode + " " : "";
    let sn = physical_suburb ? physical_suburb + ", " : "";
    let s = physical_street ? physical_street + ", " : "";
    let n = physical_number ? physical_number + " " : "";

    let full = bld + u + n + s + sn + st + pc + c;
    fullphysical["full"] = full;
    fullphysicals[idx] = fullphysical;
    setFullPhysicalAddressBuyer(fullphysicals);
  };

  const handlePostalFormFieldValuesBuyer = (e, idx) => {
    let postals = [...postalAddressBuyer];
    let postal = postals[idx];
    postal[e.target.name] = e.target.value;
    postals[idx] = postal;
    setPostalAddressBuyer(postals);
    let fullpostals = [...fullPostalAddressBuyer];
    let fullpostal = fullpostals[idx];
    let bld = "",
      u = "",
      c = "",
      st = "",
      pc = "",
      sn = "",
      s = "",
      n = "";
    if (e.target.name == "postal_building_name") {
      bld = e.target.value + " ";
    } else {
      bld = postal["postal_building_name"] + " ";
    }
    if (e.target.name == "postal_unit") {
      u = e.target.value + "/";
    } else {
      u = postal["postal_unit"] + "/";
    }
    if (e.target.name == "postal_country") {
      c = e.target.value + " ";
    } else {
      c = postal["postal_country"] + " ";
    }
    if (e.target.name == "postal_state") {
      st = e.target.value + " ";
    } else {
      st = postal["postal_state"] + " ";
    }
    if (e.target.name == "postal_postcode") {
      pc = e.target.value + " ";
    } else {
      pc = postal["postal_postcode"] + " ";
    }
    if (e.target.name == "postal_suburb") {
      sn = e.target.value + " ";
    } else {
      sn = postal["postal_suburb"] + " ";
    }
    if (e.target.name == "postal_street") {
      s = e.target.value + " ";
    } else {
      s = postal["postal_street"] + " ";
    }
    if (e.target.name == "postal_number") {
      n = e.target.value + " ";
    } else {
      n = postal["postal_number"] + " ";
    }

    let full = bld + u + n + s + sn + st + pc + c;
    fullpostal["full"] = full;
    fullpostals[idx] = fullpostal;
    setFullPostalAddressBuyer(fullpostals);
  };

  const handlePhysicalFormFieldValuesBuyer = (e, idx) => {
    let physicals = [...physicalAddressBuyer];
    let physical = physicals[idx];
    physical[e.target.name] = e.target.value;
    physicals[idx] = physical;
    setPhysicalAddressBuyer(physicals);

    let fullphysicals = [...fullPhysicalAddressBuyer];
    let fullphysical = fullphysicals[idx];
    let bld = "",
      u = "",
      c = "",
      st = "",
      pc = "",
      sn = "",
      s = "",
      n = "";
    if (e.target.name == "physical_building_name") {
      bld = e.target.value + " ";
    } else {
      bld = physical["physical_building_name"] + " ";
    }
    if (e.target.name == "physical_unit") {
      u = e.target.value + "/";
    } else {
      u = physical["physical_unit"] + "/";
    }
    if (e.target.name == "physical_country") {
      c = e.target.value + " ";
    } else {
      c = physical["physical_country"] + " ";
    }
    if (e.target.name == "physical_state") {
      st = e.target.value + " ";
    } else {
      st = physical["physical_state"] + " ";
    }
    if (e.target.name == "physical_postcode") {
      pc = e.target.value + " ";
    } else {
      pc = physical["physical_postcode"] + " ";
    }
    if (e.target.name == "physical_suburb") {
      sn = e.target.value + " ";
    } else {
      sn = physical["physical_suburb"] + " ";
    }
    if (e.target.name == "physical_street") {
      s = e.target.value + " ";
    } else {
      s = physical["physical_street"] + " ";
    }
    if (e.target.name == "physical_number") {
      n = e.target.value + " ";
    } else {
      n = physical["physical_number"] + " ";
    }
    let full = bld + u + n + s + sn + st + pc + c;
    fullphysical["full"] = full;
    fullphysicals[idx] = fullphysical;
    setFullPhysicalAddressBuyer(fullphysicals);
  };

  const handleSameAddressBuyer = (
    idx,
    country = "",
    number = "",
    code = "",
    state = "",
    street = "",
    suburb = "",
    unit = "",
    bname = ""
  ) => {
    let physicals = [...physicalAddressBuyer];
    let physical = physicals[idx];
    physical.physical_building_name = bname;
    physical.physical_country = country;
    physical.physical_number = number;
    physical.physical_postcode = code;
    physical.physical_state = state;
    physical.physical_street = street;
    physical.physical_suburb = suburb;
    physical.physical_unit = unit;
    physicals[idx] = physical;
    setPhysicalAddressBuyer(physicals);

    let fullphysicals = [...fullPhysicalAddressBuyer];
    let fullphysical = fullphysicals[idx];
    let bld = "",
      u = "",
      c = "",
      st = "",
      pc = "",
      sn = "",
      s = "",
      n = "";
    bld = bname + " ";
    u = unit + "/";
    c = country + " ";
    st = state + " ";
    pc = code + " ";
    sn = suburb + " ";
    s = street + " ";
    n = number + " ";
    let full = bld + u + n + s + sn + st + pc + c;
    fullphysical["full"] = full;
    fullphysicals[idx] = fullphysical;
    setFullPhysicalAddressBuyer(fullphysicals);
  };

  const handleDeletedContactBuyer = idx => {
    let value = [...state["contacts"]];
    let newVal = value[idx];
    newVal["deleted"] = true;
    value[idx] = newVal;
    setBuyerState({
      ...state,
      contacts: value,
    });
    setCountDeleteBuyer(prev => prev - 1);
  };

  const handleUndoContactBuyer = idx => {
    let value = [...buyerState["contacts"]];
    let newVal = value[idx];
    newVal["deleted"] = false;
    value[idx] = newVal;
    setBuyerState({
      ...buyerState,
      contacts: value,
    });
    setCountDelete(prev => prev + 1);
  };

  const handleContactReferenceBuyer = (e, statename, idx) => {
    let first = buyerState.contacts[idx]["first_name"]
      ? buyerState.contacts[idx]["first_name"] + " "
      : "";
    let last = buyerState.contacts[idx]["last_name"]
      ? buyerState.contacts[idx]["last_name"]
      : "";
    let company = buyerState.contacts[idx]["company_name"]
      ? " - " + buyerState.contacts[idx]["company_name"] + " "
      : "";
    if (statename === "first_name") {
      first = e.target.value + " ";
    } else if (statename === "last_name") {
      last = e.target.value;
    } else if (statename === "company_name") {
      company = " - " + e.target.value + " ";
    }
    let reference = first + last + company;
    let val = [...buyerState["contacts"]];
    let con = val[idx];
    con["reference"] = reference;
    val[idx] = con;
    let ref = buyerState.contacts.map((item, key) => {
      return (key > 0 && item.reference ? " & " : "") + item.reference;
    });
    let mainRef = ref.toString().replace(/ ,/g, "");
    setBuyerState({ ...buyerState, reference: mainRef, contacts: val });
    // setState8([
    //   {
    //     selectedValues: { label: "EFT", value: "EFT" },
    //     method: "EFT",
    //     payee: mainRef,
    //     payeeType: true,
    //     bsb: "",
    //     bsbType: true,
    //     account: "",
    //     accountType: true,
    //     split: 100,
    //     split_type_boolean: false,
    //     split_type: "%",
    //     errorState: false,
    //     error: "none",
    //   },
    // ]);
  };

  const setPrimaryHandlerBuyer = idx => {
    // Contact
    let contacts = [...buyerState.contacts];
    let contact = contacts[0];
    contact["primary"] = false;
    contacts[0] = contact;
    let primaryContact = contacts[idx];
    primaryContact["primary"] = true;
    contacts.splice(idx, 1);
    contacts.splice(0, 0, primaryContact);
    setBuyerState({ ...buyerState, contacts });

    // Physical Address
    let physicals = [...physicalAddressBuyer];
    let primaryPhysical = physicals[idx];
    physicals.splice(idx, 1);
    physicals.splice(0, 0, primaryPhysical);
    setPhysicalAddressBuyer(physicals);

    // Postal Address
    let postals = [...postalAddressBuyer];
    let primaryPostal = postals[idx];
    postals.splice(idx, 1);
    postals.splice(0, 0, primaryPostal);
    setPostalAddressBuyer(postals);

    setStepBuyer(0);
    setActiveStateBuyer(0);
  };

  const checkTrueHandlerBuyer = (boolean, value, idx) => {
    let check = [...forCheckBuyer];
    let newCheck = check[idx];
    newCheck[boolean] = true;
    check[idx] = newCheck;
    setForCheckBuyer(check);
    let val = [...buyerState["contacts"]];
    let checkValue = val[idx]["check"];
    checkValue.push(value);
    val[idx]["check"] = checkValue;
    setBuyerState({ ...buyerState, contacts: val });
  };

  const checkFalseHandlerBuyer = (boolean, value, idx) => {
    let check = [...forCheck];
    let newCheck = check[idx];
    newCheck[boolean] = false;
    check[idx] = newCheck;
    setForCheck(check);
    let val = [...buyerState["contacts"]];
    let checkValue = val[idx]["check"];
    let newcheckValue = checkValue.filter(item => item !== value);
    val[idx]["check"] = newcheckValue;
    setBuyerState({ ...buyerState, contacts: val });
  };

  const checkHandlerBuyer = (value, idx, checkstate, checkname) => {
    let check = [...forCheckBuyer];
    let idxCheck = check[idx];
    if (value === "") {
      if (idxCheck[checkstate] === false) {
        return;
      } else {
        checkFalseHandlerBuyer(checkstate, checkname, idx);
      }
    } else {
      if (idxCheck[checkstate] === true) {
        return;
      } else {
        checkTrueHandlerBuyer(checkstate, checkname, idx);
      }
    }
  };

  const handleSubmitBuyer = (e, idx) => {
    setActiveStateBuyer(idx);
    setStepBuyer(idx);
  };

  const handleSelectGroupEmailBuyer1 = (e, idx) => {
    let value = [...buyerState.contacts];
    let contact = value[idx];
    contact['email1_send_type'] = e;
    value[idx] = contact;
    setBuyerState({ ...buyerState, contacts: value });
  };
  const handleSelectGroupEmailBuyer2 = (e, idx) => {
    let value = [...buyerState.contacts];
    let contact = value[idx];
    contact['email2_send_type'] = e;
    value[idx] = contact;
    setBuyerState({ ...buyerState, contacts: value });
  };
  const handleSelectGroupEmailBuyer3 = (e, idx) => {
    let value = [...buyerState.contacts];
    let contact = value[idx];
    contact['email3_send_type'] = e;
    value[idx] = contact;
    setBuyerState({ ...buyerState, contacts: value });
  };

  const handleDeletedAditionalEmailBuyer = (idx, field) => {
    let value = [...buyerState["contacts"]];
    let newVal = value[idx];
    newVal[field] = false;
    value[idx] = newVal;
    setBuyerState({
      ...buyerState,
      contacts: value,
    });
  };

  const handleAddAditionalEmailBuyer = (idx, field) => {
    let value = [...buyerState["contacts"]];
    let newVal = value[idx];
    newVal[field] = true;
    value[idx] = newVal;
    setBuyerState({
      ...buyerState,
      contacts: value,
    });
  };

  return (
    <div className="page-content">
      <div className="wizard clearfix">
        <Breadcrumbs title="Edit Sale Agreement" breadcrumbItem="Properties" />

        <Card>
          <CardBody>
            <h4 className="ms-2 text-primary">
              Edit Sale Agreement - {state.reference || ""}
            </h4>
            <div
              className="my-3"
              style={{
                borderBottom: "1.2px dotted #c9c7c7",
              }}
            ></div>
            <div className="steps clearfix">
              <ul>
                <NavItem
                  className={classnames({
                    current: tabState.activeTab === 1,
                  })}
                >
                  <NavLink
                    className={classnames({
                      active: tabState.activeTab === 1,
                    })}
                    onClick={() => {
                      toggleTab(1);
                      setFormSubmitBtnState(1);
                    }}
                  >
                    <span className="number">1.</span> Contact
                  </NavLink>
                </NavItem>
                {buyerInfo == "true" && (
                  <NavItem
                    className={classnames({
                      current: tabState.activeTab === 2,
                    })}
                  >
                    <NavLink
                      // disabled={!(tabState.passedSteps || []).includes(2)}
                      className={classnames({
                        active: tabState.activeTab === 2,
                      })}
                      onClick={() => {
                        toggleTab(2);
                        setFormSubmitBtnState(2);
                      }}
                    >
                      <span className="number">2.</span> <span>Buyer</span>
                    </NavLink>
                  </NavItem>
                )}
                <NavItem
                  className={classnames({
                    current:
                      tabState.activeTab === (buyerInfo == "true" ? 3 : 2),
                  })}
                >
                  <NavLink
                    // disabled={!(tabState.passedSteps || []).includes(3)}
                    className={classnames({
                      active:
                        tabState.activeTab === (buyerInfo == "true" ? 3 : 2),
                    })}
                    onClick={() => {
                      toggleTab(buyerInfo == "true" ? 3 : 2);
                      setFormSubmitBtnState(buyerInfo == "true" ? 3 : 2);
                    }}
                  >
                    <span className="number">
                      {buyerInfo == "true" ? "3." : "2."}
                    </span>{" "}
                    <span>Folios</span>
                  </NavLink>
                </NavItem>

                <NavItem
                  className={classnames({
                    current:
                      tabState.activeTab === (buyerInfo == "true" ? 4 : 3),
                  })}
                >
                  <NavLink
                    // disabled={!(tabState.passedSteps || []).includes(4)}
                    className={
                      (classnames({
                        active:
                          tabState.activeTab === (buyerInfo == "true" ? 4 : 3),
                      }),
                        "done")
                    }
                    onClick={() => {
                      toggleTab(buyerInfo == "true" ? 4 : 3);
                      setFormSubmitBtnState(buyerInfo == "true" ? 4 : 3);
                    }}
                  >
                    <span className="number">
                      {buyerInfo == "true" ? "4." : "3."}
                    </span>{" "}
                    Payment Methods
                  </NavLink>
                </NavItem>
              </ul>
            </div>
          </CardBody>
        </Card>

        <div className="content clearfix">
          <TabContent activeTab={tabState.activeTab} className="body">
            <TabPane tabId={1}>
              <Row>
                <Col sm="12">
                  <div className="d-flex flex-column justify-content-start">
                    <div>
                      <div>
                        <div className="mb-3">
                          {/* {props.error ? (
                          <Alert color="danger">
                            {JSON.stringify(props.error.response.data.message)}
                          </Alert>
                        ) : null} */}
                          <Formik
                            enableReinitialize={true}
                            initialValues={{
                              reference: (state && state.reference) || "",
                              first_name: (state && state.first_name) || "",

                              last_name: (state && state.last_name) || "",
                              salutation: (state && state.salutation) || "",
                              company_name: (state && state.company_name) || "",
                              mobile_phone: (phone && phone.mobile_phone) || "",
                              work_phone: (phone && phone.work_phone) || "",
                              home_phone: (phone && phone.home_phone) || "",
                              email: (state && state.email) || "",

                              postal_building_name:
                                (postalAddress &&
                                  postalAddress.postal_building_name) ||
                                "",
                              postal_unit:
                                (postalAddress && postalAddress.postal_unit) ||
                                "",
                              postal_number:
                                (postalAddress &&
                                  postalAddress.postal_number) ||
                                "",
                              postal_street:
                                (postalAddress &&
                                  postalAddress.postal_street) ||
                                "",
                              postal_suburb:
                                (postalAddress &&
                                  postalAddress.postal_suburb) ||
                                "",
                              postal_postcode:
                                (postalAddress &&
                                  postalAddress.postal_postcode) ||
                                "",
                              postal_state:
                                (postalAddress && postalAddress.postal_state) ||
                                "",
                              postal_country:
                                (postalAddress &&
                                  postalAddress.postal_country) ||
                                "",

                              physical_building_name:
                                (physicalAddress &&
                                  physicalAddress.physical_building_name) ||
                                "",
                              physical_unit:
                                (physicalAddress &&
                                  physicalAddress.physical_unit) ||
                                "",
                              physical_number:
                                (physicalAddress &&
                                  physicalAddress.physical_number) ||
                                "",
                              physical_street:
                                (physicalAddress &&
                                  physicalAddress.physical_street) ||
                                "",
                              physical_suburb:
                                (physicalAddress &&
                                  physicalAddress.physical_suburb) ||
                                "",
                              physical_postcode:
                                (physicalAddress &&
                                  physicalAddress.physical_postcode) ||
                                "",
                              physical_state:
                                (physicalAddress &&
                                  physicalAddress.physical_state) ||
                                "",
                              physical_country:
                                (physicalAddress &&
                                  physicalAddress.physical_country) ||
                                "",

                              abn: (state && state.abn) || "",
                              notes: (state && state.notes) || "",
                            }}
                            // validationSchema={Yup.object().shape({
                            //   reference: Yup.string().required(
                            //     "Please Enter Reference"
                            //   ),
                            //   first_name: Yup.string()
                            //     .required("Please Enter First Name")
                            //     .matches(
                            //       /^[aA-zZ\s]+$/,
                            //       "Only alphabets are allowed for this field "
                            //     ),
                            //   last_name: Yup.string()
                            //     .required("Please Enter Last Name")
                            //     .matches(
                            //       /^[aA-zZ\s]+$/,
                            //       "Only alphabets are allowed for this field "
                            //     ),
                            //   // salutation: Yup.string().required(
                            //   //   "Please Enter Reference"
                            //   // ),
                            //   company_name: Yup.string().required(
                            //     "Please Enter Reference"
                            //   ),
                            //   email: Yup.string()
                            //     .email("Field should contain a valid e-mail")
                            //     .max(255)
                            //     .required("E-mail is required"),
                            //   mobile_phone: Yup.string().required(
                            //     "Please Enter Mobile phone"
                            //   ),
                            //   // work_phone: Yup.string().required(
                            //   //   "Please Enter Work phone"
                            //   // ),
                            //   // home_phone: Yup.string().required(
                            //   //   "Please Enter Home phone"
                            //   // ),

                            //   // postal_building_name:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Building"
                            //   //   ),
                            //   // postal_unit:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Unit"
                            //   //   ),
                            //   // postal_number: Yup.string().required(
                            //   //   "Please Enter Number"
                            //   // ),
                            //   // postal_street: Yup.string().required(
                            //   //   "Please Enter Street"
                            //   // ),
                            //   // postal_suburb: Yup.string().required(
                            //   //   "Please Enter Suburb"
                            //   // ),
                            //   // postal_postcode:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Postcode"
                            //   //   ),
                            //   // postal_state:
                            //   //   Yup.string().required(
                            //   //     "Please Enter State"
                            //   //   ),
                            //   // postal_country: Yup.string().required(
                            //   //   "Please Enter Country"
                            //   // ),

                            //   // physical_building_name:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Building"
                            //   //   ),
                            //   // physical_unit:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Unit"
                            //   //   ),
                            //   // physical_number:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Number"
                            //   //   ),
                            //   // physical_street:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Street"
                            //   //   ),
                            //   // physical_suburb:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Suburb"
                            //   //   ),
                            //   // physical_postcode:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Postcode"
                            //   //   ),
                            //   // physical_state:
                            //   //   Yup.string().required(
                            //   //     "Please Enter State"
                            //   //   ),
                            //   // physical_country:
                            //   //   Yup.string().required(
                            //   //     "Please Enter Country"
                            //   //   ),

                            //   // communication: Yup.string().required(
                            //   //   "Please Enter Communication"
                            //   // ),
                            //   abn: Yup.string().required("Please Enter ABN"),
                            //   // notes: Yup.string().required(
                            //   //   "Please Enter Reference"
                            //   // ),
                            // })}
                            onSubmit={(values, onSubmitProps) => {
                              // setState(values);

                              const emptyNames = state.contacts.filter(item => !item.first_name.trim() || !item.last_name.trim() || !item.email.trim());



                              if (emptyNames.length > 0) {
                                const fName = state.contacts.filter(item => !item.first_name.trim())
                                const lName = state.contacts.filter(item => !item.last_name.trim())
                                const email = state.contacts.filter(item => !item.email.trim())
                                // toastr.warning('Please enter First & Last Name')
                                toastr.warning(`Please enter ${fName.length > 0 ? 'First Name' : ''} ${lName.length > 0 ? 'Last Name' : ''} ${email.length > 0 ? 'Email' : ''}`)

                              } else {

                                toggleTab(tabState.activeTab + 1);
                                setFormSubmitBtnState(formSubmitBtnState + 1);
                              }

                            }}
                          >
                            {({ errors, status, touched }) => (
                              <div>
                                <div>
                                  <Form
                                    className="form-horizontal"
                                    id="seller-form-1"
                                  >
                                    <div>
                                      <Card>
                                        <CardBody>
                                          <div
                                            className="w-75 d-flex justify-content-between align-items-center pb-1"
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                          >
                                            <div>
                                              <CardTitle className="mb-3">
                                                <h4 className="text-primary">
                                                  Seller Contact
                                                </h4>
                                              </CardTitle>
                                            </div>
                                          </div>
                                          <div className="my-3 w-75">
                                            <Row className="d-flex justify-content-evenly align-items-center">
                                              <Col md={2}>
                                                <Label
                                                  for="reference"
                                                  className="form-label"
                                                >
                                                  Reference
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="reference"
                                                  type="text"
                                                  value={state.reference}
                                                  className={
                                                    "form-control" +
                                                    (errors.reference &&
                                                      touched.reference
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  onChange={
                                                    handleReferenceValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="reference"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                          </div>
                                        </CardBody>
                                      </Card>

                                      <Card>
                                        <CardBody>
                                          <Row>
                                            <Col md={3}>
                                              <h4 className="text-primary mb-3">
                                                People
                                              </h4>
                                            </Col>
                                            <Col md={6}>
                                              <Row>
                                                <Col md={11}>
                                                  <div className="d-flex justify-content-end">
                                                    {btnRows.map(
                                                      (item, idx) => (
                                                        <Button
                                                          type="button"
                                                          color="dark"
                                                          outline={
                                                            step === idx
                                                              ? false
                                                              : true
                                                          }
                                                          key={idx}
                                                          className="m-1 btn-sm"
                                                          onClick={e =>
                                                            handleSubmit(e, idx)
                                                          }
                                                        >
                                                          <span
                                                            style={{
                                                              textDecoration:
                                                                state?.contacts[
                                                                  idx
                                                                ].deleted
                                                                  ? "line-through"
                                                                  : "none",
                                                            }}
                                                            title={
                                                              state?.contacts[
                                                                idx
                                                              ].first_name ||
                                                                state?.contacts[
                                                                  idx
                                                                ].last_name ||
                                                                state?.contacts[
                                                                  idx
                                                                ].company_name
                                                                ? state
                                                                  ?.contacts[
                                                                  idx
                                                                ].reference
                                                                : "New Person"
                                                            }
                                                          >
                                                            {idx == 0 && (
                                                              <i className="fas fa-star"></i>
                                                            )}{" "}
                                                            {state?.contacts[
                                                              idx
                                                            ].first_name ||
                                                              state?.contacts[idx]
                                                                .last_name ||
                                                              state?.contacts[idx]
                                                                .company_name
                                                              ? state?.contacts[
                                                                idx
                                                              ].reference
                                                                .length <= 12
                                                                ? state
                                                                  ?.contacts[
                                                                  idx
                                                                ].reference
                                                                : state?.contacts[
                                                                  idx
                                                                ].reference.slice(
                                                                  0,
                                                                  12
                                                                ) + "...."
                                                              : "New Person"}
                                                          </span>
                                                        </Button>
                                                      )
                                                    )}
                                                  </div>
                                                </Col>
                                                <Col md={1}>
                                                  <Button
                                                    color="secondary"
                                                    className="m-1 btn-sm"
                                                    onClick={handleBtnRows}
                                                    disabled={
                                                      btnRows.length > 9
                                                        ? true
                                                        : false
                                                    }
                                                  >
                                                    Add
                                                  </Button>
                                                </Col>
                                              </Row>
                                            </Col>
                                          </Row>
                                          <div
                                            className="w-75"
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                          ></div>

                                          {state.contacts?.map((item, idx) => {
                                            return (
                                              <div
                                                key={idx}
                                                style={
                                                  activeState === idx
                                                    ? {
                                                      display: "block",
                                                    }
                                                    : {
                                                      display: "none",
                                                    }
                                                }
                                              >
                                                <ContactForm
                                                  idx={idx}
                                                  communicationHandler={
                                                    communicationHandler
                                                  }
                                                  handleContactFormValues={
                                                    handleContactFormValues
                                                  }
                                                  autoPostalFormValues={
                                                    autoPostalFormValues
                                                  }
                                                  autoPhysicalFormValues={
                                                    autoPhysicalFormValues
                                                  }
                                                  handlePostalFormFieldValues={
                                                    handlePostalFormFieldValues
                                                  }
                                                  handlePhysicalFormFieldValues={
                                                    handlePhysicalFormFieldValues
                                                  }
                                                  forCheck={forCheck}
                                                  handleDeletedContact={
                                                    handleDeletedContact
                                                  }
                                                  handleUndoContact={
                                                    handleUndoContact
                                                  }
                                                  handleContactReference={
                                                    handleContactReference
                                                  }
                                                  setPrimaryHandler={
                                                    setPrimaryHandler
                                                  }
                                                  state={state.contacts[idx]}
                                                  countDelete={countDelete}
                                                  checkHandler={checkHandler}
                                                  physicalAddress={
                                                    physicalAddress[idx]
                                                  }
                                                  postalAddress={
                                                    postalAddress[idx]
                                                  }
                                                  handleSameAddress={
                                                    handleSameAddress
                                                  }
                                                  fullPhysicalAddress={
                                                    fullPhysicalAddress[idx]
                                                  }
                                                  setFullPhysicalAddress={
                                                    setFullPhysicalAddress
                                                  }
                                                  fullPostalAddress={
                                                    fullPostalAddress[idx]
                                                  }
                                                  setFullPostalAddress={
                                                    setFullPostalAddress
                                                  }
                                                  handleSelectGroupEmail1={
                                                    handleSelectGroupEmail1
                                                  }
                                                  handleSelectGroupEmail2={
                                                    handleSelectGroupEmail2
                                                  }
                                                  handleSelectGroupEmail3={
                                                    handleSelectGroupEmail3
                                                  }
                                                  handleDeletedAditionalEmail={
                                                    handleDeletedAditionalEmail
                                                  }
                                                  handleAddAditionalEmail={
                                                    handleAddAditionalEmail
                                                  }
                                                />
                                              </div>
                                            );
                                          })}
                                        </CardBody>
                                      </Card>

                                      <Card>
                                        <CardBody>
                                          <h4 className="text-primary mb-3">
                                            Commercial Seller
                                            <div className="w-75 mt-2 mb-2"></div>
                                          </h4>
                                          <div
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                            className="mb-3 w-75"
                                          ></div>

                                          <div className="mb-3 w-75">
                                            <Row>
                                              <Col md={2}>
                                                <Label
                                                  for="abn"
                                                  className="form-label"
                                                >
                                                  ABN
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="abn"
                                                  type="text"
                                                  value={state.abn}
                                                  className={
                                                    "form-control" +
                                                    (errors.abn && touched.abn
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  onChange={
                                                    handlePropertyFormValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="abn"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                          </div>
                                        </CardBody>
                                      </Card>
                                      <Card>
                                        <CardBody>
                                          <h4 className="text-primary mb-3">
                                            Notes
                                            <div className="w-75 mt-2 mb-2"></div>
                                          </h4>{" "}
                                          <div
                                            style={{
                                              borderBottom:
                                                "1.2px dotted #c9c7c7",
                                            }}
                                            className="mb-3 w-75"
                                          ></div>
                                          <div className="mb-3 w-75">
                                            <Row>
                                              <Col md={2}>
                                                <Label
                                                  for="notes"
                                                  className="form-label"
                                                >
                                                  Notes
                                                </Label>
                                              </Col>

                                              <Col md={8}>
                                                <Field
                                                  name="notes"
                                                  type="text"
                                                  value={state.notes}
                                                  className={
                                                    "form-control" +
                                                    (errors.notes &&
                                                      touched.notes
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  onChange={
                                                    handlePropertyFormValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="notes"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                            </Row>
                                          </div>
                                        </CardBody>
                                      </Card>
                                    </div>
                                  </Form>
                                </div>
                              </div>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </TabPane>
            {buyerInfo == "true" && (
              <TabPane tabId={2}>
                <Row>
                  <Col sm="12">
                    <div className="d-flex flex-column justify-content-start">
                      <div>
                        <div>
                          <div className="mb-3">
                            {/* {props.error ? (
                          <Alert color="danger">
                            {JSON.stringify(props.error.response.data.message)}
                          </Alert>
                        ) : null} */}
                            <Formik
                              enableReinitialize={true}
                              initialValues={{
                                reference:
                                  (buyerState && buyerState.reference) || "",
                                first_name:
                                  (buyerState && buyerState.first_name) || "",

                                last_name:
                                  (buyerState && buyerState.last_name) || "",
                                salutation:
                                  (buyerState && buyerState.salutation) || "",
                                company_name:
                                  (buyerState && buyerState.company_name) || "",
                                mobile_phone:
                                  (buyerPhone && buyerPhone.mobile_phone) || "",
                                work_phone:
                                  (buyerPhone && buyerPhone.work_phone) || "",
                                home_phone:
                                  (buyerPhone && buyerPhone.home_phone) || "",
                                email: (buyerState && buyerState.email) || "",

                                postal_building_name:
                                  (postalAddressBuyer &&
                                    postalAddressBuyer.postal_building_name) ||
                                  "",
                                postal_unit:
                                  (postalAddressBuyer &&
                                    postalAddressBuyer.postal_unit) ||
                                  "",
                                postal_number:
                                  (postalAddressBuyer &&
                                    postalAddressBuyer.postal_number) ||
                                  "",
                                postal_street:
                                  (postalAddressBuyer &&
                                    postalAddressBuyer.postal_street) ||
                                  "",
                                postal_suburb:
                                  (postalAddressBuyer &&
                                    postalAddressBuyer.postal_suburb) ||
                                  "",
                                postal_postcode:
                                  (postalAddressBuyer &&
                                    postalAddressBuyer.postal_postcode) ||
                                  "",
                                postal_state:
                                  (postalAddressBuyer &&
                                    postalAddressBuyer.postal_state) ||
                                  "",
                                postal_country:
                                  (postalAddressBuyer &&
                                    postalAddressBuyer.postal_country) ||
                                  "",

                                physical_building_name:
                                  (physicalAddressBuyer &&
                                    physicalAddressBuyer.physical_building_name) ||
                                  "",
                                physical_unit:
                                  (physicalAddressBuyer &&
                                    physicalAddressBuyer.physical_unit) ||
                                  "",
                                physical_number:
                                  (physicalAddressBuyer &&
                                    physicalAddressBuyer.physical_number) ||
                                  "",
                                physical_street:
                                  (physicalAddressBuyer &&
                                    physicalAddressBuyer.physical_street) ||
                                  "",
                                physical_suburb:
                                  (physicalAddressBuyer &&
                                    physicalAddressBuyer.physical_suburb) ||
                                  "",
                                physical_postcode:
                                  (physicalAddressBuyer &&
                                    physicalAddressBuyer.physical_postcode) ||
                                  "",
                                physical_state:
                                  (physicalAddressBuyer &&
                                    physicalAddressBuyer.physical_state) ||
                                  "",
                                physical_country:
                                  (physicalAddressBuyer &&
                                    physicalAddressBuyer.physical_country) ||
                                  "",

                                abn: (buyerState && buyerState.abn) || "",
                                notes: (buyerState && buyerState.notes) || "",
                              }}
                              // validationSchema={Yup.object().shape({
                              // reference: Yup.string().required(
                              //   "Please Enter Reference"
                              // ),
                              // first_name: Yup.string()
                              //   .required("Please Enter First Name")
                              //   .matches(
                              //     /^[aA-zZ\s]+$/,
                              //     "Only alphabets are allowed for this field "
                              //   ),
                              // last_name: Yup.string()
                              //   .required("Please Enter Last Name")
                              //   .matches(
                              //     /^[aA-zZ\s]+$/,
                              //     "Only alphabets are allowed for this field "
                              //   ),

                              // company_name: Yup.string().required(
                              //   "Please Enter Reference"
                              // ),
                              // email: Yup.string()
                              //   .email("Field should contain a valid e-mail")
                              //   .max(255)
                              //   .required("E-mail is required"),
                              // mobile_phone: Yup.string().required(
                              //   "Please Enter Mobile phone"
                              // ),

                              // abn: Yup.string().required("Please Enter ABN"),
                              // })}
                              onSubmit={(values, onSubmitProps) => {
                                toggleTab(tabState.activeTab + 1);
                                setFormSubmitBtnState(formSubmitBtnState + 1);
                              }}
                            >
                              {({ errors, status, touched }) => (
                                <div>
                                  <div>
                                    <Form
                                      className="form-horizontal"
                                      id="seller-form-2"
                                    >
                                      <div>
                                        <Card>
                                          <CardBody>
                                            <div
                                              className="w-75 d-flex justify-content-between align-items-center pb-1"
                                              style={{
                                                borderBottom:
                                                  "1.2px dotted #c9c7c7",
                                              }}
                                            >
                                              <div>
                                                <CardTitle className="mb-3">
                                                  <h4 className="text-primary">
                                                    Edit Buyer Contact
                                                  </h4>
                                                </CardTitle>
                                              </div>
                                            </div>
                                            <div className="my-3 w-75">
                                              <Row className="d-flex justify-content-evenly align-items-center">
                                                <Col md={2}>
                                                  <Label
                                                    for="reference"
                                                    className="form-label"
                                                  >
                                                    Reference
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Field
                                                    name="reference"
                                                    type="text"
                                                    value={buyerState.reference}
                                                    className={
                                                      "form-control" +
                                                      (errors.reference &&
                                                        touched.reference
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    onChange={
                                                      handleReferenceValuesForBuyer
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name="reference"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Col>
                                              </Row>
                                            </div>
                                          </CardBody>
                                        </Card>
                                        <Card>
                                          <CardBody>
                                            <Row>
                                              <Col md={3}>
                                                <h4 className="text-primary mb-3">
                                                  People
                                                </h4>
                                              </Col>
                                              <Col md={6}>
                                                <Row>
                                                  <Col md={11}>
                                                    <div className="d-flex justify-content-end">
                                                      {btnRowsBuyer.map(
                                                        (item, idx) => (
                                                          <Button
                                                            type="button"
                                                            color="dark"
                                                            outline={
                                                              stepBuyer === idx
                                                                ? false
                                                                : true
                                                            }
                                                            key={idx}
                                                            className="m-1 btn-sm"
                                                            onClick={e =>
                                                              handleSubmitBuyer(
                                                                e,
                                                                idx
                                                              )
                                                            }
                                                          >
                                                            <span
                                                              style={{
                                                                textDecoration:
                                                                  buyerState
                                                                    ?.contacts[
                                                                    idx
                                                                  ].deleted
                                                                    ? "line-through"
                                                                    : "none",
                                                              }}
                                                              title={
                                                                buyerState
                                                                  ?.contacts[
                                                                  idx
                                                                ].first_name ||
                                                                  buyerState
                                                                    ?.contacts[
                                                                    idx
                                                                  ].last_name ||
                                                                  buyerState
                                                                    ?.contacts[
                                                                    idx
                                                                  ].company_name
                                                                  ? buyerState
                                                                    ?.contacts[
                                                                    idx
                                                                  ].reference
                                                                  : "New Person"
                                                              }
                                                            >
                                                              {idx == 0 && (
                                                                <i className="fas fa-star"></i>
                                                              )}{" "}
                                                              {buyerState
                                                                ?.contacts[idx]
                                                                .first_name ||
                                                                buyerState
                                                                  ?.contacts[idx]
                                                                  .last_name ||
                                                                buyerState
                                                                  ?.contacts[idx]
                                                                  .company_name
                                                                ? buyerState
                                                                  ?.contacts[
                                                                  idx
                                                                ].reference
                                                                  .length <=
                                                                  12
                                                                  ? buyerState
                                                                    ?.contacts[
                                                                    idx
                                                                  ].reference
                                                                  : buyerState?.contacts[
                                                                    idx
                                                                  ].reference.slice(
                                                                    0,
                                                                    12
                                                                  ) + "...."
                                                                : "New Person"}
                                                            </span>
                                                          </Button>
                                                        )
                                                      )}
                                                    </div>
                                                  </Col>
                                                  <Col md={1}>
                                                    <Button
                                                      color="secondary"
                                                      className="m-1 btn-sm"
                                                      onClick={
                                                        handleBtnRowsBuyer
                                                      }
                                                      disabled={
                                                        btnRowsBuyer.length > 9
                                                          ? true
                                                          : false
                                                      }
                                                    >
                                                      Add
                                                    </Button>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Row>
                                            <div
                                              className="w-75"
                                              style={{
                                                borderBottom:
                                                  "1.2px dotted #c9c7c7",
                                              }}
                                            ></div>

                                            {buyerState.contacts?.map(
                                              (item, idx) => {
                                                {
                                                  {
                                                    /* console.log(fullPhysicalAddressBuyer[idx]); */
                                                  }
                                                }
                                                return (
                                                  <div
                                                    key={idx}
                                                    style={
                                                      activeStateBuyer === idx
                                                        ? { display: "block" }
                                                        : { display: "none" }
                                                    }
                                                  >
                                                    <ContactForm
                                                      idx={idx}
                                                      communicationHandler={
                                                        communicationHandlerBuyer
                                                      }
                                                      handleContactFormValues={
                                                        handleContactFormValuesBuyer
                                                      }
                                                      autoPostalFormValues={
                                                        autoPostalFormValuesBuyer
                                                      }
                                                      autoPhysicalFormValues={
                                                        autoPhysicalFormValuesBuyer
                                                      }
                                                      handlePostalFormFieldValues={
                                                        handlePostalFormFieldValuesBuyer
                                                      }
                                                      handlePhysicalFormFieldValues={
                                                        handlePhysicalFormFieldValuesBuyer
                                                      }
                                                      forCheck={forCheckBuyer}
                                                      handleDeletedContact={
                                                        handleDeletedContactBuyer
                                                      }
                                                      handleUndoContact={
                                                        handleUndoContactBuyer
                                                      }
                                                      handleContactReference={
                                                        handleContactReferenceBuyer
                                                      }
                                                      setPrimaryHandler={
                                                        setPrimaryHandlerBuyer
                                                      }
                                                      state={
                                                        buyerState.contacts[idx]
                                                      }
                                                      countDelete={
                                                        countDeleteBuyer
                                                      }
                                                      checkHandler={
                                                        checkHandlerBuyer
                                                      }
                                                      physicalAddress={
                                                        physicalAddressBuyer[
                                                        idx
                                                        ]
                                                      }
                                                      postalAddress={
                                                        postalAddressBuyer[idx]
                                                      }
                                                      handleSameAddress={
                                                        handleSameAddressBuyer
                                                      }
                                                      fullPhysicalAddress={
                                                        fullPhysicalAddressBuyer[
                                                        idx
                                                        ]
                                                      }
                                                      setFullPhysicalAddress={
                                                        setFullPhysicalAddressBuyer
                                                      }
                                                      fullPostalAddress={
                                                        fullPostalAddressBuyer[
                                                        idx
                                                        ]
                                                      }
                                                      setFullPostalAddress={
                                                        setFullPostalAddressBuyer
                                                      }
                                                      handleSelectGroupEmail1={
                                                        handleSelectGroupEmailBuyer1
                                                      }
                                                      handleSelectGroupEmail2={
                                                        handleSelectGroupEmailBuyer2
                                                      }
                                                      handleSelectGroupEmail3={
                                                        handleSelectGroupEmailBuyer3
                                                      }
                                                      handleDeletedAditionalEmail={
                                                        handleDeletedAditionalEmailBuyer
                                                      }
                                                      handleAddAditionalEmail={
                                                        handleAddAditionalEmailBuyer
                                                      }
                                                    />
                                                  </div>
                                                );
                                              }
                                            )}
                                          </CardBody>
                                        </Card>
                                        <Card>
                                          <CardBody>
                                            <h4 className="text-primary mb-3">
                                              Commercial Seller
                                              <div className="w-75 mt-2 mb-2"></div>
                                            </h4>
                                            <div
                                              style={{
                                                borderBottom:
                                                  "1.2px dotted #c9c7c7",
                                              }}
                                              className="mb-3 w-75"
                                            ></div>

                                            <div className="mb-3 w-75">
                                              <Row>
                                                <Col md={2}>
                                                  <Label
                                                    for="abn"
                                                    className="form-label"
                                                  >
                                                    ABN
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Field
                                                    name="abn"
                                                    type="text"
                                                    value={buyerState.abn}
                                                    className={
                                                      "form-control" +
                                                      (errors.abn && touched.abn
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    onChange={
                                                      handlePropertyFormValuesBuyer
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name="abn"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Col>
                                              </Row>
                                            </div>
                                          </CardBody>
                                        </Card>
                                        <Card>
                                          <CardBody>
                                            <h4 className="text-primary mb-3">
                                              Notes
                                              <div className="w-75 mt-2 mb-2"></div>
                                            </h4>{" "}
                                            <div
                                              style={{
                                                borderBottom:
                                                  "1.2px dotted #c9c7c7",
                                              }}
                                              className="mb-3 w-75"
                                            ></div>
                                            <div className="mb-3 w-75">
                                              <Row>
                                                <Col md={2}>
                                                  <Label
                                                    for="buyer_notes"
                                                    className="form-label"
                                                  >
                                                    Notes
                                                  </Label>
                                                </Col>

                                                <Col md={8}>
                                                  <Field
                                                    name="buyer_notes"
                                                    type="text"
                                                    value={buyerState.notes}
                                                    className={
                                                      "form-control" +
                                                      (errors.buyer_notes &&
                                                        touched.buyer_notes
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    onChange={
                                                      handlePropertyFormValuesBuyer
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name="buyer_notes"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </Col>
                                              </Row>
                                            </div>
                                          </CardBody>
                                        </Card>
                                      </div>
                                    </Form>
                                  </div>
                                </div>
                              )}
                            </Formik>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            )}
            <TabPane tabId={buyerInfo == "true" ? 3 : 2}>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Row>
                    <Col md={12}>
                      <div className="d-flex flex-column justify-content-start">
                        <div>
                          <div>
                            <div className="mb-3">
                              {/* {props.error ? (
                                <Alert color="danger">
                                  {JSON.stringify(props.error.response.data.message)}
                                </Alert>
                              ) : null} */}
                              <Formik
                                enableReinitialize={true}
                                initialValues={{
                                  agreement_start:
                                    (state2 && state2.agreement_start) || "",
                                  agreement_end:
                                    (state2 && state2.agreement_end) || "",
                                  agreement_end:
                                    (state2 && state2.agreement_end) || "",
                                  asking_price:
                                    (state2 && state2.asking_price) || "",
                                  commission:
                                    (state2 && state2.commission) || "",
                                  purchase_price:
                                    (state2 && state2.purchase_price) || "",
                                  contract_exchange:
                                    (state2 && state2.contract_exchange) || "",
                                  deposit_due:
                                    (state2 && state2.deposit_due) || "",
                                  settlement_due:
                                    (state2 && state2.settlement_due) || "",
                                }}
                                // validationSchema={Yup.object().shape({
                                //   agreement_start:
                                //     Yup.string().required("Please Enter date"),
                                //   agreement_end:
                                //     Yup.string().required("Please Enter date"),
                                //   asking_price: Yup.string().required(
                                //     "Please Enter asking price"
                                //   ),
                                //   commission: Yup.string().required(
                                //     "Please Enter commission"
                                //   ),
                                // })}
                                onSubmit={(values, onSubmitProps) => {
                                  setState2(values);
                                  toggleTab(tabState.activeTab + 1);
                                  setFormSubmitBtnState(formSubmitBtnState + 1);
                                }}
                              >
                                {({ errors, status, touched }) => (
                                  <div>
                                    <Form
                                      className="form-horizontal"
                                      id={`seller-form-${buyerInfo == "true" ? "3" : "2"
                                        }`}
                                    >
                                      <div>
                                        <Card>
                                          <CardBody>
                                            <div className="d-flex justify-content-between">
                                              <h4 className="mb-3 text-primary">
                                                Edit Sale Details
                                              </h4>
                                              {buyerInfo != "true" ? (
                                                <button
                                                  type="button"
                                                  className="btn btn-primary w-md"
                                                >
                                                  <Link
                                                    style={{ color: "white" }}
                                                    to={`/addBuyer/${id}/${parseInt(
                                                      saleId
                                                    )}`}
                                                  >
                                                    Add Buyer
                                                  </Link>
                                                </button>
                                              ) : null}
                                            </div>
                                            <div
                                              className="w-100 mt-2 mb-4"
                                              style={{
                                                borderBottom:
                                                  "1.2px dotted #c9c7c7",
                                              }}
                                            ></div>

                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="agreement_start"
                                                  className="form-label text-dark"
                                                >
                                                  Agreement Start
                                                </Label>
                                              </Col>
                                              <Col md={5}>
                                                {/* <Field
                                                  name="agreement_start"
                                                  type="date"
                                                  className={
                                                    "form-control" +
                                                    (errors.agreement_start &&
                                                      touched.agreement_start
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state2.agreement_start}
                                                  onChange={
                                                    handlePropertyFormTwoValues
                                                  }
                                                /> */}
                                                <div className="w-75">
                                                  <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="Pick a date..."
                                                    value={
                                                      state2.agreement_start
                                                    }
                                                    // disabled={disabledState}
                                                    // onChange={() => dateHandler()}
                                                    options={{
                                                      altInput: true,
                                                      format: "d/m/Y",
                                                      altFormat: "d/m/Y",
                                                      onChange:
                                                        dateMoveInHandler,
                                                    }}
                                                  />
                                                </div>
                                                <ErrorMessage
                                                  name="agreement_start"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="agreement_end"
                                                  className="form-label text-dark"
                                                >
                                                  Agreement End
                                                </Label>
                                              </Col>
                                              <Col md={5}>
                                                {/* <Field
                                                  id="agreement_end"
                                                  name="agreement_end"
                                                  type="date"
                                                  className={
                                                    "form-control" +
                                                    (errors.agreement_end &&
                                                      touched.agreement_end
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state2.agreement_end}
                                                  onChange={
                                                    handlePropertyFormTwoValues
                                                  }
                                                /> */}
                                                <div className="w-75">
                                                  <Flatpickr
                                                    className="form-control d-block"
                                                    placeholder="Pick a date..."
                                                    value={state2.agreement_end}
                                                    // disabled={disabledState}
                                                    // onChange={() => dateHandler()}
                                                    options={{
                                                      altInput: true,
                                                      format: "d/m/Y",
                                                      altFormat: "d/m/Y",
                                                      onChange:
                                                        dateMoveInHandler2,
                                                    }}
                                                  />
                                                </div>
                                                <ErrorMessage
                                                  name="agreement_end"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="asking_price"
                                                  className="form-label text-dark"
                                                >
                                                  Asking price
                                                </Label>
                                              </Col>
                                              {/* <Col md={5}>
                                                <Field
                                                  id="asking_price"
                                                  name="asking_price"
                                                  type="number"
                                                  placeholder="$0.00"
                                                  className={
                                                    "form-control" +
                                                    (errors.asking_price &&
                                                    touched.asking_price
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state2.asking_price}
                                                  onChange={
                                                    handlePropertyFormTwoValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="asking_price"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col> */}
                                              <Col md={5} className="d-flex">
                                                <div className="d-flex flex-column">
                                                  <Field
                                                    id="asking_price"
                                                    name="asking_price"
                                                    type="text"
                                                    placeholder="0.00"
                                                    className={
                                                      "form-control" +
                                                      (errors.asking_price &&
                                                        touched.asking_price
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    style={{
                                                      borderTopRightRadius: 0,
                                                      borderBottomRightRadius: 0,
                                                    }}
                                                    value={state2.asking_price}
                                                    onChange={
                                                      handlePropertyFormTwoValues
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name="asking_price"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </div>
                                                <span className="input-group-append rounded-start">
                                                  <span
                                                    className="input-group-text"
                                                    style={{
                                                      borderTopLeftRadius: 0,
                                                      borderBottomLeftRadius: 0,
                                                    }}
                                                  >
                                                    ৳
                                                  </span>
                                                </span>
                                              </Col>
                                              <Col md={4}></Col>
                                            </Row>
                                            <Row className="mb-3">
                                              <Col md={3}>
                                                <Label
                                                  for="commission"
                                                  className="form-label text-dark"
                                                >
                                                  Commission
                                                </Label>
                                              </Col>
                                              {/* <Col md={5}>
                                                <Field
                                                  id="commission"
                                                  name="commission"
                                                  type="number"
                                                  placeholder="$0.00"
                                                  className={
                                                    "form-control" +
                                                    (errors.commission &&
                                                    touched.commission
                                                      ? " is-invalid"
                                                      : "")
                                                  }
                                                  value={state2.commission}
                                                  onChange={
                                                    handlePropertyFormTwoValues
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="commission"
                                                  component="div"
                                                  className="invalid-feedback"
                                                />
                                              </Col> */}
                                              <Col md={5} className="d-flex">
                                                <div className="d-flex flex-column">
                                                  <Field
                                                    id="commission"
                                                    name="commission"
                                                    type="text"
                                                    placeholder="0.00"
                                                    className={
                                                      "form-control" +
                                                      (errors.commission &&
                                                        touched.commission
                                                        ? " is-invalid"
                                                        : "")
                                                    }
                                                    style={{
                                                      borderTopRightRadius: 0,
                                                      borderBottomRightRadius: 0,
                                                    }}
                                                    value={state2.commission}
                                                    onChange={
                                                      handlePropertyFormTwoValues
                                                    }
                                                  />
                                                  <ErrorMessage
                                                    name="commission"
                                                    component="div"
                                                    className="invalid-feedback"
                                                  />
                                                </div>
                                                <span className="input-group-append rounded-start">
                                                  <span
                                                    className="input-group-text"
                                                    style={{
                                                      borderTopLeftRadius: 0,
                                                      borderBottomLeftRadius: 0,
                                                    }}
                                                  >
                                                    ৳
                                                  </span>
                                                </span>
                                              </Col>
                                              <Col md={4}>
                                                <i className="fas fa-info-circle"></i>
                                                <span>
                                                  A bill for sales commission
                                                  will be created for this value
                                                  when the sales folio is
                                                  disbursed
                                                </span>
                                              </Col>
                                            </Row>
                                            {buyerInfo == "true" && (
                                              <>
                                                <Row className="mb-3">
                                                  <Col md={3}>
                                                    <Label
                                                      for="purchase_price"
                                                      className="form-label text-dark"
                                                    >
                                                      Purchase price
                                                    </Label>
                                                  </Col>
                                                  <Col md={5}>
                                                    <Field
                                                      id="purchase_price"
                                                      name="purchase_price"
                                                      type="number"
                                                      placeholder="0.00৳"
                                                      className={
                                                        "form-control" +
                                                        (errors.purchase_price &&
                                                          touched.purchase_price
                                                          ? " is-invalid"
                                                          : "")
                                                      }
                                                      value={
                                                        state2.purchase_price
                                                      }
                                                      onChange={
                                                        handlePropertyFormTwoValues
                                                      }
                                                    />
                                                    <ErrorMessage
                                                      name="purchase_price"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                  <Col md={4}></Col>
                                                </Row>
                                                <Row className="mb-3">
                                                  <Col md={3}>
                                                    <Label
                                                      for="contract_exchange"
                                                      className="form-label text-dark"
                                                    >
                                                      Contract exchange
                                                    </Label>
                                                  </Col>
                                                  <Col md={5}>
                                                    {/* <input
                                                      type="date"
                                                      data-date={moment(
                                                        state2.contract_exchange
                                                      ).format(
                                                        "DD/MM/YYYY"
                                                      )}
                                                      id="date-format-change-to"
                                                      value={
                                                        state2.contract_exchange
                                                      }
                                                      name="contract_exchange"
                                                      onChange={
                                                        handlePropertyFormTwoValues
                                                      }
                                                    /> */}
                                                    <div className="w-75">
                                                      <Flatpickr
                                                        className="form-control d-block"
                                                        placeholder="Pick a date..."
                                                        value={
                                                          state2.contract_exchange
                                                        }
                                                        // disabled={disabledState}
                                                        // onChange={() => dateHandler()}
                                                        options={{
                                                          altInput: true,
                                                          format: "d/m/Y",
                                                          altFormat: "d/m/Y",
                                                          onChange:
                                                            dateContractHandler,
                                                        }}
                                                      />
                                                    </div>
                                                    <ErrorMessage
                                                      name="contract_exchange"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                  <Col md={4}></Col>
                                                </Row>
                                                <Row className="mb-3">
                                                  <Col md={3}>
                                                    <Label
                                                      for="deposit_due"
                                                      className="form-label text-dark"
                                                    >
                                                      Deposit due
                                                    </Label>
                                                  </Col>
                                                  <Col md={5}>
                                                    {/* <input
                                                      type="date"
                                                      data-date={moment(
                                                        state2.deposit_due
                                                      ).format(
                                                        "DD/MM/YYYY"
                                                      )}
                                                      id="date-format-change-to"
                                                      value={
                                                        state2.deposit_due
                                                      }
                                                      name="deposit_due"
                                                      onChange={
                                                        handlePropertyFormTwoValues
                                                      }
                                                    /> */}
                                                    <div className="w-75">
                                                      <Flatpickr
                                                        className="form-control d-block"
                                                        placeholder="Pick a date..."
                                                        value={
                                                          state2.deposit_due
                                                        }
                                                        // disabled={disabledState}
                                                        // onChange={() => dateHandler()}
                                                        options={{
                                                          altInput: true,
                                                          format: "d/m/Y",
                                                          altFormat: "d/m/Y",
                                                          onChange:
                                                            dateDepositHandler,
                                                        }}
                                                      />
                                                    </div>
                                                    <ErrorMessage
                                                      name="deposit_due"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                  <Col md={4}></Col>
                                                </Row>
                                                <Row className="mb-3">
                                                  <Col md={3}>
                                                    <Label
                                                      for="settlement_due"
                                                      className="form-label text-dark"
                                                    >
                                                      Settlement due
                                                    </Label>
                                                  </Col>
                                                  <Col md={5}>
                                                    {/* <input
                                                      type="date"
                                                      data-date={moment(
                                                        state2.settlement_due
                                                      ).format(
                                                        "DD/MM/YYYY"
                                                      )}
                                                      id="date-format-change-to"
                                                      value={
                                                        state2.settlement_due
                                                      }
                                                      name="settlement_due"
                                                      onChange={
                                                        handlePropertyFormTwoValues
                                                      }
                                                    /> */}
                                                    <div className="w-75">
                                                      <Flatpickr
                                                        className="form-control d-block"
                                                        placeholder="Pick a date..."
                                                        value={
                                                          state2.settlement_due
                                                        }
                                                        // disabled={disabledState}
                                                        // onChange={() => dateHandler()}
                                                        options={{
                                                          altInput: true,
                                                          format: "d/m/Y",
                                                          altFormat: "d/m/Y",
                                                          onChange:
                                                            dateSettleMentDueHandler,
                                                        }}
                                                      />
                                                    </div>
                                                    <ErrorMessage
                                                      name="settlement_due"
                                                      component="div"
                                                      className="invalid-feedback"
                                                    />
                                                  </Col>
                                                  <Col md={4}></Col>
                                                </Row>
                                              </>
                                            )}
                                          </CardBody>
                                        </Card>
                                      </div>
                                    </Form>
                                  </div>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId={buyerInfo == "true" ? 4 : 3}>
              <Row>
                <Col xs="12">
                  <div>
                    <div>
                      <form
                        className="repeater mt-3"
                        id={`seller-form-${buyerInfo == "true" ? "4" : "3"}`}
                        encType="multipart/form-data"
                        onSubmit={handleRowResult2}
                      >
                        <table style={{ width: "100%" }}>
                          <tbody>
                            {accErr && <p>Alert</p>}
                            <Card>
                              <CardBody>
                                {rows5.map((item, idx) => (
                                  <Row id={"addr" + idx} key={idx}>
                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="name">Method</label>
                                      <div>
                                        <div className="mb-3 select2-container">
                                          <Select
                                            value={
                                              state8[idx]["selectedValues"]
                                            }
                                            onChange={e =>
                                              handleChangeInput3(
                                                idx,
                                                e,
                                                "method"
                                              )
                                            }
                                            options={optionGroup8}
                                            classNamePrefix="select2-selection"
                                          />
                                        </div>
                                      </div>
                                    </Col>
                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="payee">Payee</label>

                                      {state8[idx]["payeeType"] === true ? (
                                        <input
                                          name="payee"
                                          type="text"
                                          className={"form-control"}
                                          onChange={e =>
                                            handlePropertyFormValues8(idx, e)
                                          }
                                          value={state8[idx]["payee"]}
                                        />
                                      ) : null}
                                    </Col>
                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="bsb">BSB</label>
                                      {state8[idx]["bsbType"] === true ? (
                                        <input
                                          name="bsb"
                                          type="text"
                                          maxLength="6"
                                          className={"form-control"}
                                          onChange={e =>
                                            handlePropertyFormValues8(idx, e)
                                          }
                                          value={state8[idx]["bsb"]}
                                        />
                                      ) : null}
                                    </Col>

                                    <Col lg="2" className="mb-3">
                                      <label htmlFor="account">Account #</label>

                                      {state8[idx]["accountType"] === true ? (
                                        <input
                                          name="account"
                                          type="text"
                                          className={"form-control"}
                                          onChange={e =>
                                            handlePropertyFormValues8(idx, e)
                                          }
                                          value={state8[idx]["account"]}
                                        />
                                      ) : null}
                                    </Col>

                                    <Col
                                      lg="2"
                                      className="mb-3 d-flex flex-column align-items-center"
                                    >
                                      <label htmlFor="split">Split</label>

                                      <Row className="d-flex flex-column">
                                        <Col className="d-flex">
                                          {state8[idx]["split_type_boolean"] ===
                                            true ? (
                                            <div className="btn-group btn-group-sm me-1">
                                              <Button
                                                className="d-flex align-items-center"
                                                color={
                                                  state8[idx]["split_type"] ===
                                                    "৳"
                                                    ? "secondary"
                                                    : "light"
                                                }
                                                onClick={() =>
                                                  toggleDollorBtn(idx)
                                                }
                                              >
                                                <span> ৳</span>
                                              </Button>
                                              <Button
                                                className="d-flex align-items-center"
                                                color={
                                                  state8[idx]["split_type"] ===
                                                    "%"
                                                    ? "secondary"
                                                    : "light"
                                                }
                                                onClick={() =>
                                                  togglePercentBtn(idx)
                                                }
                                              >
                                                <span> %</span>
                                              </Button>
                                            </div>
                                          ) : null}
                                          <input
                                            name="split"
                                            type="text"
                                            className={"form-control"}
                                            onFocus={handleFocus}
                                            value={state8[idx]["split"]}
                                            placeholder="0.00"
                                            onChange={e =>
                                              handlePropertyFormValues8(idx, e)
                                            }
                                            disabled={
                                              !state8[idx]["split_type_boolean"]
                                            }
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col
                                      lg="2"
                                      className="form-group align-self-center d-flex justify-content-end"
                                    >
                                      <Button
                                        onClick={e => handleRemoveRow8(e, idx)}
                                        color="danger"
                                      >
                                        Remove
                                      </Button>
                                    </Col>
                                    {state8[idx]["errorState"] ? (
                                      <div className="d-flex align-items-start text-warning">
                                        <i className="fas fa-exclamation-triangle me-1"></i>
                                        <p>{state8[idx]["error"]}</p>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </Row>
                                ))}

                                <div className="d-flex justify-content-end">
                                  {" "}
                                  <Button
                                    onClick={handleAddRow8}
                                    color="info"
                                    className="mt-3 mt-lg-0"
                                  >
                                    Add{" "}
                                  </Button>{" "}
                                </div>
                              </CardBody>
                            </Card>
                          </tbody>
                        </table>
                      </form>
                    </div>
                  </div>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
        <div className="actions clearfix">
          <ul>
            <li
              className={
                tabState.activeTab === 1 ? "previous disabled" : "previous"
              }
            >
              <Link
                to="#"
                onClick={() => {
                  toggleTab(tabState.activeTab - 1);
                  setFormSubmitBtnState(formSubmitBtnState - 1);
                }}
              >
                Previous
              </Link>
            </li>
            <li className={tabState.activeTab === 4 ? "next disabled" : "next"}>
              <button
                type="submit"
                form={"seller-form-" + formSubmitBtnState}
                className="btn btn-primary"
              >
                <i className="fas fa-file-alt me-1"></i> Save & Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = gstate => {
  const {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    contacts_show_data,
  } = gstate.Contacts2;
  const {
    property_owner_add_loading,
    property_owner_info_loading,
    property_info_data,

    seller_add_loading,

    seller_info_property_loading,

    edit_sale_agreement_loading,
    seller_info_property_data,

    edit_seller_info_property_loading,
    edit_seller_info_property_data,
  } = gstate.property;
  return {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_add_loading,

    user_list_data,
    user_list_error,
    user_list_loading,

    property_owner_add_loading,
    property_owner_info_loading,

    property_info_data,

    contacts_show_data,
    seller_add_loading,

    seller_info_property_loading,
    seller_info_property_data,

    edit_sale_agreement_loading,

    edit_seller_info_property_loading,
    edit_seller_info_property_data,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    addOwner,
    propertyOwnerInfoFresh,
    contactList,
    showContact,
    showContactFresh,
    propertyOwnerInfoFresh,
    propertyListFresh,
    addSaleAgreement,
    addSaleAgreementFresh,
    SaleAgreementInfoForProperty,
    editSaleAgreement,
    editSaleAgreementFresh,
    editSaleAgreementInfo,
    editSaleAgreementInfoFresh,
    SaleAgreementInfoForPropertyFresh,
  })(EditSaleAgreement)
);
