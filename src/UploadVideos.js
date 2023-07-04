import React from 'react'
import ReactDOM, { render } from 'react-dom'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

//import ReactJWPlayer from 'react-jw-player';

const changeHandler = () => {
  //
}

const UploadVideos = () => {
    return(
      <React.Fragment>
        <Card>
          <Card.Header>Upload MP4</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group as={Row} controlId="videoTitle">
                <Form.Label column sm={2}>
                  Video Title
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="input" placeholder="" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="Category">
                <Form.Label column sm={2}>
                  Category
                </Form.Label>
                <Col sm={10}>
                  <Form.Control as="select">
                    <option>Car Repairs - Volvo</option>
                    <option>Car Repairs - Volkswagen</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="subscription">
                <Form.Label column sm={2}>
                  Subscription Required?
                </Form.Label>
                <Col sm={10}>
                  <Form.Control as="select">
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="viewingPasswords">
                <Form.Label column sm={2}>
                  Viewing Passwords
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="input" placeholder="" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="viewingDuration">
                <Form.Label column sm={2}>
                  Viewing Duration (H:m:s)
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="input" placeholder="" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="Description">
                <Form.Label column sm={2}>
                  Description
                </Form.Label>
                <Col sm={10}>
                  <Form.Control as="textarea" rows="3" />
                </Col>
              </Form.Group>
              <Form.Group>
                  <Form.Label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                      <p>Add file</p>
                      <Form.Control
                          id="fileUpload"
                          type="file"
                          accept=".pdf"
                          onChange={changeHandler}
                          style={{ display: "none" }}
                      />
                  </Form.Label>
              </Form.Group>
              <Form.Group as={Row} controlId="isFeatured">
                <Form.Label column sm={2}>
                  Is Featured?
                </Form.Label>
                <Col sm={10}>
                  <Form.Control as="select">
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="isHidden">
                <Form.Label column sm={2}>
                  Hidden?
                </Form.Label>
                <Col sm={10}>
                  <Form.Control as="select">
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="loginToView">
                <Form.Label column sm={2}>
                  Log In to View?
                </Form.Label>
                <Col sm={10}>
                  <Form.Control as="select">
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      <ReactJWPlayer
        playerId=''
        playerScript=''
        playlist=''
      />
      </React.Fragment>
  )
}

export default UploadVideos
