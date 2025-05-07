import { Col, Row, Card } from "antd";
import CardAtom from "../../Atom/CardAtom";
import TableAtom from "../../Atom/TableAtom";

const AdminDashboard = () => {
    const cardItem = [
        {
            title: "Customer",
            data: 0,
        },
        {
            title: "Total Product",
            data: 0
        },
        {
            title: "New Customer (Month)",
            data: 0,
        },
        {
            title: "Total Order",
            data: 0,
        },
    ]

    return(
        <>
            <Row gutter={16}>
                {cardItem.map(item => (
                    <Col span={6}>
                        <CardAtom
                            title={item.title}
                            data={item.data}
                        />
                    </Col>
                ))}
            </Row>
            <Row gutter={16} className="mt-2">
                <Col span={12}>
                    <Card>
                        {/* <TableAtom /> */}
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default AdminDashboard;