import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
//import MultiSelect from "@khanacademy/react-multi-select";


class VideoFilter extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            selected: [],
            filterChanged: false
         }
    }

    componentDidMount() {
        const { currentFilter } = this.props;

        this.setState({
            selected: currentFilter.hasOwnProperty('videoIds') ? currentFilter.videoIds : []
        });

    }

    componentDidUpdate(prevProps){
        const { currentFilter } = this.props;

        if (prevProps.currentFilter != currentFilter) {
            this.setState({
                selected: currentFilter.hasOwnProperty('videoIds') ? currentFilter.videoIds : [],
                filterChanged: false
            });       
        }
    }

    handleVideoFilter = (selected) => {
        this.setState({
            selected,
            filterChanged: true
        })
    }

    resetFilter = () => {
        const { currentFilter } = this.props;

        this.setState({
            selected: currentFilter.hasOwnProperty('videoIds') ? currentFilter.videoIds : [],
            filterChanged: false    
        })
    }

    clearFilter = () => {
        this.props.filterHandler(this.buildQueryString({
            selected: []    
        }));
    }

    applyFilter = () => {
        this.props.filterHandler(this.buildQueryString(this.state));
    }

    buildQueryString = ({selected}) => {
        let queryString,
            videoQuery = '';

        if (selected) {
            videoQuery = selected.map(param => (`id=${encodeURIComponent(param)}`)).join('&');
        }

        // build up the query parameters
        queryString = videoQuery;

        return queryString;
    }

    render() {
        const { selected, filterChanged } = this.state,
            { videoList } = this.props;

		return (
            <div>
                <Row>
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Videos:</Form.Label>
                        {/*
                            <MultiSelect
                                options={videoList.map(video => ({label:video.title, value:video._id}))}
                                selected={selected}
                                onSelectedChanged={this.handleVideoFilter}
                            />
                          */}
                        </Form.Group>
                    </Col>
                    <Col md={5}></Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>&nbsp;</Form.Label>
                            <ButtonToolbar>
                                <Button variant="secondary" size="sm" onClick={this.applyFilter}>Activate Filter</Button>
                                <Button variant="secondary" size="sm" onClick={this.clearFilter}>Clear Filter</Button>
                                <Button variant="secondary" size="sm" onClick={this.resetFilter} disabled={!filterChanged}>Reset</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Col>
                </Row>					
			</div>
		)
	}
}

export default VideoFilter