import { Swiper, SwiperSlide } from 'swiper/react';
import ProductBadge from '../Molecules/ProductBadge';

export const SwipperProduct = ({props}) => {
    console.log(props.length);

    return(
        <Swiper
            spaceBetween={16}
            slidesPerView={6}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={true}
        >
            {props.map(item => (
                <SwiperSlide>
                    {/* <Col span={4} className="mb-2"> */}
                        <ProductBadge props={item} />
                    {/* </Col> */}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}