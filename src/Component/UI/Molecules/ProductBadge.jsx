import { Badge } from "antd"
import Product from "../Atom/Product"


const ProductBadge = ({props}) => {
    return(
        <>
            {props.hot_deal != 0 ? (
                <Badge.Ribbon text="Hot" color="red">
                    <Product props={props} />
                </Badge.Ribbon>
            ) : (
                props.discount_price != 0 ? (
                    <>
                        <Badge.Ribbon text="Discount">
                            <Product props={props} />
                        </Badge.Ribbon>
                    </>
                ) : (
                    <>
                        <Product props={props} />
                    </>
                )
            )}
        </>
    )
}

export default ProductBadge