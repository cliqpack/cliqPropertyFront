import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup, FormText
} from "reactstrap";
import { connect } from "react-redux";

import { } from 'store/actions';


import toastr from "toastr";
import { useHistory } from 'react-router-dom';
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

const Table = (props) => {
    const [actionArray, setActionArray] = useState([]);
    const { SearchBar } = Search;

    const pageOptions = {
        sizePerPage: 10,
        totalSize:
            [].length, // replace later with size(customers),
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

    return (
        <>
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

        </>

    )
}
const mapStateToProps = gstate => {
    const {

    } = gstate.property;



    return {

    };
};
export default connect(mapStateToProps, {

})(Table);


