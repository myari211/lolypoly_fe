import { Carousel } from 'antd';

const url = process.env.REACT_APP_BASE_IMAGE;

export const HeroBanner = ({props}) => {
    return (
        <Carousel
            arrows
            autoplay={{
                dotDuration:true,
            }}
            autoplaySpeed={5000}
        >
            {props.length > 1 && (props.map(item => (
                <img src={url + "/" + item.image_path} />
            )))}
        </Carousel>
    )
}

export const MiniBanner = ({props}) => {
    return (
        <Carousel
            autoplay={{
                dotDuration:true,
            }}
            autoplaySpeed={5000}
            style={{
                height: "300px",
            }}
        >
            {props.length > 1 && (props.map(item => (
                <img src={url + "/" + item.image_path} style={{ height: "300px" }} />
            )))}
        </Carousel>
    )
}