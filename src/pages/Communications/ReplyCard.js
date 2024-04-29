import React from 'react'
import { Card, CardBody, Collapse } from 'reactstrap';
import parse from 'html-react-parser';
import { useState } from 'react';
import moment from 'moment';
import MailLogo from "../../assets/images/image.png";

function ReplyCard(props) {
    const [closeReply, setCloseReply] = useState(false);
    console.log(props)
    const handleReplyClose = () => {
        setCloseReply(!closeReply)
    }
    let x = JSON.parse(window.localStorage.getItem("authUser"));

    var authUser = JSON.parse(localStorage.getItem("authUser"));

    const email = authUser?.user?.email;
    return (


        <>
            <div
                style={{ border: "3px solid #b8b8b8", marginBottom: "15px", padding: "20px", marginTop: "30px", cursor: 'pointer', borderRadius: '25px' }}
                key={props.id} onClick={handleReplyClose}>
                <div >
                    {/* {closeReply == false &&
                    <div
                        color="primary"
                        id="toggler"
                        onClick={handleReplyClose}
                        style={{
                            marginBottom: '1rem',
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div>
                                <div className="avatar-sm me-2">
                                    <span className="avatar-title rounded-circle bg-light text-primary fa-2x">
                                        {authUser.user?.first_name.slice(0, 1)}

                                    </span>

                                </div>
                            </div>
                            <div>
                                <div>
                                    from:<span className='ms-1'>{props.item?.from}</span><br />
                                </div>

                                <div className='my-2'>
                                    to: <span className='ms-1'>{props.item?.to}</span><br />
                                </div>

                                <div className='d-flex'>
                                    <span>body:</span>
                                    <span className='ms-1 d-flex'>{parse(`${props.item?.body ? props.item?.body.slice(0, 15) + "......" : null}`)}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div>
                                    <span> {moment(props.item?.updated_at).format('MMMM Do YYYY')}</span> <br />
                                    <span> {moment(props.item?.updated_at).format('h:mm a')}</span>
                                </div>
                            </div>

                        </div>

                    </div>
                } */}

                    {/* <Collapse isOpen={closeReply} > */}
                    {/* <Card >
                        <CardBody>
                            {parse(`${props.item?.body}`)}
                        </CardBody>
                    </Card> */}
                    <div className=''>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                                From:
                            </p>
                            {props.from}
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                                Subject:
                            </p>
                            {props.item.subject}
                        </div>
                        <div
                            style={{ height: "70px", backgroundColor: "#159B9C" }}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <img
                                src={MailLogo}
                                height="60%"
                                width="130px"
                                style={{ marginLeft: "20px" }}
                            />
                        </div>
                        <div style={{ padding: "16px" }}>

                            <p>{parse(`${props.item.body}`)}</p>

                            <p>Many thanks,</p>
                            <p>
                                {x.user.first_name + " " + x.user.last_name} <br />
                                {props.item.to} <br />
                                {x.user.mobile_phone}
                            </p>
                        </div>
                        {/* <div
                            style={{
                                height: "70px",
                                // backgroundColor: "rgba(52,58,64,.25)",
                                backgroundColor: "#b8b8b8",
                            }}
                        ></div> */}
                    </div>
                    {/* </Collapse> */}
                    <div style={{ height: "30px" }}>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ReplyCard