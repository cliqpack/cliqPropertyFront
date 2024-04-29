import React, { Fragment } from "react";
import MailLogo from '../../../assets/images/mail_realty_me_logo.png';

const ViewOriginalTemplateData = (props) => {

    var authUser = JSON.parse(localStorage.getItem("authUser"));

    return (
        <Fragment>
            <div style={{ backgroundColor: '#f7f7f7', padding: '20px', paddingTop: '50px' }}>
                <div style={{ width: '70%', margin: 'auto', backgroundColor: '#fff', maxHeight: '600px' }}>
                    <div style={{ height: '70px', backgroundColor: '#14cdeb' }} className="d-flex justify-content-end pr-3 pt-2">
                        <img src={MailLogo} height="90%" width="170px" />
                    </div>
                    <div style={{ padding: '16px' }}>
                        <p>Dear Concern,</p>
                        {/* <p>The job number for your recent request is #{props.data.maintenance_id}.</p> */}
                        <p>Please note that the job needs to go through our regular approval process before being allocated to a tradesman. The owner may also ask us to arrange a number of quotes. Please keep an eye on your inbox for updates.</p>
                        <p>If you have any questions or further updates on this job please let us know.</p>
                        <p>Many thanks,</p>
                        <p>
                            {authUser.user.first_name + ' ' + authUser.user.last_name} <br />
                            Mytown Properties <br />
                            9999 3333 <br />
                            {authUser.user.email} <br />
                            www.mytown.com <br />
                        </p>
                    </div>
                    <div style={{ height: '70px', backgroundColor: '#466ea0' }}></div>
                </div>
            </div>
        </Fragment>
    );
};

export default ViewOriginalTemplateData;