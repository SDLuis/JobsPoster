import React, { useState, useEffect } from 'react'
import './jobList.css'
import { Card } from "react-bootstrap";
import { getWorks } from '../../services/job.services';
import LoadingSpinner from '../loading/loading.component';

export default function JobsList() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getWorks().then(response => {
            setJobs(response)
            setLoading(false)
        })
    }, [])

    function JobsCategory(job) {
        return (
            <section className="main-container">
                <Card style={{ width: '18rem' }}>
                    <Card.Header>{job.row.work_Title}</Card.Header>
                    <div>{job.row.workType}</div>
                    <div>{job.row.Position}</div>
                    <div>{job.row.apply_Method}</div>
                    <Card.Footer>{job.row.description}</Card.Footer>
                </Card>
            </section>
        )
    }
    if(loading) return <LoadingSpinner/>
    return (
        jobs.map((row) => {
            return <JobsCategory key={row.Job_ID} row={row} />
        })
    )
}