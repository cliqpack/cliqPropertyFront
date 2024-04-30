import React from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";

import { Col, Row } from "reactstrap";

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
}) => {
  const indication = () => {
    return (
      <div className="text-center">
        <span>No record found</span>
      </div>
    );
  };
  const handleSearch = e => {
    e.preventDefault();
    onTableChange("pagination", { page: 1, sizePerPage });
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
                <Row >
                  <Col md={12} >
                    <form className="d-flex" onSubmit={handleSearch}>

                      <div className="d-flex flex-column ">
                        <input
                          value={search}
                          className="form-control"
                          list="datalistOptions"
                          id="exampleDataList"
                          placeholder="Search"
                          style={{
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            color: "red !important"
                            //marginTop: { sm: "50px", md: "-17px", lg: "-17px" },

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
                            //marginTop: { sm: "50px", md: "-17px", lg: "-17px" },
                          }}
                        >
                          <i
                            className="fas fa-search"
                            style={{ fontSize: "18px" }}
                          ></i>
                        </button>
                      </div>

                    </form>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="table-responsive">
              <BootstrapTable
                remote
                noDataIndication={indication}
                bordered={false}
                striped={true}
                hover={true}
                keyField="id"
                data={data}
                columns={columns}
                classes={"table align-middle table-nowrap"}
                onTableChange={onTableChange}
                defaultSorted={defaultSorted}
                selectRow={selectRow}
                loading={loading}
                overlay={overlayFactory({
                  spinner: true,
                  styles: {
                    overlay: base => ({
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
