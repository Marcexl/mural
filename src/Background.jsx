import React from 'react'
import Video from './back.mp4';

export const Background = ({children}) => {
  return (
    <>
      <div className="container-fluid">
        <div className="video-background">
          <video loop autoPlay muted className="video">
            <source src={Video} type="video/mp4"></source>
          </video>
        </div>
        <div className="banner">
          <h6>MIRAI HOMBU</h6>
          <h2>Lxs chicxs HACEMOS HISTORIA</h2>
        </div>
        <div className="suenios-container">
          {children}
        </div>
        </div>
      </>
  )
}
