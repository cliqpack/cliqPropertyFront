import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DatatableTables from "../Tables/DatatableTables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";

import classnames from "classnames";
import {
  propertyList,
  propertyAddFresh,
  propertyOwnerInfoFresh,
  PropertyKeyValueFresh,
} from "../../store/Properties/actions";
import { propertyTenantInfoFresh } from "../../store/Properties/tenantActions";
import {
  PropertyAllActivity,
  AllPropertyDocumentFresh,
  getArchieveProperty,
  getRentalProperty,
  getSalesProperty,
  getSalesPropertyFresh,
  getArrearsProperty,
  getVacanciesProperty,
  getRenewalsProperty,
  checkUniqueKeyNumberFresh,
  propertyListFresh,
  getRentalPropertyFresh,
  getVacanciesPropertyFresh,
  getArrearsPropertyFresh,
  getRenewalsPropertyFresh,
  getArchievePropertyFresh,
} from "store/actions";
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
  Badge,
} from "reactstrap";
import DatatableTables2 from "../Tables/DatatableTables2";
import ImageModal from "pages/Image/ImageModal";
import moment from "moment";
import RemotePagination from "pages/Task/RemotePagination";

document.title = "CliqProperty";

function PropertyList(props) {
  const location = useLocation();
  const history = useHistory();
  console.log(location);
  const [state, setState] = useState({
    activeTab: location?.state?.tab ? location?.state?.tab : "2",
    page: 1,
    data: [],
    sizePerPage: 10,
    dataLength: 0,
    loading: false,
  });
  const [seen, setSeen] = useState(false);

  const [totalArrears, setTotalArrears] = useState(0);
  const [init, setInit] = useState(true);

  let authUser = JSON.parse(localStorage.getItem("authUser"));

  const [search, setSearch] = useState("");
  const handleSearchState = e => {
    setSearch(e.target.value);
  };
  const dueTaskDefaultSorted = [
    {
      dataField: "summary",
      order: "desc",
    },
  ];
  const dueTaskSelectRow = {
    mode: "checkbox",
    hideSelectColumn: true,
  };

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    // return;
    setState(prev => ({ ...prev, loading: true }));

    if (!search) {
      if (sortField) {
        if (state.activeTab == 2) {
          props.propertyList(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder,
            "ssr"
          );
        } else if (state.activeTab == 3) {
          props.getRentalProperty(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 4) {
          props.getSalesProperty(page, sizePerPage, null, sortField, sortOrder);
        } else if (state.activeTab == 5) {
          props.getArrearsProperty(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 6) {
          props.getVacanciesProperty(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 7) {
          props.getRenewalsProperty(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 8) {
          props.getArchieveProperty(
            page,
            sizePerPage,
            null,
            sortField,
            sortOrder
          );
        }
      } else {
        if (state.activeTab == 2) {
          props.propertyList(page, sizePerPage, null, "id", "desc", "ssr");
        } else if (state.activeTab == 3) {
          props.getRentalProperty(page, sizePerPage, null, "id", "desc");
        } else if (state.activeTab == 4) {
          props.getSalesProperty(page, sizePerPage, null, "id", "desc");
        } else if (state.activeTab == 5) {
          props.getArrearsProperty(page, sizePerPage, null, "id", "desc");
        } else if (state.activeTab == 6) {
          props.getVacanciesProperty(page, sizePerPage, null, "id", "desc");
        } else if (state.activeTab == 7) {
          props.getRenewalsProperty(page, sizePerPage, null, "id", "desc");
        } else if (state.activeTab == 8) {
          props.getArchieveProperty(page, sizePerPage, null, "id", "desc");
        }
      }
    } else {
      if (sortField) {
        if (state.activeTab == 2) {
          props.propertyList(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder,
            "ssr"
          );
        } else if (state.activeTab == 3) {
          props.getRentalProperty(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 4) {
          props.getSalesProperty(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 5) {
          props.getArrearsProperty(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 6) {
          props.getVacanciesProperty(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 7) {
          props.getRenewalsProperty(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        } else if (state.activeTab == 8) {
          props.getArchieveProperty(
            page,
            sizePerPage,
            search,
            sortField,
            sortOrder
          );
        }
      } else {
        if (state.activeTab == 2) {
          props.propertyList(page, sizePerPage, search, "id", "desc", "ssr");
        } else if (state.activeTab == 3) {
          props.getRentalProperty(page, sizePerPage, search, "id", "desc");
        } else if (state.activeTab == 4) {
          props.getSalesProperty(page, sizePerPage, search, "id", "desc");
        } else if (state.activeTab == 5) {
          props.getArrearsProperty(page, sizePerPage, search, "id", "desc");
        } else if (state.activeTab == 6) {
          props.getVacanciesProperty(page, sizePerPage, search, "id", "desc");
        } else if (state.activeTab == 7) {
          props.getRenewalsProperty(page, sizePerPage, search, "id", "desc");
        } else if (state.activeTab == 8) {
          props.getArchieveProperty(page, sizePerPage, search, "id", "desc");
        }
      }
    }
  };

  const toggle = (tab, type = null) => {
    setState(prev => ({ ...prev, loading: true }));
    if (state.activeTab !== tab) {
      setState({
        ...state,
        page: 1,
        data: [],
        sizePerPage: 10,
        dataLength: 0,
        loading: true,
        activeTab: tab,
      });
    }
    setSearch("");
    if (tab === "2") {
      props.propertyList(
        state.page,
        state.sizePerPage,
        null,
        "id",
        "desc",
        "ssr"
      );
    }
    if (tab === "3") {
      props.getRentalProperty(
        state.page,
        state.sizePerPage,
        null,
        "id",
        "desc",
        "ssr"
      );
    }
    if (tab === "4") {
      props.getSalesProperty(state.page, state.sizePerPage, null, "id", "desc");
    }
    if (tab === "5") {
      props.getArrearsProperty(
        state.page,
        state.sizePerPage,
        null,
        "id",
        "desc"
      );
    }
    if (tab === "6") {
      props.getVacanciesProperty(
        state.page,
        state.sizePerPage,
        null,
        "id",
        "desc"
      );
    }
    if (tab === "7") {
      props.getRenewalsProperty(
        state.page,
        state.sizePerPage,
        null,
        "id",
        "desc"
      );
    }
    if (tab === "8") {
      props.getArchieveProperty(
        state.page,
        state.sizePerPage,
        null,
        "id",
        "desc"
      );
    }
  };

  const labelRef = (cell, row) => {
    const data = row.properties_level?.map((data, i) => {
      if (i === 0) {
        return (
          <span className="badge square-pill bg-labelColor me-1 p-2" key={i}>
            {data.labels}
          </span>
        );
      } else if (i === 1) {
        return (
          <span className="badge square-pill bg-labelColor me-1 p-2" key={i}>
            {data.labels}
          </span>
        );
      } else if (i % 2 === 0) {
        return (
          <span className="badge square-pill bg-labelColor me-1 p-2" key={i}>
            {data.labels}
          </span>
        );
      } else {
        return (
          <span className="badge square-pill bg-labelColor me-1 p-2" key={i}>
            {data.labels}
          </span>
        );
      }
      // return <Badge className="p-1 me-1 rounded" key={i}>{data.labels}</Badge>
    });
    return data;
  };

  const ref = (cell, row) => {
    return <span className="text-primary">{cell}</span>;
  };
  const arrDays = cell => {
    let end = moment(cell?.tenant_folio?.paid_to);
    var start = moment(new Date());
    let dif = end.diff(start, "days");

    if (dif > 0) {
      return (
        <span
          className="badge square-pill bg-success me-1 p-2"
          style={{ fontSize: "14" }}
        >
          {dif}
        </span>
      );
    } else if (dif > -7) {
      return (
        <span
          className="badge square-pill bg-warning me-1 p-2"
          style={{ fontSize: "14" }}
        >
          {dif}
        </span>
      );
    } else if (dif < -7) {
      return (
        <span
          className="badge square-pill bg-danger me-1 p-2"
          style={{ fontSize: "14" }}
        >
          {dif}
        </span>
      );
    }
  };
  const arrRent = cell => {
    return <span className="text-secondery">{cell}৳</span>;
  };
  const invArrs = (cell, row) => {
    let due_amount = Number(cell ? cell : 0);
    let paid_amount = Number(
      row.due_invoice_sum_paid ? row.due_invoice_sum_paid : 0
    );
    let total = due_amount - paid_amount;
    return <span className="text-secondery">{total ? total : 0}৳</span>;
  };
  const rentArrs = (cell, row) => {
    let end = moment(row?.tenant?.[0]?.tenant_folio?.paid_to);
    var start = moment(new Date());
    let dif = end.diff(start, "days");
    let perDayRent = 0;
    if (row?.tenant?.[0]?.tenant_folio?.rent_type === "Weekly") {
      perDayRent = row?.tenant?.[0]?.tenant_folio?.rent / 7;
    } else if (row?.tenant?.[0]?.tenant_folio?.rent_type === "Fortnightly") {
      perDayRent = row?.tenant?.[0]?.tenant_folio?.rent / 14;
    } else {
      perDayRent = row?.tenant?.[0]?.tenant_folio?.rent / 30;
    }
    let arrears = Math.abs(Math.round(perDayRent * dif));
    return <span className="text-secondery">{arrears}৳</span>;
  };
  const totalArrs = (cell, row) => {
    let end = moment(row?.tenant?.[0].tenant_folio?.paid_to);
    var start = moment(new Date());
    let dif = end.diff(start, "days");
    let perDayRent = 0;
    if (row?.tenant?.[0]?.tenant_folio?.rent_type === "Weekly") {
      perDayRent = row?.tenant[0]?.tenant_folio?.rent / 7;
    } else if (row?.tenant_folio?.rent_type === "Fortnightly") {
      perDayRent = row?.tenant[0]?.tenant_folio?.rent / 14;
    } else {
      perDayRent = row?.tenant?.[0]?.tenant_folio?.rent / 30;
    }
    let arrears = Math.abs(Math.round(perDayRent * dif));
    let bond = Math.abs(
      row?.tenant?.[0]?.tenant_folio?.bond_arreas
        ? +row?.tenant?.[0]?.tenant_folio?.bond_arreas
        : 0
    );
    // ====================================
    let due_amount = Number(
      row?.due_invoice_sum_amount ? row?.due_invoice_sum_amount : 0
    );
    let paid_amount = Number(
      row?.due_invoice_sum_paid ? row?.due_invoice_sum_paid : 0
    );
    let total_invoice_due = due_amount - paid_amount;
    // ======================================
    let total = Number(total_invoice_due) + Number(arrears) + Number(bond);
    return (
      <span className="text-secondery">
        {/* ${Number(inv) + Number(cell.tenant_folio?.due)} */}
        {total ? total : 0}৳
      </span>
    );
  };
  const invCount = data => {
    let inv = 0;
    var num = 0;

    data.invoice.map((item, key) => {
      inv = inv + Number(item.amount);
      num = key + 1;
    });
    if (data.invoice?.length == Number(num)) {
      return inv;
    }
  };
  const refDetail = (e, column, columnIndex, row, rowIndex) => {
    props.PropertyAllActivity(row.id);
    history.push("/propertyInfo/" + row.id);
  };
  const owner = (cell, row) => {
    if (row.current_owner) {
      return <span className="text-primary">{row.current_owner.reference}</span>;
    }
  };
  const ownerDetail = (e, column, columnIndex, row, rowIndex) => {
    if (row.current_owner) {
      history.push("/contactsInfo/" + row.current_owner.contact_id);
    }
  };
  const tenant = (cell, row) => {
    if (cell !== null) {
      return (
        <a
          onClick={() => {
            history.push("/contactsInfo/" + row.tenant_id);
          }}
        >
          <span className="text-primary">{cell}</span>
        </a>
      );
    }
  };

  const tenantDetail = (e, column, columnIndex, row, rowIndex) => {
    if (row.tenant_contact_id) {
      history.push("/contactsInfo/" + row.tenant_contact_id);
    }
  };

  const activeData = [
    {
      dataField: "id",
      text: "SL.",
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
      dataField: "owner",
      text: "Owner",
      formatter: owner,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          ownerDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "tenant",
      text: "Tenant",
      formatter: tenant,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          tenantDetail(e, column, columnIndex, row, rowIndex);
        },
      },
      sort: true,
    },
    {
      dataField: "owner_id",
      text: "owner_id",
      hidden: true,
    },
    {
      dataField: "tenant_id",
      text: "tenant_id",
      hidden: true,
    },
    {
      dataField: "manager_name",
      text: "Manager",
      sort: true,
    },
    // {
    //   dataField: "teams",
    //   text: "Teams",
    //   sort: true,
    // },
    {
      dataField: "",
      text: "Labels",
      sort: true,
      formatter: labelRef,
    },
    {
      dataField: "days",
      text: "Days",
      sort: true,
    },
  ];

  const pushArchivedProperty = id => {
    history.push("/propertyInfo/" + id);
  };
  const archivedProperty = (cell, row) => {
    return (
      <span
        className="text-primary"
        onClick={() => pushArchivedProperty(row.id)}
      >
        {row.reference}
      </span>
    );
  };

  const pushArchivedContact = id => {
    history.push(`/contactsInfo/${id}`);
  };
  const archivedOwner = (cell, row) => {
    return (
      <span
        className="text-primary"
        onClick={() => pushArchivedContact(row.current_owner?.contact_id)}
      >
        {row.current_owner?.reference}
      </span>
    );
  };
  const archivedTenant = (cell, row) => {
    return (
      <span
        className="text-primary"
        onClick={() => pushArchivedContact(row.tenant_id)}
      >
        {row.tenant}
      </span>
    );
  };
  const archivedTenant1 = (cell, row) => {
    return (
      <span
        className="text-primary"
        onClick={() => pushArchivedContact(row.tenant?.[0]?.tenant_folio?.id)}
      >
        {row.tenant?.[0]?.tenant_folio?.reference}
      </span>
    );
  };
  const archivedSeller = (cell, row) => {

    return (
      <span className="text-primary">
        <Link
          to={`/contactsInfo/${row?.sales_agreemet?.sales_contact?.contact_id}`}
        >
          {cell?.sales_contact?.reference?.slice(0, 16)}
        </Link>
      </span>
    );

  };
  const archivedBuyer = (cell, row) => {
    return (
      <span className="text-primary">
        {cell?.buyer_contact?.reference?.slice(0, 12)}
      </span>
    );
  };

  const archivedBed = (cell, row) => {
    return (
      <span className="badge rounded-pill bg-primary">
        {row.bedroom} <i className="fas fa-bed font-size-11"></i>
      </span>
    );
  };
  const archivedBath = (cell, row) => {
    return (
      <span className="badge rounded-pill bg-success">
        {row.bathroom} <i className="fas fa-bath font-size-11"></i>
      </span>
    );
  };
  const archivedCars = (cell, row) => {
    return (
      <span className="badge rounded-pill bg-warning">
        {row.car_space} <i className="fas fa-car font-size-11"></i>
      </span>
    );
  };
  const periodRef = (cell, row) => {
    return (
      <span
        className={`badge rounded-pill ${row.routine_inspections_frequency_type === "Monthly"
          ? "bg-warning"
          : "bg-primary"
          }`}
      >
        {row.routine_inspections_frequency_type}
      </span>
    );
  };

  const saleStatus = (cell, row) => {
    return (
      <span
        className={`badge rounded-pill ${cell === "Contracted" ? "bg-success" : "bg-primary"
          }`}
      >
        {cell}
      </span>
    );
  };
  const salePrice = cell => {
    return <span className="text-secondery">{cell}৳</span>;
  };
  const vacanciesOwner = (cell, row) => {
    return (
      <span className="text-primary">
        <Link to={`/contactsInfo/${row.owner_one?.contact_id}`}>{cell}</Link>
      </span>
    );
  };

  const periodicTanency = (cell, row) => {
    if (cell == 0) {
      return <span className="badge rounded-pill bg-danger">No</span>;
    } else {
      return <span className="badge rounded-pill bg-info">Yes</span>;
    }
  };
  const vacanciesMoveout = (cell, row) => {
    return (
      <span className="badge rounded-pill bg-danger">
        {row.tenant?.[0]?.tenant_folio?.move_out}
      </span>
    );
  };
  const vacanciesRent = (cell, row) => {
    return (
      <span className="badge rounded-pill bg-danger">
        {row.tenant?.[0]?.tenant_folio?.rent}
      </span>
    );
  };
  const vacanciesRentType = (cell, row) => {
    return (
      <span className="badge rounded-pill bg-danger">
        {row.tenant?.[0]?.tenant_folio?.rent_type}
      </span>
    );
  };
  const bondFormatter = (cell, row) => {
    const bond_arreas = row.tenant?.[0]?.tenant_folio?.bond_arreas
      ? Math.abs(row.tenant?.[0]?.tenant_folio?.bond_arreas)
      : 0;
    // setTotalArrears(prev => prev + bond_arreas);
    return <span>{bond_arreas}৳</span>;
  };
  const rent = (cell, row) => {
    return <span>{row.tenant?.[0]?.tenant_folio?.rent}৳</span>;
  };
  const rentType = (cell, row) => {
    return <span>{row.tenant?.[0]?.tenant_folio?.rent_type}</span>;
  };
  const paidTo = (cell, row) => {
    return (
      <span className="badge rounded-pill bg-primary">
        {row.tenant?.[0]?.tenant_folio?.paid_to}
      </span>
    );
  };
  const partPaid = (cell, row) => {
    return (
      <span>
        {row.tenant?.[0]?.tenant_folio?.part_paid
          ? row.tenant?.[0]?.tenant_folio?.part_paid
          : 0}৳
      </span>
    );
  };
  const archivedColumnData = [
    {
      dataField: "id",
      text: "SL.",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: archivedProperty,
      sort: true,
    },
    {
      dataField: "owner",
      text: "Owner",
      formatter: archivedOwner,
      sort: true,
    },
    {
      dataField: "tenant",
      text: "Tenant",
      formatter: archivedTenant,
      sort: true,
    },
    {
      dataField: "manager_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "teams",
      text: "Teams",
      sort: true,
    },
    {
      dataField: "bedroom",
      text: "Beds",
      formatter: archivedBed,
      sort: true,
    },
    {
      dataField: "car_space",
      text: "Cars",
      formatter: archivedCars,
      sort: true,
    },
    {
      dataField: "bathroom",
      text: "Baths",
      formatter: archivedBath,
      sort: true,
    },
    {
      dataField: "routine_inspections_frequency_type",
      text: "Period",
      formatter: periodRef,
      sort: true,
    },
    {
      dataField: "",
      text: "Rent",
      sort: true,
    },
  ];

  const rentalColumnData = [
    {
      dataField: "id",
      text: "SL.",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: archivedProperty,
      sort: true,
    },
    {
      dataField: "",
      text: "Owner",
      formatter: archivedOwner,
      sort: true,
    },
    {
      dataField: "",
      text: "Tenant",
      formatter: archivedTenant,
      sort: true,
    },
    {
      dataField: "manager_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "",
      text: "Teams",
      sort: true,
    },
    {
      dataField: "",
      text: "Labels",
      formatter: labelRef,
      sort: true,
    },
    {
      dataField: "",
      text: "Days",
      sort: true,
    },
  ];

  const saleColumnData = [
    // {
    //   dataField: "id",
    //   text: "Id",
    //   sort: true,
    // },

    {
      dataField: "reference",
      text: "Reference",
      formatter: archivedProperty,
      sort: true,
    },
    {
      dataField: "sales_agreemet",
      text: "Seller",
      formatter: archivedSeller,
      sort: true,
    },
    {
      dataField: "sales_agreemet",
      text: "Buyer",
      formatter: archivedBuyer,
      sort: true,
    },
    {
      dataField: "manager_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "",
      text: "Teams",
      sort: true,
    },
    {
      dataField:
        "sales_agreemet.buyer_contact.buyer_folio.contract_exchange",
      text: "Contracted",
      sort: true,
    },
    {
      dataField: "sales_agreemet.buyer_contact.buyer_folio.settlement_due",
      text: "Settlement",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      formatter: saleStatus,
      sort: true,
    },
    {
      dataField: "sales_agreemet.sales_contact.seller_folio.asking_price",
      text: "Price",
      formatter: salePrice,
      sort: true,
    },
  ];

  const arrearColumnData = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: archivedProperty,
      sort: true,
    },
    {
      dataField: "",
      text: "Tenant",
      formatter: archivedTenant1,
      sort: true,
    },
    {
      dataField: "manager_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "",
      text: "Rent",
      formatter: rent,
      sort: true,
    },
    {
      dataField: "",
      text: "Period",
      formatter: rentType,
      sort: true,
    },
    {
      dataField: "",
      text: "Paid to",
      formatter: paidTo,
      sort: true,
    },
    {
      dataField: "",
      text: "Eff. Paid To",
      formatter: paidTo,
      sort: true,
    },
    {
      dataField: "",
      text: "Part Paid",
      formatter: partPaid,
      sort: true,
    },
    {
      dataField: "",
      text: "Rent Arrears",
      formatter: rentArrs,
      sort: true,
    },
    {
      dataField: "due_invoice_sum_amount",
      text: "Invoice Arrears",
      formatter: invArrs,
      sort: true,
    },
    {
      dataField: "tenant",
      text: "Bond Arrears",
      formatter: bondFormatter,
      sort: true,
    },
    {
      dataField: "",
      text: "Total Arrears",
      formatter: totalArrs,
      sort: true,
    },
    {
      dataField: "tenant[0].tenant_folio.status",
      text: "Automation",
      sort: true,
    },
    {
      dataField: "tenant[0].tenant_folio.move_out",
      text: "Moved Out",
      sort: true,
    },
    {
      dataField: "tenant[0]",
      formatter: arrDays,
      text: "Days",
      sort: true,
    },
  ];

  const vacanciesColumnData = [
    {
      dataField: "id",
      text: "SL.",
      sort: true,
    },
    {
      dataField: "reference",
      text: "Reference",
      formatter: archivedProperty,
      sort: true,
    },
    {
      dataField: "owner_one.first_name",
      text: "Owner",
      formatter: vacanciesOwner,
      sort: true,
    },
    {
      dataField: "manager_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "",
      text: "Teams",
      sort: true,
    },
    {
      dataField: "primary_type",
      text: "Type",
      sort: true,
    },
    {
      dataField: "bedroom",
      text: "Beds",
      sort: true,
    },
    {
      dataField: "car_space",
      text: "Cars",
      sort: true,
    },
    {
      dataField: "bathroom",
      text: "Baths",
      sort: true,
    },
    {
      dataField: "tenant[0].tenant_folio.move_out",
      text: "Move Out",
      formatter: vacanciesMoveout,
      sort: true,
    },
    {
      dataField: "",
      text: "Re-let",
      sort: true,
    },
    {
      dataField: "",
      text: "Break Lease",
      sort: true,
    },
    {
      dataField: "",
      text: "Termination",
      sort: true,
    },
    {
      dataField: "tenant[0].tenant_folio.rent",
      text: "Rent",
      formatter: vacanciesRent,
      sort: true,
    },
    {
      dataField: "tenant[0].tenant_folio.rent_type",
      text: "Period",
      formatter: vacanciesRentType,
      sort: true,
    },
  ];
  const renewalsColumnData = [
    // {
    //   dataField: "id",
    //   text: "Id",
    //   sort: true,
    // },
    {
      dataField: "reference",
      text: "Reference",
      formatter: archivedProperty,
      sort: true,
    },
    {
      dataField: "tenant_one.reference",
      text: "Tenant",
      formatter: archivedTenant,
      sort: true,
    },
    {
      dataField: "manager_name",
      text: "Manager",
      sort: true,
    },
    {
      dataField: "",
      text: "Teams",
      sort: true,
    },
    {
      dataField: "tenant_one.tenant_folio.rent",
      text: "Rent",
      sort: true,
    },
    {
      dataField: "tenant_one.tenant_folio.rent_type",
      text: "Period",
      sort: true,
    },
    {
      dataField: "tenant_one.tenant_folio.move_in",
      text: "Move In",
      sort: true,
    },
    {
      dataField: "tenant_one.tenant_folio.move_out",
      text: "Move Out",
      sort: true,
    },
    {
      dataField: "tenant_one.tenant_folio.agreement_start",
      text: "Start Agreement",
      sort: true,
    },
    {
      dataField: "tenant_one.tenant_folio.agreement_end",
      text: "End Agreement",
      sort: true,
    },
    {
      dataField: "tenant_one.tenant_folio.periodic_tenancy",
      text: "Periodic",
      formatter: periodicTanency,
      sort: true,
    },
  ];

  if (init) {
    toggle(location?.state?.tab ? location?.state?.tab : "2", null);
    setInit(false);
  }

  useEffect(() => {
    if (props.get_renewals_property_loading == "Success") {
      console.log("in1");
      setState(prev => ({
        ...prev,
        page: Number(props.get_renewals_property_data?.data?.page),
        data: props.get_renewals_property_data?.data?.data,
        sizePerPage: props.get_renewals_property_data?.data?.sizePerPage,
        dataLength: props.get_renewals_property_data?.data?.length,
        loading: false,
      }));

      props.getRenewalsPropertyFresh();
    }

    if (props.get_arrears_property_loading == "Success") {
      console.log("in2");
      setState(prev => ({
        ...prev,
        page: Number(props.get_arrears_property_data?.data?.page),
        data: props.get_arrears_property_data?.data?.data,
        sizePerPage: props.get_arrears_property_data?.data?.sizePerPage,
        dataLength: props.get_arrears_property_data?.data?.length,
        loading: false,
      }));

      props.getArrearsPropertyFresh();
    }

    if (props.get_rental_property_loading == "Success") {
      console.log("in3");
      setState(prev => ({
        ...prev,
        page: Number(props.get_rental_property?.data?.page),
        data: props.get_rental_property?.data?.data,
        sizePerPage: props.get_rental_property?.data?.sizePerPage,
        dataLength: props.get_rental_property?.data?.length,
        loading: false,
      }));

      props.getRentalPropertyFresh();
    }

    //
    if (props.property_list_loading == "Success") {
      console.log("innnn");
      setState(prev => ({
        ...prev,
        page: Number(props.property_list_data?.page),
        data: props.property_list_data?.data,
        sizePerPage: props.property_list_data?.sizePerPage,
        dataLength: props.property_list_data?.length,
        loading: false,
      }));
      props.propertyListFresh();
    }

    if (props.get_vacancies_property_loading == "Success") {
      console.log("in22");
      setState(prev => ({
        ...prev,
        page: Number(props.get_vacancies_property_data?.data?.page),
        data: props.get_vacancies_property_data?.data?.data,
        sizePerPage: props.get_vacancies_property_data?.data?.sizePerPage,
        dataLength: props.get_vacancies_property_data?.data?.length,
        loading: false,
      }));
      props.getVacanciesPropertyFresh();
    }

    if (props.get_sales_property_loading == "Success") {
      console.log("in44");
      setState(prev => ({
        ...prev,
        page: Number(props.get_sales_property_data?.data?.page),
        data: props.get_sales_property_data?.data?.data,
        sizePerPage: props.get_sales_property_data?.data?.sizePerPage,
        dataLength: props.get_sales_property_data?.data?.length,
        loading: false,
      }));
      props.getSalesPropertyFresh();
    }
    if (props.get_archived_property_loading == "Success") {
      console.log("in88");
      setState(prev => ({
        ...prev,
        page: Number(props.get_archived_property?.data?.page),
        data: props.get_archived_property?.data?.data,
        sizePerPage: props.get_archived_property?.data?.sizePerPage,
        dataLength: props.get_archived_property?.data?.length,
        loading: false,
      }));
      props.getArchievePropertyFresh();
    }

    if (props.all_property_document_loading === "Success") {
      props.AllPropertyDocumentFresh();
    }
    if (props.property_tenant_info_loading === "Success") {
      props.propertyTenantInfoFresh();
    } else if (props.property_owner_info_loading === "Success") {
      props.propertyOwnerInfoFresh();
    } else if (props.property_add_loading == "Success") {
      props.propertyAddFresh();
    }
    if (props.property_key_value_loading === "Success") {
      props.PropertyKeyValueFresh();
    }
  }, [
    props.property_list_loading,
    props.all_property_document_loading,
    props.property_tenant_info_loading,
    props.property_owner_info_loading,
    props.property_add_loading,
    props.property_key_value_loading,
    props.get_rental_property_loading,
    props.get_sales_property_loading,
    props.get_vacancies_property_loading,
    props.get_arrears_property_loading,
    props.get_renewals_property_loading,
    props.get_archived_property_loading,
    location?.state?.tab,
  ]);

  let url = "/propertyInfo/";

  // console.log(props.get_arrears_property_loading);
  // console.log(props.get_arrears_property_data);
  // console.log(state);

  return (
    <div className="page-content">
      <Container fluid={true}>
        {/* <Breadcrumbs title="Property List" breadcrumbItem="Property" /> */}
        <h4 className="ms-2 text-primary">Property List</h4>

        <Row>
          <Col md={2} >
            <div>
              <Card style={{ borderRadius: "15px", paddingTop: "15px" }}>
                <CardBody>
                  <Row>
                    <div className="button-items mt-0 p-0" >

                      {authUser?.user?.user_type == "Property Manager" && (
                        <Link to="properties">
                          <button
                            type="button"
                            className="btn btn-info custom-button-side-row-font-size"
                          >
                            Add property
                            <i className="bx bx-plus-circle font-size-18 align-middle ms-2" />
                          </button>

                        </Link>
                      )}

                      {/* <ImageModal /> */}

                      {/* <button
                        type="button"
                        className="btn btn-info custom-button-side-row-font-size"
                      >
                       
                        Message
                        <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                      </button>

                      <button
                        type="button"
                        disabled={true}
                        className="btn btn-info custom-button-side-row-font-size"
                      >
                        Action
                        <i className="fas fas fa-chevron-down font-size-12 align-middle ms-2"></i>
                      </button> */}


                    </div>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col md={10} style={{ padding: "0px" }}>
            <div>
              <Card style={{ borderRadius: "15px" }}>
                <CardBody>
                  <Row>
                    <Col sm={12} md={12} lg={9}>

                      <Nav
                        className="icon-tab nav-justified"
                      >
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2", "Active");
                            }}
                          >
                            Active
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "3",
                            })}
                            onClick={() => {
                              toggle("3", "Rentals");
                            }}
                          >
                            Rentals
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "4",
                            })}
                            onClick={() => {
                              toggle("4");
                            }}
                          >
                            Sales
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "5",
                            })}
                            onClick={() => {
                              toggle("5");
                            }}
                          >
                            Arrears
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "6",
                            })}
                            onClick={() => {
                              toggle("6");
                            }}
                          >
                            Vacancies
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "7",
                            })}
                            onClick={() => {
                              toggle("7");
                            }}
                          >
                            Renewals
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: state.activeTab === "8",
                            })}
                            onClick={() => {
                              toggle("8", "Archived");
                            }}
                          >
                            Archived
                          </NavLink>
                        </NavItem>
                      </Nav>
                      {/* </div> */}
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
                            <p
                              className="mb-0"
                              style={{
                                wordSpacing: "5px",
                                fontWeight: "300",
                                color: "black",
                              }}
                            >
                              Properties Before you can begin managing
                              properties on My Day you first need to create
                              them. You can create single-unit properties like
                              apartments, townhomes, condos and single-family
                              homes or multi-unit properties like residential
                              buildings, commercial buildings, or multi-purpose
                              buildings. in multi-unit properties you can
                              specify unit by unit the unit credentials. Units
                              can be anything like a room, apartment, office
                              suite, retail unit, parking space, storage unit
                              and more.
                            </p>
                          </CardText>
                        </Col>
                        <div className="button-items mt-4"></div>
                        <Col lg={12}>
                          <Card>
                            <CardBody>
                              <CardTitle className="h4">
                                Video Tutorial
                              </CardTitle>
                              <p className="card-title-desc">
                                Watch this video to learn how to create and edit
                                single- and multi-unit properties and how you
                                can associate members (tenant, rental owner,
                                etc) to those properties.
                              </p>

                              <div className="ratio ratio-16x9">
                                <iframe
                                  title="test"
                                  allowFullScreen
                                  src="https://www.youtube.com/embed/h-06Yb7mxv0"
                                ></iframe>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row style={{ zIndex: -1 }}>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {state.activeTab == 2 && (
                              <RemotePagination
                                data={state.data.length > 0 ? state.data : []}
                                page={state.page}
                                sizePerPage={state.sizePerPage}
                                totalSize={state.dataLength}
                                onTableChange={handleTableChange}
                                columns={activeData}
                                search={search}
                                onSearchState={handleSearchState}
                                loading={state.loading}
                                selectRow={dueTaskSelectRow}
                                defaultSorted={dueTaskDefaultSorted}
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
                                data={state.data?.length > 0 ? state.data : []}
                                page={state.page}
                                sizePerPage={state.sizePerPage}
                                totalSize={state.dataLength}
                                onTableChange={handleTableChange}
                                columns={rentalColumnData}
                                search={search}
                                onSearchState={handleSearchState}
                                loading={state.loading}
                                selectRow={dueTaskSelectRow}
                                defaultSorted={dueTaskDefaultSorted}
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
                                data={state.data?.length > 0 ? state.data : []}
                                page={state.page}
                                sizePerPage={state.sizePerPage}
                                totalSize={state.dataLength}
                                onTableChange={handleTableChange}
                                columns={saleColumnData}
                                search={search}
                                onSearchState={handleSearchState}
                                loading={state.loading}
                                selectRow={dueTaskSelectRow}
                                defaultSorted={dueTaskDefaultSorted}
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
                                data={state.data?.length > 0 ? state.data : []}
                                page={state.page}
                                sizePerPage={state.sizePerPage}
                                totalSize={state.dataLength}
                                onTableChange={handleTableChange}
                                columns={arrearColumnData}
                                search={search}
                                onSearchState={handleSearchState}
                                loading={state.loading}
                                selectRow={dueTaskSelectRow}
                                defaultSorted={dueTaskDefaultSorted}
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
                            {state.activeTab == 6 && (
                              <RemotePagination
                                data={state.data?.length > 0 ? state.data : []}
                                page={state.page}
                                sizePerPage={state.sizePerPage}
                                totalSize={state.dataLength}
                                onTableChange={handleTableChange}
                                columns={vacanciesColumnData}
                                search={search}
                                onSearchState={handleSearchState}
                                loading={state.loading}
                                selectRow={dueTaskSelectRow}
                                defaultSorted={dueTaskDefaultSorted}
                              />
                            )}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="7">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {state.activeTab == 7 && (
                              <RemotePagination
                                data={state.data?.length > 0 ? state.data : []}
                                page={state.page}
                                sizePerPage={state.sizePerPage}
                                totalSize={state.dataLength}
                                onTableChange={handleTableChange}
                                columns={renewalsColumnData}
                                search={search}
                                onSearchState={handleSearchState}
                                loading={state.loading}
                                selectRow={dueTaskSelectRow}
                                defaultSorted={dueTaskDefaultSorted}
                              />
                            )}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="8">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            {state.activeTab == 8 && (
                              <RemotePagination
                                data={state.data?.length > 0 ? state.data : []}
                                page={state.page}
                                sizePerPage={state.sizePerPage}
                                totalSize={state.dataLength}
                                onTableChange={handleTableChange}
                                columns={archivedColumnData}
                                search={search}
                                onSearchState={handleSearchState}
                                loading={state.loading}
                                selectRow={dueTaskSelectRow}
                                defaultSorted={dueTaskDefaultSorted}
                              />
                            )}
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = gstate => {
  const {
    property_list_data,
    property_list_loading,
    property_add_loading,

    property_tenant_info_loading,
    property_owner_info_loading,

    property_key_value_loading,

    get_archived_property,
    get_archived_property_error,
    get_archived_property_loading,

    get_rental_property,
    get_rental_property_error,
    get_rental_property_loading,

    get_sales_property_loading,
    get_sales_property_data,

    get_arrears_property_data,
    get_arrears_property_loading,

    get_vacancies_property_data,
    get_vacancies_property_loading,

    get_renewals_property_data,
    get_renewals_property_loading,
  } = gstate.property;

  const {
    property_all_activity,
    property_all_activity_loading,
    add_message_data_loading,
  } = gstate.Activity;

  const { all_property_document_loading } = gstate.Document;

  return {
    property_list_data,
    property_list_loading,
    property_add_loading,

    property_tenant_info_loading,
    property_owner_info_loading,

    property_key_value_loading,

    all_property_document_loading,

    get_archived_property,
    get_archived_property_error,
    get_archived_property_loading,

    get_rental_property,
    get_rental_property_error,
    get_rental_property_loading,

    get_sales_property_loading,
    get_sales_property_data,

    get_arrears_property_data,
    get_arrears_property_loading,

    get_vacancies_property_data,
    get_vacancies_property_loading,

    get_renewals_property_data,
    get_renewals_property_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    propertyList,
    propertyAddFresh,
    propertyTenantInfoFresh,
    propertyOwnerInfoFresh,
    PropertyKeyValueFresh,
    PropertyAllActivity,
    AllPropertyDocumentFresh,
    getArchieveProperty,
    getRentalProperty,
    getSalesProperty,
    getSalesPropertyFresh,
    getArrearsProperty,
    getVacanciesProperty,
    getRenewalsProperty,
    checkUniqueKeyNumberFresh,
    propertyListFresh,
    getRentalPropertyFresh,
    getVacanciesPropertyFresh,
    getArrearsPropertyFresh,
    getRenewalsPropertyFresh,
    getArchievePropertyFresh,
  })(PropertyList)
);
