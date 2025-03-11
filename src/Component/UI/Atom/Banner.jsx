import { Carousel } from 'antd';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Banner = ({props}) => {
    const url = process.env.REACT_APP_BASE_IMAGE;

    return (
        <Carousel
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

export default Banner;