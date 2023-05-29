import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import MyTable from './MyTable'
import ReactJWPlayer from 'react-jw-player';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

export const VideoPlayerWrapper = ({file}) => {
    return (
        <ReactJWPlayer
            playerId='my-first-video'
            playerScript='https://cdn.jwplayer.com/libraries/MnUfcQHd.js'
            file={file}
        />
    )
}

class VideoModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false
         }
    }

  handleClose = () => this.setState({show: false});
  handleShow = () => this.setState({show: true});

  render() {
    const { show } = this.state;
    return (
        <div>
            <Button variant="primary" size="sm" onClick={this.handleShow}>
                Play
            </Button>
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

export default VideoModal
