import React, { useEffect, useReducer, useState } from "react";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import DatatableTables from "../Tables/DatatableTables";
import DatatableTables from "../Tables/DatatableTables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";
import LabelModal from "./LabelModal";
import classnames from "classnames";
import {
  contactList,
  contactListType,
  showContactFresh,
  addContactFresh,
  ContactListFresh,
  addSupplierFresh,
  ContactListOwnerFresh,
  ContactListTenantFresh,
  ContactListSupplierFresh,
  ContactListSellerFresh,
  updateLabelsContactsFresh,
  getMessageTemplatesForContactBySelect
} from "../../store/Contacts2/actions";
import { ContactsAllActivity } from "store/actions";
import { tenantUpdateFresh } from "../../store/Properties/actions";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Input,
  Button,
  CardHeader,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import DatatableTables2 from "../Tables/DatatableTables2";
import Parser from "html-react-parser";
import RemotePagination from "pages/Task/RemotePagination";
import { TagsInput } from "react-tag-input-component";
import MessagesModal from "./MessagesModal/MessagesModal";
import toastr from "toastr";
function ContactsList(props) {
  // messagse  
  console.log(props);
  
  const [msgShow, setMsgShow] = useState(false);

  const [msgModal, setMsgModal] = useState(false);
  const toggleMsgModal = () => {
    console.log("heelo");

    setMsgModal(prev => !prev);
    props.getMessageTemplatesForContactBySelect(selectedContacts);
  };
  // message end 
  let node;

  const [ownerStateData, setOwnerStateData] = useState([]);
  const [ownerState, setOwnerState] = useState(true);
  let history = useHistory();
  const [state, setState] = useState({
    dropDownBtn: false,
    activeTab: "1",
    page: 1,
    data: [],
    sizePerPage: 10,
    dataLength: 0,
    loading: false,
    drp_link: false,
    disabled: true,
    selected: [],
  });
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [labelModal, setLabelModal] = useState(false);
  const [labelName, setLabelName] = useState('');


  const [modifyLabelModal, setModifyLabelModal] = useState(false);

  const labelModalToggle = () => {
    setLabelModal(!labelModal);
  };

  const modifyLabelModalToggle = () => {
    setModifyLabelModal(!modifyLabelModal);
  };

  const handleSelectContact = (contactId, isSelected) => {

    if (isSelected) {
      setSelectedContacts([...selectedContacts, contactId]);

    } else {
      setSelectedContacts(
        selectedContacts.filter((id) => id !== contactId)
      );
    }
  };

  const handleSelectAllContacts = (isSelect, contacts) => {
    if (isSelect) {
      setSelectedContacts(contacts.map((contact) => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleLabelNameChange = (e) => {
    setLabelName(e.target.value);
  };
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prev => !prev);
  const toggledeopsitModal = () => {
    setState(prev => ({ ...prev, drp_link: !prev.drp_link }));
  };
  const [selected, setSelected] = useState([])
  const [actionArray, setActionArray] = useState([]);
  console.log(selected);
  const [init, setInit] = useState(true);
  const [filterSeen, setFilterSeen] = useState(true);

  const [search, setSearch] = useState("");

  let initialFilterState = {
    all: [], owner: [], supplier: [], tenant: [], seller: [], archieve: []
  }

  if (filterSeen) {
    let localStorageContactData = JSON.parse(localStorage.getItem('filterContact'))
    if (localStorageContactData) {
      initialFilterState = {
        all: localStorageContactData?.propertyManager ? localStorageContactData?.propertyManager : [],
        owner: localStorageContactData?.owner ? localStorageContactData?.owner : [],
        tenant: localStorageContactData?.tenant ? localStorageContactData.tenant : [],
        supplier: localStorageContactData?.supplier ? localStorageContactData?.supplier : [],
        seller: localStorageContactData?.seller ? localStorageContactData?.seller : [],
        archieve: localStorageContactData?.archieve ? localStorageContactData?.archieve : [],
      }
    }
    setFilterSeen(false)
  }
  const [searchLabels, setSearchLabels] = useState(initialFilterState)

  const handleSearchState = e => {
    setSearch(e.target.value);
  };

  const handleLabelClick = () => {
    console.log("hfadsello");
  }
  const dueTaskDefaultSorted = [
    {
      dataField: "summary",
      order: "desc",
    },
  ];
  const nonSelectableId = props.contacts_list_data?.data.map(item => {
    if (Number(item.received > 0)) {
      return item.id
    }
  })


  const handleSelect = (isSelect, rows, e) => {
    console.log(isSelect.id);
    if (rows) {
      setActionArray(prevArray => [...prevArray, isSelect]);
      setSelected(prev => ([...prev, isSelect.id]))
    } else {
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
      setSelected(cur => cur.filter(data => data.id !== rows.id))

    }
  };

  const handleSelectAll = (isSelect, rows, e) => {
    // console.log(isSelect, rows);
    if (isSelect) {
      setActionArray(rows);
      setSelected(rows.map(item => item.id))
    } else {
      setActionArray([]);
      setSelected([])

    }
  };
  console.log(selectedContacts);

  const dueTaskSelectRow = {
    mode: "checkbox",
    // hideSelectColumn: true,
    selected: selectedContacts,
    onSelect: (row, isSelect) => handleSelectContact(row.id, isSelect),
    onSelectAll: handleSelectAllContacts,
    clickToSelect: true,


  };

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    setState(prev => ({ ...prev, loading: true }));
    if (!search) {
      if (sortField) {
        if (state.activeTab == 1) {
          props.contactList(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder,
            "ssr",
            searchLabels.all
          );
        } else if (state.activeTab == 2) {
          props.contactListType(page, sizePerPage, null, sortField, sortOrder, "Owner", searchLabels.owner);
        } else if (state.activeTab == 3) {
          props.contactListType(page, sizePerPage, null, sortField, sortOrder, "Tenant", searchLabels.tenant);
        } else if (state.activeTab == 4) {
          props.contactListType(page, sizePerPage, null, sortField, sortOrder, "Supplier", searchLabels.supplier);
        } else if (state.activeTab == 5) {
          props.contactListType(page, sizePerPage, null, sortField, sortOrder, "Seller", searchLabels.seller);
        }
      } else {
        if (state.activeTab == 1) {
          props.contactList(page, sizePerPage, null, "id", "desc", "ssr", searchLabels.all);
        } else if (state.activeTab == 2) {
          props.contactListType(page, sizePerPage, null, "id", "desc", "Owner", searchLabels.owner);
        } else if (state.activeTab == 3) {
          props.contactListType(page, sizePerPage, null, "id", "desc", "Tenant", searchLabels.tenant);
        } else if (state.activeTab == 4) {
          props.contactListType(page, sizePerPage, null, "id", "desc", "Supplier", searchLabels.supplier);
        } else if (state.activeTab == 5) {
          props.contactListType(page, sizePerPage, null, "id", "desc", "Seller", searchLabels.seller);
        }
      }
    } else {
      if (sortField) {
        if (state.activeTab == 1) {
          props.contactList(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "ssr",
            searchLabels.all
          );
        } else if (state.activeTab == 2) {
          props.contactListType(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "Owner",
            searchLabels.owner
          );
        } else if (state.activeTab == 3) {
          props.contactListType(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "Tenant",
            searchLabels.tenant
          );
        } else if (state.activeTab == 4) {
          props.contactListType(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "Supplier",
            searchLabels.supplier
          );
        } else if (state.activeTab == 5) {
          props.contactListType(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "Seller",
            searchLabels.seller
          );
        }
      } else {
        if (state.activeTab == 1) {
          props.contactList(page, sizePerPage, search, "id", "desc", "ssr", searchLabels.all);
        } else if (state.activeTab == 2) {
          props.contactListType(page, sizePerPage, search, "id", "desc", "Owner", searchLabels.owner);
        } else if (state.activeTab == 3) {
          props.contactListType(page, sizePerPage, search, "id", "desc", "Tenant", searchLabels.tenant);
        } else if (state.activeTab == 4) {
          props.contactListType(page, sizePerPage, search, "id", "desc", "Supplier", searchLabels.supplier);
        } else if (state.activeTab == 5) {
          props.contactListType(page, sizePerPage, search, "id", "desc", "Seller", searchLabels.seller);
        }
      }
    }
  };

  const ref = (cell, row) => {
    return <span className="text-primary">{cell}</span>;
  };
  const refDetail = (e, column, columnIndex, row, rowIndex) => {
    props.ContactsAllActivity(row.id);
    history.push(url + row.id);
  };
  const ownerDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push(url + row.id);
  };
  const tanentDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push(url + row.id);
  };
  const supplierDetail = (e, column, columnIndex, row, rowIndex) => {
    history.push(url + row.id);
  };

  var owner = (cell, row) => {
    var data = cell.split(",");
    data.pop();
    var output = arrange(data);
    return Parser(output);
  };

  var arrange = data => {
    var output = ``;
    data.map((item, key) => {
      if (item == "Owner" || item == " Owner") {
        output +=
          '<span className="badge square-pill bg-danger float-start me-1  p-2">' +
          item +
          "</span>";
      } else if (item == "Tenant" || item == " Tenant") {
        output +=
          '<span className="badge square-pill bg-primary float-start me-1 p-2">' +
          item +
          "</span>";
      } else if (item == "Supplier" || item == " Supplier") {
        output +=
          '<span className="badge square-pill bg-info float-start me-1 p-2">' +
          item +
          "</span>";
      } else if (item == "Seller" || item == " Seller") {
        output +=
          '<span className="badge square-pill bg-danger float-start me-1 p-2">' +
          item +
          "</span>";
      }
    });
    return output;
  };

  const allPersonRef = (cell, row) => {
    if (!row.first_name && !row.last_name) {
      return <span className="">{row.reference}</span>;
    } else {
      return <span className="">{`${row.first_name} ${row.last_name}`}</span>;
    }
  };
  const ownerNameRef = (cell, row) => (
    <span className="">{`${row.first_name} ${row.last_name}`}</span>
  );
  const tenantNameRef = (cell, row) => (
    <span className="">{`${row.first_name} ${row.last_name}`}</span>
  );
  const supplierNameRef = (cell, row) => (
    <span className="">{`${row.first_name} ${row.last_name}`}</span>
  );
  const labelRef = (cell, row) => {
    let labels = row?.contact_label?.map(label => `<span className="badge square-pill bg-info float-start me-1 p-2" key={${label.id}}>${label.labels}</span>`).join(' ');
    if (labels) {
      return Parser(labels);
    }
  }

  const columnData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          refDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: allPersonRef,
      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "roles",
      text: "Roles",
      formatter: owner,
      sort: true,
    },
    {
      dataField: "",
      text: "Labels",
      formatter: labelRef,
      sort: true,
    },
  ];
  const columnDataOwner = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          ownerDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: ownerNameRef,
      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "",
      text: "Labels",
      formatter: labelRef,
      sort: true,
    },
  ];
  const columnDataTanent = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          tanentDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: tenantNameRef,

      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "",
      text: "Labels",
      formatter: labelRef,
      sort: true,
    },
  ];
  const columnDataSeller = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          tanentDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: tenantNameRef,

      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "",
      text: "Bills due",
      sort: true,
    },
    {
      dataField: "",
      text: "Balance",
      sort: true,
    },
    {
      dataField: "",
      text: "Labels",
      formatter: labelRef,
      sort: true,
    },
  ];
  const columnDataSupplier = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: ref,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          supplierDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "first_name",
      text: "Primary Person",
      formatter: supplierNameRef,

      sort: true,
    },
    {
      dataField: "mobile_phone",
      text: "Phone",
      sort: true,
    },
    {
      dataField: "",
      text: "Labels",
      formatter: labelRef,
      sort: true,
    },
  ];

  useEffect(() => {
    if (init) {
      toggle("1", "All");
      setInit(false);
    }

    if (props.contacts_list_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_data?.page),
        data: props.contacts_list_data.data,
        sizePerPage: props.contacts_list_data?.sizePerPage,
        dataLength: props.contacts_list_data?.length,
        loading: false,
      }));
      setSelectedContacts([])
      props.ContactListFresh();
      setSelectedContacts([]);


    }

    if (props.contacts_list_owner_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_owner?.page),
        data: props.contacts_list_owner.data,
        sizePerPage: props.contacts_list_owner?.sizePerPage,
        dataLength: props.contacts_list_owner?.length,
        loading: false,
      }));
      setSelectedContacts([])
      props.ContactListOwnerFresh();
    }

    if (props.contacts_list_tenant_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_tenant?.page),
        data: props.contacts_list_tenant?.data,
        sizePerPage: props.contacts_list_tenant?.sizePerPage,
        dataLength: props.contacts_list_tenant?.length,
        loading: false,
      }));
      setSelectedContacts([])
      props.ContactListTenantFresh();
    }

    if (props.contacts_list_supplier_loading == "Success") {
      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_supplier?.page),
        data: props.contacts_list_supplier.data,
        sizePerPage: props.contacts_list_supplier?.sizePerPage,
        dataLength: props.contacts_list_supplier?.length,
        loading: false,
      }));
      setSelectedContacts([])
      props.ContactListSupplierFresh();
    }

    if (props.contacts_list_seller_loading == "Success") {

      setState(prev => ({
        ...prev,
        page: Number(props.contacts_list_seller?.page),
        data: props.contacts_list_seller?.data,
        sizePerPage: props.contacts_list_seller?.sizePerPage,
        dataLength: props.contacts_list_seller?.length,
        loading: false,
      }));
      setSelectedContacts([])
      props.ContactListSellerFresh();
    }

    if (props.contacts_add_loading !== false) {
      props.addContactFresh();
    }

    if (props.contacts_show_loading !== false) {
      props.showContactFresh();
    }
    if (props.tenant_update_loading === "Success") {
      props.tenantUpdateFresh();
    }
    if (props.supplier_add_loading === "Success") {
      props.addSupplierFresh();
    }
  }, [
    props.contacts_list_loading,
    props.contacts_list_owner_loading,
    props.contacts_list_tenant_loading,
    props.contacts_list_supplier_loading,
    props.contacts_list_seller_loading,
    props.contacts_show_loading,
  ]);

  useEffect(() => {
    if (props.contact_label_select_update === "Success") {
      toastr.success("Labels updated successfully!");
      labelModalToggle()
      if (state.activeTab == "1") {
        props.contactList(
          1,
          state.sizePerPage,
          null,
          "id",
          "desc",
          "ssr",
          searchLabels.all
        );
        setSelectedContacts([])
      } else if (state.activeTab == "2") {
        props.contactListType(
          1,
          state.sizePerPage,
          null,
          "id",
          "desc",
          "Owner",
          searchLabels.owner
        );
        setSelectedContacts([])
      } else if (state.activeTab == "3") {
        props.contactListType(
          1,
          state.sizePerPage,
          null,
          "id",
          "desc",
          "Tenant",
          searchLabels.tenant
        );
        setSelectedContacts([])
      } else if (state.activeTab == "4") {
        props.contactListType(
          1,
          state.sizePerPage,
          null,
          "id",
          "desc",
          "Supplier",
          searchLabels.supplier
        );
        setSelectedContacts([])
      } else if (state.activeTab == "5") {
        props.contactListType(
          1,
          state.sizePerPage,
          null,
          "id",
          "desc",
          "Seller",
          searchLabels.seller
        );
        setSelectedContacts([])
      }


      props.updateLabelsContactsFresh();
      setState({ ...state, selected: [] })
      setSelectedContacts([]);
      setSelected([])
      setState({ ...state, selected: [] })
      console.log('dasd');

    }
  }, [props.contact_label_select_update])

  const toggle = (tab, type) => {

    if (state.activeTab !== tab) {
      setState(prev => ({
        ...prev,
        loading: true,
        page: 1,
        data: [],
        sizePerPage: 10,
        dataLength: 0,
        loading: true,
        activeTab: tab,
      }));
      setSelectedContacts([])

    } else {
      setState(prev => ({ ...prev, loading: true }));
      setSelectedContacts([])
    }
    setSearch("");

    if (tab == "1") {
      props.contactList(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        "ssr",
        searchLabels.all
      );
      setSelectedContacts([])
    } else if (tab == "2") {
      props.contactListType(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        type,
        searchLabels.owner
      );
      setSelectedContacts([])
    } else if (tab == "3") {
      props.contactListType(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        type,
        searchLabels.tenant
      );
      setSelectedContacts([])
    } else if (tab == "4") {
      props.contactListType(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        type,
        searchLabels.supplier
      );
      setSelectedContacts([])
    } else if (tab == "5") {
      props.contactListType(
        1,
        state.sizePerPage,
        null,
        "id",
        "desc",
        type,
        searchLabels.seller
      );
      setSelectedContacts([])
    }
  };

  let url = "/contactsInfo/";
  let ownerUrl = "/contactsInfo/owner/";
  let tenantUrl = "/contactsInfo/tenant/";
  let supplierUrl = "/contactsInfo/supplier/";

  let modalBodyForAll = <div className="mb-3">
    <label
      htmlFor="labels"
    >
      Labels
    </label>
    <TagsInput
      value={searchLabels.all}
      onChange={e => setSearchLabels(prev => ({ ...prev, all: e }))}
      name="level"
      placeHolder="Add a label"
    />
  </div>

  const setFilterContactOnLocalStorage = (type) => {
    const contact = localStorage.getItem('filterContact');
    let item
    switch (type) {
      case "ALL":
        if (contact == null) {
          item = { propertyManager: searchLabels.all }
          localStorage.setItem('filterContact', JSON.stringify(item))
        } else {
          let data = JSON.parse(contact);
          item = { ...data, propertyManager: searchLabels.all }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "OWNER":
        if (contact == null) {
          item = { owner: searchLabels.owner }
          localStorage.setItem('filterContact', JSON.stringify(item))
        } else {
          let data = JSON.parse(contact);
          item = { ...data, owner: searchLabels.owner }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "TENANT":
        if (contact == null) {
          item = { tenant: searchLabels.tenant }
          localStorage.setItem('filterContact', JSON.stringify(item))
        } else {
          let data = JSON.parse(contact);
          item = { ...data, tenant: searchLabels.tenant }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "SUPPLIER":
        if (contact == null) {
          item = { supplier: searchLabels.supplier }
          localStorage.setItem('filterContact', JSON.stringify(item))
        } else {
          let data = JSON.parse(contact);
          item = { ...data, supplier: searchLabels.supplier }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "SELLER":
        if (contact == null) {
          item = { seller: searchLabels.seller }
          localStorage.setItem('filterContact', JSON.stringify(item))
        } else {
          let data = JSON.parse(contact);
          item = { ...data, seller: searchLabels.seller }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "ARCHIEVE": break;
      default:
        localStorage.removeItem('filterContact')
        break;
    }
  }
  const clearFilterContactOnLocalStorage = (type) => {
    const contact = localStorage.getItem('filterContact');
    let item
    switch (type) {
      case "ALL":
        if (contact !== null) {
          let data = JSON.parse(contact);
          item = { ...data, propertyManager: [] }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "OWNER":
        if (contact !== null) {
          let data = JSON.parse(contact);
          item = { ...data, owner: [] }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "TENANT":
        if (contact !== null) {
          let data = JSON.parse(contact);
          item = { ...data, tenant: [] }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "SUPPLIER":
        if (contact !== null) {
          let data = JSON.parse(contact);
          item = { ...data, supplier: [] }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "SELLER":
        if (contact !== null) {
          let data = JSON.parse(contact);
          item = { ...data, seller: [] }
          localStorage.setItem('filterContact', JSON.stringify(item))
        }
        break;
      case "ARCHIEVE": break;
      default:
        localStorage.removeItem('filterContact')
        break;
    }
  }

  const filterActionForAll = () => {
    setFilterContactOnLocalStorage('ALL')
    props.contactList(
      1,
      state.sizePerPage,
      null,
      "id",
      "desc",
      "ssr",
      searchLabels.all
    )
    setState(prev => ({ ...prev, loading: true }))
  }

  let modalBodyForOwner = <div className="mb-3">
    <label
      htmlFor="labels"
    >
      Labels
    </label>
    <TagsInput
      value={searchLabels.owner}
      onChange={e => setSearchLabels(prev => ({ ...prev, owner: e }))}
      name="level"
      placeHolder="Add a label"
    />
  </div>

  const filterActionForOwner = () => {
    setFilterContactOnLocalStorage('OWNER')
    props.contactListType(1, state.sizePerPage, null, "id", "desc", "Owner", searchLabels.owner);
    setState(prev => ({ ...prev, loading: true }));
  }

  let modalBodyForTenant = <div className="mb-3">
    <label
      htmlFor="labels"
    >
      Labels
    </label>
    <TagsInput
      value={searchLabels.tenant}
      onChange={e => setSearchLabels(prev => ({ ...prev, tenant: e }))}
      name="level"
      placeHolder="Add a label"
    />
  </div>

  const filterActionForTenant = () => {
    setFilterContactOnLocalStorage('TENANT')
    props.contactListType(1, state.sizePerPage, null, "id", "desc", "Tenant", searchLabels.tenant);
    setState(prev => ({ ...prev, loading: true }));
  }

  let modalBodyForSupplier = <div className="mb-3">
    <label
      htmlFor="labels"
    >
      Labels
    </label>
    <TagsInput
      value={searchLabels.supplier}
      onChange={e => setSearchLabels(prev => ({ ...prev, supplier: e }))}
      name="level"
      placeHolder="Add a label"
    />
  </div>

  const filterActionForSupplier = () => {
    setFilterContactOnLocalStorage('SUPPLIER')
    props.contactListType(1, state.sizePerPage, null, "id", "desc", "Supplier", searchLabels.supplier);
    setState(prev => ({ ...prev, loading: true }));
  }

  let modalBodyForSeller = <div className="mb-3">
    <label
      htmlFor="labels"
    >
      Labels
    </label>
    <TagsInput
      value={searchLabels.seller}
      onChange={e => setSearchLabels(prev => ({ ...prev, seller: e }))}
      name="level"
      placeHolder="Add a label"
    />
  </div>

  const filterActionForSeller = () => {
    setFilterContactOnLocalStorage('SELLER')
    props.contactListType(1, state.sizePerPage, null, "id", "desc", "Seller", searchLabels.seller);
    setState(prev => ({ ...prev, loading: true }));
  }

  const filterResetManager = (param = null) => {
    clearFilterContactOnLocalStorage('ALL')
    setSearchLabels(prev => ({ ...prev, all: [] }))
    setState(prev => ({ ...prev, loading: true }));
    props.contactList(1, state.sizePerPage, null, "id", "desc", "ssr", [])
  }
  const filterResetOwner = (param = null) => {
    clearFilterContactOnLocalStorage('OWNER')
    setSearchLabels(prev => ({ ...prev, owner: [] }))
    setState(prev => ({ ...prev, loading: true }));
    props.contactListType(1, state.sizePerPage, null, "id", "desc", 'Owner', [])
  }
  const filterResetTenant = (param = null) => {
    clearFilterContactOnLocalStorage('TENANT')
    setSearchLabels(prev => ({ ...prev, tenant: [] }))
    setState(prev => ({ ...prev, loading: true }));
    props.contactListType(1, state.sizePerPage, null, "id", "desc", 'Tenant', [])
  }
  const filterResetSupplier = (param = null) => {
    clearFilterContactOnLocalStorage('SUPPLIER')
    setSearchLabels(prev => ({ ...prev, supplier: [] }))
    setState(prev => ({ ...prev, loading: true }));
    props.contactListType(1, state.sizePerPage, null, "id", "desc", 'Supplier', [])
  }
  const filterResetSeller = (param = null) => {
    clearFilterContactOnLocalStorage('SELLER')
    setSearchLabels(prev => ({ ...prev, seller: [] }))
    setState(prev => ({ ...prev, loading: true }));
    props.contactListType(1, state.sizePerPage, null, "id", "desc", 'Seller', [])
  }

  return (
    <div className="page-content">
      <Container fluid={true}>
        {/* <Breadcrumbs title="Contacts List" breadcrumbItem="Contacts" /> */}
        <h4 className="ms-2 text-primary">Contact List</h4>


        <Row>
          <Col md={2} >
            <div>
              <Card style={{ borderRadius: "15px", paddingTop: "15px" }}>
                <CardBody style={{ padding: "10px" }}>
                  {/* <h4 className="ms-2 mb-4 text-primary">Contacts</h4> */}
                  <div className="button-items">
                    <Link to="/contact">
                      <button type="button" className="btn btn-info custom-button-side-row-font-size">

                        Add Contact
                        <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                      </button>
                    </Link>

                    <Link to="/addSupplier">
                      <button type="button" className="btn btn-info custom-button-side-row-font-size">
                        Add Supplier
                        <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                      </button>
                    </Link>

                    {/* Messages   */}

                    <button
                      type="button"
                      className="btn btn-info custom-button-side-row-font-size"
                      onClick={toggleMsgModal}
                    >

                      Message
                      <i className="fas fa-angle-right me-1 font-size-16" />
                    </button>


                    <ButtonDropdown
                      isOpen={state.drp_link}
                      toggle={() => setState(prev => ({ ...prev, drp_link: !prev.drp_link }))}
                    >
                      <DropdownToggle
                        caret
                        color="secondary"
                        disabled={selectedContacts.length === 0}
                      >
                        Actions <i className="mdi mdi-chevron-down"></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        {/* <DropdownItem >
                                  Modify Labels
                                </DropdownItem> */}
                        <DropdownItem onClick={labelModalToggle}>
                          Edit Label
                        </DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col md={10} style={{ padding: "0px" }}>
            <div>
              <Card style={{ borderRadius: "15px" }}>
                <CardBody>
                  <div>
                    <Row>
                      <Col sm={12} md={12} lg={9}>

                        <Nav className="icon-tab nav-justified">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "1",
                              })}
                              onClick={() => {
                                toggle("1", "All");
                              }}
                            >
                              All
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "2",
                              })}
                              onClick={() => {
                                toggle("2", "Owner");
                              }}
                            >
                              Owners
                            </NavLink>
                          </NavItem >
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "3",
                              })}
                              onClick={() => {
                                toggle("3", "Tenant");
                              }}
                            >
                              Tenants
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "4",
                              })}
                              onClick={() => {
                                toggle("4", "Supplier");
                              }}
                            >
                              Suppliers
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "5",
                              })}
                              onClick={() => {
                                toggle("5", "Seller");
                              }}
                            >
                              Sellers
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: state.activeTab === "6",
                              })}
                              onClick={() => {
                                toggle("6", "");
                              }}
                            >
                              Archived
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Col>
                    </Row>

                    <TabContent
                      activeTab={state.activeTab}
                      className="p-3 text-muted"
                    >
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 1 && (
                                <RemotePagination
                                  data={state.data?.length > 0 ? state.data : []}

                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnData}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                  filterBtnProps={searchLabels.all?.length > 0 ? true : false}
                                  filterProps={modalBodyForAll}
                                  filterStatus={true}
                                  filterAction={filterActionForAll}
                                  filterReset={filterResetManager}
                                />
                              )}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 2 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnDataOwner}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                  filterBtnProps={searchLabels.owner?.length > 0 ? true : false}
                                  filterProps={modalBodyForOwner}
                                  filterStatus={true}
                                  filterAction={filterActionForOwner}
                                  filterReset={filterResetOwner}
                                />
                              )}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 3 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnDataTanent}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                  filterBtnProps={searchLabels.tenant?.length > 0 ? true : false}
                                  filterProps={modalBodyForTenant}
                                  filterStatus={true}
                                  filterAction={filterActionForTenant}
                                  filterReset={filterResetTenant}
                                />
                              )}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="4">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 4 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnDataSupplier}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                  filterBtnProps={searchLabels.supplier?.length > 0 ? true : false}
                                  filterProps={modalBodyForSupplier}
                                  filterStatus={true}
                                  filterAction={filterActionForSupplier}
                                  filterReset={filterResetSupplier}
                                />
                              )}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="5">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              {state.activeTab == 5 && (
                                <RemotePagination
                                  data={
                                    state.data?.length > 0 ? state.data : []
                                  }
                                  page={state.page}
                                  sizePerPage={state.sizePerPage}
                                  totalSize={state.dataLength}
                                  onTableChange={handleTableChange}
                                  columns={columnDataSeller}
                                  search={search}
                                  onSearchState={handleSearchState}
                                  loading={state.loading}
                                  selectRow={dueTaskSelectRow}
                                  defaultSorted={dueTaskDefaultSorted}
                                  filterBtnProps={searchLabels.seller?.length > 0 ? true : false}
                                  filterProps={modalBodyForSeller}
                                  filterStatus={true}
                                  filterAction={filterActionForSeller}
                                  filterReset={filterResetSeller}
                                />
                              )}
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="6">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              <DatatableTables2
                                products={{ data: [] }}
                                columnData={columnDataTanent}
                              // url={url}
                              />
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="7">
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              <DatatableTables />
                            </CardText>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </div>
                </CardBody>
              </Card>

            </div>

          </Col>
        </Row>
      </Container>
      {labelModal && (
        <LabelModal
          labelModal={labelModal}
          toggle={labelModalToggle}
          labelName={labelName}
          setLabelName={handleLabelNameChange}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        // handleSave={handleSaveLabel}
        />
      )}
      {msgModal && <MessagesModal toggle={toggleMsgModal} msgModal={msgModal} selectedContacts={selectedContacts} />}
    </div >
  );
}

