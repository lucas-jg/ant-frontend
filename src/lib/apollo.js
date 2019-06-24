/* /lib/apollo.js */

import { HttpLink } from "apollo-link-http";
import { withData } from "next-apollo";

const config = {
	link: new HttpLink({
		uri: "http://13.125.38.140:1337/graphql" // Server URL (must be absolute)
	})
};
export default withData(config);
