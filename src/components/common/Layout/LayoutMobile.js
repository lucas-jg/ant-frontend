import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import { Layout as AntLayout, Menu, Row, Col, Drawer, Button, Icon } from 'antd'
import { compose } from 'recompose'
import LogoIcon from '../../../../assets/image/logo.png'
import LogoTextIcon from '../../../../assets/image/logo_text.png'
import { getUserFromLocalCookie, unsetToken } from '../../../lib/auth'
import { menuList } from './MenuList'
import ButtomSticky from '../ButtomSticky'

class LayoutMobile extends React.Component {
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

    state = { visible: false, placement: 'right', fontFamily: 'Noto Sans KR' }

    showDrawer = () => {
        this.setState({
            visible: true
        })
    }

    onClose = () => {
        this.setState({
            visible: false
        })
    }

    onChange = e => {
        this.setState({
            placement: e.target.value
        })
    }

    changeFamily = family => {
        this.setState({ fontFamily: family })
    }

    render() {
        const { isAuthenticated, children, media } = this.props
        const { Header, Content, Footer } = AntLayout
        const title = 'Welcome to Pixel'
        const path = this.props.router.asPath.split('/')[1]
        const menuKey = new Array(path.length < 1 ? 'home' : path)
        const loggedUser = getUserFromLocalCookie()

        const iconStyle = {
            fontSize: '23px',
            margin: '21px 5px 0 0'
            // height: '25px'
        }

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
                        /** Hanna 400 */
                        @import url(//fonts.googleapis.com/earlyaccess/hanna.css);
                        * {
                            font-family: 'Hanna';
                            font-size: 15px;
                        }
                    `}
                </style>
                <AntLayout>
                    <Header style={{ padding: '0 10px' }}>
                        {media !== '' && (
                            <div className="mobile-header-template">
                                <img
                                    className="mobile-logo"
                                    alt="logo"
                                    src={LogoIcon}
                                    onClick={() => Router.push('/')}
                                />
                                <img
                                    className="mobile-logo-text"
                                    alt="LogoTextIcon"
                                    src={LogoTextIcon}
                                    onClick={() => Router.push('/')}
                                />
                                <Icon type="menu" onClick={this.showDrawer} style={iconStyle} />
                            </div>
                        )}
                    </Header>
                    <Content style={{ margin: '50px 0', minHeight: '800px' }}>
                        <Drawer
                            title="Welcome to Pixel"
                            placement={this.state.placement}
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <Menu style={{ lineHeight: '64px' }} selectedKeys={menuKey}>
                                {menuList.map(v => {
                                    if (v.isAuthenticated) {
                                        if (!loggedUser) return null
                                    }
                                    return (
                                        <Menu.Item key={v.icon}>
                                            <Link href={v.href}>
                                                <a
                                                    className="navbar-brand"
                                                    style={{ color: '#333333' }}
                                                >
                                                    <Icon type={v.icon} theme="outlined" />
                                                    {v.name}
                                                </a>
                                            </Link>
                                        </Menu.Item>
                                    )
                                })}
                                <div className="menu-blank" />
                                {loggedUser ? (
                                    <div
                                        className="navbar-brand"
                                        style={{ color: '#333333' }}
                                        onClick={() => {
                                            unsetToken()
                                            this.onClose()
                                        }}
                                    >
                                        로그아웃
                                    </div>
                                ) : (
                                    <Link href="/signin">
                                        <a
                                            className="navbar-brand"
                                            style={{ color: '#333333', padding: '15px' }}
                                            onClick={this.onClose}
                                        >
                                            로그인
                                        </a>
                                    </Link>
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
                    <ButtomSticky />
                </AntLayout>
                <style jsx>
                    {`
                        .mobile-header-template {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-start;
                            width: 100%;
                        }
                        .mobile-logo {
                            height: 40px;
                            margin-top: 13px;
                        }
                        .mobile-logo-text {
                            margin-top: 13px;
                            height: 40px;
                        }
                        .mobile-header {
                            margin-top: 7px;
                        }
                        .menu-blank {
                            background: gray;
                            height: 20px;
                        }
                    `}
                </style>
            </>
        )
    }
}

export default compose(withRouter)(LayoutMobile)
