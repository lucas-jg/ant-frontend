import React from "react";
import Link from "next/link";
import Head from "next/head";
import { withRouter } from "next/router";
import { Layout as AntLayout, Menu, Row, Col } from "antd";

class Layout extends React.Component {
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
	render() {
		const { isAuthenticated, children } = this.props;
		const { Header, Content, Footer, Sider } = AntLayout;
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
				<AntLayout>
					<Header>
						<div className="logo" />
						<Menu
							// theme="dark"
							mode="horizontal"
							// mode="inline"
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
										<a className="nav-link"> Video</a>
									</Link>
								</Menu.Item>
							)}
						</Menu>
					</Header>
					<Content style={{ margin: "50px 0", minHeight: "800px" }}>
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

export default withRouter(Layout);
