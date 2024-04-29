import React, { useEffect } from 'react'
import { Modal, ModalBody } from 'reactstrap';
import './Loader.css';

function Loder(props) {
    useEffect(() => {

    }, []);

    return (
        <React.Fragment>
            <Modal
                isOpen={props.status}
                // role="dialog"
                // autoFocus={true}
                toggle={() => { }}
                centered={true}
                tabIndex="-1"
                size="small"
                style={{ border: "none", width: "5%" }}
            >
                <ModalBody>
                    <i
                        className="bx bx-loader bx-spin font-size-42 align-middle me-2"
                        style={{ zindex: 100, overflow: "hidden" }}
                    />
                </ModalBody>
            </Modal>
        </React.Fragment>

    )
}


export default Loder