import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import './postJob.css'
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

export default function PostJobsComponent() {

    const [workTitle, setWorkTitle] = useState(null)
    const [Position, setPosition] = useState(null)
    const [workType, setWorkType] = useState(null)
    const [applyMethod, setApply_Method] = useState(null)
    const [description, setDescription] = useState(null)

    function checkFilledFields() {
        if (
            workTitle === '' ||
            Position === '' ||
            workType === '' ||
            applyMethod === ''||
            description === ''
        ) {
            return false;
        } else {
            return true;
        }
    }
    return (
        <div>
            <Form className="Post">
                <Form.Group>
                    <Form.Label>Work Title</Form.Label>
                    <Form.Control
                        type="Text"
                        name="workTitle"
                        onChange={(e) => {
                            setWorkTitle(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        type="Text"
                        name="workPosition"
                        onChange={(e) => {
                            setPosition(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Working Time</Form.Label>
                    <Form.Control
                        as="select"
                        name="workType"
                        onChange={(e) => {
                            setWorkType(e.target.value);
                        }}
                    >
                        <option>Select work type</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Remote</option>
                        
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apply Method</Form.Label>
                    <Form.Control
                        type="Text"
                        name="workApplyMethod"
                        onChange={(e) => {
                            setApply_Method(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="workDescription"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            if (checkFilledFields() === true) {
                                axios
                                    .post(`${process.env.REACT_APP_API_URL}/jobs/add`, {
                                        work_Title: workTitle,
                                        Position: Position,
                                        apply_Method: applyMethod,
                                        workType: workType,
                                        description: description
                                    }, {withCredentials: true}).then((res) => {
                                        let serverResponse = res.data.code;
                                        console.log(res)
                                        if (serverResponse === 200) {
                                            MySwal.fire({
                                                title: "Se anadio el trabajo correctamente",
                                                icon: res.data.icon,
                                                confirmButtonText: 'OKE',
                                                allowEnterKey: res.data.data.allowEnterKey,
                                                allowEscapeKey: true,
                                                allowOutsideClick: true,
                                                timer: 1500,
                                                imerProgressBar: true,
                                            });
                                        }else{
                                            MySwal.fire({
                                                title: "Trabajo no publicado",
                                                text: res.data,
                                                icon: "error",
                                                confirmButtonText: "Ok",
                                                allowEnterKey: true,
                                                allowEscapeKey: true,
                                                allowOutsideClick: true,
                                                timer: 3000,
                                                timerProgressBar: true,
                                            });
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            } else {
                                MySwal.fire({
                                    title: "Trabajo no publicado",
                                    text:
                                        "Rellene todos los campos y asegurese de haber cliqueado bien la categoria y el tipo de trabajo que tiene",
                                    icon: "error",
                                    confirmButtonText: "Ok",
                                    allowEnterKey: true,
                                    allowEscapeKey: true,
                                    allowOutsideClick: true,
                                    timer: 3000,
                                    timerProgressBar: true,
                                });
                            }
                        }}
                        variant="secondary"
                        size="lg"
                        type="submit"
                    >
                        Publicar
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}
