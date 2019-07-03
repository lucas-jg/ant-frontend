import { strapiRegister } from "../../lib/auth";
import Router from "next/router";
import { Form, Input, Button, Icon } from "antd";
import Cookies from "js-cookie";

const { Item } = Form;

class SignInForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				email: "",
				password: "",
				confirm: "",
				username: ""
			},
			loading: false,
			error: ""
		};
	}

	componentDidMount() {
		if (this.props.isAuthenticated) {
			Router.push("/"); // redirect if you're already logged in
		}
	}

	onChange = (propertyName, event) => {
		const { data } = this.state;
		data[propertyName] = event.target.value;
		this.setState({ data });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue("password")) {
			callback("입력한 두 개의 암호가 일치하지 않습니다.");
		} else {
			callback();
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
				strapiRegister(values.username, values.email, values.password)
					.then(() => console.log(Cookies.get("user")))
					.catch(e => {
						this.setState({ error: e });
						alert("중복된 이메일입니다.");
					});
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { media } = this.props;
		const titleSize = media === "xs" ? "30px" : "50px";
		return (
			<>
				<div className="signin-template">
					<div className="signin-title">회원가입</div>
					<Form
						onSubmit={this.handleSubmit}
						className="login-form"
						style={{ width: "100%" }}
					>
						<Item>
							{getFieldDecorator("username", {
								rules: [{ required: true, message: "별명을 입력해주세요." }]
							})(
								<Input
									prefix={
										<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
									}
									placeholder="Username"
								/>
							)}
						</Item>
						<Item>
							{getFieldDecorator("email", {
								rules: [
									{
										type: "email",
										message: "이메일 형식이 맞지 않습니다."
									},
									{ required: true, message: "이메일을 입력해주세요." }
								]
							})(
								<Input
									prefix={
										<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
									}
									type="email"
									placeholder="Email"
								/>
							)}
						</Item>
						<Item>
							{getFieldDecorator("password", {
								rules: [
									{
										required: true,
										// pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
										pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-=\_+]{8,}$/,
										message:
											"비밀번호는 최소 8자 이상, 영문과 숫자를 혼용하세요."
									}
								]
							})(
								<Input
									prefix={
										<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
									}
									type="password"
									placeholder="Password"
								/>
							)}
						</Item>
						<Item>
							{getFieldDecorator("confirm", {
								rules: [
									{ required: true, message: "동일한 비밀번호를 입력해주세요." },
									{
										validator: this.compareToFirstPassword
									}
								]
							})(
								<Input
									prefix={
										<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
									}
									type="password"
									placeholder="confirm"
								/>
							)}
						</Item>
						<Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
								style={{ width: "100%" }}
							>
								회원가입
							</Button>
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
		);
	}
}
export default Form.create({ name: "normal_login" })(SignInForm);
