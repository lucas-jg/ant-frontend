import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import { Layout as AntLayout, Menu, Button, Icon } from 'antd'
import LogoIcon from '../../../../assets/image/logo.png'
import { getUserFromLocalCookie, unsetToken } from '../../../lib/auth'
import { menuList } from './MenuList'

class Layout extends React.Component {
	constructor(props) {
		super(props)
	}
	static async getInitialProps({ req }) {
		let pageProps = {}
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		console.log(`req : ${req}`)

		return { pageProps }
	}
	render() {
		const { isAuthenticated, children, media } = this.props
		const { Header, Content, Footer, Sider } = AntLayout
		const title = 'Welcome to Pixel'
		const path = this.props.router.asPath.split('/')[1]
		const menuKey = new Array(path.length < 1 ? 'home' : path)
		const loggedUser = getUserFromLocalCookie()

		return (
			<>
				<Head>
					<title>{title}</title>
					<meta charSet="utf-8" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<AntLayout>
					<Header>
						{media !== '' && (
							<>
								<div className="logo">
									<Link href="/">
										<img
											alt="header-logo"
											className="header-logo"
											src={LogoIcon}
											onClick={() => Router.push('/')}
										/>
									</Link>
								</div>
								<div className="header-btn">
									{!loggedUser ? (
										<>
											<Button
												type="link"
												onClick={e => Router.push('/signin')}
												style={{ margin: '0 10px' }}
											>
												로그인
											</Button>
											<Button
												type="link"
												onClick={e => Router.push('/signup')}
												style={{ marginRight: '30px' }}
											>
												회원가입
											</Button>
										</>
									) : (
										<Button
											type="link"
											onClick={unsetToken}
											style={{ margin: '0 10px' }}
										>
											로그아웃
										</Button>
									)}
								</div>
								<Menu
									// theme="dark"
									mode="horizontal"
									// mode="inline"
									style={{ lineHeight: '64px' }}
									selectedKeys={menuKey}
								>
									{menuList.map(v => {
										if (v.isAuthenticated) {
											if (!loggedUser) return null
										}
										return (
											<Menu.Item key={v.icon}>
												<Link href={v.href}>
													<a className="navbar-brand">
														<Icon type={v.icon} theme="outlined" />
														{v.name}
													</a>
												</Link>
											</Menu.Item>
										)
									})}
								</Menu>
							</>
						)}
					</Header>
					<Content style={{ margin: '30px 0', minHeight: '589px' }}>
						<div className="content-template">
							<div className="content-children">{children}</div>
						</div>
					</Content>
					<Footer>Footer</Footer>
				</AntLayout>
				<style jsx>{`
					/** Noto Sans KR  100,300,400,500,700,900 */
					@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
					/** Hanna 400 */
					@import url(//fonts.googleapis.com/earlyaccess/hanna.css);
					* {
						font-family: 'Hanna';
						font-size: 15px;
					}
					.logo {
						width: 200px;
						height: 31px;
						margin: 16px 28px 16px 0;
						float: left;
					}
					.menu {
					}

					.header-btn {
						float: right;
					}

					.header-logo {
						width: 140px;
						margin-top: -30px;
						margin-left: 20px;
						cursor: pointer;
					}
					.footer-logo {
						margin: 20px 0;
					}
					.footer-template {
						display: flex;
						justify-content: flex-start;
						align-items: flex-start;
					}
					.footer-text {
						margin-left: 40px;
					}
					.footer-a {
						color: #1a25bb;
						margin-left: 10px;
					}
					.content-template {
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.content-children {
						width: 960px;
					}
				`}</style>
			</>
		)
	}
}

export default withRouter(Layout)
