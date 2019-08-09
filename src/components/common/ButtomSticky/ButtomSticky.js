import { Icon } from 'antd'
import Router from 'next/router'

const iconStyle = {
    fontSize: '30px'
}

export default () => (
    <>
        <div className="buttom-sticky-template">
            <Icon style={iconStyle} type="home" onClick={() => Router.push('/')} />
            <Icon style={iconStyle} type="appstore" onClick={() => Router.push('/search')} />
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
