import React from 'react';
import { FaDiscord, FaTelegram, FaTwitter } from 'react-icons/fa';

import './style.css'

const Footer = () => {
  return (
    <React.Fragment>
      <img src="assets/bar.png" alt="bar" className='footer-bar mb-4' />

      <div className="join-community">
        <div className="container px-5">
          <div className="community-box text-center">
            <p className='fs-3 fw-bold' style={{ color: '#B67513' }}>Join our community</p>
            <p className='fw-lighter fw-normal'>Have questions or want to get a feel of the community before diving in?</p>
            <p className='fw-lighter fw-normal'>Then join our Sorcerers on Twitter or Discord and learn more about Sanenergy solution.</p>
          </div>
        </div>

        <div className="container community-link">
          <div className="d-flex justify-content-center">
            <a href='https://discord.gg/Y8a29PjsPT' style = {{color: 'white'}} target="_blank" rel="noopener noreferrer"><FaDiscord className='mx-4 fs-3 link-item' /></a>
            <a href='https://t.me/SanEnergyToken' style = {{color: 'white'}} target="_blank" rel="noopener noreferrer"><FaTelegram className='mx-4 fs-3 link-item' /></a>
            <a href='https://twitter.com/sanenergys/status/1549892591776370690?s=21&t=sbM-IstI3O1ngUI_4hrvIw' style = {{color: 'white'}} target="_blank" rel="noopener noreferrer"><FaTwitter className='mx-4 fs-3 link-item' /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className='m-0 text-center fs-6 fw-normal'>Copyright &copy; {new Date().getFullYear()} Sanenergy finance All rights Reserved</p>
      </div>
    </React.Fragment>
  );
}

export default Footer;