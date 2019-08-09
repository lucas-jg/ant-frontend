import { Icon } from 'antd'

const iconStyle = {
	fontSize: '30px'
}

export default () => (
	<>
		<div className="buttom-sticky-template">
			<Icon style={iconStyle} type="home" />
			<Icon style={iconStyle} type="appstore" />
			<Icon style={iconStyle} type="exception" />
			<Icon style={iconStyle} type="schedule" />
			<Icon style={iconStyle} type="user" />
		</div>
		<style jsx>
			{`
				.buttom-sticky-template {
					position: sticky;
					width: 100%;
					bottom: 0;
					background: white;
					padding: 10px 30px;
					display: flex;
					justify-content: space-between;
				}
			`}
		</style>
	</>
)
