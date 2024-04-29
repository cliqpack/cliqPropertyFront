// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import {
//     Card,
//     Alert,
//     CardBody,
//     CardTitle,
//     Col,
//     Container,
//     Row,
//     CardText,
//     Nav,
//     NavItem,
//     NavLink,
//     TabContent,
//     TabPane,
//     Label,
//     Input,
//     Button,
//     CardHeader,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Form,
//     FormGroup,
//     FormText,
// } from "reactstrap";
// import { connect } from "react-redux";
// import Select from "react-select";
// import toastr from "toastr";
// import { Link, useHistory, withRouter } from "react-router-dom";
// import { invoiceChartList, propertyList, addBillsWithTenantInvoice, addBillsWithTenantInvoiceFresh, supplierList, invoiceTenant, tenancyList,
//     invoiceDueList,futureInvoiceBillList,paidInvoiceBillList } from "store/actions";



// const AddInvoiceModal = props => {
//     const [showModal, setShowModal] = useState(false);
//     const toggle = () => setShowModal(prev => !prev);

//     const date = moment().format("yyyy-MM-DD");

//     const [state, setState] = useState({ invoiceDate: date, });
//     console.log(state);

    

//     const toggleIncludeBtn = () => {
//         supplierToggle();
//         setIncludeBtn(true);
//         setExcludeBtn(false);
//     };

//     const toggleExcludeBtn = () => {
//         supplierToggle();
//         setExcludeBtn(true);
//         setIncludeBtn(false);
//     };

//     const handleChange = async (e) => {
//         setFile(e.target.files[0])
//     }

//     const handleModalClose = e => {
//         e.preventDefault();
//         toggle();
//     }

//     const handleSave = e => {
//         e.preventDefault();
//         props.addBillsWithTenantInvoice(state, file);
//         setState({});
//         setShowModal(false);
//     }

//     useEffect(() => {
//         if (props.add_bills_tenant_invoice_loading === 'Success') {
//             toastr.success("Success");
//             props.addBillsWithTenantInvoiceFresh();
//             props.invoiceDueList();props.futureInvoiceBillList();props.paidInvoiceBillList();
//         }
//         if (props.property_list_loading === false) {
//             props.propertyList();
//         }
//         let option;
//         if (props.property_list_data?.data) {
//             option = props.property_list_data?.data.map(item => ({
//                 label: item.reference, value: item.id,
//             }));
//             setOptionGroupProperty(option);
//         }
//         if (props.invoice_chart_list_loading === false) {
//             props.invoiceChartList();
//         }
//         let optionChart;
//         if (props.invoice_chart_list_data) {
//             optionChart = props.invoice_chart_list_data?.data.map(item => ({
//                 label: item.account_name, value: item.id,
//             }));
//             setOptionGroupInvoiceChart(optionChart);
//         }
//         if (props.supplier_list_loading === false) {
//             props.supplierList();
//         }
//         let optionSupplier
//         if (props.supplier_list_data?.data) {
//             optionSupplier = props.supplier_list_data?.data.map(item => ({
//                 label: item.reference, value: item.id,
//             }));
//             setOptionGroupSupplier(optionSupplier);
//         }
//         if (props.invoice_tenant_data_loading === false) {
//             props.invoiceTenant();
//         }
//         if (state.property_Id) {

//             props.tenancyList(state.property_Id);

//             setState({ ...state, tenancy: props.tenancy_list_data?.data?.id })
//         }

//     }, [props.invoice_chart_list_loading, props.property_list_data, props.supplier_list_loading, props.invoice_tenant_data_loading, props.tenancy_list_loading, state.property_Id, props.tenancy_list_data?.id]);

//     // console.log(props.tenancy_list_data?.data, props.tenancy_list_loading);
//     console.log(props.add_bills_tenant_invoice_loading);

//     return (
//         <>
//             <button type="button" className="btn btn-info" onClick={toggle}>
//                 Add Invoice
//             </button>

//             <Modal isOpen={showModal} toggle={toggle} scrollable={true}>
//                 <ModalHeader toggle={toggle}>
//                     <i className="fas fa-dollar-sign font-size-16 me-1 text-primary"></i>
//                     <span className="text-primary">New Invoice</span>
//                 </ModalHeader>

//                 <ModalBody>

//                     <Card>
//                         <CardBody>
//                             <Row>
//                                 <Col>
//                                     <div className="mb-3">
//                                         <Input
//                                             className="form-control form-control-sm"
//                                             type="file"
//                                             id="formFile"
//                                             onChange={handleChange}
//                                             multiple='false'
//                                         />
//                                     </div>
//                                     <Row className="mb-3 d-flex align-items-center">
//                                         <Col md={4}>
//                                             <Label>
//                                                 From
//                                             </Label>
//                                         </Col>
//                                         <Col md={6}>
//                                             <div className="btn-group btn-group-justified">
//                                                 <div className="btn-group">
//                                                     <Button
//                                                         color={
//                                                             includeBtn
//                                                                 ? "secondary"
//                                                                 : "light"
//                                                         }
//                                                         onClick={
//                                                             toggleIncludeBtn
//                                                         }
//                                                         className='btn w-md'
//                                                     >
//                                                         {includeBtn ? (
//                                                             <i className="bx bx-comment-check"></i>
//                                                         ) : null}
//                                                         <span>
//                                                             {" "}
//                                                             Owner
//                                                         </span>
//                                                     </Button>
//                                                 </div>

