import error404 from '../../../img/error404.png'
import "./404.css";
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

export default function NotFoundComponent() {
    return (
        <div className='cont-404'>
        <div className="error404">
            <Form.Label className="code-error">404</Form.Label>
            <Form.Label className="msg-error">Sometimes gettings lost isn't that bad</Form.Label>
            <img className="gif-error" src={error404} alt="alt-page-404"/>
            <Link to='/' class="btn">Go to home</Link>
        </div>
        </div>
    )
}