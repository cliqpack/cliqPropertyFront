import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { Button } from "reactstrap";
import {
    addComment,
    addCommentFresh, getMessageProperties, getUserForMention, getMessageContacts, getMessageInspection, getMessageJob,
    getMessageListing, getMessageTask, getMessageMail,
} from "store/actions";
import {
    Link,
    useHistory,
    useLocation,
    useParams,
    withRouter,
} from "react-router-dom";
import { connect } from "react-redux";

import { Mention, MentionsInput } from "react-mentions";
import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";
import toastr from "toastr";
import "../Properties/property.css"


const users = [
    {
        id: "1",
        display: "Jack",
    },
    {
        id: "2",
        display: "John",
    },
];

const Comment = (props) => {
    const [init, setInit] = useState(true)
    const [value, setValue] = useState("");
    const [id, setId] = useState([]);
    console.log(value);

    useEffect(() => {
        if (init) {
            props.getUserForMention();
            setInit(false)
        }
        if (props.add_message_data_loading === "Success") {
            toastr.success("Comment Added Successfully");
            props.addCommentFresh();
            setValue(); setId();
            props.msgToggle();
            if (props.prop_Id) {
                props.getMessageProperties(props.prop_Id);
            }
            if (props.contact_id) {
                props.getMessageContacts(props.contact_id);
            }
            if (props.inspec_id) {
                props.getMessageInspection(props.inspec_id)
            }
            if (props.job_id) {
                props.getMessageJob(props.job_id);
            }
            if (props.listing_id) {
                props.getMessageListing(props.listing_id)
            }
            if (props.task_id) {
                props.getMessageTask(props.task_id);

            }
            if (props.mail_id) {
                props.getMessageMail(props.mail_id);

            }
        }
    }, [props.add_message_data_loading])

    const onChange = (e) => {
        // console.log("onChange", e.target.value);
        setValue(e.target.value);

    };
    const onAdd = (id, e) => {
        console.log("onAdd", id, e);
        // props.setMessage({ ...props.message, id: id })
        setId(prev => [...prev, id])

    };
    const messageHandler = (e) => {
        console.log(value, id);
        props.addComment(value, id, props.prop_Id, props.contact_id, props.task_id, props.inspec_id, props.listing_id, props.job_id, props.mail_id)
    }

    const fetchUsers = (query, callback) => {
        if (!query) return;

        setTimeout(() => {
            const filteredUsers = props.data.filter((user) =>
                user.display.toLowerCase().includes(query)
            );
            callback(filteredUsers);
        }, 2000);
    };


    return (
        <div className="form-group mt-0 pt-0 mb-3" style={{ width: "100%", borderRadius: "8px" }}>


            {props.user_list_mention?.data?.data?.length > 0 ?
                <div className="single-line">
                    {/* <h3>Single line input</h3> */}

                    <MentionsInput
                        // singleLine
                        value={value}
                        onChange={onChange}
                        placeholder={"Add a comment  @"}
                        a11ySuggestionsListLabel={"Suggested mentions"}
                        style={defaultStyle}
                    // className="form-control-new"
                    >
                        <Mention data={props.user_list_mention?.data?.data} onAdd={onAdd} style={defaultMentionStyle} />
                    </MentionsInput>
                    {/* <label htmlFor="usr">Add a comment</label> */}
                </div> :
                <>
                    <span className="placeholder col-12 placeholder-lg bg-secondary"></span>
                    <span className="placeholder col-12 placeholder-lg bg-secondary"></span>
                </>

            }
            {props.user_list_mention?.data?.data?.length > 0 ?

                <div className="d-flex justify-content-end mt-3">
                    <div>
                        <Button onClick={e => { props.msgToggle(); setValue(); setId() }} color='danger'>
                            Cancel
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={messageHandler}
                            color='buttonColor'
                            className="ms-1"
                        >
                            Save
                        </Button>
                    </div>
                </div> :
                <>
                    <span className="placeholder col-12 placeholder-lg bg-secondary"></span>
                    <span className="placeholder col-12 placeholder-lg bg-secondary"></span>
                </>
            }
        </div>
    );
};

const mapStateToProps = gstate => {



    const {
        add_message_data_loading
    } = gstate.Activity;
    const {
        user_list_mention
    } = gstate.property;
    return {
        add_message_data_loading, user_list_mention
    };
};

export default withRouter(
    connect(mapStateToProps, {
        addComment,
        addCommentFresh, getMessageProperties, getUserForMention, getMessageContacts, getMessageInspection, getMessageJob,
        getMessageListing, getMessageTask, getMessageMail
    })(Comment)
);