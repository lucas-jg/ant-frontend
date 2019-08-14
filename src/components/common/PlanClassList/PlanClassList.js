import Link from 'next/link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, Row, Col, Spin } from 'antd'
import { backendHost } from '../../../lib/common'
import { compose } from 'recompose'

class PlanClassList extends React.Component {
    RenderWidePattern = ({ plan }) => {
        return (
            <>
                <Row gutter={8}>
                    {plan.plannedclasses.map(planClass => (
                        <Col xs={24} lg={12} key={planClass.target.id}>
                            <Link
                                as={`/classes/${planClass.target.id}`}
                                href={`/classes?id=${planClass.target.id}`}
                            >
                                <div className="wide-template">
                                    <img
                                        className="wide-cover-img"
                                        alt="example"
                                        src={backendHost + '/' + planClass.target.thumbnail[0].url}
                                    />
                                    <div className="wide-text">
                                        <div>{planClass.target.title}</div>
                                        <div>{planClass.target.description}</div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
                <style jsx>{`
                    .wide-template {
                        display: flex;
                        margin: 10px 0;
                    }
                    .wide-cover-img {
                        object-fit: cover;
                        width: 180px;
                        height: 80px;
                    }
                    .wide-text {
                        margin: 10px;
                    }
                `}</style>
            </>
        )
    }

    RenderDefaultPattern = ({ plan }) => {
        return (
            <Row gutter={8}>
                {plan.plannedclasses.map(planClass => (
                    <Col xs={12} lg={6} key={planClass.target.id}>
                        <Link
                            as={`/classes/${planClass.target.id}`}
                            href={`/classes?id=${planClass.target.id}`}
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
                                        src={backendHost + '/' + planClass.target.thumbnail[0].url}
                                    />
                                }
                                key={planClass.target.id}
                            >
                                <div className="card-text">
                                    {planClass.target.title}
                                    <p>{planClass.target.description}</p>
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        )
    }

    render() {
        const {
            data: { loading, error, plan }
        } = this.props
        const { RenderDefaultPattern, RenderWidePattern } = this

        if (error) return `Error loading plan : ${error}`

        if (plan) {
            const Pattern = plan.designPattern === 0 ? RenderDefaultPattern : RenderWidePattern
            return (
                <div>
                    <h3>{plan.title}</h3>
                    <Pattern plan={plan} />

                    <style jsx global>
                        {`
                            h3 {
                                color: #353d8a;
                                margin-top: 20px;
                            }
                            a {
                                color: white;
                            }
                            a:link {
                                text-decoration: none;
                                color: white;
                            }
                            a:hover {
                                color: white;
                            }
                            .card-columns {
                                column-count: 3;
                            }
                            .cover-img {
                                object-fit: cover;
                                height: 130px;
                            }
                            .card-text {
                                font-size: 14px;
                                text-overflow: 'ellipsis';
                                overflow: 'hidden';
                                white-space: 'nowrap';
                                width: 100%;
                            }
                            .card-text p {
                                font-size: 12px;
                                color: #aaa;
                            }
                        `}
                    </style>
                </div>
            )
        }

        return (
            <h1>
                <Spin size="large" />
            </h1>
        )
    }
}

const GET_PLAN_CLASSES = gql`
    query($id: ID!) {
        plan(id: $id) {
            title
            designPattern
            plannedclasses {
                target: class {
                    id
                    title
                    description
                    thumbnail {
                        url
                    }
                }
            }
        }
    }
`
export default compose(
    graphql(GET_PLAN_CLASSES, {
        options: props => {
            return {
                variables: {
                    id: props.planId
                }
            }
        },
        props: ({ data }) => ({ data })
    })
)(PlanClassList)
