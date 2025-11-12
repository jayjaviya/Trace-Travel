import React from 'react';
import './About.css';
import DestinationGallery from './DestinationGallery';

const Destination = () => {
  return (
    <>
      <section className="header">
        <div className="container">
          <h2>Destination</h2>
          <div className="header_element">
            <p className="tag_1">
              {' '}
              <span>Home</span>
            </p>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
            <p className="tag_2">Destination</p>
          </div>
        </div>
      </section>

      <DestinationGallery />
    </>
  );
};

export default Destination;