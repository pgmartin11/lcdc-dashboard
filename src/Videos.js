import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import MyTable from './MyTable'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

class Videos extends Component {
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
        axios.get('/api/videos')
            .then((response) => {
                let contents = response.data.records.map((row) => {
                    let arr = [];
                    arr.push(row._id);
                    arr.push(row.title);
                    arr.push(row.category);
                    arr.push(row.description);
                    arr.push(row.viewing_duration);

                    return arr;
                })

                this.setState({
                    headings: ['ID', 'Title', 'Category', 'Description', 'Duration'],
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
	      		<Card.Header>Subscription Plans</Card.Header>
	      		<Card.Body>
					<MyTable headings={this.state.headings} contents={this.state.contents} />
				</Card.Body>
			</Card>
		)
	}
}

export default Videos