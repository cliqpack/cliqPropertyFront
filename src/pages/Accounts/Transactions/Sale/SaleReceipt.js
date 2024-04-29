import Breadcrumbs from "components/Common/Breadcrumb";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  Input,
  ModalHeader,
  Label,
} from "reactstrap";
import Select from "react-select";
import SelectSearch from "common/Select-Search/SelectSearch";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import {
  sellerFolioList,
  sellerFolioListById,
  addSaleReceiptAction,
  getChartOfAccounts,
  addSaleReceiptActionFresh,
} from "store/actions";
import moment from "moment";
import toastr from "toastr";
import { useHistory } from "react-router-dom";

export default function SaleReceipt() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    seller_folio_list_data,
    seller_folio_list_data_loading,
    seller_folio_list_id_data,
    seller_folio_list_id_data_loading,
    add_sale_receipt_data_loading,
  } = useSelector(state => state.AccountsTransactions);
  const { chartAccount_list_data, chartAccount_list_loading } = useSelector(
    state => state.Portfolio
  );
  // console.log(chartAccount_list_data?.account);

  console.log(add_sale_receipt_data_loading);

  const [show, setShow] = useState(false);

  const [state, setState] = useState({
    sellerBtn: true,
    otherBtn: false,
    buyerBtn: false,
    cashBtn: true,
    chequeBtn: false,
    cardBtn: false,
    eftBtn: false,
    date: moment().format("DD MM YYYY"),
    chequeDetailsState: false,
    amount: 0
  });

  console.log(state.amount);
  const [select, setSelect] = useState({
    optionsFolio: [],
    selectedFolio: [],
    optionAccount: [],
    selectedAccount: [],
  });
  // console.log(select);

  useEffect(() => {
    if (add_sale_receipt_data_loading == "Success") {
      toastr.success("Success");
      dispatch(addSaleReceiptActionFresh());
      dispatch(sellerFolioList());
      history.push("/transactions");
    }

    if (add_sale_receipt_data_loading == "Failed") {
      toastr.error("Failed");
      dispatch(addSaleReceiptActionFresh());
    }

    if (chartAccount_list_loading == false) {
      dispatch(getChartOfAccounts());
    }
    if (seller_folio_list_data_loading == false) {
      dispatch(sellerFolioList());
    }

    let options = [];
    console.log(seller_folio_list_data?.data);
    if (seller_folio_list_data?.data) {
      options = seller_folio_list_data?.data.map(item => ({
        label: `${item.seller_contacts.reference} (${item.folio_code}) [${item.seller_contacts.property.reference}]`,
        value: item.id,
        property_id: item.seller_contacts.property.id,
      }));

      setSelect(prev => ({ ...prev, optionsFolio: options }));
    }
    let optionsAcc = [];
    if (seller_folio_list_data?.data) {
      optionsAcc = chartAccount_list_data?.account.map(item => ({
        label: item.account_name,
        value: item.id,
      }));

      setSelect(prev => ({ ...prev, optionAccount: optionsAcc }));
    }

    if (seller_folio_list_id_data?.data) {
      setState(prev => ({
        ...prev,
        sellerContact:
          seller_folio_list_id_data?.data?.seller_contacts?.reference,
        buyerContact:
          seller_folio_list_id_data?.data?.seller_contacts
            ?.property_sales_agreement?.buyer_contact?.reference,
      }));
    }

    function isEmptyObject(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          return true;
        }
      }
      return false;
    }

    if (isEmptyObject(select.selectedFolio)) {
      console.log(isEmptyObject(select.selectedFolio));
      setShow(true);
    } else {
      setShow(false);
    }
  }, [
    seller_folio_list_data_loading,
    seller_folio_list_data?.data,
    seller_folio_list_id_data?.data,
    chartAccount_list_loading,
    chartAccount_list_data?.account,
    select.selectedFolio,
    add_sale_receipt_data_loading,
  ]);

  const handlerSelectedFolio = e => {
    dispatch(sellerFolioListById(e.value));
    setSelect({ ...select, selectedFolio: e });
    setState(prev => ({ ...prev, property_id: e.property_id }));
  };
  const handlerSelectedAccount = e => {
    setSelect({ ...select, selectedAccount: e });
  };

  const toggleFromBtn = numb => {
    // setState(prev => ({ ...prev, fromBtn: !prev.fromBtn, otherBtn: !prev.otherBtn }))
    if (numb == "1") {
      setState(prev => ({
        ...prev,
        sellerBtn: true,
        buyerBtn: false,
        otherBtn: false,
      }));
    } else if (numb == "2") {
      setState(prev => ({
        ...prev,
        sellerBtn: false,
        buyerBtn: true,
        otherBtn: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        sellerBtn: false,
        buyerBtn: false,
        otherBtn: true,
      }));
    }
  };

  const dateHandler = (selectedDates, dateStr, instance) => {
    setState({ ...state, ["date"]: dateStr });
  };

  const toggleBtn = numb => {
    if (numb == "1") {
      setState(prev => ({
        ...prev,
        cashBtn: true,
        chequeBtn: false,
        cardBtn: false,
        eftBtn: false,
        chequeDetailsState: false,
      }));
    } else if (numb == "2") {
      setState(prev => ({
        ...prev,
        cashBtn: false,
        chequeBtn: true,
        cardBtn: false,
        eftBtn: false,
        chequeDetailsState: true,
      }));
    } else if (numb == "3") {
      setState(prev => ({
        ...prev,
        cashBtn: false,
        chequeBtn: false,
        cardBtn: true,
        eftBtn: false,
        chequeDetailsState: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        cashBtn: false,
        chequeBtn: false,
        cardBtn: false,
        eftBtn: true,
        chequeDetailsState: false,
      }));
    }
  };

  const handleState = e => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const stateHandler = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveHandler = () => {
    if (state.amount == 0) {
      toastr.warning('Amount should be greater than 0')
    } else if (state.description == null) {
      toastr.warning('Add description')

    } else {

      dispatch(addSaleReceiptAction(state, select));
    }
  };

  const handleChequeDetails = e => {
    setState(prev => {
      return {
        ...prev,
        chequeDetails: {
          ...prev.chequeDetails,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  const handleAmount = e => {
    setState(prev => {
      return {
        ...prev,
        [e.target.name]: Number(e.target.value) ? e.target.value : "",
      };
    });
  };

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Transactions" breadcrumbItem="Accounts" />

          <Card>
            <CardBody>
              <h4 className="fw-bold">New Sales Receipt</h4>
              <div style={{ borderBottom: "1.2px dotted #c9c7c7" }} />
              <Row>
                <Col md={10}>
                  <Row className="mt-4">
                    <Col md={8}>
                      <Row>
                        <Col md={2} className="d-flex align-items-top">
                          <span>To Folio</span>
                        </Col>
                        <Col md={10}>
                          {/* <Select
                                                value={selectedType}
                                                onChange={handleSelectType}
                                                options={optionGroupType}
                                                classNamePrefix="select2-selection"
                                                placeholder='Type'
                                            /> */}
                          <SelectSearch
                            value={select.selectedFolio}
                            handler={handlerSelectedFolio}
                            options={select.optionsFolio}
                          />
                        </Col>
                      </Row>

                      {show && (
                        <>
                          <Row>
                            <Col md={2} className="d-flex align-items-top">
                              From
                            </Col>
                            <Col md={8}>
                              <div className="btn-group btn-group-justified">
                                <div className="btn-group">
                                  <Button
                                    color={
                                      state.sellerBtn ? "secondary" : "light"
                                    }
                                    onClick={() => toggleFromBtn("1")}
                                  >
                                    {state.sellerBtn ? (
                                      <i className="bx bx-comment-check"></i>
                                    ) : null}
                                    <span> Seller</span>
                                  </Button>
                                </div>
                                {state.buyerContact && (
                                  <div className="btn-group">
                                    <Button
                                      color={
                                        state.buyerBtn ? "secondary" : "light"
                                      }
                                      onClick={() => toggleFromBtn("2")}
                                    >
                                      {state.buyerBtn ? (
                                        <i className="bx bx-comment-check"></i>
                                      ) : null}
                                      <span> Buyer</span>
                                    </Button>
                                  </div>
                                )}
                                <div className="btn-group">
                                  <Button
                                    color={
                                      state.otherBtn ? "secondary" : "light"
                                    }
                                    onClick={() => toggleFromBtn("3")}
                                  >
                                    {state.otherBtn ? (
                                      <i className="bx bx-comment-check"></i>
                                    ) : null}
                                    <span> Other</span>
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row className="mt-3">
                            <Col
                              md={2}
                              className="d-flex align-items-top"
                            ></Col>
                            <Col md={10}>
                              <div>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="moneyPaid"
                                  value={
                                    state.sellerBtn && state.sellerContact
                                      ? state.sellerContact
                                      : state.buyerBtn && state.buyerContact
                                        ? state.buyerContact
                                        : state.moneyPaid
                                  }
                                  placeholder="Who paid this money"
                                  disabled={
                                    state.otherBtn == true ? false : true
                                  }
                                  onChange={stateHandler}
                                />
                              </div>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Col>

                    {show && (
                      <Col md={4}>
                        <Row className="mb-3">
                          <Col md={4}>Amount</Col>
                          <Col md={8}>
                            <div className="d-flex">
                              <input
                                className="form-control rounded-start"
                                style={{
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                }}
                                type="text"
                                name="amount"
                                value={state.amount}
                                placeholder="0.00৳"
                                onChange={stateHandler}
                              />
                              <span className="input-group-append rounded-end">
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
                            </div>
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col md={4}>Date</Col>
                          <Col md={8}>
                            <div>
                              {/* <input
                                                            className="form-control"
                                                            type="text"
                                                            name="account_name"
                                                            //   value={state.account_name}
                                                            placeholder="$0.00"

                                                        //   onChange={stateHandler}
                                                        /> */}
                              <Flatpickr
                                className="form-control"
                                placeholder="Pick a date..."
                                value={state.date}
                                options={{
                                  altInput: true,
                                  format: "d/m/Y",
                                  altFormat: "d/m/Y",
                                  onChange: dateHandler,
                                }}
                              />
                            </div>
                          </Col>
                        </Row>

                        <div className="btn-group btn-group-justified">
                          <div className="btn-group">
                            <Button
                              color={state.cashBtn ? "secondary" : "light"}
                              onClick={() => toggleBtn("1")}
                            >
                              {state.cashBtn ? (
                                <i className="bx bx-comment-check"></i>
                              ) : null}
                              <span> Cash</span>
                            </Button>
                          </div>
                          <div className="btn-group">
                            <Button
                              color={state.chequeBtn ? "secondary" : "light"}
                              onClick={() => toggleBtn("2")}
                            >
                              {state.chequeBtn ? (
                                <i className="bx bx-comment-check"></i>
                              ) : null}
                              <span> Check</span>
                            </Button>
                          </div>
                          <div className="btn-group">
                            <Button
                              color={state.cardBtn ? "secondary" : "light"}
                              onClick={() => toggleBtn("3")}
                            >
                              {state.cardBtn ? (
                                <i className="bx bx-comment-check"></i>
                              ) : null}
                              <span> Card</span>
                            </Button>
                          </div>
                          <div className="btn-group">
                            <Button
                              color={state.eftBtn ? "secondary" : "light"}
                              onClick={() => toggleBtn("4")}
                            >
                              {state.eftBtn ? (
                                <i className="bx bx-comment-check"></i>
                              ) : null}
                              <span> EFT</span>
                            </Button>
                          </div>
                        </div>
                      </Col>
                    )}
                  </Row>

                  <div className="py-5 mt-5">
                    {state.chequeDetailsState ? (
                      <>
                        <ModalHeader>
                          <span className="text-primary">Cheque Details</span>
                        </ModalHeader>

                        <div className="table-responsive">
                          <Table className="table mb-0">
                            <thead>
                              <tr>
                                <th>Drawer</th>
                                <th style={{ width: "250px" }}>Bank</th>
                                <th>Branch</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-InputCity"
                                    placeholder="Drawer"
                                    name="drawer"
                                    onChange={handleChequeDetails}
                                  />
                                </td>
                                <td>
                                  <div className="w-75">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="formrow-InputCity"
                                      placeholder="Bank"
                                      name="bank"
                                      onChange={handleChequeDetails}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-InputCity"
                                    placeholder="Branch"
                                    name="branch"
                                    onChange={handleChequeDetails}
                                  />
                                </td>
                                <td>
                                  <div className="">
                                    {/* <Label htmlFor="formrow-InputCity">Amount</Label> */}
                                    {/* <Input
                                                type="text"
                                                className="form-control"
                                                id="formrow-InputCity"
                                                placeholder="$0.00"
                                                name="amount"
                                                value={state.amount}
                                                onChange={handleState}
                                            /> */}
                                    <div className="d-flex">
                                      <div className="d-flex flex-column">
                                        <Input
                                          name="amount"
                                          type="text"
                                          placeholder="0.00"
                                          className="form-control rounded-start"
                                          style={{
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                          }}
                                          id="formrow-InputCity"
                                          value={state.amount}
                                          onChange={handleAmount}
                                        />
                                      </div>
                                      <span className="rounded-end input-group-append">
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
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    {show && (
                      <>
                        <div className="">
                          <Table className="table mb-0">
                            <thead>
                              <tr>
                                <th>Allocate</th>
                                <th style={{ width: "250px" }}>Account</th>
                                <th>Description</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Deposit</td>
                                <td>
                                  <div className="">
                                    <SelectSearch
                                      value={select.selectedAccount}
                                      handler={handlerSelectedAccount}
                                      options={select.optionAccount}
                                      placeholder={"Select account"}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="w-75">
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="description"
                                      value={state.description}
                                      placeholder="Description"
                                      onChange={stateHandler}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex w-100">
                                    <input
                                      type="text"
                                      name="amount"
                                      value={state.amount}
                                      className="form-control rounded-start"
                                      style={{
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                      }}
                                      placeholder="0.00৳"
                                      onChange={stateHandler}
                                    />
                                    <span className="input-group-append rounded-end">
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
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>

                        <Row className="mt-3">
                          <Col md={3}>
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="defaultCheck1"
                                name="taxCheckInvoice"
                                onClick={() =>
                                  setState(prev => ({
                                    ...prev,
                                    noteState: !prev.noteState,
                                  }))
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="defaultCheck1"
                              >
                                Add note
                              </label>
                            </div>
                          </Col>
                          <Col md={6}>
                            {state.noteState ? (
                              <Input
                                type="text"
                                className="form-control"
                                id="formrow-InputCity"
                                name="note"
                                onChange={handleState}
                              />
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>
                      </>
                    )}
                  </div>
                </Col>

                <Col md={2}></Col>
              </Row>

              <div className="w-100 d-flex justify-content-end">
                {show && (
                  <Button color="info" onClick={saveHandler}>
                    Save
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
}
