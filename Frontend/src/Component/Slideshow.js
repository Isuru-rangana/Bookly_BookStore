import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Nave1 from './Image/Nave1.jpg'
import Nave2 from './Image/Nave2.jpg'
import Nave3 from './Image/Nave3.jpg'
import "./Slidesshow.css";



function Slideshow() {
  
  

  return (
    <div className='slide' >
         <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          
          src={Nave2}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          
          src={Nave1}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          
          src={Nave3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      
    </div>
  );
}

export default Slideshow;
