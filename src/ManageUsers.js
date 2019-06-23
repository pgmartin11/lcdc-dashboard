import React from 'react'
import ReactDOM, { render } from 'react-dom'
import MyTable from './MyTable'
import Card from 'react-bootstrap/Card'


const ManageUsers = () => {
	const headings = ['Username', 'Rold', 'Active?', ''],
		contents = [
		[
			'admin',
			'Admin',
			'User not active',
			'Edit'
		],
		[
			'Billenub',
			'',
			'User Active',
			'Edit'
		],
		[
			'charmdateMox',
			'',
			'User Active',
			'Edit'
		],
		[
			'Thomadhef',
			'',
			'User Active',
			'Edit'	
		]
	]

	return (
		<Card>
      		<Card.Header>Manage Users</Card.Header>
      		<Card.Body>
				<MyTable headings={headings} contents={contents} />
			</Card.Body>
		</Card>
	)
}

export default ManageUsers