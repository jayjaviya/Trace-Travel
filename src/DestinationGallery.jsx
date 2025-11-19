import React, { useState } from 'react'
import './DestinationGallery.css'

const imageList = [
    { src: '../lightbox/img1.png', alt: 'Jungle Safari' },
    { src: '../lightbox/img2.png', alt: 'Grate Temple' },
    { src: '../lightbox/img3.png', alt: 'Beach View Point' },
    { src: '../lightbox/img4.png', alt: 'Nature Slides' },
    { src: '../lightbox/img5.png', alt: 'Moutain' },
    { src: '../lightbox/img6.png', alt: 'Sky City' },
    { src: '../lightbox/img7.png', alt: 'Paraliding' },
    { src: '../lightbox/img8.png', alt: 'Kingdom' },
    { src: '../lightbox/img9.png', alt: 'City River' },
]

const DestinationGallery = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({ src: '', alt: '' })

    const openModal = (src, alt) => {
        setModalContent({ src, alt })
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleModalClick = (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal()
        }
    }

    return (
        <section className="destination">
            <div className="container">
                <div className="destination_page">
                    <div className="destination_info">
                        <h4>View Our Gallery</h4>
                        <h2>Best Tourist's Shared Photos</h2>
                    </div>
                    <div className="lighbox">
                        {imageList.map((image, index) => (
                            <img
                                key={index}
                                src={image.src}
                                alt={image.alt}
                                onClick={() => openModal(image.src, image.alt)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div id="image-modal" className="modal" onClick={handleModalClick}>
                    <span className="close-btn" onClick={closeModal}>
                        &times;
                    </span>
                    <img className="modal-content" src={modalContent.src} alt={modalContent.alt} />
                    <div id="caption">{modalContent.alt}</div>
                </div>
            )}
        </section>
    )
}

export default DestinationGallery