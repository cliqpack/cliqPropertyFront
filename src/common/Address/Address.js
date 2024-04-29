import React, { useState, useEffect, useRef } from "react";

import {
    Card,
    Alert,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    Label,
    Input,
    Button,
    CardHeader,
    InputGroup,
    UncontrolledAlert,
} from "reactstrap";

const Address = ({ addressState, setAddressState, data, showToggleAddress }) => {
    const [fullAddress, setFullAddress] = useState("");
    console.log(fullAddress);
    // const [addressState, setAddressState] = useState({});

    console.log(addressState);
    const [show, setShow] = useState(true);
    const [addressShow, setAddressShow] = useState(false);
    const inputRef = useRef();
    console.log(inputRef.current?.value);
    const autoCompleteRef = useRef();
    const options = {};
    const [showAddress, setShowAddress] = useState(false)

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autoCompleteRef.current.addListener("place_changed", async function () {
            console.log('in---');
            const place = await autoCompleteRef.current.getPlace();
            let unitN = "";
            let country = "";
            let statename = "";
            let postal_codeN = "";
            let suburbN = "";
            let streetN = "";
            let street_numberN = "";

            place.address_components.forEach(element => {
                let checkCountry = inArray("country", element.types);

                if (checkCountry == true) {
                    country = element.long_name;
                }

                let administrative_area_level_1 = inArray(
                    "administrative_area_level_1",
                    element.types
                );
                if (administrative_area_level_1 == true) {
                    statename = element.long_name;
                }

                let unit = inArray("subpremise", element.types);
                if (unit == true) {
                    unitN = element.long_name;
                }

                let postal_code = inArray("postal_code", element.types);
                if (postal_code == true) {
                    postal_codeN = element.long_name;
                }

                let suburb = inArray("locality", element.types);
                if (suburb == true) {
                    suburbN = element.long_name;
                }

                let street = inArray("route", element.types);
                if (street == true) {
                    streetN = element.long_name;
                }

                let street_number = inArray("street_number", element.types);
                if (street_number == true) {
                    street_numberN = element.long_name;
                }
            });
            let u = unitN ? unitN + "/" : "";
            let n = street_numberN ? street_numberN + " " : "";

            let c = country ? country + " " : "";
            let st = statename ? statename + " " : "";
            let pc = postal_codeN ? postal_codeN + " " : "";
            let sn = suburbN ? suburbN + ", " : "";
            let s = streetN ? streetN + ", " : "";
            setAddressShow(true);
            setFullAddress(u + n + s + sn + st + pc + c);
            setAddressState({
                building_name: "",
                unit: unitN,
                country: country,
                state: statename,
                postcode: postal_codeN,
                suburb: suburbN,
                street: streetN,
                number: street_numberN,
            });

        });
    }, [])

    useEffect(() => {
        if (addressState) {
            const { building_name, unit, number, street, suburb, postcode, state, country } = addressState

            let b = building_name
                ? building_name + " "
                : "";
            let u = unit
                ? unit + "/"
                : "";
            let n = number
                ? number + " "
                : "";
            let s = street
                ? street + ", "
                : "";
            let su = suburb
                ? suburb + ", "
                : "";
            let st = state
                ? state + " "
                : "";
            let pt = postcode
                ? postcode + " "
                : "";
            let c = country
                ? country
                : "";
            setFullAddress(
                b + u + n + s + su + st + pt + c
            )

        }
    }, []);

    function inArray(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }

    const addresshandler = (e, statename) => {
        console.log();
        let b = addressState.building_name ? addressState.building_name + " " : "";
        let u = addressState.unit ? addressState.unit + "/" : "";
        // let u = addressState.unit && addressState.number ? `${addressState.unit}/` : addressState.unit;
        let n = addressState.number ? addressState.number + " " : "";
        let st = addressState.street ? addressState.street + ", " : "";
        let sb = addressState.suburb ? addressState.suburb + ", " : "";
        let pc = addressState.postcode ? addressState.postcode + " " : "";
        let s = addressState.state ? addressState.state + " " : "";
        let c = addressState.country ? addressState.country + " " : "";
        if (statename === "building_name") {
            b = e.target.value + " ";
        } else if (statename === "unit") {
            // u = e.target.value + "/";
            u =
                e.target.value && addressState.number
                    ? `${e.target.value}/`
                    : e.target.value;
        } else if (statename === "number") {
            n = e.target.value + " ";
        } else if (statename === "street") {
            st = e.target.value + ", ";
        } else if (statename === "suburb") {
            sb = e.target.value + " ";
        } else if (statename === "postcode") {
            pc = e.target.value + " ";
        } else if (statename === "state") {
            s = e.target.value + " ";
        } else if (statename === "country") {
            c = e.target.value;
        }
        let address = b + u + n + st + sb + s + pc + c;
        console.log(address);
        // let reference = st + u + n;
        setFullAddress(address);
        // setState({ ...state, reference });
        setAddressState({
            ...addressState,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>

            <div className="mb-3 w-75 w-100">
                <Row>
                    <Col md={2}>
                        {/* <Label for="address" className="form-label">
                            Address
                        </Label> */}
                    </Col>
                    <Col md={9}>
                        <div className="input-group d-flex">
                            <input
                                name="address"
                                type="text"
                                className={
                                    "form-control"
                                }
                                ref={inputRef}
                                onChange={e => {
                                    setFullAddress(e.target.value);
                                    if (e.target.value === "") {
                                        setAddressState({});
                                    }
                                }}
                                value={fullAddress}
                            />
                            {!addressShow ? (
                                <Button
                                    color="primary"
                                    onClick={() => setAddressShow(true)}
                                // className="d-flex justify-content-evenly align-items-center"
                                >
                                    Details{" "}
                                    <i className="fa fa-solid fa-caret-down ms-1" />
                                </Button>
                            ) : (
                                <Button
                                    color="primary"
                                    onClick={() => setAddressShow(false)}
                                // className="d-flex justify-content-evenly align-items-center"
                                >
                                    Close
                                    <i className="fas fa-times ms-1"></i>
                                </Button>
                            )}
                        </div>

                        {addressShow && (
                            <div>
                                <Row className="mt-2">
                                    <Col md={2}>
                                        <Label
                                            for="building_name"
                                            className="form-label"
                                        >
                                            Building Name
                                        </Label>
                                    </Col>

                                    <Col>
                                        <input
                                            name="building_name"
                                            type="text"
                                            className={
                                                "form-control"
                                            }
                                            value={addressState.building_name}
                                            onChange={e => {
                                                addresshandler(e, "building_name");
                                            }}
                                        />


                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={2}>
                                        <Label
                                            for="unit"
                                            className="form-label"
                                        >
                                            Unit
                                        </Label>
                                    </Col>

                                    <Col>
                                        <input
                                            name="unit"
                                            type="text"
                                            className={
                                                "form-control"
                                            }
                                            value={addressState.unit}
                                            onChange={e => {
                                                addresshandler(e, "unit");
                                            }}
                                        />

                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={2}>
                                        <Label
                                            for="number"
                                            className="form-label"
                                        >
                                            Number
                                        </Label>
                                    </Col>

                                    <Col>
                                        <input
                                            name="number"
                                            type="text"
                                            className={
                                                "form-control"
                                            }
                                            value={addressState.number}
                                            onChange={e => {
                                                addresshandler(e, "number");
                                            }}
                                        />

                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={2}>
                                        <Label
                                            for="street"
                                            className="form-label"
                                        >
                                            Street
                                        </Label>
                                    </Col>

                                    <Col>
                                        <input
                                            name="street"
                                            type="text"
                                            className={
                                                "form-control"
                                            }
                                            value={addressState.street}
                                            onChange={e => {
                                                addresshandler(e, "street");
                                            }}
                                        />


                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={2}>
                                        <Label
                                            for="suburb"
                                            className="form-label"
                                        >
                                            Suburb
                                        </Label>
                                    </Col>

                                    <Col>
                                        <input
                                            name="suburb"
                                            type="text"
                                            className={
                                                "form-control"
                                            }
                                            value={addressState.suburb}
                                            onChange={e => {
                                                addresshandler(e, "suburb");
                                            }}
                                        />

                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={2}>
                                        <Label
                                            for="state"
                                            className="form-label"
                                        >
                                            State
                                        </Label>
                                    </Col>

                                    <Col>
                                        <input
                                            name="state"
                                            type="text"
                                            className={
                                                "form-control"
                                            }
                                            value={addressState.state}
                                            onChange={e => {
                                                addresshandler(e, "state");
                                            }}
                                        />

                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={2}>
                                        <Label
                                            for="postcode"
                                            className="form-label"
                                        >
                                            Postcode
                                        </Label>
                                    </Col>

                                    <Col>
                                        <input
                                            name="postcode"
                                            type="text"
                                            className={
                                                "form-control"
                                            }
                                            value={addressState.postcode}
                                            onChange={e => {
                                                addresshandler(e, "postcode");
                                            }}
                                        />

                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col md={2}>
                                        <Label
                                            for="country"
                                            className="form-label"
                                        >
                                            Country
                                        </Label>
                                    </Col>

                                    <Col>
                                        <input
                                            name="country"
                                            type="text"
                                            className={
                                                "form-control"
                                            }
                                            value={addressState.country}
                                            onChange={e => {
                                                addresshandler(e, "country");
                                            }}
                                        />

                                    </Col>
                                </Row>
                            </div>
                        )}
                    </Col>
                    <Col md={1}>
                    <div onClick={()=>{showToggleAddress()}}>
                    <i className="fas fa-times text-danger"></i>
                    </div>
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default Address
