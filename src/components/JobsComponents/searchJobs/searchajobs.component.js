import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./searchJob.css";

export default function Searchajobs() {
  return (
    <div className="search">
      <Row>
        <Col>
          <Form className="Busqueda input-group">
            <FormControl
              className="BarSearch"
              type="text"
              placeholder="  Type Category"
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
          <div className="categoria">
            <select
              name="Categoria"
              className="BarCategory form-control"
            >
                <option>
                    Select Category
                </option>
            </select>
          </div>
        </Col>
      </Row>
    </div>
  );
}
