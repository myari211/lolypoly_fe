import { Card, Row, Col } from 'antd';

const CardAtom = (props) => {
    return(
        <Card>
            <Row>
                <Col>
                    {props.title}
                </Col>
            </Row>
            <Row>
                <Col>
                    {props.data}
                </Col>
            </Row>
        </Card>
    );
}

export default CardAtom;