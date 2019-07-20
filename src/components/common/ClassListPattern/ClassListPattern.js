import { Card, Row, Col } from 'antd'
import Link from 'next/link'
import { backendHost } from '../../../lib/common'

export const ClassListPattern = classes => {
    return (
        <Row gutter={8}>
            {classes.map(targetClass => (
                <Col xs={12} lg={6} key={targetClass.id}>
                    <Link as={`/classes/${targetClass.id}`} href={`/classes?id=${targetClass.id}`}>
                        <Card
                            hoverable
                            style={{
                                width: '100%',
                                margin: '10px 0 10px 0'
                            }}
                            cover={
                                <img
                                    className="cover-img"
                                    alt="example"
                                    src={backendHost + '/' + targetClass.thumbnail[0].url}
                                />
                            }
                            key={targetClass.id}
                        >
                            <div className="card-text">
                                {targetClass.title}
                                <p>{targetClass.description}</p>
                            </div>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    )
}
