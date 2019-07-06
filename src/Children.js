import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Link } from 'react-router-dom'
import MyTable from './MyTable'
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
            list: [],
            selected: []
         }
    }

    componentDidMount() {
        this.loadData(this.props.location.search);
    }

    applyFilter = () => {
        const { selected } = this.state;
        let params;
        if (selected) {
            params = selected.map(param => (`id=${encodeURIComponent(param)}`)).join('&');
        }

        this.loadData(`?${params}`);
    }

    loadData = (filterParams) => {
        axios.get(`/api/children${filterParams}`)
            .then(response => {
                const {video_name} = response.data._metadata;

                let contents = response.data.records.map((row) => {
                    let arr = [];

                    arr.push(row._id.substr(-4));
                    arr.push(`${row.firstname} ${row.lastname}`);
                    arr.push(row.alias);
                    arr.push(row.videos.map(id => <Link to={`/videos?id=${id}`}>{video_name[id] ? video_name[id] : id}</Link>));

                    return arr;
                })

                axios.get('/api/children/items')
                    .then(response => {
                       const list = response.data.list,
                            selected = filterParams.match(/[a-f\d]{24}/ig);                        

                        this.setState({
                            headings: ['ID', 'Name', 'Alias', 'Videos'],
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
        const { list, selected } = this.state;

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