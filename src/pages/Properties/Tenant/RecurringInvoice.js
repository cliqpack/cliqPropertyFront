import React, { useState } from 'react'
import {
    Card,
    Alert,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Container,
    Row,
    Label,
    Input,
    Button,
    CardHeader,
} from 'reactstrap';
import RecurringInvoiceModal from './RecurringInvoiceModal';
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

export default function RecurringInvoice({ data, setData }) {
    const [invoieModal, setInvoiceModal] = useState(false);

    console.log(data);


    const [actionArray, setActionArray] = useState([]);
    console.log(actionArray);
    const { SearchBar } = Search;

    const pageOptions = {
        sizePerPage: 10,
        totalSize: data?.length, // replace later with size(customers),
        custom: true,
    };

    let node;
    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    const taxRef = (cell, row) => <div className=''><i className={`${cell == 1 ? 'fas fa-check' : ''}`} /></div>
    const refDetail = (e, column, columnIndex, row, rowIndex) => {
        setActionArray(row);
        toggleInvoiceModal()
    }

    const activeData = [
        // {
        //     dataField: "id",
        //     text: "Id",
        //     sort: true,

        // },
        {
            dataField: "invoiceDetails",
            text: "Description",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "account_name",
            text: "Account",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => { refDetail(e, column, columnIndex, row, rowIndex); }
            },
        },
        {
            dataField: "taxCheckInvoice",
            text: "Tax",
            formatter: taxRef,
            sort: true,

        },
        {
            dataField: "totalInvoiceAmount",
            text: "Amount",
            sort: true,

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

    const toggleInvoiceModal = () => setInvoiceModal(prev => !prev)

    const deleteHandler = () => {
        const idsToRemove = actionArray.map(item => item.id)// Specify the IDs to remove
        console.log(idsToRemove);

        const sampleData = [...data]
        console.log(sampleData);
        // return
        const deleteData = sampleData.filter(item => !idsToRemove.includes(item.id));
        console.log(deleteData);
        setActionArray([])
        setData(deleteData)
    }

    return (
        <Card>
            <CardBody>
                <div>
                    <Button color='secondary' className='me-1' disabled={actionArray.length == 0 ? true : false} onClick={deleteHandler}><i className='fas fa-trash-alt me-1' />Delete</Button>
                    <Button color='secondary' onClick={toggleInvoiceModal}><i className='fas fa-edit me-1' />New</Button>
                </div>

                <CardText className="mb-0">
                    {data &&
                        <PaginationProvider
                            pagination={paginationFactory(pageOptions)}
                            keyField="id"
                            columns={activeData}
                            data={data}
                        >
                            {({ paginationProps, paginationTableProps }) => (
                                <ToolkitProvider
                                    keyField="id"
                                    columns={activeData}
                                    data={data}
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
                        </PaginationProvider>}
                </CardText>

                <div>
                    {invoieModal && <RecurringInvoiceModal status={invoieModal} toggle={toggleInvoiceModal} mainData={data} setData={setData} data={actionArray}
                        emptyDataHandler={() => setActionArray([])} />}
                </div>
            </CardBody>

        </Card>
    )
}
