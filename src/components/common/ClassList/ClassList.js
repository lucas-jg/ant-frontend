import Link from 'next/link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, Row, Col, Spin } from 'antd'
import { backendHost } from '../../../lib/common'

const { Meta } = Card

class ClassList extends React.Component {
	render() {
		const {
			data: { loading, error, classes },
			title
		} = this.props

		if (error) return `Error loading ClassList : ${error}`
		//if restaurants are returned from the GraphQL query, run the filter query
		//and set equal to variable restaurantSearch

		if (classes && classes.length) {
			// const searchQuery = classes.filter(query => query.title.toLowerCase().includes(search))
			// if (searchQuery.length != 0) {
			return (
				<div>
					<h1>{title}</h1>
					<Row gutter={8}>
						{classes.map(res => (
							<Col xs={12} lg={6} key={res.id}>
								<Link as={`/classes/${res.id}`} href={`/classes?id=${res.id}`}>
									<Card
										hoverable
										style={{ width: '100%', margin: '10px 0 10px 0' }}
										cover={
											<img
												className="cover-img"
												alt="example"
												src={backendHost + '/' + res.thumbnail[0].url}
											/>
										}
										key={res._id}
									>
										<Meta title={res.title} description={res.description} />
									</Card>
								</Link>
							</Col>
						))}
					</Row>

					<style jsx global>
						{`
							h1 {
								margin-top: 20px;
							}
							a {
								color: white;
							}
							a:link {
								text-decoration: none;
								color: white;
							}
							a:hover {
								color: white;
							}
							.card-columns {
								column-count: 3;
							}
							.cover-img {
								object-fit: cover;
								height: 130px;
							}
						`}
					</style>
				</div>
			)
		}
		// }
		// else {
		//     return <h1>No classes found</h1>
		// }
		return (
			<h1>
				<Spin size="large" />
			</h1>
		)
	}
}

const query = gql`
	{
		classes {
			id
			title
			description
			price
			thumbnail {
				url
			}
		}
	}
`

// ClassList.getInitialProps = async ({ req }) => {
// 	const res = await fetch("https://api.github.com/repos/zeit/next.js");
// 	const json = await res.json();
// 	return { stars: json.stargazers_count };
// };
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default graphql(query, {
	props: ({ data }) => ({
		data
	})
})(ClassList)
