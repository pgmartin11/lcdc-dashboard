import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Link } from 'react-router-dom'
import MyTable from './MyTable'
import VideoFilter from './VideoFilter'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MultiSelect from "@khanacademy/react-multi-select";
import axios from 'axios'
import VideoModal, { VideoPlayerWrapper } from './VideoPlayer'

import './scss/videos.scss'


class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headings: [],
            contents: [],
            videoList: []
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
        axios.get(`/api/videos${filterParams}`)
            .then((response) => {
                const {video_child, child_name} = response.data._metadata;

                let contents = response.data.records.map((row) => {
                    let arr = [];

                    arr.push(row._id.substr(-4));
                    arr.push(row.title);
                    arr.push(row.category);
                    arr.push(row.description);
                    arr.push(row.viewing_duration);

                    if (video_child[row._id.valueOf()]) {
                        arr.push(video_child[row._id.valueOf()].map(id => <Link to={`/children?id=${id}`}>{child_name[id] ? child_name[id] : id}</Link>));
                    } else {
                        arr.push('');
                    }

                    // video
                    const vid = <VideoModal>
                                    <VideoPlayerWrapper file='https://content.jwplatform.com/videos/qy5InTEI-YtouDePl.mp4' />
                                </VideoModal>
                    arr.push(vid);
               
                    return arr; 
                })

                axios.get('/api/videos/items')
                    .then(response => {
                        const videoList = response.data.list,
                            selected = filterParams.match(/[a-f\d]{24}/ig);

                        this.setState({
                            headings: ['ID', 'Title', 'Category', 'Description', 'Duration', 'Associated Child', 'Action'],
                            contents,
                            videoList,
                            selected: selected ? selected : []
                        });
                    })
                    .catch(error => {
                        // handle error
                        console.log(error);
                    }); 
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }

	render() {
        const { videoList } = this.state;

        let searchParams =  new URLSearchParams(this.props.location.search),
            currentFilter = {};

        if (searchParams.has('id')) {
            currentFilter.videoIds = searchParams.getAll('id');
        }
        
		return (
			<Card>
	      		<Card.Header>Videos</Card.Header>
	      		<Card.Body>
                    <VideoFilter
                        videoList={videoList}
                        currentFilter={currentFilter}
                        filterHandler={this.filterHandler}
                    />
                    <MyTable headings={this.state.headings} contents={this.state.contents} />
                </Card.Body>
			</Card>
		)
	}
}

export default Videos