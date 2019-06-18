import { Row, Col, Button, Alert, Card } from "antd";

const { Meta } = Card;

export default () => {
	return (
		<>
			<Row gutter={8}>
				<Col xs={12} xl={6} style={{ margin: "10px 0" }}>
					<Card
						hoverable
						style={{ width: "100%" }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						}
					>
						<Meta
							title="한글 폰트 확인 하고 싶어!!"
							description="작은 폰트도 확인하고 싶어@@"
						/>
					</Card>
				</Col>
				<Col xs={12} xl={6} style={{ margin: "10px 0" }}>
					<Card
						hoverable
						style={{ width: "100%" }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						}
					>
						<Meta title="한글 폰트 바꾸고 싶어" description="강의를 소개합니다." />
					</Card>
				</Col>
				<Col xs={12} xl={6} style={{ margin: "10px 0" }}>
					<Card
						hoverable
						style={{ width: "100%" }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						}
					>
						<Meta title="Dotenv TEST" description={process.env.TEST} />
					</Card>
				</Col>
				<Col xs={12} xl={6} style={{ margin: "10px 0" }}>
					<Card
						hoverable
						style={{ width: "100%" }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						}
					>
						<Meta title="Europe Street beat" description="www.instagram.com" />
					</Card>
				</Col>
				<Col xs={12} xl={6} style={{ margin: "10px 0" }}>
					<Card
						hoverable
						style={{ width: "100%" }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						}
					>
						<Meta title="Europe Street beat" description="www.instagram.com" />
					</Card>
				</Col>
				<Col xs={12} xl={6} style={{ margin: "10px 0" }}>
					<Card
						hoverable
						style={{ width: "100%" }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						}
					>
						<Meta title="Europe Street beat" description="www.instagram.com" />
					</Card>
				</Col>
				<Col xs={12} xl={6} style={{ margin: "10px 0" }}>
					<Card
						hoverable
						style={{ width: "100%" }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						}
					>
						<Meta title="Europe Street beat" description="www.instagram.com" />
					</Card>
				</Col>
				<Col xs={12} xl={6} style={{ margin: "10px 0" }}>
					<Card
						hoverable
						style={{ width: "100%" }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						}
					>
						<Meta title="Europe Street beat" description="www.instagram.com" />
					</Card>
				</Col>
				<Col xs={12} xl={6} style={{ margin: "10px 0" }}>
					<Card
						hoverable
						style={{ width: "100%" }}
						cover={
							<img
								alt="example"
								src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
							/>
						}
					>
						<Meta title="Europe Street beat" description="www.instagram.com" />
						<Meta description="www.instagram.com" />
						<div className="card-content">wefwefioujweoifjweoifj </div>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<Alert type="success" message="Hello Project is strapi-next with Bootstrap" />
					<Button type="primary">Hello from nextjs</Button>
				</Col>
			</Row>
		</>
	);
};