//                                                 <div className="btn-group">
//                                                     <Button
//                                                         color={
//                                                             excludeBtn
//                                                                 ? "secondary"
//                                                                 : "light"
//                                                         }
//                                                         onClick={
//                                                             toggleExcludeBtn
//                                                         }
//                                                         className='btn w-md'
//                                                     >
//                                                         {excludeBtn ? (
//                                                             <i className="bx bx-comment-check"></i>
//                                                         ) : null}
//                                                         <span>
//                                                             {" "}
//                                                             Supplier
//                                                         </span>
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </Col>
//                                     </Row>
//                                     <div className="mb-3 row">
//                                         <div className="col-md-12">
//                                             <input
//                                                 className="form-control"
//                                                 type="date"
//                                                 value={state.invoiceDate}
//                                                 id="example-date-input"
//                                                 name="invoiceDate"
//                                                 onChange={handleState}
//                                             />
//                                         </div>
//                                     </div>
//                                     {showSupplier &&
//                                         <div className="mb-3 select2-container">
//                                             <Select
//                                                 value={selectedSupplier}
//                                                 onChange={handleSelectSupplier}
//                                                 options={optionGroupSupplier}
//                                                 classNamePrefix="select2-selection"
//                                                 placeholder='Supplier'
//                                             />
//                                         </div>}
//                                     <div className="mb-3 select2-container">
//                                         <Select
//                                             value={selectedInvoiceChart}
//                                             onChange={handleSelectInvoiceChart}
//                                             options={optionGroupInvoiceChart}
//                                             classNamePrefix="select2-selection"
//                                             placeholder='Invoice Chart Account'
//                                         />
//                                     </div>
//                                     <div className="mb-3 select2-container">
//                                         <Select
//                                             value={selectedProperty}
//                                             onChange={handleSelectProperty}
//                                             options={optionGroupProperty}
//                                             classNamePrefix="select2-selection"
//                                             placeholder='Property'
//                                         />
//                                     </div>
//                                     <div className="mb-3 row">
//                                         <div className="col-md-12">
//                                             <input
//                                                 className="form-control"
//                                                 type="text"
//                                                 placeholder="Details"
//                                                 name="invoiceDetails"
//                                                 onChange={handleState}
//                                             />
//                                         </div>
//                                     </div>
//                                     <h4 className="card-title">Total invoice amount</h4>
//                                     <Row className="d-flex align-items-center">
//                                         <Col md={6}>
//                                             <div className="mb-3 row">
//                                                 <div className="col-md-12">

//                                                     <input
//                                                         className="form-control"
//                                                         type="text"
//                                                         placeholder="$0.00"
//                                                         name="totalInvoiceAmount"
//                                                         onChange={handleState}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </Col>
//                                         <Col md={6} >
//                                             <div className="form-check mb-3">
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     value={invoiceChecker === true ? 0 : 1}
//                                                     id="defaultCheck1"
//                                                     name="taxCheckInvoice"
//                                                     onClick={e => checkHandlerInvoice(e)}
//                                                 />
//                                                 <label
//                                                     className="form-check-label"
//                                                     htmlFor="defaultCheck1"
//                                                 >
//                                                     Tax inc
//                                                 </label>
//                                             </div>
//                                         </Col>
//                                     </Row>

//                                 </Col>
//                             </Row>
//                         </CardBody>
//                     </Card>

//                 </ModalBody>
//                 <ModalFooter>
//                     <div className="d-flex justify-content-end">
//                         <button
//                             type="submit"
//                             className="btn btn-info me-2"
//                             onClick={handleModalClose}>Close</button>
//                         <button
//                             type="submit"
//                             className="btn btn-info"
//                             onClick={handleSave}
//                         >
//                             <i className="fas fa-file-alt me-1"></i> Save
//                         </button>
//                     </div>

//                 </ModalFooter>
//             </Modal>



//         </>
//     );
// };

// const mapStateToProps = gstate => {
//     const {
//         property_list_data,
//         property_list_loading,


//     } = gstate.property;

//     const {
//         invoice_chart_list_data,
//         invoice_chart_list_loading,

//         add_bills_tenant_invoice_loading,

//         supplier_list_data,
//         supplier_list_loading,

//         invoice_tenant_data,
//         invoice_tenant_data_loading,

//         tenancy_list_data,
//         tenancy_list_loading

//     } = gstate.Bills;

//     return {
//         invoice_chart_list_data,
//         invoice_chart_list_loading,

//         property_list_data,
//         property_list_loading,

//         add_bills_tenant_invoice_loading,

//         supplier_list_data,
//         supplier_list_loading,

//         invoice_tenant_data,
//         invoice_tenant_data_loading,

//         tenancy_list_data,
//         tenancy_list_loading
//     };
// };

// export default withRouter(connect(mapStateToProps, {
//     invoiceChartList, propertyList, addBillsWithTenantInvoice, addBillsWithTenantInvoiceFresh, supplierList, invoiceTenant, tenancyList,
//     invoiceDueList,futureInvoiceBillList,paidInvoiceBillList 
// })(AddInvoiceModal));