const mapStateToProps = gstate => {
  const {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_list_owner,
    contacts_list_owner_error,
    contacts_list_owner_loading,

    contacts_list_tenant,
    contacts_list_tenant_error,
    contacts_list_tenant_loading,

    contacts_list_supplier,
    contacts_list_supplier_error,
    contacts_list_supplier_loading,

    contacts_list_seller,
    contacts_list_seller_error,
    contacts_list_seller_loading,

    contacts_show_loading,

    contacts_add_loading,
    supplier_add_loading,
    contact_label_select_update,
    gmtfbs_contacts_data,
    gmtfbs_contacts_error,
    gmtfbs_contacts_loading,
  } = gstate.Contacts2;
  const { tenant_update_loading } = gstate.property;
  return {
    contacts_list_data,
    contacts_list_error,
    contacts_list_loading,

    contacts_list_owner,
    contacts_list_owner_error,
    contacts_list_owner_loading,

    contacts_list_tenant,
    contacts_list_tenant_error,
    contacts_list_tenant_loading,

    contacts_list_supplier,
    contacts_list_supplier_error,
    contacts_list_supplier_loading,

    contacts_list_seller,
    contacts_list_seller_error,
    contacts_list_seller_loading,

    contacts_show_loading,

    contacts_add_loading,

    tenant_update_loading,
    supplier_add_loading,
    contact_label_select_update,
    gmtfbs_contacts_data,
    gmtfbs_contacts_error,
    gmtfbs_contacts_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    contactList,
    contactListType,
    showContactFresh,
    addContactFresh,
    ContactListFresh,
    tenantUpdateFresh,
    addSupplierFresh,
    ContactsAllActivity,
    ContactListOwnerFresh,
    ContactListTenantFresh,
    ContactListSupplierFresh,
    ContactListSellerFresh,
    updateLabelsContactsFresh,
    getMessageTemplatesForContactBySelect,
  })(ContactsList)
);
