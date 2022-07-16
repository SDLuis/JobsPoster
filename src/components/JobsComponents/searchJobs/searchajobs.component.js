import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import "./searchJob.css";

export default function Searchajobs() {

  let navigate = useNavigate();

  function onSubmit (keyword) {
    if (keyword !== '') {
      return navigate(`/worktype/${keyword}/`)
    }
  }
  function handleSelect (e, param) {
    e.preventDefault()
    onSubmit(param)
  }

  return (
    <div className="search">
      <Row>
        <Col>
          <Form className="Busqueda input-group">
            <FormControl
              className="BarSearch"
              type="text"
              placeholder="  Type a Category"
            />
            <Button
              className="btnSearch"
              variant="outline-secondary"
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form>
        </Col>
        <Col>
          <div className="WorkType">
            <select
              name="WorkType"
              className="BarWorkType form-control"
              onChange={(e) => {
                handleSelect(e, e.target.value)
              }}
            >
                <option disabled>
                    Select Work Type
                </option>
                <option>
                    Full Time
                </option>
                <option>
                    Part Time
                </option>
                <option>
                    Remote
                </option>
            </select>
          </div>
        </Col>
      </Row>
    </div>
  );
}
