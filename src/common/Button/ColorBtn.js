import React, { useState } from 'react'
import ColorPicker from '@vtaits/react-color-picker';
import {

    Button, FormGroup,

} from "reactstrap";
import '@vtaits/react-color-picker/dist/index.css';

function ColorBtn(props) {
    const [open, setOpen] = useState(false)

    return (
        <FormGroup>
            <div className='me-1'>
                <div
                    className="input-group colorpicker-default"
                    title="Using format option"
                >
                    <button className="btn text-white"
                        onClick={e => setOpen(open => !open)}
                        style={{ background: props.rgb ? props.rgb : '#74788d' }}>
                        {props.text} Color
                    </button>
                </div>

                {
                    open ? (
                        <>
                            <ColorPicker
                                saturationHeight={100}
                                saturationWidth={100}
                                value={props.rgb}
                                onDrag={props.onDrag}
                            />
                            <div className='d-flex'>
                                <input
                                    name={props.name}
                                    onChange={props.handler}
                                    value={props.rgb}
                                    type="text"
                                    // onClick={props.handler}
                                    className="form-control input-lg w-50"
                                />
                                <Button className='btn-sm ms-1' onClick={e => setOpen(false)}
                                >Close</Button>
                            </div>
                        </>
                    ) : null
                }
            </div>
        </FormGroup>
    )
}

export default ColorBtn
