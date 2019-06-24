import React from "react";

import { Row, Col, Input } from "antd";
import ClassList from "../src/components/ClassList";

export default class Index extends React.Component {
	state = {
		query: ""
	};

	onChange = e => {
		//set the state = to the input typed in the search Input Component
		//this.state.query gets passed into RestaurantList to filter the results
		this.setState({ query: e.target.value.toLowerCase() });
	};

	render() {
		return (
			<>
				<Row>
					<Col>
						<div className="search">
							<Input addonBefore="Search" onChange={this.onChange} />
						</div>
						<ClassList search={this.state.query} />
					</Col>
				</Row>
				<style jsx>
					{`
						.search {
							margin: 20px;
							width: 500px;
						}
					`}
				</style>
			</>
		);
	}
}
