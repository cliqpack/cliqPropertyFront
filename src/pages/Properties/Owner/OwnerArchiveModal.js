import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import { ownerArchive, ownerArchiveFresh } from "store/actions";

import toastr from "toastr";
import { useHistory, useParams } from "react-router-dom";
import { set } from "lodash";

const OwnerArchiveModal = props => {
  const { id } = useParams();
  const currentDate = moment().format("YYYY-MM-DD");

  const [state, setState] = useState({ date: currentDate });

  const handleSave = e => {
    e.preventDefault();
    props.ownerArchive(props.id,'0');
  };

  const handleClose = e => {
    e.preventDefault();
    props.toggle();
  };

  useEffect(() => {
    if (props.archive_owner_loading === 'Success') {
        if (props.archive_owner_data?.staus == 0) {
            toastr.warning(props.archive_owner_data?.message);
        } else {
            toastr.success('Success');
        }
        props.ownerArchiveFresh();
        props.toggle();
    }
}, [props.archive_owner_loading, props.archive_owner_data]);

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
            Are you sure you want to archive the folio OWN00033 from all future
            transactions?
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
  const { archive_owner_loading, archive_owner_data } =
    gstate.AccountsTransactions;

  return {
    archive_owner_loading,
    archive_owner_data,
  };
};

export default connect(mapStateToProps, {
  ownerArchive,
  ownerArchiveFresh,
})(OwnerArchiveModal);
