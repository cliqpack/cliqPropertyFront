import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import {
  storeSingleDisbursementSeller,
  storeSingleDisbursementSellerFresh,
  transactionsListByIdForSellerFolio,
  SaleAgreementInfoForProperty,
} from "store/actions";

import toastr from "toastr";

const DisburseModal = props => {
  const currentDate = moment().format("YYYY-MM-DD");

  const [state, setState] = useState({
    date: currentDate,
    amount: props.folio.commission,
  });
  const [checker, setChecker] = useState(true);

  const handleSave = e => {
    e.preventDefault();
    props.storeSingleDisbursementSeller(
      checker,
      state,
      props.propertyId,
      props.folioId
    );
  };

  const handleClose = e => {
    e.preventDefault();
    props.toggle();
  };

  useEffect(() => {
    if (props.store_seller_disbursement_loading === "Success") {
      toastr.success("Disbursed");
      props.storeSingleDisbursementSellerFresh();
      props.transactionsListByIdForSellerFolio(
        "this_month",
        props.propertyId,
        props.seller_contact_id,
        props.folioId
      );
      props.SaleAgreementInfoForProperty(props.propertyId);
      props.toggle();
    }
  }, [props.store_seller_disbursement_loading]);

  console.log(props.store_seller_disbursement_loading);

  const checkHandler = e => {
    if (e.target.value) {
      setChecker(prev => !prev);
      setState({
        ...state,
        ["amount"]: 0.0,
      });
    }
  };
  const handleState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Modal
        isOpen={props.state.disburseModal}
        toggle={props.toggle}
        scrollable={true}
      >
        <ModalHeader toggle={props.toggle}>
          {/* <span className="text-primary">Are you sure you want to disburse Henry Rose (OWN00033) now?</span> */}
        </ModalHeader>

        <ModalBody>
          {/* <div>
                        This disbursement will not change the Next Disbursement Date for this owner. If required, check and amend the Next Disbursement Date for this owner after processing this manual disbursement.
                    </div> */}
          <span className="text-primary d-flex ">
            <input
              className="form-check-input mt-2"
              type="checkbox"
              id="taxCheck"
              name="taxCheck"
              onClick={e => checkHandler(e)}
              checked={checker ? true : false}
            />
            <span className="mt-1 p-1">Create commission bill</span>
            {checker && (
              <>
                <div className="d-flex flex-column">
                  <input
                    className="form-control"
                    name="amount"
                    id="amount"
                    type="text"
                    placeholder="0.00"
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    value={state.amount}
                    onChange={handleState}
                  />
                </div>
                <span className="input-group-append">
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
                <span className="mt-1 p-1">Tax inc</span>
              </>
            )}
          </span>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              <i className="fas fa-times me-1"></i>Cancel
            </button>
            <button
              type="submit"
              className="btn btn-info ms-2"
              onClick={handleSave}
            >
              Ok
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};
const mapStateToProps = gstate => {
  const { store_seller_disbursement_loading } = gstate.Disbursement;
  return {
    store_seller_disbursement_loading,
  };
};

export default connect(mapStateToProps, {
  storeSingleDisbursementSeller,
  storeSingleDisbursementSellerFresh,
  transactionsListByIdForSellerFolio,
  SaleAgreementInfoForProperty,
})(DisburseModal);
