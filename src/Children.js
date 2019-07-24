import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Link } from 'react-router-dom'
import MyTable from './MyTable'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MultiSelect from "@khanacademy/react-multi-select";
import axios from 'axios'


class Children extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headings: [],
            contents: [],
            age_lower: '',
            age_upper: '',
            hasUmvelt: false,
            list: [],
            selected: []
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

    handleAgeFilter = (e) => {
        const ageField = e.target.name,
            ageString = e.target.value;

        if (ageString.match(/^\d*$/)) {
            let currentState = this.state;

            currentState[ageField] = ageString;
            this.setState({ currentState });
        }
    }

    handleUmvelt = (e) => {
        this.setState({ hasUmvelt: e.target.checked });
    }

    applyFilter = () => {
        const { selected, age_lower, age_upper, hasUmvelt } = this.state;
        let queryString,
            childQuery = '',
            ageFilter = {},
            ageQuery = '',
            umveltQuery = '';

        if (selected) {
            childQuery = selected.map(param => (`id=${encodeURIComponent(param)}`)).join('&');
        }

        if (age_lower){
            ageFilter.age_lower = age_lower;
        }
        if (age_upper){
            ageFilter.age_upper = age_upper;
        }
        if (age_lower || age_upper) {
            ageQuery = new URLSearchParams(ageFilter).toString();
        }

        if (hasUmvelt) {
            umveltQuery = 'hasUmvelt=true';
        }

        // build up the query parameters
        queryString = childQuery;

        if (ageQuery) {
            queryString = queryString ? queryString.concat(`&${ageQuery}`) : ageQuery;
        }
        
        if (umveltQuery) {
            queryString = queryString ? queryString.concat(`&${umveltQuery}`) : umveltQuery;
        }

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
                       const list = response.data.list,
                            selected = filterParams.match(/[a-f\d]{24}/ig);                        

                        this.setState({
                            headings: ['ID', 'Name', 'Age', 'Alias', 'Videos'],
                            contents,
                            list,
                            selected: selected ? selected : []
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
        const { list, selected, age_lower, age_upper, hasUmvelt } = this.state;

		return (
			<Card>
	      		<Card.Header>Children</Card.Header>
	      		<Card.Body>
                    Children:
                    <Row>
                        <Col>
                            <MultiSelect
                                options={list.map(child => ({label:`${child.firstname} ${child.lastname}`, value:child._id}))}
                                selected={selected}
                                onSelectedChanged={selected => this.setState({selected})}
                            />
                        </Col>
                        <Col>
                            {/* Age <Form.Control type="input" placeholder="" /> */}
                            Age between: 
                            <input name="age_lower" value={age_lower} onChange={this.handleAgeFilter}/>
                             - 
                            <input name="age_upper" value={age_upper} onChange={this.handleAgeFilter}/>
                        </Col>
                        <Col>
                            <Form.Check 
                                type="checkbox"
                                id="child-is-umvelt"
                                label="Umvelt"
                                checked={hasUmvelt}
                                onClick={this.handleUmvelt}
                            />
                        </Col>
                        <Col>
                            <button type="button" onClick={this.applyFilter}>Activate Filter</button>
                        </Col>
                    </Row>					
                    <MyTable headings={this.state.headings} contents={this.state.contents} />
				</Card.Body>
			</Card>
		)
	}
}

export default Children