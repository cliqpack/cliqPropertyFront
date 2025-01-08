import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";
import { } from "store/actions";
import classnames from "classnames";
import DatatableTables2 from "../../../Tables/DatatableTables2";
import toastr from "toastr";

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
} from "reactstrap";

import { setDefaultLocale } from "react-datepicker";
import moment from "moment";
import { logDOM } from "@testing-library/react";

import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

document.title = "Settings | My Day";

function BankFeeds(props) {
  const [state, setState] = useState({
    removeBtnStatus: true,
    showModalAdd: false,
    showModalRemove: false,
    showModalRemoveData: [],
    showAll: false,
  });

  const [actionArray, setActionArray] = useState([]);

  const [seen, setSeen] = useState(false);

  const { id, year, month } = useParams();

  const toggleModalAdd = () =>
    setState(prev => ({ ...prev, showModalAdd: !prev.showModalAdd }));

  const toggleModalRemove = () => {
    console.log(node.selectionContext.selected);
    // setState(prev => ({ ...prev, showModalRemoveData: node.selectionContext.selected }))
    setState(prev => ({ ...prev, showModalRemove: !prev.showModalRemove }));
  };

  const inputRef = useRef(null);

  const [data, setData] = useState({});

  const history = useHistory();

  // const date = moment().format("yyyy-MM-DD");

  const deleteDetails = (e, column, columnIndex, row, rowIndex) => {
    setData(row);
  };

  const deleteHandler = () => {
    e.preventDefault();
  };

  const statusRef = (cell, row) => {
    if (cell === 1) {
      return (
        <span className="">
          <i className="fas fa-check" />
        </span>
      );
    } else {
      return <span className=""></span>;
    }
  };

  const amountRef = (cell, row) => {
    <span className="badge rounded-pill bg-secondary">{cell}</span>;
  };

  const uploadBillDetails = row => { };

  const editRef = (cell, row) => (
    <span onClick={() => uploadBillDetails(row)} className="text-primary">
      Edit
    </span>
  );

  const delRef = (cell, row) => (
    <span className="text-danger" onClick={() => setDeleteState(prev => !prev)}>
      Delete
    </span>
  );

  const fileRef = (cell, row) => {
    return (
      <a
        href={process.env.REACT_APP_IMAGE + row.file}
        target="_blank"
        rel="noreferrer noopener"
      >
        {row.file?.slice(0, 150)}
      </a>
    );
  };

  const activeData = [
    {
      dataField: "adjustment_date",
      text: "Date",
      sort: true,
    },
    {
      dataField: "reason",
      text: "Reason",
      sort: true,
    },
    // {
    //     dataField: "removed_date",
    //     text: "Removed",
    //     sort: true
    // },
    // {
    //     dataField: "",
    //     text: "Reason Removed",
    //     sort: true,
    // },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
    },
  ];

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize:
      props.all_ad_list_data?.data.length || props.ad_list_data?.data?.length, // replace later with size(customers),
    custom: true,
  };

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const handleSelect = (isSelect, rows, e) => {
    // console.log(isSelect, rows);
    if (rows) {
      setActionArray(prevArray => [...prevArray, isSelect]);
    } else {
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
    }
  };

  const handleSelectAll = (isSelect, rows, e) => {
    // console.log(isSelect, rows);
    if (isSelect) {
      setActionArray(rows);
    } else {
      setActionArray([]);
    }
  };

  // Select  Button operation
  const selectRow = {
    mode: "checkbox",

    onSelect: handleSelect,

    onSelectAll: handleSelectAll,
  };

  const handleChange = state => {
    setSelectedData(state.selectedRows);
    console.log(selectedData);
  };

  const handleShowAll = () => {
    setState(prev => ({ ...prev, showAll: !prev.showAll }));
    if (!state.showAll) {
      props.allAdjustmentsData(id);
    } else {
      console.log(!state.showAll);
      props.allAdjustmentsDataFresh();
    }
  };

  useEffect(() => {
    if (props.ad_list_loading === false) {
      props.adjustmentsData(id);
      props.ReconciliationDataFresh();
    }
  }, [props.ad_list_loading]);
  console.log(props.ad_list_loading);

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Row>
          <Col lg={12}>
            {/* <div>
              <Row>
                <Col md={12}>
                  <Card>
                    <CardBody>
                      <h4 className="ms-2 text-primary border-bottom border-2">
                       Fees
                      </h4>

                      <Row className="py-2">
                        <Col md={9} className="d-flex align-items-center">
                          <div className="button-items">
                            <AdjustmentModal
                              state={state}
                              toggle={toggleModalAdd}
                              setState={setState}
                              setSeen={setSeen}
                            />
                             <button
                              type="button"
                              className="btn btn-secondary"
                   
                             
                            >
                              New fee
                            </button>

                            <button
                              type="button"
                              className="btn btn-secondary"
                              // disabled={actionArray.length > 0 ? false : true}
                            >
                              Remove
                            </button>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div></div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Card>
                <CardBody>
                  <CardText className="mb-0">
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={activeData}
                      data={
                        props.all_ad_list_data?.data ||
                        props.ad_list_data?.data ||
                        []
                      }
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={activeData}
                          data={
                            props.all_ad_list_data?.data ||
                            props.ad_list_data?.data ||
                            []
                          }
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md={2}></Col>
                                <Col md={10}></Col>
                              </Row>

                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <div className="d-flex justify-content-end align-items-center search-box">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                    </div>
                                    <BootstrapTable
                                      ref={n => (node = n)}
                                      keyField={"id"}
                                      responsive
                                      bordered={false}
                                      striped={false}
                                      defaultSorted={defaultSorted}
                                      selectRow={selectRow}
                                      tabIndexCell
                                      classes={
                                        "table align-middle table-nowrap"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="align-items-md-center mt-30">
                                <Col className="inner-custom-pagination d-flex">
                                  <div className="d-inline">
                                    <SizePerPageDropdownStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                  <div className="text-md-right ms-auto">
                                    <PaginationListStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardText>
                </CardBody>
              </Card>
            </div> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = gstate => {
  const { } = gstate.property;

  const { } = gstate.Reconciliations;

  return {};
};

export default connect(mapStateToProps, {})(BankFeeds);
