import React, { useEffect, useState } from "react";
import Breadcrumbs from "components/Common/Breadcrumb";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";

import classnames from "classnames";
import Loder from "components/Loder/Loder";

import { rentManagementList, rentManagementListFresh, getPropertyTenantInfoFresh } from "store/actions";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  CardText,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import toastr from "toastr";
import RentCalculation from "../RentCalculation";
import ProRata from "./ProRata";
import ResetRent from "./ResetRent";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import CancelRentModal from "./CancelRentModal";
import GenerantRentModal from "./GenerateRentModal";
import RemotePagination from "pages/Task/RemotePagination";

document.title = "CliqProperty";

function RentManagement(props) {
  const { propertyId, contactId, folioId } = useParams();

  const [selected, setSelected] = useState([])
  console.log(selected);

  const [init, setInit] = useState(true);
  const [modalState, setModalState] = useState({
    proRataState: false,
    resetRentState: false,
    cancelRent: false,
    generateRent: false
  });
  // console.log(contactId);
  const [state, setState] = useState({
    dropDownBtn: false,
    dropDownBtn1: false,
    page: 1,
    data: [],
    sizePerPage: 10,
    dataLength: 0,
    loading: false,

  });
  console.log(state);
  const [rentCalculationState, setRentCalculationState] = useState(false);

  const [actionArray, setActionArray] = useState([]);
  console.log(actionArray);
  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.rent_management_list_data?.data?.length, // replace later with size(customers),
    custom: true,
  };
  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const history = useHistory();

  const toggleModalTransactions = () => {
    setState(prev => ({
      ...prev,
      transactionInfoModal: !prev.transactionInfoModal,
    }));
  };

  const toggleCalculationRent = () => {
    setRentCalculationState(prev => !prev);
  };
  const toggleProRata = () => {
    setModalState(prev => ({ ...prev, proRataState: !prev.proRataState }))
  };
  const toggleResetRent = () => {
    props.getPropertyTenantInfoFresh()
    if (props.rent_management_list_data?.recurring_invoice == 1) {
      toastr.error('Rent reset is not available while there are recurring invoice templates for a tenancy.');
    } else if (props.rent_management_list_data?.rent_invoice > 0) {
      toastr.error('Rent reset is not available while there are outstanding rent invoices for a tenancy.');
    } else setModalState(prev => ({ ...prev, resetRentState: !prev.resetRentState }))
  };

  //   const toggleArchive = () => {
  //     setState(prev => ({ ...prev, archiveModal: !prev.archiveModal }));
  //   };

  const amountRef = (cell, row) => {
    return <span>{cell}৳</span>;
  };
  const auditRef = (cell, row) => {
    let $auditIds = row.rent_receipt?.map((item, key) => <span key={key}>{item.receipt_id}{`${(row.rent_receipt.length > 0 && row.rent_receipt.length != key + 1) ? ", " : ""}`}</span>)
    return $auditIds;
  };
  const adjustmentRef = (cell, row) => {
    if (row.rent_adjustment) {
      return <span>{row.rent_adjustment?.rent_amount}৳ ({row.rent_adjustment?.active_date})</span>
    } else {
      return <span></span>;
    }
  };
  const deductionRef = (cell, row) => {
    return <span>{row.rent_discount ? row.rent_discount?.discount_amount : 0.00}৳</span>
  };

  const docPathFormatter = (cell, row) => {
    return <a href={process.env.REACT_APP_DOCUMENT + row.recurring_doc
    } target="_blank"
      rel="noreferrer noopener">
      {row.recurring_doc && <i className="fab fa-dochub"></i>}
    </a>
  }

  const activeData = [
    {
      dataField: "id",
      text: "id",
      sort: true,
    },
    {
      dataField: "from_date",
      text: "From",
      sort: true,
    },
    {
      dataField: "",
      text: "",
      // sort: true,
      formatter: docPathFormatter,
    },
    {
      dataField: "to_date",
      text: "To",
      sort: true,
    },
    {
      dataField: "rent",
      text: "Rent",
      sort: true,
      formatter: amountRef,
    },
    {
      dataField: "adjustment",
      text: "Adjustment",
      sort: true,
      formatter: adjustmentRef,
    },

    {
      dataField: "deduction",
      text: "Deduction",
      sort: true,
      formatter: deductionRef,
    },

    {
      dataField: "due",
      text: "Due",
      sort: true,
      formatter: amountRef,
    },
    {
      dataField: "audit",
      text: "Audit",
      formatter: auditRef,
      // sort: true,
    },
    {
      dataField: "credit",
      text: "Credit",
      sort: true,
      formatter: amountRef,
    },
    {
      dataField: "received",
      text: "Received",
      sort: true,
      formatter: amountRef,
    },
  ];

  if (init) {
    props.rentManagementList(contactId, propertyId, state.page,
      state.sizePerPage,
      null,
      'id',
      'asc');
    setInit(false);
  }

  // console.log(props.rent_management_list_loading);

  useEffect(() => {
    if (props.rent_management_list_loading == 'Success') {

      setState(prev => ({
        ...prev,
        page: Number(props.rent_management_list_data?.page),
        data: props.rent_management_list_data?.data,
        sizePerPage: props.rent_management_list_data?.sizePerPage,
        dataLength: props.rent_management_list_data?.length,
        loading: false,
      }));


      props.rentManagementListFresh()
    }

    if (props.delete_invoice_loading === "Success") {
      toastr.warning("Invoice Deleted");
      props.deleteInvoiceFresh();
      props.invoiceuUnpaidListById(propertyId, id);
    }
  }, [props.delete_invoice_loading, props.rent_management_list_loading]);


  const handleSelect = (isSelect, rows, e) => {
    // console.log(isSelect.id);
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

  const nonSelectableId = props.rent_management_list_data?.data.map(item => {
    if (Number(item.received > 0)) {
      return item.id
    }
  })
  // Select  Button operation
  const selectRow = {
    mode: "checkbox",

    onSelect: handleSelect,

    onSelectAll: handleSelectAll,

    clickToSelect: true,

    nonSelectable: nonSelectableId,
    // nonSelectableClasses: 'text-danger'
    selected: selected


  };

  const toggleRentCancel = () => { setModalState(prev => ({ ...prev, cancelRent: !prev.cancelRent })) }

  const toggleRentGenerate = () => { setModalState(prev => ({ ...prev, generateRent: !prev.generateRent })) }

  console.log(props.rent_management_list_data);

  const rentManagementApi = () => {
    props.rentManagementList(contactId, propertyId, state.page,
      state.sizePerPage,
      null,
      'id',
      'asc')
    setActionArray([])
    setSelected([])

  }
  const [search, setSearch] = useState("");
  const handleSearchState = e => {
    setSearch(e.target.value);
  };

  // const handleTableChange = (
  //   type,
  //   { page, sizePerPage, sortField, sortOrder }
  // ) => {
  //   // return;


  //   console.log(page,
  //     sizePerPage,
  //     search,
  //     sortField,
  //     sortOrder);


  //   setState(prev => ({ ...prev, loading: true }));

  //   if (!search) {
  //     if (sortField) {
  //       props.rentManagementList(contactId, propertyId,
  //         page,
  //         sizePerPage,
  //         null,
  //         sortField,
  //         sortOrder,

  //       )
  //     } else {
  //       props.rentManagementList(contactId, propertyId,
  //         page,
  //         sizePerPage,
  //         search,
  //         "id", "asc",

  //       )
  //     }
  //     props.rentManagementList(contactId, propertyId,
  //       page,
  //       sizePerPage,
  //       null,
  //       sortField,
  //       sortOrder,

  //     )
  //   } else {

  //     console.log(page,
  //       sizePerPage,
  //       search,
  //       sortField,
  //       sortOrder);

  //     if (sortField) {
  //       props.rentManagementList(contactId, propertyId,
  //         page,
  //         sizePerPage,
  //         search,
  //         sortField,
  //         sortOrder,

  //       )
  //     } else {
  //       props.rentManagementList(contactId, propertyId,
  //         page,
  //         sizePerPage,
  //         search,
  //         "id", "asc",

  //       )
  //     }

  //   }

  // }

  const handleTableChange = (
    type,
    { page, sizePerPage, sortField, sortOrder }
  ) => {
    // return;
    setState(prev => ({ ...prev, loading: true }));

    if (!search) {
      if (sortField) {
        props.rentManagementList(contactId, propertyId,
          page,
          sizePerPage,
          null,
          sortField,
          sortOrder,

        )
      } else {
        props.rentManagementList(contactId, propertyId,
          page,
          sizePerPage,
          null,
          'id',
          'asc',

        )
      }
    } else {
      if (sortField) {
        props.rentManagementList(contactId, propertyId,
          page,
          sizePerPage,
          search,
          sortField,
          sortOrder,

        )
      } else {
        props.rentManagementList(contactId, propertyId,
          page,
          sizePerPage,
          search,
          'id',
          'asc',

        )
      }
    }
  };


  return (
    <div className="page-content">
      {
        modalState.proRataState && <ProRata proRataState={modalState.proRataState} toggle={toggleProRata} rentManagementApi={rentManagementApi} />
      }
      {
        modalState.resetRentState && <ResetRent resetRentState={modalState.resetRentState} toggle={toggleResetRent} propertyId={propertyId} contactId={contactId} rentManagementApi={rentManagementApi} />
      }
      <Container fluid={true}>
        <Row>
          <Col lg={12}>
            <div>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={8} className="d-flex flex-column">
                      <div className="mb-3">
                        <h4 className="ms-2 text-primary">
                          Advanced Rent Management -{" "}
                          {
                            props.rent_management_list_data?.tenant?.reference.split(
                              "-"
                            )[0]
                          }
                          {" (TEN00"}
                          {props.rent_management_list_data?.tenant?.id}
                          {")"}
                        </h4>
                      </div>
                      <div className="d-flex">
                        <Dropdown
                          isOpen={state.dropDownBtn}
                          toggle={() =>
                            setState(prev => {
                              return {
                                ...prev,
                                dropDownBtn: !prev.dropDownBtn,
                              };
                            })
                          }
                          className="mt-4 mt-sm-0 me-2"
                        >
                          <DropdownToggle
                            className="btn btn-info btn-md"
                            caret
                          // disabled={true}
                          >
                            Actions <i className="mdi mdi-chevron-down"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem disabled={actionArray.length > 0 ? false : true} onClick={toggleRentCancel}>Cancel Rent Invoices</DropdownItem>
                            <DropdownItem
                              disabled={props.rent_management_list_data?.recurring_invoice == 1 && actionArray.length > 0 ? false : true}
                              onClick={toggleRentGenerate}>Generate Rent Invoices</DropdownItem>
                            {/* <DropdownItem onClick={toggleProRata}>Pro-rata Rent Period</DropdownItem> */}
                            <DropdownItem onClick={toggleResetRent}>Reset Rent</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        <Button
                          className="btn"
                          color="info"
                          onClick={toggleCalculationRent}
                        >
                          <i className="fas fa-calculator"></i>
                        </Button>
                        {rentCalculationState && (
                          <RentCalculation
                            toggleCalculationRent={toggleCalculationRent}
                            rentCalculationState={rentCalculationState}
                            propertyId={propertyId}
                          ></RentCalculation>
                        )}
                      </div>
                    </Col>
                    <Col md={4}></Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        {/* {props.rent_management_list_data?.data != null ? (
                          <DatatableTables2
                            products={props.rent_management_list_data || []}
                            columnData={activeData}
                          />
                        ) : null} */}


                        {/* {props.rent_management_list_data?.data &&
                          <PaginationProvider
                            pagination={paginationFactory(pageOptions)}
                            keyField="id"
                            columns={activeData}
                            data={props.rent_management_list_data?.data}
                          >
                            {({ paginationProps, paginationTableProps }) => (
                              <ToolkitProvider
                                keyField="id"
                                columns={activeData}
                                data={props.rent_management_list_data?.data}
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
                          </PaginationProvider>} */}

                        {props.rent_management_list_data?.data &&
                          <RemotePagination
                            data={state.data?.length > 0 ? state.data : []}
                            page={state.page}
                            sizePerPage={state.sizePerPage}
                            totalSize={state.dataLength}
                            onTableChange={handleTableChange}
                            columns={activeData}
                            search={search}
                            onSearchState={handleSearchState}
                            loading={state.loading}
                            selectRow={selectRow}
                            defaultSorted={defaultSorted}
                          />}
                      </CardText>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      {modalState.cancelRent && <CancelRentModal status={modalState.cancelRent} toggle={toggleRentCancel} data={actionArray}
        rentManagementApi={rentManagementApi} />}
      {modalState.generateRent && <GenerantRentModal status={modalState.generateRent} toggle={toggleRentGenerate} data={actionArray}
        rentManagementApi={rentManagementApi} />}
    </div>
  );
}

const mapStateToProps = gstate => {
  const {
    rent_management_list_data,
    rent_management_list_error,
    rent_management_list_loading,

  } = gstate.AccountsTransactions;

  return {
    rent_management_list_data,
    rent_management_list_error,
    rent_management_list_loading,
  };
};

export default withRouter(
  connect(mapStateToProps, { rentManagementList, rentManagementListFresh, getPropertyTenantInfoFresh })(RentManagement)
);
