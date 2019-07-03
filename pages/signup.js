import React from 'react'
import { Row, Col } from 'antd'
import SignupForm from '../src/components/SignupForm'

class SignUp extends React.Component {
	render() {
		return (
			<Row>
				<Col xs={{ span: 22, offset: 1 }} xl={{ span: 12, offset: 6 }}>
					<SignupForm {...this.props} />
				</Col>
			</Row>
		)
	}
}
export default SignUp
