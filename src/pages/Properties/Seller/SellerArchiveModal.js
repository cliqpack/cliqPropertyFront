import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import { sellerArchive, sellerArchiveFresh } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import { set } from "lodash";

const SellerArchiveModal = props => {
  const { id } = useParams();
  const currentDate = moment().format("YYYY-MM-DD");

  const [state, setState] = useState({ date: currentDate });

  const handleSave = e => {
    e.preventDefault();
    props.sellerArchive(props.id, props.propertyId, "0");
  };

  const handleClose = e => {
    e.preventDefault();
    props.toggle();
  };

  useEffect(() => {
    if (props.archive_seller_loading === "Success") {
      if (props.archive_seller_data?.staus == 0) {
        toastr.warning(props.archive_seller_data?.message);
      } else {
        toastr.success("Success");
      }
      props.sellerArchiveFresh();
      props.toggle();
    }
  }, [props.archive_seller_loading, props.archive_seller_data]);

  return (
    <>
      <Modal
        size="lg"
        isOpen={props.state.archiveModal}
        toggle={props.toggle}
        scrollable={true}
      >
        <ModalHeader toggle={props.toggle}>
          <span className="text-primary">
            Are you sure you want to archive the folio {props.folio_code} from
            all future transactions?
          </span>
        </ModalHeader>

        {/* <ModalBody>

                    <div>
                        This disbursement will not change the Next Disbursement Date for this owner. If required, check and amend the Next Disbursement Date for this owner after processing this manual disbursement.
                    </div>

                </ModalBody> */}
        <ModalFooter>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-info"
              onClick={handleClose}
            >
              Cancel
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
  const { archive_seller_data, archive_seller_error, archive_seller_loading } =
    gstate.AccountsTransactions;

  return {
    archive_seller_data,
    archive_seller_error,
    archive_seller_loading,
  };
};

export default connect(mapStateToProps, {
  sellerArchive,
  sellerArchiveFresh,
})(SellerArchiveModal);
