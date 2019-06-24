import Link from "next/link";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Card, Row, Col } from "antd";

const { Meta } = Card;

const ClassList = ({ data: { loading, error, classes }, search }, req) => {
	if (error) return `Error loading ClassList : ${error}`;
	//if restaurants are returned from the GraphQL query, run the filter query
	//and set equal to variable restaurantSearch

	if (classes && classes.length) {
		const searchQuery = classes.filter(query => query.title.toLowerCase().includes(search));
		if (searchQuery.length != 0) {
			return (
				<div>
					<Row gutter={32}>
						{searchQuery.map(res => (
							<Col span={6} key={res.id}>
								<Link as={`/classes/${res.id}`} href={`/classes?id=${res.id}`}>
									<Card
										hoverable
										style={{ width: "100%", margin: "10px 10px" }}
										cover={
											<img
												alt="example"
												src={`http://13.125.38.140:1337${
													res.thumbnail.url
												}`}
											/>
										}
										key={res._id}
									>
										<Meta title={res.title} description={res.subTitle} />
									</Card>
								</Link>
							</Col>
						))}
					</Row>

					<style jsx global>
						{`
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
						`}
					</style>
				</div>
			);
		}
	} else {
		return <h1>No classes found</h1>;
	}
	return <h1>Loading</h1>;
};

const query = gql`
	{
		classes {
			id
			title
			subTitle
			price
			thumbnail {
				url
			}
		}
	}
`;

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
})(ClassList);
