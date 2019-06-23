import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import MyTable from './MyTable'
import Card from 'react-bootstrap/Card'
import axios from 'axios'


class Children extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headings: [],
            contents: []
         }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        axios.get(`/api/children${this.props.location.search}`)
            .then((response) => {
                let contents = response.data.records.map((row) => {
                    let arr = [];
                    arr.push(row._id);
                    arr.push(row.firstname + ' ' + row.lastname);
                    arr.push(row.alias);
                    //videos
                    arr.push('');

                    return arr;
                })

                this.setState({
                    headings: ['ID', 'Name', 'Alias', 'Videos'],
                    contents: contents
                });
            })
            .catch((error) => {
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