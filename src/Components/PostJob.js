import React, { useState } from 'react'
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

const POST_JOB = gql`
mutation PostJob($title: String!, $commitmentId: ID!, $companyName: String!, $locationNames: String!, $userEmail: String!, $applyUrl: String!, $description: String!) {
    postJob(input: {title: $title, commitmentId: $commitmentId, companyName: $companyName, locationNames: $locationNames, userEmail: $userEmail, applyUrl: $applyUrl, description: $description}) {
        id
        title
        postedAt
        locationNames
        slug
        description
        company {
            name
            slug
          }
        commitment {
            title
          }
        userEmail
    }
}
`;

const PostJob = () => {

    const [userEmail, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [locationNames, setLocationNames] = useState("");
    const [commitmentId, setCommitment] = useState("cjtu8esth000z0824x00wtp1i");
    const [description, setJobDesc] = useState("");
    const [applyUrl, setApplyUrl] = useState("");
    const [jobPosted, setJobPosted] = useState(false);

    const [postJob, { loading, error, data }] = useMutation(POST_JOB);

    const submitJob = (e) => {
        e.preventDefault();
        postJob({ variables: { title, commitmentId, companyName, locationNames, userEmail, applyUrl, description } });
        setEmail("");
        setTitle("");
        setCompanyName("");
        setLocationNames("");
        setJobDesc("");
        setApplyUrl("");
        setJobPosted(true);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    console.log(data);
    return (
        <div className="bs-component container">

            <br />
            {
                jobPosted ? <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true" style={{ float: 'right' }}>
                    <div className="toast-header">
                        <strong className="mr-auto">Job Posted</strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick = {() => setJobPosted(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        Job posted successfully!
                </div>
                </div> : null
            }

            <br />
            <h1 className="display-4.my-3">Post Job</h1>
            <br />
            <form onSubmit={(e) => submitJob(e)}>
                <fieldset>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={userEmail} onChange={(e) => setEmail(e.target.value)} required />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="jobtitle">Job title</label>
                        <input type="text" className="form-control" id="jobtitle" placeholder="Job title" value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="companyname">Company name</label>
                        <input type="text" className="form-control" id="companyname" placeholder="Company name" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationnames">Location names</label>
                        <input type="text" className="form-control" id="locationnames" placeholder="Usa, India etc." value={locationNames} onChange={e => setLocationNames(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="select">Select Commitment</label>
                        <select className="form-control" id="select" value={commitmentId} onChange={e => setCommitment(e.target.value)}>
                            <option value="cjtu8esth000z0824x00wtp1i">Full-time</option>
                            <option value="cjuvc2urp01cf0735lk9j0e87">Part-time</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleTextarea">Job Description</label>
                        <textarea className="form-control" id="exampleTextarea" rows="3" value={description} onChange={e => setJobDesc(e.target.value)} required></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="locationnames">Apply URL</label>
                        <input type="text" className="form-control" id="locationnames" value={applyUrl} onChange={e => setApplyUrl(e.target.value)} placeholder="Apply Url" />
                    </div>
                    <br /><br />
                    <button type="submit" className="btn btn-primary" style={{ paddingLeft: "60px", paddingRight: '60px', borderRadius: '10px', fontWeight: 'bold', float: 'right' }}>Submit</button>
                </fieldset>
            </form>
            <br /><br /><br />
        </div>
    )
}

export default PostJob;
