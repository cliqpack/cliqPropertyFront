import moment from 'moment';
import React, { useEffect, useState, useMemo } from 'react';
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
import {
    Link,
    useHistory,
    useLocation,
    useParams,
    withRouter,
} from "react-router-dom";



import toastr from "toastr";
import MailTemplateModal from 'pages/Activity/Template/MailTemplateModal';
import SMSTemplateModal from 'pages/Activity/Template/SMSTemplateModal';
// import MailTemplateModal from 'pages/Jobs/Activity/MailTemplateModal';

const ShowActivityData = (props) => {
    console.log(props.data);
    const history = useHistory();

    const [modalState, setModalState] = useState(false);

    const tog_large = () => {
        setModalState(prevState => !prevState);
    };

    const [smsTemplate, setSMSTemplate] = useState(false);

    const toggleSMSTemplate = () => {
        setSMSTemplate(prev => !prev)
    }

    var authUserData = JSON.parse(localStorage.getItem("authUser"));

    const linkHandler = () => {
        if (props.data.maintenance_id) {
            history.push(`/maintenanceInfo/${props.data.maintenance_id}`)
        }
        if (props.data.inspection_id) {
            history.push(`/inspectionInfo/${props.data.inspection_id}`)
        }
        if (props.data.task_id) {
            console.log(props.data.task_id);

            history.push(`/task/show/${props.data.task_id}`)
        }
        if (props.data.listing_id) {
            history.push(`/listingInfo/${props.data.listing_id}`)
        }
    }



    return (

        <div>


            {props.data.type != 'email' &&
                <div
                    className="py-2 d-flex"
                    style={{
                        borderBottom: "1.2px dotted #c9c7c7",
                        alignItems: "center", justifyContent: "center"
                    }}
                >
                    <div className="d-flex justify-content-center" style={{ marginRight: "15px" }}>
                        <div className="avatar-sm me-1" style={{ marginBottom: "2px" }}>
                            <span className="avatar-title square-circle bg-light text-primary font-size-18">
                                {authUserData.user?.first_name.slice(0, 1)}{authUserData.user?.last_name.slice(0, 1)}
                            </span>
                        </div>
                    </div>
                    {/* <div style={{
                    borderBottom: "1.2px dotted #c9c7c7",
                }}></div> */}
                    <div
                        className="w-100"

                    >
                        <div className='ps-2 d-flex flex-column justify-content-end'>
                            <div
                                // className="d-flex flex-column justify-content-between" 
                                className={`d-flex ${props.component == 'Dashboard' ? 'flex-column justify-content-end' : 'justify-content-between'} `}
                                style={{ cursor: 'pointer' }}>
                                <div className='' onClick={() => linkHandler()}>

                                    <span >
                                        {props.data.maintenance && <i className="fas fa-wrench"></i>}
                                        {props.data.task && <i className="fas fa-clipboard-list"></i>}
                                        {props.data.inspection && <i className="far fa-clipboard"></i>}
                                        {props.data.listing && <i className="far fas fa-list"></i>}
                                    </span>

                                    <span className="font-size-13 text-dark">
                                        {" "}

                                        {props.data?.inspection?.summery && <span style={{ fontWeight: "bold" }}> {props.data?.inspection?.summery && props.data?.inspection?.summery}</span>}
                                        {props.data?.inspection?.start_time && <span className='ms-2'>
                                            {props.data?.inspection?.start_time ? `Scheduled for ${moment(props.data?.inspection?.start_time, "HH:mm:ss").format('LT')} ` : ""} {props.data?.inspection?.start_time && <i className='far fa-clock' />}
                                        </span>}
                                        {props.data?.maintenance?.summary && props.data?.maintenance?.summary}
                                        {props.data?.task?.summary && props.data?.task?.summary}
                                        {props.data?.listing?.summary && props.data?.listing?.summary}
                                        {/* <span className='mx-1'>{props.data?.inspection?.start_time ? '' : props.data.status || ''}</span> */}
                                    </span>
                                </div>


                                <div className={`${props.component == 'Dashboard' &&
                                    'd-flex justify-content-end align-items-center py-2'} `}>
                                    <i className='far fa-calendar me-1' />
                                    {/* {moment(props.data?.created_at && props.data?.created_at).format('DD/MM/yyyy')} */}
                                    {moment(props.data?.created_at && props.data?.created_at).format('DD/MM/yyyy, h:mm a')}
                                </div>



                            </div>
                            <div className="py-1">
                                <span className="font-size-13">
                                    <span className='mx-1'>{props.data.status || ''}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>}



            {
                props.data.property_activity_email?.map((item, i) => {
                    return item.type == 'email' &&
                        <MailTemplateModal key={item.id} data={item} modalState={modalState} setModalState={setModalState} tog_large={tog_large} mainData={props.data} message={props.data.message} />
                })
            }

            {
                props.data.property_activity_email?.map((item, i) => {
                    return item.type == 'sms' &&
                        <SMSTemplateModal show={smsTemplate} toggle={toggleSMSTemplate} key={item.id} data={item} mainData={props.data} />
                })
            }


        </div >

    )
}
const mapStateToProps = gstate => {

    const {

    } = gstate.Listing;

    return {

    };
};

export default connect(mapStateToProps, {

})(ShowActivityData);


// export default React.memo(ShowActivityData);
