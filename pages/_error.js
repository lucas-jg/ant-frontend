import Router from 'next/router'
import { Result, Radio, Button, Icon } from 'antd'

const StatusMap = {
    '403': {
        title: '403',
        subTitle: '이 페이지에 접근할 수 있는 권한이 없습니다.',
        extra: (
            <Button type="dashed" onClick={() => Router.push('/')}>
                <Icon type="home" /> 홈
            </Button>
        )
    },
    '404': {
        title: '404',
        subTitle: '존재하지 않는 페이지입니다.',
        extra: (
            <Button type="dashed" onClick={() => Router.push('/')}>
                <Icon type="home" /> 홈
            </Button>
        )
    },
    '500': {
        title: '500',
        subTitle: '서버의 문제로 페이지를 보여줄 수 없습니다.',
        extra: (
            <Button type="dashed" onClick={() => Router.push('/')}>
                <Icon type="home" /> 홈
            </Button>
        )
    },
    success: {
        title: 'Successfully Purchased Cloud Server ECS!',
        subTitle:
            'Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.',
        extra: [
            <Button type="primary" key="console">
                Go Console
            </Button>,
            <Button key="buy">Buy Again</Button>
        ]
    },
    info: {
        title: 'Your operation has been executed',
        extra: (
            <Button type="primary" key="console">
                Go Console
            </Button>
        )
    },
    error: {
        title: 'Submission Failed',
        subTitle: 'Please check and modify the following information before resubmitting.',
        extra: [
            <Button type="primary" key="console">
                Go Console
            </Button>
        ]
    },
    warning: {
        title: 'There are some problems with your operation.',
        extra: (
            <Button type="primary" key="console">
                Go Console
            </Button>
        )
    }
}

class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null
        return { statusCode }
    }

    render() {
        const resultProps = StatusMap[this.props.statusCode]
        return <Result status={resultProps.title} {...resultProps} />
    }
}

export default Error
