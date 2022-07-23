import "./NotJobsFound.css";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotJobsFoundComponent({message, redMessage, homeMessage}) {
  const gifsErrors = [
    "d2jjuAZzDSVLZ5kI",
    "hv5AEBpH3ZyNoRnABG",
    "hLwSzlKN8Fi6I",
  ];

  const randomImage = () => {
    return `https://media.giphy.com/media/${
      gifsErrors[Math.floor(Math.random() * gifsErrors.length) + 1]
    }/giphy.gif`;
  };

  return (
    <div className="cont-NotFound">
      <div className="errorNotFound">
        <Form.Label className="code-errorNF">Not jobs found</Form.Label>
        <Form.Label className="msg-errorNF">
          {message}
        </Form.Label>
        <img className="img-error" src={randomImage()} alt="alt-page-404" />
        <Link to={'/jobs/add'} className="btn fs-4" hidden={!redMessage}>{redMessage}</Link> 
        <Link to={'/'} className="btn fs-4" hidden={!homeMessage}>{homeMessage}</Link> 
      </div>
    </div>
  );
}
