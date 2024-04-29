import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    Alert,
    Card,
    CardBody,
    Col,
    Container,
    CardTitle,
    Row,
    Label,
    Table,
} from "reactstrap";
import { storeAddons, addonList, deleteAddon, storeAddonsFresh } from "store/ACL/Plan/actions";
import { menuList } from "store/actions";

import { Link, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import Select from "react-select";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const CreateAddons = props => {
    const [state, setState] = useState();

    const [selectedMenu, setSelectedMenu] = useState(null);
    const [optionGroupMenu, setOptionGroupMenu] = useState([
        {
            options: [

            ],
        },
    ]);

    useEffect(() => {
        if (props.menu_list_loading == false) {
            props.menuList()
        }
        if (props.store_addons_loading === "Success") {
            toastr.success('Plan added');
            props.storeAddonsFresh();
        }

        let optionMenu;
        if (props.menu_list_data?.data) {
            optionMenu = props.menu_list_data.data.menus.map((item, idx) =>
            ({
                label: item.menu_title, value: item.id,
            })
            );
            setOptionGroupMenu(optionMenu)
        }
    }, [props.menu_list_loading, props.store_addons_loading]);

    const handleSelectedMenu = e => {
        setState((prev) => {
            return { ...prev, menu: e.value }
        })
        setSelectedMenu(e);
    };

    document.title = "Create Addons | My Day";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Forms" breadcrumbItem="Create Addons" />
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">Create Plan</CardTitle>

                                    <div className="p-2">
                                        {props.error ? (
                                            <Alert color="danger">
                                                {JSON.stringify(props.error.response.data.message)}
                                            </Alert>
                                        ) : null}
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={{
                                                menu: (state && state.menu) || "",
                                                price: (state && state.price) || "",
                                            }}
                                            validationSchema={Yup.object().shape({
                                                menu: Yup.string().required("Please select menu"),
                                                price: Yup.number().required(
                                                    "Please Enter Price"
                                                ),
                                            })}
                                            onSubmit={(values, onSubmitProps) => {
                                                console.log(values);
                                                props.storeAddons(values);
                                            }}
                                        >
                                            {({ errors, status, touched }) => (
                                                <Form className="form-horizontal">
                                                    <div className="mb-3">
                                                        <Label for="menu" className="form-label">
                                                            Select Addon
                                                        </Label>
                                                        <Select
                                                            value={selectedMenu}
                                                            onChange={handleSelectedMenu}
                                                            options={optionGroupMenu}
                                                            classNamePrefix="select2-selection"
                                                            placeholder='Supplier'
                                                        />
                                                        <ErrorMessage
                                                            name="menu"
                                                            component="div"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <Label for="price" className="form-label">
                                                            Price
                                                        </Label>
                                                        <Field
                                                            name="price"
                                                            type="text"
                                                            className={
                                                                "form-control" +
                                                                (errors.price && touched.price
                                                                    ? " is-invalid"
                                                                    : "")
                                                            }
                                                        />
                                                        <ErrorMessage
                                                            name="price"
                                                            component="div"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>

                                                    <div className="mt-3">
                                                        <button
                                                            className="btn btn-info w-md"
                                                            type="submit"
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">Plan List</CardTitle>

                                    <div className="table-responsive">
                                        {/* <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Menu</th>
                          <th>Slug</th>
                          <th>Sort Order</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          menuData
                        }
                      </tbody>
                    </Table> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                {/* container-fluid */}
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    const {
        menu_list_data,
        menu_list_error,
        menu_list_loading,
    } = state.Menu;

    const {
        store_addons,
        store_addons_error,
        store_addons_loading,
    } = state.Plan;
    return {
        menu_list_data,
        menu_list_error,
        menu_list_loading,

        store_addons,
        store_addons_error,
        store_addons_loading,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        storeAddons,
        addonList,
        deleteAddon,
        storeAddonsFresh,
        menuList
    })(CreateAddons)
);
