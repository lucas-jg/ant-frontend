import React from 'react'
import { Row, Col } from 'antd'
import SignInForm from '../src/components/SigninForm'

class SignIn extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={{ span: 22, offset: 1 }} xl={{ span: 12, offset: 6 }}>
                    <SignInForm {...this.props} />
                </Col>
            </Row>
        )
    }
}
export default SignIn
