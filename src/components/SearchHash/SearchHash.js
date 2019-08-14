import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import Link from 'next/link'
import { backendHost } from '../../lib/common'
import { Row, Col, Card, Empty } from 'antd'

class SearchHash extends React.Component {
    render() {
        const {
            data: { loading, error, hashtags }
        } = this.props

        if (error) return 'Error Best Category'

        if (hashtags) {
            return (
                <>
                    {hashtags.map((hashtag, i) => (
                        <>
                            <h3>{hashtag.tag}</h3>
                            <Row gutter={8}>
                                {hashtag.classes.map(planClass => (
                                    <Col xs={12} lg={6} key={planClass.id}>
                                        <Link
                                            as={`/classes/${planClass.id}`}
                                            href={`/classes?id=${planClass.id}`}
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
                                                            backendHost +
                                                            '/' +
                                                            planClass.thumbnail[0].url
                                                        }
                                                    />
                                                }
                                                key={planClass.id}
                                            >
                                                <div className="card-text">
                                                    {planClass.title}
                                                    <p>{planClass.description}</p>
                                                </div>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    ))}
                    <style jsx>
                        {`
                            h3 {
                                color: #353d8a;
                                margin: 20px 0 0 0;
                            }
                        `}
                    </style>
                </>
            )
        }

        return <Empty />
    }
}

const GET_TAG_CLASSES = gql`
    query($tag: JSON!) {
        hashtags(where: $tag) {
            tag
            classes {
                id
                title
                description
                price
                thumbnail {
                    url
                }
                owner {
                    username
                    email
                }
            }
        }
    }
`

export default compose(
    graphql(GET_TAG_CLASSES, {
        options: props => {
            return {
                variables: {
                    tag: { tag_contains: props.tag }
                }
            }
        },
        props: ({ data }) => ({ data })
    })
)(SearchHash)
