import React, { useRef, useState } from 'react'
import { Button } from 'reactstrap';

export default function DragAndDrop({ children, handleDropImage, handleUploadImage, text }) {
    const [showDropZone, setShowDropZone] = useState(false);
    const inputFile = useRef(null);

    const drag = e => {
        e.preventDefault();
        setShowDropZone(true);
    };

    const dragend = e => {
        e.preventDefault();
        setShowDropZone(false);
    };

    const dropFile = e => {
        e.preventDefault();
        setShowDropZone(false);
    };

    return (
        <>
            <div className="w-100 my-3"
                onDragOver={drag}
                onDragLeave={dragend}
                onDrop={dropFile}>
                {showDropZone ? (
                    <div
                        style={{
                            position: "relative",
                            height: "100px",
                            width: "100%",
                            border: "1px dashed grey",
                            borderRadius: "5px",
                        }}
                        onDrop={e => handleDropImage(e)}
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
                            <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>{text}</h4>
                        </div>
                    </div>
                ) : (
                    ""
                )}


                {!showDropZone ?
                    <>
                        <div className='w-100 d-flex justify-content-end align-items-center'>
                            <div>
                                <i className="fas fa-cloud-upload-alt text-info font-size-24"></i>
                            </div>
                            <div >
                                <Button
                                    className="btn ms-1"
                                    color="info"
                                    onClick={() => inputFile.current.click()}


                                // style={{ height: "28px" }}
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

                        {children}



                    </>
                    : ''}

            </div>
        </>
    )
}
