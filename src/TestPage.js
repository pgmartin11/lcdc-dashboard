import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import MyTable from './MyTable'
import Card from 'react-bootstrap/Card'
import axios from 'axios'


class TestPage extends Component {
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
        axios.get(`/api/issues${this.props.location.search}`)
            .then((response) => {
                let contents = response.data.records.map((row) => {
                    let arr = [];
                    arr.push(row._id);
                    arr.push(row.owner);
                    arr.push(row.status);

                    return arr;
                })

                this.setState({
                    headings: ['ID', 'Owner', 'Status'],
                    contents: contents
                });
            })
            .catch((error) => {
                // handle error
            });
    }

    render() {
        let query = {status: 'Open'}

        // let pathname = this.props.location.pathname
/*
        this.props.history.push({
            pathname: '/subscription',
            search: '?' + new URLSearchParams(query).toString()
        });
 */

        return (
            <Card>
                <Card.Header>Test Data</Card.Header>
                <Card.Body>
                    <MyTable headings={this.state.headings} contents={this.state.contents} />
                </Card.Body>
            </Card>
        )
    }
}

export default TestPage