import { Button, Form, FormControl, Row, Col } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./searchJob.css";

import { useContext, useState } from "react";
import jobContext from "../../../context/jobContext";

import { getWorksByCategory, getWorksByWorkTitle, getWorks } from "../../../services/job.service";

export default function SearchJobs() {
  const { changeJobs, setCurrentPage } = useContext(jobContext);
  const [searchParam, setsearchParam] = useState('')

  function handleSelect(keyword) {
    if (keyword !== "") {
      getWorksByCategory(keyword).then((jobs) => changeJobs(jobs));
      setCurrentPage(1)
    }
  }

  function search(e, param){
    e.preventDefault()
    if (param !== "") {
      getWorksByWorkTitle(param).then((jobs) => changeJobs(jobs));
      setCurrentPage(1)
    }else{
      getWorks().then((jobs) => changeJobs(jobs))
      setCurrentPage(1)
    }
  }

  return (
    <div className="search">
      <Row>
        <Col>
          <Form className="Busqueda input-group" onSubmit={(e) => search(e, searchParam)}>
            <FormControl
              className="BarSearch"
              type="text"
              placeholder=" Type a job title"
              onChange={(e) => setsearchParam(e.target.value)}
            />
            <Button className="btnSearch" variant="outline-secondary" type='submit'>
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
                handleSelect(e.target.value);
              }}
            >
              <option value={""}>Working hours</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Remote</option>
            </select>
          </div>
        </Col>
      </Row>
    </div>
  );
}
