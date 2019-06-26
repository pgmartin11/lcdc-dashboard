import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Link } from 'react-router-dom'
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
        axios.get(`/api/videos${this.props.location.search}`)
            .then((response) => {
                const {video_child, child_name} = response.data._metadata;

                let contents = response.data.records.map((row) => {
                    let arr = [];
                    arr.push(row._id);
                    arr.push(row.title);
                    arr.push(row.category);
                    arr.push(row.description);
                    arr.push(row.viewing_duration);

                    if (video_child[row._id.valueOf()]) {
                        arr.push(video_child[row._id.valueOf()].map(id => <Link to={`/children?id=${id}`}>{child_name[id] ? child_name[id] : id}</Link>));
                    } else {
                        arr.push('');
                    }
               
                    return arr; 
                })

                this.setState({
                    headings: ['ID', 'Title', 'Category', 'Description', 'Duration', 'Associated Child'],
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
	      		<Card.Header>Videos</Card.Header>
	      		<Card.Body>
					<MyTable headings={this.state.headings} contents={this.state.contents} />
				</Card.Body>
			</Card>
		)
	}
}

export default Videos