import { Row, Col, Card} from 'antd';
import TableAtom from '../../Atom/TableAtom';

const ProductList = () => {
    return(
        <>
            <Row>
                <Col span={24}>
                    <Card>
                        
                        <TableAtom />
                        
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductList;