import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import DatatableTables2 from "pages/Tables/DatatableTables2";
import Breadcrumbs from "components/Common/Breadcrumb";
import NewFeesModal from "./NewFeesModal";
import { getFees } from "store/actions";
document.title = "Settings | My Day";
const Fees = props => {
	const [state, setState] = useState({ newFeesModal: false });
	const [data, setData] = useState('');
	const [seen, setSeen] = useState(false);

	const toggleModalFee = () => {
		setState(prev => ({ ...prev, newFeesModal: !prev.newFeesModal }));
	};

	const statusRef = (cell, row) => {
		console.log(row.status);
		return <span>{row.status === 1 ? 'Yes' : 'No'}</span>
	};

	const openEditModal = (e, column, columnIndex, row, rowIndex) => {
		setData(row);
		toggleModalFee();
	};

	const activeData = [
		{
			dataField: "display_name",
			text: "Display Name",
			sort: true,
			events: {
				onClick: (e, column, columnIndex, row, rowIndex) => {
					openEditModal(e, column, columnIndex, row, rowIndex);
				},
			},
		},
		{
			dataField: "charging",
			text: "Charging",
			sort: true,
			events: {
				onClick: (e, column, columnIndex, row, rowIndex) => {
					openEditModal(e, column, columnIndex, row, rowIndex);
				},
			},
		},
		{
			dataField: "fee_type",
			text: "Type",
			sort: true,
			events: {
				onClick: (e, column, columnIndex, row, rowIndex) => {
					openEditModal(e, column, columnIndex, row, rowIndex);
				},
			},
		},
		{
			dataField: "price",
			text: "Price",
			sort: true,
			events: {
				onClick: (e, column, columnIndex, row, rowIndex) => {
					openEditModal(e, column, columnIndex, row, rowIndex);
				},
			},
		},
		{
			dataField: "value",
			text: "Value",
			sort: true,
			events: {
				onClick: (e, column, columnIndex, row, rowIndex) => {
					openEditModal(e, column, columnIndex, row, rowIndex);
				},
			},
		},
		{
			dataField: "account.account_name",
			text: "Account",
			sort: true,
			events: {
				onClick: (e, column, columnIndex, row, rowIndex) => {
					openEditModal(e, column, columnIndex, row, rowIndex);
				},
			},
		},

		{
			dataField: "",
			text: "Status",
			sort: true,
			events: {
				onClick: (e, column, columnIndex, row, rowIndex) => {
					openEditModal(e, column, columnIndex, row, rowIndex);
				},
			},
			formatter: statusRef,
		},


	];

	useEffect(() => {
		if (!seen) {
			props.getFees();
		}
		setSeen(true);
	}, []);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid={true}>
					<Breadcrumbs title="Addons" breadcrumbItem="Plans" />

					<Row>
						<Col lg={12}>
							<Card>
								<CardBody>
									<div className="button-groups">
										<button
											type="button"
											className="btn btn-info"
											onClick={toggleModalFee}
										>
											New Fee
										</button>
									</div>
								</CardBody>
							</Card>

							<Card>
								<CardBody>
									{props.get_fee_data ? (
										<DatatableTables2
											products={props.get_fee_data}
											columnData={activeData}
										/>
									) : null}
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			{state.newFeesModal && <NewFeesModal state={state} data={data} setData={setData} toggle={toggleModalFee} />}
		</React.Fragment>
	);
};
const mapStateToProps = gstate => {
	const { get_fee_data, get_fee_error, get_fee_loading } = gstate.FeeSettings;
	return { get_fee_data, get_fee_error, get_fee_loading };
};
export default withRouter(connect(mapStateToProps, { getFees })(Fees));
