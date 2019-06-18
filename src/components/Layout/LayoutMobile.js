import React from "react";
import Link from "next/link";
import Head from "next/head";
import { withRouter } from "next/router";
import { Layout as AntLayout, Menu, Row, Col, Drawer, Button, Icon } from "antd";
import { compose } from "recompose";

class LayoutMobile extends React.Component {
	constructor(props) {
		super(props);
	}
	static async getInitialProps({ req }) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		console.log(`req : ${req}`);

		return { pageProps };
	}

	state = { visible: false, placement: "left", fontFamily: "Noto Sans KR" };

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	onChange = e => {
		this.setState({
			placement: e.target.value
		});
	};

	changeFamily = family => {
		this.setState({ fontFamily: family });
	};

	render() {
		const { isAuthenticated, children } = this.props;
		const { Header, Content, Footer } = AntLayout;
		const title = "Welcome to Nextjs";
		const path = this.props.router.asPath.split("/")[1];
		const menuKey = new Array(path.length < 1 ? "home" : path);

		return (
			<>
				<Head>
					<title>{title}</title>
					<meta charSet="utf-8" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<style jsx>
					{`
						/** Noto Sans KR  100,300,400,500,700,900 */
						@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
						/** Nanum Gothic  400,700,800 */
						@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
						/** Nanum Myeongjo  400,600,700 */
						@import url(//fonts.googleapis.com/earlyaccess/nanummyeongjo.css);
						/** Nanum Gothic Coding  400,700 */
						@import url(//fonts.googleapis.com/earlyaccess/nanumgothiccoding.css);
						/** Nanum Brush Script  400 */
						@import url(//fonts.googleapis.com/earlyaccess/nanumbrushscript.css);
						/** Nanum Pen Script  400 */
						@import url(//fonts.googleapis.com/earlyaccess/nanumpenscript.css);
						/** Jeju Gothic  400 */
						@import url(//fonts.googleapis.com/earlyaccess/jejugothic.css);
						/** Jeju Hallasan  400 */
						@import url(//fonts.googleapis.com/earlyaccess/jejuhallasan.css);
						/** Jeju Myeongjo  400 */
						@import url(//fonts.googleapis.com/earlyaccess/jejumyeongjo.css);
						/** Hanna 400 */
						@import url(//fonts.googleapis.com/earlyaccess/hanna.css);
						* {
							font-family: ${this.state.fontFamily};
							font-size: 15px;
						}
					`}
				</style>
				<AntLayout>
					<Header>
						<div className="logo" />
						<Button type="dashed" onClick={this.showDrawer}>
							<Icon type="menu-fold" />
							열기
						</Button>
						<Button type="dashed" onClick={e => this.changeFamily("Noto Sans KR")}>
							Noto Sans KR
						</Button>
						<Button type="dashed" onClick={e => this.changeFamily("Hanna")}>
							Hanna
						</Button>
						<Button type="dashed" onClick={e => this.changeFamily("Jeju Gothic")}>
							Jeju Gothic
						</Button>
						<Button type="dashed" onClick={e => this.changeFamily("Nanum Gothic")}>
							Nanum Gothic
						</Button>
						<Button type="dashed" onClick={e => this.changeFamily("Nanum Myeongjo")}>
							Nanum Myeongjo
						</Button>
						<Button
							type="dashed"
							onClick={e => this.changeFamily("Nanum Gothic Coding")}
						>
							Nanum Gothic Coding
						</Button>
						<Button
							type="dashed"
							onClick={e => this.changeFamily("Nanum Brush Script")}
						>
							Nanum Brush Script
						</Button>
						<Button type="dashed" onClick={e => this.changeFamily("Nanum Pen Script")}>
							Nanum Pen Script
						</Button>
						<Button type="dashed" onClick={e => this.changeFamily("Jeju Hallasan")}>
							Jeju Hallasan
						</Button>
						<Button type="dashed" onClick={e => this.changeFamily("Jeju Myeongjo")}>
							Jeju Myeongjo
						</Button>
					</Header>
					<Content style={{ margin: "50px 0", minHeight: "800px" }}>
						<Drawer
							title="Basic Drawer"
							placement={this.state.placement}
							closable={false}
							onClose={this.onClose}
							visible={this.state.visible}
						>
							<Menu
								// theme="dark"
								// mode="horizontal"
								mode="inline"
								style={{ lineHeight: "64px" }}
								defaultSelectedKeys={menuKey}
							>
								<Menu.Item key="home">
									<Link href="/">
										<a className="navbar-brand">Home</a>
									</Link>
								</Menu.Item>

								{isAuthenticated ? (
									<Menu.Item key="editor">
										<Link href="/">
											<a className="nav-link">Logout</a>
										</Link>
									</Menu.Item>
								) : (
									<Menu.Item key="editor">
										<Link href="/editor">
											<a className="nav-link">Editor</a>
										</Link>
									</Menu.Item>
								)}

								{!isAuthenticated && (
									<Menu.Item key="video">
										<Link href="/video">
											<a className="nav-link">Video</a>
										</Link>
									</Menu.Item>
								)}
							</Menu>
						</Drawer>
						<Row>
							<Col xs={{ span: 22, offset: 1 }} xl={{ span: 16, offset: 4 }}>
								{children}
							</Col>
						</Row>
					</Content>
					<Footer>Footer</Footer>
				</AntLayout>
			</>
		);
	}
}

export default compose(withRouter)(LayoutMobile);
