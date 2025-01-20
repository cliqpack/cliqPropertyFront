import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import { useDispatch } from "react-redux";
import {
  Card,
  Alert,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import Select from "react-select";
import { companyDataForPortfolioLabel } from "store/actions";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import NewLabelModal from "./NewLabelModal";
import LabelEditModal from "./LabelEditModal";
import RemoveLabelModal from "./RemoveLabelModal";

document.title = "CliqProperty";

const PortfolioLabels = props => {
  const history = useHistory();
  const [state, setState] = useState({
    labelModal: false,
    labelModalEdit: false,
    labelModalRemove: false,
  });
  const [actionArray, setActionArray] = useState([]);

  const toggleModalLabel = () => {
    setState(prev => ({ ...prev, labelModal: !prev.labelModal }));
  };
  const toggleModalLabelEdit = () => {
    setState(prev => ({ ...prev, labelModalEdit: !prev.labelModalEdit }));
  };
  const toggleModalLabelRemove = () => {
    setState(prev => ({ ...prev, labelModalRemove: !prev.labelModalRemove }));
  };

  const { SearchBar } = Search;

  const pageOptions = {
    sizePerPage: 10,
    totalSize: props.label_list_data?.label?.length || 0, // replace later with size(customers),
    custom: true,
  };

  let node;
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const labelDetails = (e, column, columnIndex, row, rowIndex) => {
    setState({ ...state, labelData: row });
    toggleModalLabelEdit();
  };

  const activeData = [
    {
      dataField: "label_name",
      text: "Label Name",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          labelDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },

    {
      dataField: "type",
      text: "Type",
      sort: true,
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          labelDetails(e, column, columnIndex, row, rowIndex);
        },
      },
    },
  ];

  const handleSelect = (isSelect, rows, e) => {
    console.log(isSelect, rows);
    if (rows) {
      setActionArray(prevArray => [...prevArray, isSelect]);
    } else {
      setActionArray(cur => cur.filter(data => data.id !== isSelect.id));
    }
  };

  const handleSelectAll = (isSelect, rows, e) => {
    console.log(isSelect, rows);
    console.log(pageOptions);
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

  const handleRemove = () => {
    setState({ ...state, deleteId: node.selectionContext.selected });

    toggleModalLabelRemove();
  };

  useEffect(() => {
    if (props.label_list_loading === false) {
      props.companyDataForPortfolioLabel();
    }
  }, [props.label_list_loading]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h4 className="ms-2 text-primary mb-4">Labels</h4>
                  <div
                    className="w-100 mt-2 mb-4"
                    style={{
                      borderBottom: "1.2px dotted #c9c7c7",
                    }}
                  ></div>
                  <div className="d-flex">
                    <div className="button-groups me-2">
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={toggleModalLabel}
                      >
                        <i className="fas fa-tag me-1" /> New Label
                      </button>
                    </div>
                    <div className="button-groups">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleRemove}
                        disabled={actionArray.length > 0 ? false : true}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <CardText className="mb-0">
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={activeData}
                      data={props.label_list_data?.label || []}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={activeData}
                          data={props.label_list_data?.label || []}
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
            </Col>
          </Row>
        </Container>
      </div>
      <NewLabelModal labelModal={state.labelModal} toggle={toggleModalLabel} />
      <LabelEditModal
        labelModalEdit={state.labelModalEdit}
        toggle={toggleModalLabelEdit}
        data={state.labelData}
      />
      <RemoveLabelModal
        data={actionArray}
        toggle={toggleModalLabelRemove}
        labelModalRemove={state.labelModalRemove}
        Id={state.deleteId}
        length={actionArray.length}
      />
    </React.Fragment>
  );
};

const mapStateToProps = gstate => {
  const { label_list_data, label_list_loading } = gstate.Portfolio;

  return { label_list_data, label_list_loading };
};

export default withRouter(
  connect(mapStateToProps, { companyDataForPortfolioLabel })(PortfolioLabels)
);
