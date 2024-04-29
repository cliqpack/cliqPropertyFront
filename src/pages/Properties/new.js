<Row className="mb-3 w-75">
  <Col md={3}>
    <Label for="routine_inspections_frequency" className="form-label">
      Rent
    </Label>
  </Col>
  <Col md={5}>
    <Field
      name="routine_inspections_frequency"
      type="text"
      className={
        "form-control" +
        (errors.routine_inspections_frequency &&
        touched.routine_inspections_frequency
          ? " is-invalid"
          : "")
      }
      value={state.routine_inspections_frequency}
      onChange={handlePropertyFormValues}
    />
    <ErrorMessage
      name="routine_inspections_frequency"
      component="div"
      className="invalid-feedback"
    />
  </Col>
  <Col md={4}>
    <div className="btn-group btn-group-justified">
      <div className="btn-group">
        <Button
          color={inspectionWeeklylyBtn ? "secondary" : "light"}
          onClick={toggleInspectionWeeklyBtn}
        >
          {inspectionWeeklylyBtn ? (
            <i className="bx bx-comment-check"></i>
          ) : null}
          <span> Weekly</span>
        </Button>
      </div>
      <div className="btn-group">
        <Button
          color={inspectionfortnightlyBtn ? "secondary" : "light"}
          onClick={toggleInspectionfortnightlyBtn}
        >
          {inspectionfortnightlyBtn ? (
            <i className="bx bx-comment-check"></i>
          ) : null}
          <span> fortnightly</span>
        </Button>
      </div>
      <div className="btn-group">
        <Button
          color={inspectionMonthlyBtn ? "secondary" : "light"}
          onClick={toggleInspectionMonthlyBtn}
        >
          {inspectionMonthlyBtn ? (
            <i className="bx bx-comment-check"></i>
          ) : null}
          <span> Monthly</span>
        </Button>
      </div>
    </div>
  </Col>

  {/* <input
                                className="form-control"
                                type="number"
                                name="inspection"
                                defaultValue="1"
                                id="example-number-input"
                                /> */}
</Row>;
