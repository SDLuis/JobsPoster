import "./404.css";
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
const gifsErrors = ['d2jjuAZzDSVLZ5kI', 'hv5AEBpH3ZyNoRnABG', 'hLwSzlKN8Fi6I'];

export default function NotFoundComponent() {
    const randomImage = () => {
        return `https://media.giphy.com/media/${gifsErrors[Math.floor(Math.random() * gifsErrors.length) + 1 ]}/giphy.gif`
      }
    return (
        <div className='cont-404'>
        <div className="error404">
            <Form.Label className="code-error">404</Form.Label>
            <Form.Label className="msg-error">Sometimes gettings lost isn't that bad</Form.Label>
            <img className="img-error" src={randomImage()} alt="alt-page-404"/>
            <Link to='/' class="btn">Go to home</Link>
        </div>
        </div>
    )
}