import React from 'react'
import ReactDOM, { render } from 'react-dom'
import MyTable from './MyTable'
import Card from 'react-bootstrap/Card'


const Subscription = () => {
	const headings = ['Name', 'Category', 'Actions'],
		contents = [
		[
			'12 Months Video Streaming',
			'12 - months',
			'Demo User cannot edit plans'
		],
		[
			'6 Months Video Streaming',
			'6 - months',
			'Demo User cannot edit plans'
		],
		[
			'3 Months Video Streaming',
			'6 - months',
			'Demo User cannot edit plans'
		],
		[
			'1 Month Video Streaming',
			'1 - month',
			'Demo User cannot edit plans'	
		]
	]

	return (
		<Card>
      		<Card.Header>Subscription Plans</Card.Header>
      		<Card.Body>
				<MyTable headings={headings} contents={contents} />
			</Card.Body>
		</Card>
	)
}

export default Subscription