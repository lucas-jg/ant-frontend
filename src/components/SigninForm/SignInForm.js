import { strapiLogin } from '../../lib/auth'
import Router from 'next/router'
import { Form, Input, Button, Icon } from 'antd'
import Cookies from 'js-cookie'

const { Item } = Form

class SignInForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {
				email: '',
				password: ''
			},
			loading: false,
			error: ''
		}
	}

	componentDidMount() {
		if (this.props.isAuthenticated) {
			// redirect if you're already logged in
			Router.push('/')
		}
	}

	onChange = (propertyName, event) => {
		const { data } = this.state
		data[propertyName] = event.target.value
		this.setState({ data })
	}

	onSubmit = () => {
		const {
			data: { email, username, password }
		} = this.state
		const { context } = this.props

		this.setState({ loading: true })

		strapiLogin(email, password).then(() => console.log(Cookies.get('user')))
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
				strapiLogin(values.email, values.password).then(() =>
					console.log(Cookies.get('user'))
				)
			}
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form
		const { media } = this.props
		const titleSize = media === 'xs' ? '30px' : '50px'
		return (
			<>
				<div className="signin-template">
					<div className="signin-title">로그인</div>
					<Form
						onSubmit={this.handleSubmit}
						className="login-form"
						style={{ width: '100%' }}
					>
						<Item>
							{getFieldDecorator('email', {
								rules: [
									{
										type: 'email',
										message: '유효한 이메일을 입력해주세요.'
									},
									{ required: true, message: '이메일을 입력해주세요.' }
								]
							})(
								<Input
									prefix={
										<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
									}
									placeholder="Email"
								/>
							)}
						</Item>
						<Item>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '비밀번호를 입력해주세요.' }]
							})(
								<Input
									prefix={
										<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
									}
									type="password"
									placeholder="Password"
								/>
							)}
						</Item>
						<Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
								style={{ width: '100%' }}
							>
								로그인
							</Button>
							<a href="/signup"> 회원가입</a>
						</Item>
					</Form>
				</div>
				<style jsx>{`
					.signin-title {
						font-size: ${titleSize};
						font-weight: 500;
						margin: 30px 0;
					}
					.signin-template {
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: flex-start;
					}
					.signin-logo {
						margin: 30px;
					}
				`}</style>
			</>
		)
	}
}
export default Form.create({ name: 'normal_login' })(SignInForm)
