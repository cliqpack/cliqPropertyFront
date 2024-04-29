import React, { useEffect, useRef, useState } from "react";
import {
    Card,
    CardBody,
    Col,
    Row,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Label,

    Form,
    Input,
    InputGroup,
} from "reactstrap";
import classnames from "classnames";
import Switch from "react-switch"
import Dropzone from "react-dropzone"
import {
    Link,
    useHistory,
    useLocation,
    useParams,

    withRouter,
} from "react-router-dom";
import { connect } from "react-redux";


const LoungeRoom=(props)=>{
  

    const buttonHandler=(e)=>{
       setState({...state,[e.currentTarget.name]:e.currentTarget.value})
    }

    

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
      }

    const handleAcceptedFiles = files => {
        // console.log(files);
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )

        props.setForm1State({ ...props.form1state, selectedFiles: files })
    }



    return (
        <React.Fragment>
        <Form onSubmit={props.submitHandler}>
            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-form-label"
                >
                    walls/picture hooks
                </Label>
                <Col sm={6}>

                    <Row>
                        <Col>
                            Clean <br />
                            <button
                                name='walls-clean'
                                type="button"
                                value='clean'
                                className="btn btn-info btn-group-sm"
                                onClick={props.buttonHandler}
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                name='walls-clean'
                                type="button"
                                value='!clean'
                                className="btn btn-danger btn-group-sm"
                                onClick={props.buttonHandler}
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Undamaged <br />
                            <button
                                name='walls-undamaged'
                                value='undamaged'
                                onClick={props.buttonHandler}

                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                name='walls-undamaged'
                                value='!undamaged'
                                onClick={props.buttonHandler}

                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Working <br />
                            <button
                                name='walls-working'
                                value='working'
                                onClick={props.buttonHandler}
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                name='walls-working'
                                value='!working'
                                onClick={props.buttonHandler}
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                    </Row>

                </Col>

                <Col sm={6}>
                    <Input
                        name="walls-comment"
                        type="textarea"
                        onChange={props.buttonHandler}
                        className="form-control"
                        id="horizontal-password-Input"
                        placeholder="Agent comment"
                    />
                </Col>

            </div>


            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-form-label"
                >
                    doorway frames
                </Label>
                <Col sm={6}>

                    <Row>
                        <Col>
                            Clean <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Undamaged <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Working <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                    </Row>

                </Col>

                <Col sm={6}>
                    <Input
                        type="textarea"
                        className="form-control"
                        id="horizontal-password-Input"
                        placeholder="Agent comment"
                    />
                </Col>

            </div>



            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-form-label"
                >
                    windows/screens/window safety devices
                </Label>
                <Col sm={6}>

                    <Row>
                        <Col>
                            Clean <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Undamaged <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Working <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                    </Row>

                </Col>

                <Col sm={6}>
                    <Input
                        type="textarea"
                        className="form-control"
                        id="horizontal-password-Input"
                        placeholder="Agent comment"
                    />
                </Col>

            </div>


            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-form-label"
                >
                    ceiling/light fittings
                </Label>
                <Col sm={6}>

                    <Row>
                        <Col>
                            Clean <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Undamaged <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Working <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                    </Row>

                </Col>

                <Col sm={6}>
                    <Input
                        type="textarea"
                        className="form-control"
                        id="horizontal-password-Input"
                        placeholder="Agent comment"
                    />
                </Col>

            </div>


            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-form-label"
                >
                    blinds/curtains
                </Label>
                <Col sm={6}>

                    <Row>
                        <Col>
                            Clean <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Undamaged <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Working <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                    </Row>

                </Col>

                <Col sm={6}>
                    <Input
                        type="textarea"
                        className="form-control"
                        id="horizontal-password-Input"
                        placeholder="Agent comment"
                    />
                </Col>

            </div>


            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-form-label"
                >
                    lights/power points/door bell
                </Label>
                <Col sm={6}>

                    <Row>
                        <Col>
                            Clean <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Undamaged <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Working <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                    </Row>

                </Col>

                <Col sm={6}>
                    <Input
                        type="textarea"
                        className="form-control"
                        id="horizontal-password-Input"
                        placeholder="Agent comment"
                    />
                </Col>

            </div>


            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-form-label"
                >
                    skirting boards

                </Label>
                <Col sm={6}>

                    <Row>
                        <Col>
                            Clean <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Undamaged <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Working <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                    </Row>

                </Col>

                <Col sm={6}>
                    <Input
                        type="textarea"
                        className="form-control"
                        id="horizontal-password-Input"
                        placeholder="Agent comment"
                    />
                </Col>

            </div>

            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-form-label"
                >
                    floor coverings
                </Label>
                <Col sm={6}>

                    <Row>
                        <Col>
                            Clean <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Undamaged <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Working <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                    </Row>

                </Col>

                <Col sm={6}>
                    <Input
                        type="textarea"
                        className="form-control"
                        id="horizontal-password-Input"
                        placeholder="Agent comment"
                    />
                </Col>

            </div>

            <div className="row mb-4">
                <Label
                    htmlFor="horizontal-firstname-Input"
                    className="col-form-label"
                >
                    other
                </Label>
                <Col sm={6}>

                    <Row>
                        <Col>
                            Clean <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Undamaged <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                        <Col>
                            Working <br />
                            <button
                                type="button"
                                className="btn btn-info btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-up"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-group-sm"
                            >
                                <i className="mdi mdi-thumb-down"></i>
                            </button>
                        </Col>
                    </Row>

                </Col>

                <Col sm={6}>
                    <Input
                        type="textarea"
                        className="form-control"
                        id="horizontal-password-Input"
                        placeholder="Agent comment"
                    />
                </Col>

            </div>

            <Form>
                <Dropzone
                    onDrop={acceptedFiles =>
                        handleAcceptedFiles(acceptedFiles)
                    }
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                            <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop files here or click to upload.</h4>
                            </div>
                        </div>
                    )}
                </Dropzone>
                <div
                    className="dropzone-previews mt-3"
                    id="file-previews"
                >
                    {props.form1state?.selectedFiles?.map((f, i) => {
                        return (
                            <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                            >
                                <div className="p-2">
                                    <Row className="align-items-center">
                                        <Col className="col-auto">
                                            <img
                                                data-dz-thumbnail=""
                                                height="80"
                                                className="avatar-sm rounded bg-light"
                                                alt={f.name}
                                                src={f.preview}
                                            />
                                        </Col>
                                        <Col>
                                            <Link
                                                to="#"
                                                className="text-muted font-weight-bold"
                                            >
                                                {f.name}
                                            </Link>
                                            <p className="mb-0">
                                                <strong>{f.formattedSize}</strong>
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </Form>



            <div className="row mb-4">
                <Col sm={9}>

                    <div>
                        <Button
                            type="submit"
                            color="info"
                            className="w-md"
                        >
                            Submit
                        </Button>
                    </div>
                </Col>
            </div>
        </Form>
        </React.Fragment>
    );
};

// const mapStateToProps = gstate => {
//     const {
       
//     } = gstate.Inspections;

//     const {  } =
//         gstate.property;

//     return {
     
//     };
// };

export default LoungeRoom;
