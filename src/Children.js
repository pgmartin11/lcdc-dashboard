import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Link } from 'react-router-dom'
import MyTable from './MyTable'
import ChildFilter from './ChildFilter'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

import './scss/children.scss'


class Children extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headings: [],
            contents: [],
            childList: [],
         }
    }

    componentDidMount() {
        this.loadData(this.props.location.search);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.loadData(this.props.location.search);
        }
    }

    filterHandler = (queryString) => {
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `?${queryString}`
        });
    }

    loadData = (filterParams) => {
        axios.get(`/api/children${filterParams}`)
            .then(response => {
                const {video_name} = response.data._metadata;

                let contents = response.data.records.map((row) => {
                    let arr = [];

                    arr.push(row._id.substr(-4));
                    arr.push(`${row.firstname} ${row.lastname}`);
                    arr.push(row.age);
                    arr.push(row.alias);
                    arr.push(row.videos.map(id => <Link to={`/videos?id=${id}`}>{video_name[id] ? video_name[id] : id}</Link>));

                    return arr;
                })

                axios.get('/api/children/items')
                    .then(response => {
                       const childList = response.data.list;

                        this.setState({
                            headings: ['ID', 'Name', 'Age', 'Alias', 'Videos'],
                            contents,
                            childList
                        });
                    })
                    .catch(error => {
                        // handle error
                        console.log(error);
                    });              
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

    render() {
        const { childList } = this.state;

        // build up filter prop
        let searchParams =  new URLSearchParams(this.props.location.search),
            currentFilter = {};

        if (searchParams.has('id')) {
            currentFilter.childIds = searchParams.getAll('id');
        }
        if (searchParams.has('age_lower')) {
            currentFilter.age_lower = searchParams.getAll('age_lower')[0];
        }
        if (searchParams.has('age_upper')) {
            currentFilter.age_upper = searchParams.getAll('age_upper')[0];
        }
        if (searchParams.has('hasUmvelt')) {
            currentFilter.hasUmvelt = true;
        }

		return (
			<Card>
	      		<Card.Header>Children</Card.Header>
	      		<Card.Body>
                    <ChildFilter 
                        childList={childList}
                        currentFilter={currentFilter}
                        filterHandler={this.filterHandler}
                    />
                    <Row>
                        <Col>				
                            <MyTable headings={this.state.headings} contents={this.state.contents} />
    				    </Col>
                    </Row>
                </Card.Body>
			</Card>
		)
	}
}

export default Children