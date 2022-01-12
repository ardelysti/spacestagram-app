import React, { useEffect, useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regFaHeart } from '@fortawesome/free-regular-svg-icons'; 
import { faHeart as solFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle, faFilm } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import './Home.css';

const API_KEY = "***REMOVED***";
// const API_KEY = "***REMOVED***";
const count = 18;
const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
    500: 1
};

const Home = () => {
    const [status, setStatus] = useState('initial');
    const [data, setData] = useState([]);
    const [favs, setFavs] = useState([]);
    const [showDetails, setShowDetails] = useState(false); 
    const [currentDetails, setDetails] = useState({});

    const handleClose = () => setShowDetails(false);
    const handleShow = (idx) => {
        setShowDetails(true);
        setDetails(data[idx]);
    }

    const fetchData = () => {
        axios
            .get(`https://api.nasa.gov/planetary/apod?count=${count}&thumbs=true&api_key=${ API_KEY }`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
                setStatus('success');
            })
            .catch(function (error) {
                setStatus('error');
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
          
            });
    }

    const handleLiked = (name) => {
        if (favs.includes(name)) {
            setFavs(favs.filter(function(title) {
                return title !== name;
            }))
        } else {
            setFavs([...favs, name])
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (status === 'initial') {
        return (
            <div className='content grid-content loading'>
                <a href="https://blog.hubspot.com/website/css-loading-animation"
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className="ring">
                        Loading
                        <span></span>
                    </div>
                </a>
            </div>
        );
    } else if (status === 'error') {
        return (
            <div className='content grid-content error'>
                <h1>
                    server error!
                </h1>
            </div>
        )
    } else if (status === 'success') {
        return (
            <div className='content grid-content'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {data.map((curr, idx) => (
                        <Card className='result-card'>
                            { curr.media_type === "image"
                                ? 
                                <Card.Img variant="top" src={curr.hdurl
                                    ? curr.hdurl
                                    : curr.url} />
                                : 
                                <Card.Img variant="top" src={curr.thumbnail_url} />
                            }
                            <Card.Title className='card-data-title'>
                                { curr.title }
                            </Card.Title>
                            <Card.Body className='card-text'>
                                <div className='align-left'>
                                    <button
                                        className='show-details-button'
                                        onClick={() => handleShow(idx)}>
                                        <FontAwesomeIcon
                                            icon={faInfoCircle}
                                            className='align-start' />
                                    </button>
                                    { curr.media_type === "video" 
                                        &&
                                        <a href={curr.url}>
                                            <FontAwesomeIcon
                                                icon={faFilm}
                                                className='align-end' />
                                        </a>
                                    }
                                </div>
                                <div className='align-right'>
                                    <button
                                        className='like-button'
                                        onClick={() => handleLiked(curr.title)}>
                                        <FontAwesomeIcon
                                            icon={favs.includes(curr.title)
                                                ? solFaHeart
                                                : regFaHeart}
                                            className='align-start action-button' />
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Masonry>

                <Modal 
                    className='details-modal'
                    show={showDetails} 
                    onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {currentDetails.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='details-date'>
                            {currentDetails.date}
                        </div>
                        <div>
                            {currentDetails.explanation}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='details-footer'>
                        <button
                            className='like-button'
                            onClick={() => handleLiked(currentDetails.title)}>
                            <FontAwesomeIcon
                                icon={favs.includes(currentDetails.title)
                                    ? solFaHeart
                                    : regFaHeart}
                                className='align-start action-button' />
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Home;