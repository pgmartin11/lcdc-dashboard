import React from 'react'
import ReactDOM, { render } from 'react-dom'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const Settings = () => {
  return (
    <Card>
      <Card.Header>Settings</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group as={Row} controlId="siteRoot">
            <Form.Label column sm={2}>
              Site Root
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="input" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="youtubeApiKey">
            <Form.Label column sm={2}>
              Youtube API Key
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="input" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="paypalSandbox">
        	<Form.Label column sm={2}>
        	  PayPal Sandbox?
        	</Form.Label>
        	<Col sm={10}>
        		<Form.Control as="select">
        		  <option>Yes</option>
        		  <option>No</option>
        		</Form.Control>
        	</Col>
          </Form.Group>
          <Form.Group as={Row} controlId="paypalEmail">
            <Form.Label column sm={2}>
              PayPal Email Address
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="emailHost">
            <Form.Label column sm={2}>
              Email Host
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="emailUsername">
            <Form.Label column sm={2}>
              Email Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="emailPassword">
            <Form.Label column sm={2}>
              Email Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="message">
            <Form.Label column sm={2}>
            	Message
            </Form.Label>
            <Col sm={10}>
            	<Form.Control as="textarea" rows="3" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="subject">
            <Form.Label column sm={2}>
              Subject
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="input" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="rewriteModule">
            <Form.Label column sm={2}>
              Rewrite Module
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="input" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="videosPerPage">
            <Form.Label column sm={2}>
              Videos Per Page
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="input" placeholder="" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="videoTextLength">
            <Form.Label column sm={2}>
              Video Text Length
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="input" placeholder="" />
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Settings
