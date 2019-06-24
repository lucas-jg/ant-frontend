import gql from "graphql-tag";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";

import { Card, Row, Col, Button } from "antd";

const { Meta } = Card;

const ClassesContent = ({ target }) => {
	const { title, content, thumbnail } = target;

	return (
		<>
			<h1>{title}</h1>
			<Card cover={<img alt="cover" src={`http://localhost:1337${thumbnail.url}`} />}>
				{content}
			</Card>
		</>
	);
};

const ClassesInfo = ({ target }) => {
	const { title, owner, price, discount } = target;

	return (
		<>
			<Card title={title}>
				<p>owner : {owner.username}</p>
				<p>price : {price}</p>
				<p>discount : {discount}</p>
				<Button className="btn-classes-shopping" icon="shopping" style={{ width: "100%" }}>
					구매하기
				</Button>
			</Card>
		</>
	);
};

const ClassesLayout = ({ target }) => (
	<>
		<Row className="classes-row" gutter={16}>
			<Col span={18}>
				<ClassesContent target={target} />
			</Col>
			<Col className="classes-col" span={6}>
				<ClassesInfo target={target} />
			</Col>
		</Row>
		<style jsx>
			{`
				.classes-col {
					border: 1px solid #fd637a;
				}
			`}
		</style>
	</>
);

class classes extends React.Component {
	render() {
		const {
			data: { loading, error, target },
			router,
			context,
			isAuthenticated
		} = this.props;
		if (error) return "Error Loading Dishes";

		if (target) {
			return <ClassesLayout target={target} />;
		} else {
			return <h1>No target found</h1>;
		}
	}
}

const GET_RESTAURANT_DISHES = gql`
	query($id: ID!) {
		target: class(id: $id) {
			id
			title
			subTitle
			price
			discount
			content
			owner {
				username
			}
			thumbnail {
				url
			}
		}
	}
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)

export default compose(
	withRouter,
	graphql(GET_RESTAURANT_DISHES, {
		options: props => {
			return {
				variables: {
					id: props.router.query.id
				}
			};
		},
		props: ({ data }) => ({ data })
	})
)(classes);
