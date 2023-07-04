import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import MyTable from './MyTable'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

//import ReactJWPlayer from 'react-jw-player';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'


class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false
         }
    }

  handleClose = () => this.setState({show: false});
  handleShow = () => this.setState({show: true});

  render() {
    const { video } = this.props;
    const { show } = this.state;
    return (
        <div>
          <Button variant="primary" size="sm" onClick={this.handleShow}>
            Play
          </Button>
    {/*
          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>{video}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
      */}
        <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.children}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
        </Modal>

        </div>
      )
  }
}

const VideoPlayerWrapper = ({file}) => {
    return (
        <ReactJWPlayer
            playerId='my-first-video'
            playerScript='https://cdn.jwplayer.com/libraries/MnUfcQHd.js'
            file={file}
        />
    )
}


class TestPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            headings: [],
            contents: []
         }
    }

    componentDidMount() {
        //this.loadData();
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

        const vid = <ReactJWPlayer
                    playerId='my-first-video'
                    playerScript='https://cdn.jwplayer.com/libraries/MnUfcQHd.js'
                    file='https://content.jwplatform.com/videos/qy5InTEI-YtouDePl.mp4'
                />

        return (
            <div>
              <Example>
                <VideoPlayerWrapper file='https://content.jwplatform.com/videos/qy5InTEI-YtouDePl.mp4' />
              </Example>
              <br/>
              <Example>
                Video Two
              </Example>
              <a href="files/Syllabus.pdf" target="_blank">View PDF</a>
        {/*
              <Example video={vid} />
              <br/>
              <Example video="video two" />
              <br/>
              <Example video={
                <ReactJWPlayer
                    playerId='my-first-video'
                    playerScript='https://cdn.jwplayer.com/libraries/MnUfcQHd.js'
                    file='https://content.jwplatform.com/videos/qy5InTEI-YtouDePl.mp4'
                />} 
              />
         */}

              {/*
                <ReactJWPlayer
                    playerId='my-first-video'
                    playerScript='https://cdn.jwplayer.com/libraries/MnUfcQHd.js'
                    file='https://content.jwplatform.com/videos/qy5InTEI-YtouDePl.mp4'
                />

              <ReactJWPlayer
                playerId='my-first-video'
                playerScript='https://cdn.jwplayer.com/libraries/MnUfcQHd.js'
                playlist='https://cdn.jwplayer.com/v2/playlists/MaD5dWYp'
              />
              */}
             {/*
               <Card>
                    <Card.Header>Test Data</Card.Header>
                    <Card.Body>
                        <MyTable headings={this.state.headings} contents={this.state.contents} />
                    </Card.Body>
                </Card>
             */}
            </div>
        )
    }
}

export default TestPage