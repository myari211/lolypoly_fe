import React from 'react';
// import loadingImage from '../assets/logo512.png'; // ganti dengan path gambar kamu

const LoadingImage = () => {
  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <img src="/logo.png" alt="Loading..." className="loader3D" />
      </div>
    // <div className="loader-wrapper">
    //   <img src='/logo.png' alt="Loading" className="loader3DGlow" />
    // </div>
  );
};


export default LoadingImage;