import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import parse from 'html-react-parser';
import Moment from 'react-moment';

const JOB_QUERY = gql`
query JobQuery($jobSlug: String!, $companySlug: String!) {
    job(input: {jobSlug: $jobSlug, companySlug: $companySlug}) {
        id
        title
        applyUrl
        postedAt
        locationNames
        slug
        description
        tags {
            name
          }
          company {
            name
            slug
            websiteUrl
          }
        commitment {
            title
          }
        userEmail
    }
}
`;

export class JobDetails extends Component {
    render() {
        let { jobSlug, companySlug } = this.props.match.params;
        const regex = /\*\*\s+/g;
        return (
            <Fragment>
                <Query query={JOB_QUERY} variables={{ jobSlug, companySlug }}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <h4>Loading...</h4>
                            if (error) console.log(error);
                            console.log(data);
                            let t1 = data.job.description.replaceAll("##", "");
                            let t2 = t1.replaceAll("[++**", "");
                            let t3 = t2.replaceAll("**++]", "");
                            let tempStrOne = t3.replace(regex, "</h5>");
                            let tempStrTwo = tempStrOne.replaceAll("**", "<br/><br/><h5>");
                            let tempStrThree = tempStrTwo.replaceAll("- ", "<li>")
                            return <Fragment>
                                <br />
                                <br />
                                <h4>{data.job.company.name} is hiring</h4>
                                <h1>{data.job.title}</h1>
                                <br />
                                <div className="row">
                                    <div className="col-md-8">
                                        {parse(tempStrThree)}
                                        <br /><br /><br />
                                    </div>
                                    <div className="col-md-1">

                                    </div>
                                    <div className="col-md-3">
                                        <h5>Location</h5>
                                        <div>{data.job.locationNames}</div>
                                        <br />
                                        <h5>Posted</h5>
                                        <Moment format="MMMM Do YYYY">{data.job.postedAt}</Moment>
                                        <br /><br />
                                        <h5>Commitment</h5>
                                        <div>{data.job.commitment.title}</div>
                                        <br />
                                        <div>
                                            {
                                                data.job.tags.map(tag => <span className="badge badge-pill badge-dark" style={{ margin: "5px", padding: '10px' }}>{tag.name}</span>)
                                            }
                                        </div>
                                        <br /><br />
                                        <a className="btn btn-primary" href={data.job.applyUrl} style={{ paddingLeft: "60px", paddingRight: '60px', borderRadius: '10px', fontWeight: 'bold' }}>Apply</a>
                                    </div>
                                </div>
                            </Fragment>
                        }}
                </Query>
            </Fragment>
        )
    }
}

export default JobDetails
