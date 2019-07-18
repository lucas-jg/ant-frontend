/* /lib/apollo.js */

import { HttpLink } from 'apollo-link-http'
import { withData } from 'next-apollo'
import { backendHost } from '../lib/common'
import Cookies from 'js-cookie'

const config = {
	link: new HttpLink({
		uri: `${backendHost}/graphql`, // Server URL (must be absolute)
		headers: {
			Authorization: `Bearer ${Cookies.get('jwt')}`
		}
	})
}
export default withData(config)
