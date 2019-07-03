import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Link } from 'react-router-dom'
import MyTable from './MyTable'
import Card from 'react-bootstrap/Card'
import axios from 'axios'


class Children extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headings: [],
            contents: [],
            list: []
         }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        axios.get(`/api/children${this.props.location.search}`)
            .then(response => {
                const {video_name} = response.data._metadata;

                let contents = response.data.records.map((row) => {
                    let arr = [];

                    //arr.push(row._id.substr(-4));
                    arr.push(row._id);

                    arr.push(`${row.firstname} ${row.lastname}`);
                    arr.push(row.alias);
                    arr.push(row.videos.map(id => <Link to={`/videos?id=${id}`}>{video_name[id] ? video_name[id] : id}</Link>));

                    return arr;
                })

                axios.get('/api/children/items')
                    .then(response => {

                        this.setState({
                            headings: ['ID', 'Name', 'Alias', 'Videos'],
                            contents,
                            list: response.data.list
                        });
                    })
                    .catch(error => {
                        // handle error
                    });              
            })
            .catch(error => {
                // handle error
            });
    }

    render() {
		return (
			<Card>
	      		<Card.Header>Children</Card.Header>
	      		<Card.Body>
					<MyTable headings={this.state.headings} contents={this.state.contents} />
				</Card.Body>
			</Card>
		)
	}
}

export default Children