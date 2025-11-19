import React from 'react';
import './Service.css';
import './About.css'; 
import image1 from '../public/serviceimg/image1.png'; 
import image2 from '../public/serviceimg/image2.png';
import image3 from '../public/serviceimg/image3.png';
import image4 from '../public/serviceimg/image4.png';

const ServiceCard = ({ number, title, description, imageSrc, layout }) => {
    const detailContent = (
        <div className="service_detail">
            <h4>{number}</h4>
            <h2>{title}</h2>
            <p>{description}</p>
            <a href="#" className="read_more">
                <span>Read more</span>
            </a>
        </div>
    );

    const imageContent = (
        <div className="service_img">
            <img src={imageSrc} alt={title} />
        </div>
    );

    const serviceInfoContent = layout === 'left' ? (
        <>
            {imageContent}
            {detailContent}
        </>
    ) : (
        <>
            {detailContent}
            {imageContent}
        </>
    );

    return (
        <section className="service">
            <div className="container">
                <div className="service_info">
                    {serviceInfoContent}
                </div>
            </div>
        </section>
    );
};

const ServicePage = () => {
    const servicesData = [
        {
            number: '01',
            title: "Let's Enjoy The Wonders of Nature",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et sint debitis atque. Expedita libero ipsum eveniet voluptate, laboriosam sint officia. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, iusto?",
            imageSrc: image1,
            layout: 'left',
        },
        {
            number: '02',
            title: "Keep calm & travelling On",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et sint debitis atque. Expedita libero ipsum eveniet voluptate, laboriosam sint officia. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, iusto?",
            imageSrc: image2,
            layout: 'right',
        },
        {
            number: '03',
            title: "Better Prices Exceptional People.",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et sint debitis atque. Expedita libero ipsum eveniet voluptate, laboriosam sint officia. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, iusto?",
            imageSrc: image4,
            layout: 'left',
        },
        {
            number: '04',
            title: "Beautiful One Day, Perfect The Next.",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et sint debitis atque. Expedita libero ipsum eveniet voluptate, laboriosam sint officia. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae, iusto?",
            imageSrc: image3,
            layout: 'right',
        },
    ];

    return (
        <>
            <section className="header">
                <div className="container">
                    <h2>Service</h2>
                    <div className="header_element">
                        <p className="tag_1">
                            {' '}
                            <span>Home</span>
                        </p>
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        <p className="tag_2">Service</p>
                    </div>
                </div>
            </section>

            <section className="service_box">
                {servicesData.map((service, index) => (
                    <ServiceCard
                        key={index}
                        number={service.number}
                        title={service.title}
                        description={service.description}
                        imageSrc={service.imageSrc}
                        layout={service.layout}
                    />
                ))}
            </section>
        </>
    );
};

export default ServicePage;