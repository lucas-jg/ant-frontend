import { Spin, Row, Col, Card, Button, Icon } from 'antd'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { backendHost } from '../src/lib/common'

class MyPage extends React.Component {
    render() {
        const {
            data: { loading, error, users }
        } = this.props

        if (error) return `Error loading users : ${error}`

        if (users) {
            return (
                <>
                    <div className="mypage-header-template">
                        <div className="mypage-header-background" />
                        <div className="mypage-header-body">
                            <img
                                className="mypage-profile-image"
                                src={backendHost + '/' + users[0].profileImage.url}
                                alt="profile"
                            />
                            <div>{users[0].username} 님</div>
                            <div>
                                <Icon type="twitter" /> https://twitter.com
                            </div>
                            <div>
                                <Icon type="facebook" /> https://www.facebook.com
                            </div>
                            <div style={{ width: '100%' }}>
                                <Button
                                    icon="heart"
                                    style={{ width: 'calc(50% - 20px)', margin: '10px' }}
                                >
                                    관심
                                </Button>
                                <Button
                                    icon="bell"
                                    style={{ width: 'calc(50% - 20px)', margin: '10px' }}
                                >
                                    소식받기
                                </Button>
                            </div>
                        </div>

                        <div className="mypage-header-background2" />
                    </div>
                    <Row gutter={8}>
                        {users[0].ownedClasses.map(targetClass => (
                            <Col xs={12} lg={6} key={targetClass.id}>
                                <Link
                                    as={`/classes/${targetClass.id}`}
                                    href={`/classes?id=${targetClass.id}`}
                                >
                                    <Card
                                        hoverable
                                        style={{
                                            width: '100%',
                                            margin: '10px 0 10px 0'
                                        }}
                                        cover={
                                            <img
                                                className="cover-img"
                                                alt="example"
                                                src={
                                                    backendHost + '/' + targetClass.thumbnail[0].url
                                                }
                                            />
                                        }
                                        key={targetClass.id}
                                    >
                                        <div className="card-text">
                                            {targetClass.title}
                                            <p>{targetClass.description}</p>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                    <style jsx>{`
                        .mypage-header-template {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                        .mypage-header-background {
                            background: #3aa1b8;
                            width: 100%;
                            height: 100px;
                        }
                        .mypage-header-background2 {
                            height: 50px;
                            width: 100%;
                        }
                        .mypage-header-body {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            margin-top: -50px;
                            color: #888;
                        }
                        .mypage-profile-image {
                            object-fit: cover;
                            width: 100px;
                            height: 100px;
                            border-radius: 50px;
                        }
                    `}</style>
                </>
            )
        }

        return (
            <h1>
                <Spin size="large" />
            </h1>
        )
    }
}

const GET_USER_INFO = gql`
    query($username: String!) {
        users(where: { username: $username }) {
            username
            email
            profileImage {
                url
            }
            ownedClasses {
                id
                title
                description
                thumbnail {
                    url
                }
            }
        }
    }
`

export default compose(
    withRouter,
    graphql(GET_USER_INFO, {
        options: props => {
            return {
                variables: {
                    username: !!props.router.query.id
                        ? props.router.query.id
                        : Cookies.get('username')
                }
            }
        },
        props: ({ data }) => ({ data })
    })
)(MyPage)
