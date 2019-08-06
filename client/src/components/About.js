import React, { Component } from 'react'
import { Container, Image} from './common'
import Logo from '../assets/Monty-logo2.png'

export default class About extends Component {
	render() {
		return (
			// main container. Outlines???????
			<Container>
				{/* content container */}
				<Container>
					{/* text container */}
					<Container>
						<h3>Native Bahamian - Natural Entrepreneur</h3>
						<p>Born and raised on the islands with my family, having people find a solution to a less expemnsive way, discounted, on the most recent products</p>
						<p>We offer many types,styles, and conditions to meet everyone's needs for different affordable prices.</p>
					</Container>
					{/* logo container */}
					<Container>
						<Image source={Logo} alt='Logo' />
					</Container>
				</Container>
			</Container>
		)
	}
}
