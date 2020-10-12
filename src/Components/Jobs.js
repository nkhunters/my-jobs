import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Job from './Job';

const JOBS_QUERY = gql`
query JobsQuery {
    jobs {
        id
        title
        postedAt
        locationNames
        slug
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

export class Jobs extends Component {

    state = {
        data: null,
        jobType: "All"
    };

    componentDidUpdate() {
        window.scrollTo(0, 0)
    }

    paginate = () => {

        let array = this.state.data.jobs;
        if (this.state.jobType === "fullTime") {
            array = this.state.data.jobs.filter(function (job) {
                return job.commitment.title === "Full-time";
            });
        }
        if (this.state.jobType === "partTime") {
            array = this.state.data.jobs.filter(function (job) {
                return job.commitment.title === "Part-time";
            });
        }
        let page_size = 10;
        let { pageNo } = this.props.match.params;
        let tempData = array.slice(pageNo === "1" ? 1 : (pageNo - 1) * page_size, pageNo * page_size);
        return <Fragment>
            {
                tempData.length > 0 ?
                    tempData.map(job =>
                        <Job key={job.id} job={job} />
                    ) :
                    <div>
                        <div className="card card-body mb-3" style={{}}>
                            <div className="row">
                                <h6 style={{ marginLeft: '10px' }}>No Jobs Found!</h6>
                            </div>
                        </div>
                    </div>
            }
        </Fragment>
    }

    render() {
        const { pageNo } = this.props.match.params;
        const prevPage = (parseInt(pageNo) - 1) <= 0 ? 1 : parseInt(pageNo) - 1;
        const nextPage = parseInt(pageNo) + 1 > 8 ? 8 : parseInt(pageNo) + 1;
        return (
            <Fragment>
                <br />
                <div className="row">
                    <div className="col">
                        <h1 className="display-4.my-3">Jobs</h1>
                    </div>
                    <div className="col">
                        <select className="form-control" style={{ float: 'right', width: '150px' }} id="select" value={this.state.jobType} onChange={e => this.setState({ ...this.state, jobType: e.target.value })}>
                            <option value="all">All</option>
                            <option value="fullTime">Full-time</option>
                            <option value="partTime">Part-time</option>
                        </select>
                    </div>
                </div>


                <br />
                {
                    this.state.data === null ? <Query query={JOBS_QUERY}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) return <h4>Loading...</h4>
                                if (error) console.log(error);

                                this.setState({ ...this.state, data: data });
                                return null;
                            }
                        }
                    </Query> : this.paginate()

                }
                {
                    this.state.data != null ?
                        <div style={{ float: 'right' }}>
                            <ul className="pagination">
                                <li className="page-item">
                                    <Link to={`/${prevPage}`} className="page-link" href="#">&laquo;</Link>
                                </li>
                                <li className={`page-item ${pageNo === "1" ? 'active' : null}`}>
                                    <Link to='/1' className="page-link" href="#">1</Link>
                                </li>
                                <li className={`page-item ${pageNo === "2" ? 'active' : null}`}>
                                    <Link to='/2' className="page-link" href="#">2</Link>
                                </li>
                                <li className={`page-item ${pageNo === "3" ? 'active' : null}`}>
                                    <Link to='/3' className="page-link" href="#">3</Link>
                                </li>
                                <li className={`page-item ${pageNo === "4" ? 'active' : null}`}>
                                    <Link to='/4' className="page-link" href="#">4</Link>
                                </li>
                                <li className={`page-item ${pageNo === "5" ? 'active' : null}`}>
                                    <Link to='/5' className="page-link" href="#">5</Link>
                                </li>
                                <li className="page-item">
                                    <Link to={`/${nextPage}`} className="page-link" href="#">&raquo;</Link>
                                </li>
                            </ul>
                            <br /><br /><br />
                        </div> : null
                }

                {/* <div style={{ float: 'right' }}>

                    {
                        pageNo > 1 && this.state.data != null ? <Link to={`/${prevPage}`} className="btn btn-primary" style={{ marginRight: "10px" }}>Prev</Link> : null
                    }

                    {
                        this.state.data != null ? <Link to="/1" className="btn btn-primary" style={{ marginRight: "10px" }}>1</Link> : null
                    }

                    {
                        this.state.data != null ? <Link to="/1" className="btn btn-primary" style={{ marginRight: "10px" }}>2</Link> : null
                    }

                    {
                        this.state.data != null ? <Link to="/1" className="btn btn-primary" style={{ marginRight: "10px" }}>3</Link> : null
                    }

                    {
                        this.state.data != null ? <Link to="/1" className="btn btn-primary" style={{ marginRight: "10px" }}>4</Link> : null
                    }


                    {
                        pageNo < 8 && this.state.data != null ? <Link to={`/${nextPage}`} className="btn btn-primary" style={{ marginLeft: "10px" }}>Next</Link> : null
                    }
                    <br /><br /><br />
                </div> */}
            </Fragment >
        )
    }
}

export default Jobs
