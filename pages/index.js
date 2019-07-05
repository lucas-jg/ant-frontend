import React from 'react'

import { Row, Col } from 'antd'
import ClassList from '../src/components/common/ClassList'
import Gallery from '../src/components/common/Gallery'

export default class Index extends React.Component {
    state = {
        query: ''
    }

    onChange = e => {
        //set the state = to the input typed in the search Input Component
        //this.state.query gets passed into RestaurantList to filter the results
        this.setState({ query: e.target.value.toLowerCase() })
    }

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <Gallery bannerId={0} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ClassList title="title" />
                    </Col>
                </Row>
            </>
        )
    }
}
