import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { HashRouter, Route, Link, Switch, withRouter } from 'react-router-dom'
import MyTable from './MyTable'
import Subscription from './Subscription'
import ManageUsers from './ManageUsers'
import Settings from './Settings'
import UploadVideos from './UploadVideos'
import Children from './Children'
import Videos from './Videos'

import TestPage from './TestPage'

import 'bootstrap/dist/css/bootstrap.css'
import './scss/style.scss'
import './main.css'

window.React = React

const contentNode = document.getElementById('contents');


const NavBar = () => (
	<nav>
	    <ul>
	      <li>
	        <Link to="/">Settings</Link>
	      </li>
	      <li>
	        <Link to="/uploadVideos">Upload MP4</Link>
	      </li>
	      <li>
	        <Link to="/manageUsers">Manage Users</Link>
	      </li>
	      <li>
	        <Link to="/subscription">Subscriptions</Link>
	      </li>
	      <li>
	        <Link to="/children">Children</Link>
	      </li>
	      <li>
	        <Link to="/videos">Videos</Link>
	      </li>
	    </ul>
    </nav>
)


const NoMatch = () => <p>Page Not Found!</p>


const RoutedApp = () => (
	<HashRouter >
		<div className="table-wrapper" >
   			<NavBar />
			<div class="content">
				<Switch>
					<Route exact path="/" component={Settings} />
					<Route path="/uploadVideos" component={UploadVideos} />
					<Route path="/manageUsers" component={ManageUsers} />
					<Route path="/subscription" component={Subscription} />
					<Route path="/children" component={Children} />	
					<Route path="/videos" component={Videos} />
					{/* <Route path="/test" component={withRouter(TestPage)} /> */}
					<Route path="*" component={NoMatch} />
				</Switch>
			</div>
		</div>
	</HashRouter>
)


const component = <RoutedApp />;

ReactDOM.render(component, contentNode);
