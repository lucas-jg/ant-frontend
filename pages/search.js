import { compose } from 'recompose'
import { withRouter } from 'next/router'

class Search extends React.Component {
    render() {
        return <div>Search : {this.props.router.query.tag}</div>
    }
}

export default compose(withRouter)(Search)
