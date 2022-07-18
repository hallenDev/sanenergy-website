import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa'
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

// import { changePathname } from '../../redux/actions/pathname';

import './style.css'

const Header = () => {
  // const [pathname, setPathname] = useState("");

  // useEffect(() => {
  //   setPathname(path.pathname);
  // }, [path])

  const openDApp = () => {
    window.open("/app", "_self");
  }

  // const changePath = () => {
  //   changePathname(window.location.pathname);
  //   console.log(window.location.pathname)
  //   console.log(path.pathname)
  // }

  return (
    <React.Fragment>
      <Navbar expand="lg" className='container navigation-bar'>
        <NavbarBrand as={NavLink} to="/">
          <p className='m-0 text-white d-flex align-items-center'>
            <span style={{ marginRight: '-0.5rem' }}>SAN</span>
            <img src="assets/agamotto.gif" alt="logo" width="60" height = "60" />
            <span style={{ marginLeft: '-0.5rem' }}>ENERGY</span>
          </p>
        </NavbarBrand>

        <div className='text-end'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbar-toggle-btn">
            <FaAlignJustify />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className='text-center'>
            <Nav>
              <Nav.Link href="/#about" className='header-item m-0 px-3'>
                <span className='fw-bold'>About Us</span>
              </Nav.Link>
              <Nav.Link href="/#tokenomics" className='header-item m-0 px-3'>
                <span className='fw-bold'>Tokenomics</span>
              </Nav.Link>
              <Nav.Link href="/#presale" className='header-item m-0 px-3'>
                <span className='fw-bold'>Presale</span>
              </Nav.Link>
              <Nav.Link href="/#runes" className='header-item m-0 px-3'>
                <span className='fw-bold'>Gnerators</span>
              </Nav.Link>
              <Nav.Link href='/#roadmap' className='header-item m-0 px-3'>
                <span className='fw-bold'>Roadmap</span>
              </Nav.Link>
              <Nav.Link href='/#playgames' className='header-item m-0 px-3'>
                <span className='fw-bold'>PlayGames</span>
              </Nav.Link>
              <Nav.Link as={NavLink} to='/whitepaper' className='header-item m-0 px-3'>
                <span className='fw-bold'>Whitepaper</span>
              </Nav.Link>
              <Link to="/app">
                <button type='button' className='btn launch-btn px-3 fw-bold ms-4' onClick={openDApp}>Launch App</button>
              </Link>
            </Nav >
          </Navbar.Collapse >
        </div >

      </Navbar >
    </React.Fragment>
  );
}

// Header.propTypes = {
//   changePathname: PropTypes.func.isRequired,
//   path: PropTypes.object.isRequired
// };

// const mapStateToProps = (state, ownProps) => {
//   return {
//     path: state.pathname
//   }
// }

export default Header;