import gql from 'graphql-tag'
import { withRouter } from 'next/router'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { backendHost } from '../src/lib/common'

import { Card, Row, Col, Button, notification, Icon } from 'antd'

const { Meta } = Card

const ClassesContent = ({ target }) => {
    const { title, description, thumbnail, detailImages } = target

    return (
        <>
            <h1>{title}</h1>
            <Card cover={<img alt="cover" src={backendHost + thumbnail[0].url} />}>
                {description}
            </Card>

            {detailImages.map((detailImage, i) => (
                <img
                    className="class-detail-img"
                    alt="detail"
                    key={i}
                    src={backendHost + detailImage.url}
                />
            ))}
            <style jsx>{`
                .class-detail-img {
                    width: 100%;
                }
            `}</style>
        </>
    )
}

const ClassesInfo = ({ target }) => {
    const { title, owner, price, discountPrice } = target

    return (
        <>
            <div className="class-info-tamplate">
                <p>owner : {owner.username}</p>
                <p>price : {price}</p>
                <p>discountPrice : {discountPrice}</p>
                <Row gutter={8}>
                    <Col span={12}>
                        <Button
                            className="btn-classes-shopping"
                            icon="heart"
                            style={{ width: '100%' }}
                            type="default"
                        >
                            관심
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            className="btn-classes-shopping"
                            icon="shopping"
                            style={{ width: '100%' }}
                            type="primary"
                            onClick={e => {
                                notification.open({
                                    message: '강의 구매 실패',
                                    description:
                                        '강의 구매에 실패했습니다. 잠시후 다시 시도 해주세요.',
                                    icon: <Icon type="frown" style={{ color: '#fa8c16' }} />
                                })
                            }}
                        >
                            구매하기
                        </Button>
                    </Col>
                </Row>
            </div>
            <style jsx>{`
                .class-info-tamplate {
                    border: 2px solid #f3f3f3;
                    padding: 15px;
                    position: sticky;
                    top: 50px;
                    background: white;
                }
            `}</style>
        </>
    )
}

const ClassesLayout = ({ target, media }) => {
    const classInfoClassName = media === 'xs' ? 'class-info-fixed' : 'class-info'
    const classGutter = media === 'xs' ? 0 : 16
    const ClassInfoDOM = Col
    return (
        <>
            <Row className="classes-row" gutter={classGutter} type="flex">
                <Col xs={24} xl={17}>
                    <ClassesContent target={target} />
                </Col>
                <ClassInfoDOM className={classInfoClassName} xs={24} xl={7}>
                    <ClassesInfo target={target} />
                </ClassInfoDOM>
            </Row>
            <style jsx>
                {`
                    .class-info-fixed {
                        position: sticky;
                        bottom: 0;
                        background: white;
                    }
                `}
            </style>
        </>
    )
}

class classes extends React.Component {
    render() {
        const {
            data: { loading, error, target },
            router,
            context,
            isAuthenticated,
            media
        } = this.props
        if (error) return 'Error Loading Dishes'

        if (target) {
            return <ClassesLayout target={target} media={media} />
        } else {
            return <h1>No target found</h1>
        }
    }
}

const GET_RESTAURANT_DISHES = gql`
    query($id: ID!) {
        target: class(id: $id) {
            id
            title
            description
            price
            discountPrice
            owner {
                username
            }
            thumbnail {
                url
            }
            detailImages {
                url
            }
        }
    }
`
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)

export default compose(
    withRouter,
    graphql(GET_RESTAURANT_DISHES, {
        options: props => {
            return {
                variables: {
                    id: props.router.query.id
                }
            }
        },
        props: ({ data }) => ({ data })
    })
)(classes)
