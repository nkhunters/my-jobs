import React from 'react'
import { Link } from 'react-router-dom';

export default function Job({ job }) {
    return (
        <Link to={`/job/${job.slug}/${job.company.slug}`}>
            <div className="card card-body mb-3" style={{ cursor: "pointer" }}>
                <div className="row">
                    <div className="col-md-4">
                        <h5 style={{ fontWeight: 'bold' }}>{job.title}</h5>
                        <span>{job.company.name}</span>
                    </div>
                    <div className="col-md-4">
                        {job.tags.length == 1 ? <span>{job.tags[0].name}</span> : null}
                        {job.tags.length == 2 ? <div><span>{job.tags[0].name}</span> &emsp; <span>{job.tags[1].name}</span></div> : null}
                        {job.tags.length > 3 ? <div><span>{job.tags[0].name}</span> &emsp; <span>{job.tags[1].name}</span>&emsp; <span>{job.tags[2].name}</span></div> : null}
                        
                    </div>
                    <div className="col-md-4">
                        {job.locationNames != null ? <h6>{job.locationNames}</h6> : null}
                    </div>
                </div>
            </div>
        </Link>
    )
}
