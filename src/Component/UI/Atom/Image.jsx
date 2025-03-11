import { useState, useEffect } from 'react';

export const RoudedImage = ({src, alt}) => {
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleError = () => {
        setCurrentSrc('/image/logo.png');
    };

    return(
        <img
            src={currentSrc}
            alt={alt}
            style={{width: "100%", borderRadius: "200px" }}
            className="rounded"
            onError={handleError}
        />
    )
}

export const SquareImage = ({src, alt}) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const handleError = () => {
        setCurrentSrc('/image/logo.png');
    }

    return(
        <img
            src={currentSrc}
            alt={alt}
            style={{width: "100%" }}
            className="rounded"
            onError={handleError}
        />
    );
}