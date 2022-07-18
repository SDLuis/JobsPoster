import "./NotJobsFound.css";
import { Form } from "react-bootstrap";

export default function NotJobsFoundComponent() {
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
          There are no jobs with this data, try to another.
        </Form.Label>
        <img className="img-error" src={randomImage()} alt="alt-page-404" />
      </div>
    </div>
  );
}
