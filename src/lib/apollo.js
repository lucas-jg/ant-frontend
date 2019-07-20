/* /lib/apollo.js */

import { HttpLink } from 'apollo-link-http'
import { withData } from 'next-apollo'
import { backendHost } from '../lib/common'
import Cookies from 'js-cookie'

const jwt = Cookies.get('jwt')

const config = !!jwt
    ? {
          link: new HttpLink({
              uri: `${backendHost}/graphql`, // Server URL (must be absolute)
              headers: {
                  Authorization: `Bearer ${jwt}`
              }
          })
      }
    : {
          link: new HttpLink({
              uri: `${backendHost}/graphql` // Server URL (must be absolute)
          })
      }
export default withData(config)
