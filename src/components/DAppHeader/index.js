import React from 'react';
import { NavLink } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa'
import { BsFillBinocularsFill } from 'react-icons/bs'
import { IoIosWallet } from 'react-icons/io'
import { Navbar, NavbarBrand } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useWeb3React } from "@web3-react/core";
import Web3 from 'web3';

import './style.css'

import { injected } from "../../constants/WalletConnectors";
import { tokenAddr } from '../../constants/Addresses';

const DAppHeader = () => {
  const { activate, account } = useWeb3React();

  const connectMetaMask = async () => {
    if (window.ethereum === undefined) {
      toast.error("Please install Metamask on your browser.");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const chainId = await web3.eth.getChainId();
    // console.log({ chainId: chainId })

    if (chainId !== 43114) {
      toast.error("Please switch to AVAX network.");
      return;
    }

    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex)
    }
  }

  // const disconnectMetaMask = async () => {
  //   try {
  //     await deactivate();

  //     console.log({ account: account });
  //   } catch (ex) {
  //     console.log(ex)
  //   }
  // }

  const openHome = () => {
    const homeUrl = window.location.host.slice(4);
    window.open(homeUrl);
  }

  return (
    <React.Fragment>
      <Navbar expand="sm" className='container navigation-bar'>
        {/* <div className='navbar-brand dapp-brand' onClick={openHome}>
          <p className='m-0 text-white d-flex align-items-center'>
            <span style={{ marginRight: '-1.2rem' }}>AGAM</span>
            <img src="assets/agamotto.gif" alt="logo" className='brand-logo' />
            <span style={{ marginLeft: '-1.2rem' }}>TTO</span>
          </p>
        </div> */}
        <NavbarBrand as={NavLink} to="/">
          <p className='m-0 text-white d-flex align-items-center'>
            <span style={{ marginRight: '-0.5rem' }}>SAN</span>
            <img src="assets/agamotto.gif" alt="logo" width="60" height="60" />
            <span style={{ marginLeft: '-0.5rem' }}>ENERGY</span>
          </p>
        </NavbarBrand>
        <div className='text-end'>
          <Navbar.Toggle aria-controls="dapp-navbar-nav" id="navbar-toggle-btn">
            <FaAlignJustify />
          </Navbar.Toggle>
          <Navbar.Collapse id="dapp-navbar-nav" className='text-center py-4'>
            {account ? (
              <div className='d-flex flex-btn-group'>
                <a type='button' href={`https://snowtrace.io/token/${tokenAddr}`} target="_blank" rel='noreferrer' className='btn connect-btn px-3 fw-bold d-flex align-items-center justify-content-center  my-2'>
                  <BsFillBinocularsFill />
                  <span className='ms-1'>$SAN</span>
                </a>
                <button type='button' className='btn connect-btn px-3 fw-bold ms-4 d-flex align-items-center my-2'>
                  <IoIosWallet />
                  <span className='ms-1'>{account.substr(0, 7)}...{account.slice(-4)}</span>
                </button>
              </div>
            ) : (
              <div className='d-flex flex-btn-group'>
                <a type='button' href={`https://snowtrace.io/token/${tokenAddr}`} target="_blank" rel='noreferrer' className='btn connect-btn px-3 fw-bold d-flex align-items-center justify-content-center  my-2'>
                  <BsFillBinocularsFill />
                  <span className='ms-1'>$SAN</span>
                </a>
                <button type='button' className='btn connect-btn px-3 fw-bold ms-4  my-2 d-flex align-items-center' onClick={connectMetaMask}>
                  <IoIosWallet />
                  <span className='ms-1'>Connect</span>
                </button>
              </div>
            )}
          </Navbar.Collapse >
        </div >
      </Navbar >
    </React.Fragment>
  );
}

export default DAppHeader;