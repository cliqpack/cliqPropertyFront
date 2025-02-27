import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import {
    Col,
    Row,
    Button,
} from "reactstrap";
import { removeHeaderEmailImg, removeFooterEmailImg, removeHeaderEmailImgFresh, removeFooterEmailImgFresh } from "store/actions";
import { withRouter } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import ToggleBtn from "common/Button/ToggleBtn";

function EmailImage(props) {
    const [state, setState] = useState();
    const inputFile = useRef(null);
    const [showDropZone, setShowDropZone] = useState(false);

    const handleUploadImage = e => {
        if (props.tab == 'Header') {
            props.setImg({ ...props.img, headerImg: URL.createObjectURL(e.target.files[0]), headerImgFile: e.target.files })
        }
        else {
            props.setImg({ ...props.img, footerImg: URL.createObjectURL(e.target.files[0]), footerImgFile: e.target.files })
        }
    }

    const dropFile = e => {
        e.preventDefault();
        setShowDropZone(false);
    };

    const drag = e => {
        e.preventDefault();
        setShowDropZone(true);
    };

    const dragend = e => {
        e.preventDefault();
        setShowDropZone(false);
    };

    const handleImage = e => {
        if (props.tab == 'Header') {
            props.setImg({ ...props.img, headerImg: URL.createObjectURL(e.dataTransfer.files[0]), headerImgFile: e.dataTransfer.files })
        }
        else {
            props.setImg({ ...props.img, footerImg: URL.createObjectURL(e.dataTransfer.files[0]), footerImgFile: e.dataTransfer.files })

        }
    }

    const editorConfiguration = {
        toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "fontFamily",
            "fontSize",
            "fontColor",
            "fontBackgroundColor",
            "alignment",
            "|",
            "blockQuote",
            "|",
            "indent",
            "outdent",
            "|",
            "|",
            "numberedList",
            "bulletedList",
            "insertTable",
            "mergeTableCells",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
        ],
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true,
            },
        },
    };

    return (
        <>
            <Row>
                <Col md={12} >
                    <div className="d-flex justify-content-between">
                        <div>Image</div>
                        <div className="d-flex justify-content-end">
                            <div className="d-flex justify-content-end align-items-center">
                                <i className="fas fa-cloud-upload-alt text-info font-size-24"></i>
                            </div>
                            <div >
                                <Button
                                    className="btn ms-1"
                                    color="info"
                                    onClick={() => inputFile.current.click()}
                                >
                                    {" "}
                                    <i className="fas fa-paperclip font-size-16"></i>
                                </Button>
                                <input
                                    type="file"
                                    onChange={handleUploadImage}
                                    ref={inputFile}
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-100 my-3"
                        onDragOver={drag}
                        onDragLeave={dragend}
                        onDrop={dropFile}>
                        {showDropZone ? (
                            <div
                                style={{
                                    position: "relative",
                                    height: "90px",
                                    width: "100%",
                                    border: "4px dashed grey",
                                    borderRadius: "5px",
                                }}
                                onDrop={e => handleImage(e)}
                            >
                                <div
                                    className="dz-message needsclick"
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    <h4>Drag a photo here</h4>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {!showDropZone ?
                            <div >
                                {props.img?.headerImg || props.img?.footerImg ?
                                    <img
                                        src={props.tab == "Header" ? props.img.headerImg : props.img.footerImg}
                                        style={{
                                            height: `${props.tab == "Header" ? props.state.headerImgHeight :
                                                props.state.footerImgHeight}mm`,
                                            width: 'auto',
                                            maxHeight: '50mm',
                                            minHeight: '5mm'
                                        }}
                                    /> :
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '90px', width: 'auto', border: '1px ridge' }}>
                                        Drag your image here
                                    </div>
                                }
                            </div>
                            : ''}
                    </div>
                    {props.tab == 'Header' && props.img?.headerImg
                        &&
                        <div className="d-flex">
                            <div className="d-flex justify-content-end align-items-center">
                                <span>Height on page</span>
                                {props.state.headerImgHeight ? <input
                                    className="form-control w-25 mx-1"
                                    type="text"
                                    name={props.name}
                                    value={props.state.headerImgHeight}
                                    placeholder=""
                                    onChange={props.stateHandler}
                                /> :
                                    <input
                                        className="form-control w-25 mx-1"
                                        type="text"
                                        name={props.name}
                                        value={props.state.headerImgHeight}
                                        placeholder=""
                                        onChange={props.stateHandler}
                                    />
                                }
                                <span>mm</span>
                            </div>
                            <Button className="ms-2" color="secondary"
                                onClick={(e) => props.removeImage(e, props.tab)}
                            >
                                Remove
                            </Button>
                        </div>
                    }
                    {props.tab == 'Footer' && props.img?.footerImg
                        &&
                        <div className="d-flex">
                            <div className="d-flex justify-content-end align-items-center">
                                <span>Height on page</span>
                                {props.state.footerImgHeight ? <input
                                    className="form-control w-25 mx-1"
                                    type="text"
                                    name={props.name}
                                    value={props.state.footerImgHeight}
                                    placeholder=""
                                    onChange={props.stateHandler}
                                /> :
                                    <input
                                        className="form-control w-25 mx-1"
                                        type="text"
                                        name={props.name}
                                        value={props.state.footerImgHeight}
                                        placeholder=""
                                        onChange={props.stateHandler}
                                    />
                                }
                                <span>mm</span>
                            </div>
                            <Button className="ms-2" color="secondary"
                                onClick={(e) => props.removeImage(e, props.tab)}
                            >
                                Remove
                            </Button>
                        </div>
                    }
                    <div className="d-flex align-items-center my-3 py-3">
                        {props.tab == 'Header' ?
                            props.img?.headerImg &&
                            <div className="btn-group btn-group-justified">
                                <ToggleBtn btn={props.state.leftHeaderBtn} toggle={props.togglePositionHeaderBtn} label='Left' />
                                <ToggleBtn btn={props.state.middleHeaderBtn} toggle={props.togglePositionHeaderBtn} label='Middle' />
                                <ToggleBtn btn={props.state.rightHeaderBtn} toggle={props.togglePositionHeaderBtn} label='Right' />
                            </div>
                            :
                            props.img?.footerImg &&
                            <div className="btn-group btn-group-justified">
                                <ToggleBtn btn={props.state.leftFooterBtn} toggle={props.togglePositionFooterBtn} label='Left' />
                                <ToggleBtn btn={props.state.middleFooterBtn} toggle={props.togglePositionFooterBtn} label='Middle' />
                                <ToggleBtn btn={props.state.rightFooterBtn} toggle={props.togglePositionFooterBtn} label='Right' />

                            </div>
                        }
                        {props.img?.headerImg && props.img?.footerImg &&
                            <span className="ms-2 d-flex align-items-center">of {props.tab == 'Header' ? 'Header' : 'Footer'}</span>}
                    </div>
                    <div
                        className="w-100 my-1 py-1"
                        style={{
                            borderBottom: "1.2px dotted #c9c7c7",
                        }}
                    ></div>
                    <div className="d-flex justify-content-start mb-2">Text</div>
                    <div>
                        <div>
                            <CKEditor
                                editor={DecoupledEditor}
                                config={editorConfiguration}
                                onReady={(editor) => {
                                    editor.setData(props?.tab === "Header" ? (props?.state?.HeaderText || "") : (props?.state?.FooterText || ""));
                                    if (editor) {
                                        editor.ui
                                            .getEditableElement()
                                            .parentElement.insertBefore(
                                                editor.ui.view.toolbar.element,
                                                editor.ui.getEditableElement()
                                            );
                                    }
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData().replace(/&nbsp;/g, '');
                                    props.editorHandler(
                                        data,
                                        props.tab === "Header" ? "Header" : 'Footer'
                                    );
                                }}
                            />

                        </div>
                    </div>
                    <div className="d-flex align-items-center my-3 py-3">
                        {props.tab == 'Header' ?
                            props.state.HeaderText ?
                                <div className="btn-group btn-group-justified">
                                    <ToggleBtn btn={props.state.leftHeaderTextBtn} toggle={props.togglePositionHeaderTextBtn} label='Left' />
                                    <ToggleBtn btn={props.state.middleHeaderTextBtn} toggle={props.togglePositionHeaderTextBtn} label='Middle' />
                                    <ToggleBtn btn={props.state.rightHeaderTextBtn} toggle={props.togglePositionHeaderTextBtn} label='Right' />
                                </div> : ''
                            :
                            props.state.FooterText ?
                                <div className="btn-group btn-group-justified">
                                    <ToggleBtn btn={props.state.leftFooterTextBtn} toggle={props.togglePositionFooterTextBtn} label='Left' />
                                    <ToggleBtn btn={props.state.middleFooterTextBtn} toggle={props.togglePositionFooterTextBtn} label='Middle' />
                                    <ToggleBtn btn={props.state.rightFooterTextBtn} toggle={props.togglePositionFooterTextBtn} label='Right' />
                                </div> : ''
                        }
                        {props.state.HeaderText ?
                            <span className="ms-2 d-flex align-items-center">
                                {props.tab == 'Header' && 'of Header'}</span>

                            : ''}

                        {props.state.FooterText ?
                            <span className="ms-2 d-flex align-items-center">
                                {props.tab == 'Footer' && 'of Footer'}</span>

                            : ''}
                    </div>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = gstate => {
    const { removeEmailHeaderImg, removeEmailFooterImg } = gstate.Portfolio;
    return { removeEmailHeaderImg, removeEmailFooterImg };
};

export default withRouter(connect(mapStateToProps, { removeHeaderEmailImg, removeFooterEmailImg, removeHeaderEmailImgFresh, removeFooterEmailImgFresh })(EmailImage));

