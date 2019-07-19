import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'recompose'
import PlanClassList from '../common/PlanClassList'
import { Card, Row, Col, Spin } from 'antd'

class PlanList extends React.Component {
    render() {
        const {
            data: { loading, error, plans }
        } = this.props

        if (error) return `Error loading plan : ${error}`

        if (plans) {
            {
                return plans.map((plan, i) => (
                    <Row key={i}>
                        <Col>
                            <PlanClassList planId={plan.id} />
                        </Col>
                    </Row>
                ))
            }
        }

        return (
            <h1>
                <Spin size="large" />
            </h1>
        )
    }
}

const GET_PLAN_LIST = gql`
    query {
        plans(where: { isBanner: false, isActive: true }) {
            id
        }
    }
`
export default compose(
    graphql(GET_PLAN_LIST, {
        props: ({ data }) => ({ data })
    })
)(PlanList)
