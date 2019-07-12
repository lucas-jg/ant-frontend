/* /lib/apollo.js */

import { HttpLink } from 'apollo-link-http'
import { withData } from 'next-apollo'
import { backendHost } from '../lib/common'

const config = {
    link: new HttpLink({
        uri: `${backendHost}/graphql` // Server URL (must be absolute)
    })
}
export default withData(config)
