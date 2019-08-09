import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import Router from 'next/router'

class BestCategory extends React.Component {
    render() {
        const {
            data: { loading, error, hashtags }
        } = this.props

        if (error) return 'Error Best Category'

        if (hashtags) {
            return (
                <>
                    <div className="best-category-template">
                        <h3>인기 카테고리</h3>
                        <div className="best-category-flex">
                            {hashtags.map((hashtag, i) => (
                                <div
                                    className="best-category-button"
                                    key={i}
                                    onClick={() => Router.push(`/search?tag=${hashtag.tag}`)}
                                >
                                    {hashtag.tag}
                                </div>
                            ))}
                        </div>
                    </div>
                    <style jsx>
                        {`
                            h3 {
                                color: #353d8a;
                            }
                            .best-category-template {
                                padding-top: 20px;
                            }
                            .best-category-flex {
                                display: flex;
                                padding: 0 10px;
                                justify-content: space-between;
                            }
                            .best-category-button {
                                width: 75px;
                                height: 30px;
                                line-height: 30px;
                                border: 1px solid #b3b9d8;
                                color: #353d8a;
                                border-radius: 15px;
                                text-align: center;
                            }

                            .best-category-button:hover {
                                border: 1px solid #353d8a;
                            }
                        `}
                    </style>
                </>
            )
        }

        return <h1>No hashtags found</h1>
    }
}

const GET_BEST_CATEGORY = gql`
    query {
        hashtags(sort: "classes:desc", limit: 4) {
            tag
            id
        }
    }
`

export default compose(
    graphql(GET_BEST_CATEGORY, {
        props: ({ data }) => ({ data })
    })
)(BestCategory)
