import { compose } from 'recompose'
import Router, { withRouter } from 'next/router'
import SearchHash from '../src/components/SearchHash'
import { useQuery } from '@apollo/react-hooks'
import BestCategory from '../src/components/BestCategory'

class Search extends React.Component {
    render() {
        const { tag } = this.props.router.query

        if (tag) {
            return <SearchHash tag={tag} />
        }

        return (
            <>
                <BestCategory />
                <h3>방식으로 찾기</h3>
                <div className="best-category-flex">
                    <div
                        className="best-category-button"
                        onClick={() => Router.push(`/search?tag=패키지`)}
                    >
                        패키지
                    </div>
                </div>
                <h3>컨셉으로 찾기</h3>
                <div className="best-category-flex">
                    <div
                        className="best-category-button"
                        onClick={() => Router.push(`/search?tag=기초`)}
                    >
                        기초
                    </div>
                    <div
                        className="best-category-button"
                        onClick={() => Router.push(`/search?tag=원화`)}
                    >
                        원화
                    </div>
                    <div
                        className="best-category-button"
                        onClick={() => Router.push(`/search?tag=일러스트`)}
                    >
                        일러스트
                    </div>
                    <div
                        className="best-category-button"
                        onClick={() => Router.push(`/search?tag=웹툰`)}
                    >
                        웹툰
                    </div>
                </div>
                <style jsx>
                    {`
                        h3 {
                            margin: 40px 0 10px 0;
                            color: #353d8a;
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
}

export default compose(withRouter)(Search)
