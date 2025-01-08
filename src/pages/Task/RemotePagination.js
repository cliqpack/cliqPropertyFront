import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { TagsInput } from "react-tag-input-component";
import FilterModal from "common/Filter/FilterModal";

const RemotePagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  columns,
  onSearchState,
  search,
  loading,
  defaultSorted,
  selectRow,
  filterStatus,
  filterBtnProps,
  filterProps,
  filterAction,
  filterReset,
  filterStatusProperty,
  filterActionProperty,
  filterResetProperty,
  manager,
  setManager,
  labels,
  setLabels
}) => {
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [propertyFilterModal, setPropertyFilterModal] = useState(false);
  const [managers, setManagers] = useState([]);

  const toggleFilter = () => setFilterDropDown(!filterDropDown);
  const togglePropertyFilterModal = () => setPropertyFilterModal(!propertyFilterModal);

  const handleSearch = (e) => {
    e.preventDefault();
    onTableChange("pagination", { page: 1, sizePerPage });
  };

  // Fetch manager data when filterStatusProperty is true
  useEffect(() => {
    const fetchManagers = async () => {
      if (filterStatusProperty) {
        try {
          const authUser = JSON.parse(localStorage.getItem("authUser"));
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`,
          };
          const Url = `${process.env.REACT_APP_LOCALHOST}/all-user`;

          const response = await axios.get(Url, { headers });
          const managerOptions = response.data.map((user) => ({
            value: user.id,
            label: user.full_name,
          }));
          setManagers(managerOptions);
        } catch (error) {
          console.error("Error fetching managers:", error);
        }
      }
    };
    fetchManagers();
  }, [filterStatusProperty]);

  const handleLabelChange = (tags) => {
    setLabels(tags); // Update labels state
  };

  const handleManagerChange = (e) => {
    setManager(e.target.value);
  };

  const filterProperty = () => {
    togglePropertyFilterModal()
    filterActionProperty();
  };

  const filterActionReset = () => {
    togglePropertyFilterModal()
    filterResetProperty();
    setManager("")
    setLabels([])
  };

  return (
    <div>
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          page,
          sizePerPage,
          totalSize,
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <div>
            <div className="row d-flex justify-content-end mb-3 custom-element-navItem">
              <div className="col-md-3">
                <Row>
                  <Col md={filterStatus || filterStatusProperty ? 9 : 12}>
                    <form className="d-flex" onSubmit={handleSearch}>
                      <div className="d-flex flex-column">
                        <input
                          value={search}
                          className="form-control"
                          placeholder="Search"
                          style={{
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                          }}
                          onChange={onSearchState}
                        />
                      </div>
                      <div className="input-group-append">
                        <button
                          className="input-group-text"
                          type="submit"
                          style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 50,
                            borderBottomRightRadius: 50,
                            height: 36.5,
                          }}
                        >
                          <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
                        </button>
                      </div>
                    </form>
                  </Col>

                  {filterStatus && (
                    <Col md={2}>
                      <button
                        className={`btn ${filterBtnProps ? "btn-success" : "btn-info"}`}
                        onClick={toggleFilter}
                      >
                        <i className="fas fa-filter" style={{ fontSize: "18px" }}></i>
                      </button>
                      <FilterModal
                        open={filterDropDown}
                        toggle={toggleFilter}
                        body={filterProps}
                        action={filterAction}
                        reset={filterReset}
                      />
                    </Col>
                  )}

                  {filterStatusProperty && (
                    <Col md={2}>
                      <Button
                        color={manager || (labels && labels.length > 0) ? "success" : "info"}
                        onClick={togglePropertyFilterModal}>
                        <i className="fas fa-filter" style={{ fontSize: "18px" }}></i>
                      </Button>
                      <Modal isOpen={propertyFilterModal} toggle={togglePropertyFilterModal}>
                        <ModalHeader toggle={togglePropertyFilterModal}>Filter</ModalHeader>
                        <ModalBody>
                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ marginBottom: '4px', display: 'block', fontWeight: '600' }}>Property manager or team</label>
                            <Input type="select" value={manager} onChange={handleManagerChange}>
                              <option value="">All</option>
                              {managers.map((manager) => (
                                <option key={manager.value} value={manager.value}>{manager.label}</option>
                              ))}
                            </Input>
                          </div>

                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ marginBottom: '4px', display: 'block', fontWeight: '600' }}>Labels</label>
                            <TagsInput
                              value={labels}
                              onChange={handleLabelChange}
                              inputProps={{ placeholder: "Add label..." }}
                            />
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="secondary" onClick={filterActionReset}>
                            <i className="fas fa-undo"></i> Reset
                          </Button>
                          <Button color="success" onClick={filterProperty}>
                            <i className="fas fa-filter"></i> Filter
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </Col>
                  )}
                </Row>
              </div>
            </div>

            <div className="table-responsive">
              <BootstrapTable
                remote
                noDataIndication={() => <div className="text-center">No record found</div>}
                bordered={false}
                striped
                hover
                keyField="id"
                data={data}
                columns={columns}
                classes="table align-middle table-nowrap"
                onTableChange={onTableChange}
                defaultSorted={defaultSorted}
                selectRow={selectRow}
                loading={loading}
                overlay={overlayFactory({
                  spinner: true,
                  styles: {
                    overlay: (base) => ({
                      ...base,
                      background: "rgba(0, 0, 0, 0.2)",
                    }),
                  },
                })}
                {...paginationTableProps}
              />
            </div>

            <Row className="align-items-md-center pt-3">
              <Col className="inner-custom-pagination d-flex">
                <div className="d-inline mt-4">
                  <SizePerPageDropdownStandalone {...paginationProps} />
                </div>
                <div className="text-md-right ms-auto mt-4">
                  <PaginationListStandalone {...paginationProps} />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </PaginationProvider>
    </div>
  );
};

export default RemotePagination;
