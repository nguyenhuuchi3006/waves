import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCompass} from '@fortawesome/free-solid-svg-icons/faCompass';
import {faPhone} from '@fortawesome/free-solid-svg-icons/faPhone';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';

const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    WAVES
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon 
                                    icon={faCompass}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Adress</div>
                                    <div>Sa Huynh, Quang Ngai</div>
                                </div>
                            </div>

                            <div className="tag">
                                <FontAwesomeIcon 
                                    icon={faPhone}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>0959565644</div>
                                </div>
                            </div>

                            <div className="tag">
                                <FontAwesomeIcon 
                                    icon={faClock}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Working hour</div>
                                    <div>Mon-Sun/ 9am-8pm</div>
                                </div>
                            </div>

                            <div className="tag">
                                <FontAwesomeIcon 
                                    icon={faEnvelope}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>email</div>
                                    <div>udemy@gmail.com</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="right">
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                                Get all the lastest information on events, sales and offers. You can miss out.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;