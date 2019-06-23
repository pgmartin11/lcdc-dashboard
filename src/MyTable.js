import React from 'react'
import ReactDOM, { render } from 'react-dom'
import Table from 'react-bootstrap/Table'

import './scss/table.scss'

const MyTable = ({headings, contents}) => {
	let i = 0,
		j = 0,
		k = 0;

	return (
		<Table striped bordered hover>
		    <thead>
				<tr>
				{
					headings.map(heading =>
						<th key={i++}>{heading}</th>
					)
				}
				</tr>
		  	</thead>
		  	<tbody>
			{
				contents.map(row => 
					<tr key={j++}>
					{ row.map(el => 
						<td key={k++}>{el}</td>
					  )
					}
					</tr>
				)
			}
		  	</tbody>
		</Table>
	);
}

export default MyTable