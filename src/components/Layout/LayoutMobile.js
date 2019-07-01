import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { Layout as AntLayout, Menu, Row, Col, Drawer, Button, Icon } from 'antd'
import { compose } from 'recompose'
import LogoIcon from '../../../assets/image/logo.png'

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
        const { isAuthenticated, children } = this.props
        const { Header, Content, Footer } = AntLayout
        const title = 'Welcome to Nextjs'
        const path = this.props.router.asPath.split('/')[1]
        const menuKey = new Array(path.length < 1 ? 'home' : path)

        const iconStyle = {
            fontSize: '25px',
            lineHeight: '25px'
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
                        <div className="mobile-header-template">
                            <img className="mobile-logo" alt="logo" src={LogoIcon} />
                            <div className="mobile-header">
                                <Icon
                                    className="mobile-header-icon"
                                    type="menu-fold"
                                    onClick={this.showDrawer}
                                    style={iconStyle}
                                />
                                <Icon
                                    className="mobile-header-icon"
                                    type="login"
                                    style={iconStyle}
                                />
                            </div>
                        </div>
                    </Header>
                    <Content style={{ margin: '50px 0', minHeight: '800px' }}>
                        <Drawer
                            title="Basic Drawer"
                            placement={this.state.placement}
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <Menu
                                mode="inline"
                                style={{ lineHeight: '64px' }}
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
                <style jsx>
                    {`
                        .mobile-header-template {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 100%;
                            border: 1px solid red;
                        }
                        .mobile-logo {
                            width: 140px;
                        }
                        .mobile-header {
                        }

                        .mobile-header-icon {
                            font-size: 15px;
                        }
                    `}
                </style>
            </>
        )
    }
}

export default compose(withRouter)(LayoutMobile)
