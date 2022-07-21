import React, { useEffect, useState } from 'react';

import './style.css'

import RuneItem from '../../components/RuneItem';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { IoIosWallet, IoMdReturnLeft } from 'react-icons/io';
import { useWeb3React } from "@web3-react/core";
import { toast } from 'react-toastify';
import Web3 from 'web3';

import { injected } from "../../constants/WalletConnectors";
import { presaleAddress } from '../../constants/Addresses';

import presaleABI from '../../constants/ABI/presale.json';

const ETHUnit = 1e18;
const sanPerBnb = 3300;

const Home = () => {
  
  const { activate, account, library } = useWeb3React();

  const [bnbBalance, setBnbBalance] = useState(0);
  const [updated, setUpdate] = useState("");

  const [buyBalance, setBuyBalance] = useState("");
  const [sanBalance, setSanBalance] = useState(0);
  const [isValidValue, setIsValidValue] = useState(false);

  const checkIsValidNumber = (_buyBalance) => {
    if(_buyBalance == '') return false;
    if(isNaN(_buyBalance)) return false;
    if(parseFloat(_buyBalance) > parseFloat(4)) return false;
    return true;
  }

  useEffect(() => {
    if(account && library) {
      library.eth.getBalance(account)
      .then((res) => {
        setBnbBalance(res);
      })
    }
  }, [account, updated]);

  useEffect(() => {
    if(checkIsValidNumber(buyBalance)) {
      setIsValidValue(true);
      setSanBalance(parseInt(parseFloat(buyBalance) * sanPerBnb));
    } else {
      setIsValidValue(false);
      setSanBalance(0);
    }
  }, [buyBalance])

  const connectMetaMask = async () => {
    if (window.ethereum === undefined) {
      toast.error("Please install Metamask on your browser.");
      return;
    }

    const web3 = new Web3(window.ethereum);
    const chainId = await web3.eth.getChainId();
    // console.log({ chainId: chainId })

    if (chainId !== 97) {
      try {
        await web3.currentProvider.request({
          method: 'wallet_switchEthereumChain',
            params: [{ chainId: Web3.utils.toHex(97) }],
          });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          web3.currentProvider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x61',
              chainName: 'Binance Smart Chain Test net',
              nativeCurrency: {
                name: 'Binance Coin',
                symbol: 'BNB',
                decimals: 18
              },
              rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
              blockExplorerUrls: ['https://testnet.bscscan.com']
            }]
          })
          .catch((error) => {
            console.log(error)
          }) 
        }
      }
    }

    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex)
    }
  }

  const rune_info = [
    {
      name1: "WIND",
      name2: "Wind",
      name3: "wind",
      rewards: 0.05,
      tokens: 5,
      img_url: "assets/white_rune.png",
      img_alt: "wind_generator"
    },
    {
      name1: "SOLAR",
      name2: "Solar",
      name3: "solar",
      rewards: 0.35,
      tokens: 30,
      img_url: "assets/orange_rune.png",
      img_alt: "solar_generator"
    },
    {
      name1: "TIDAL POWER",
      name2: "Tidal power",
      name3: "tidal",
      rewards: 1.25,
      tokens: 100,
      img_url: "assets/green_rune.png",
      img_alt: "tidal_generator"
    },
  ]

  const runes = rune_info.map((element, index) => (
    <RuneItem key={index} name1={element.name1} name2={element.name2} name3={element.name3} tokens={element.tokens} rewards={element.rewards} img_url={element.img_url} img_alt={element.img_alt} />
  ))

  const openDApp = () => {
    window.open("/app", "_self");
  }

  const buyTokens = async () => {
    if(!isValidValue) {
      toast.error("Invalid balance");
      return;
    }
    if(parseFloat(bnbBalance) > bnbBalance) {
      toast.error("Insufficient BNB balance");
      return;
    }
    if(!library) {
      toast.error("Connect your metamask.");
      return;
    }
    if(library) {
      const presaleContract = new library.eth.Contract(presaleABI, presaleAddress);
      presaleContract.methods.buyToken().send({from:account, value: parseFloat(buyBalance) * ETHUnit}).then((res) => {
        if(res.status == true) {
          toast.success("You received " + sanBalance + " $SAN");
          setUpdate(new Date());
          setBuyBalance(0);
        } else {
          toast.error("Buy error!");
        }
      })
    }
  }

  return (
    <React.Fragment>
      <Header />
      {/* <Header /> */}
      {/* About */}
      <div className="container" id='about'>
        <div className="row">
          <div className="col-md-6">
            <div style={{ height: '100%' }}>
              <div>
                <p className='fs-2 fw-bold'>Discover <span className='cl-brown'>Endless</span> Possibilities</p>
                <p>Sanenergy finance is a Crypto organization that provides a combination of staking services, and P2E games.  We are also interested in investments in the crypto community. </p>

                <button type='button' className='btn launch-btn fw-bold mt-5' onClick={openDApp}>Launch App</button>
              </div>

              <div Style={'display:flex; justify-content:center'}>
                <img src="assets/agamotto.png" alt="logo" width="70%" height="70%" />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="info-field">
              <div>
                <p className='fw-bold fs-5 cl-brown mb-0 mt-4'>OUR VISION</p>
                <p>Our vision is to build a comprehensive platform that facilitates the exchange of knowledge, opinions, and ideas across the entire sanenergy ecosystem by bringing together energy generators, users, investors, and crypto enthusiasts on a single platform that will serve as a medium for knowledge sharing, support charity organizations, assist young talents, and championing the cause of clean energy saving, wealth creation, and improving life for current and future generations.</p>
              </div>

              <div>
                <p className='fw-bold fs-5 cl-brown mb-0 mt-4'>MISSION</p>
                <p>
                    ➢ Create and sustain a stable cryptocurrency project<br/>
                    ➢ Establish environmentally friendly and clean energy globally<br/>
                    ➢ Develop young talent in areas such as energy conservation, creativity, entrepreneurship, and innovation.<br/>
                    ➢ Support charitable efforts aimed at cleaning up our environment or providing clean water and sanitation.<br/>
                    ➢ Educate the masses on the importance of clean energy and the future
                </p>
              </div>

              <div>
                <p className='fw-bold fs-5 cl-brown mb-0 mt-4'>PROJECT’S ROADMAP</p>
                <p>Despite being a top priority, unlike many other cryptocurrencies, we are not basing our long-term goals on the number of holders, social media followers, or listing status. Instead, our project's roadmap heavily focused on the development Sanenergy's business organization, which we believe will have a significant effect on the trading value of our associated cryptocurrency.</p>
              </div>

              {/* <div>
                <p className='fw-bold fs-5 cl-brown mb-0 mt-4'>INVESTMENTS</p>
                <p>The community members will decide by vote where proceeds will be invested in  from P2E games and the Gas fees .  Upon completion of the vote by the community, the proceeds will be invested in profitable crypto trends i.e NFTs, Metaverse, Privacy tokens, Defi, DAOs  and so on.  As long as they are profitable our highly skilled market analysts will Identify them and present them to the community to decide on whether to invest or not.</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className='container text-center' id='tokenomics'>
        <p className='how-works fs-2 mt-5'>Tokenomics</p>

        <div className="d-flex justify-content-center mt-5">
          <div className="rune-box">
            <img src="assets/agamotto.png" alt="logo" width="70" height="70" />
            <p className='mb-0 mt-2 fw-bold fs-5'>total supply: 10,000,000,000 <span className='cl-brown fw-bold'>$SAN</span></p>
            <p className='mb-0 mt-2 fw-bold fs-5'><span className='cl-green fw-bold'>Buy</span>/<span className='cl-red fw-bold'>Sell</span> Tax Fee: 10% </p>
            <p className='mb-0 mt-2 fw-bold fs-6 text-left'>2%: reflection to holders</p>
            <p className='mb-0 mt-2 fw-bold fs-6'>2%: charity/business</p>
            <p className='mb-0 mt-2 fw-bold fs-6'>2%: developers</p>
            <p className='mb-0 mt-2 fw-bold fs-6'>4%: liquidity</p>
          </div>
        </div>
      </div>

      <div className='container text-center' id='presale'>
        <p className='how-works fs-2 mt-5'>Presale</p>
        <div className="d-flex justify-content-center mt-5">
          <div className="rune-box">
            <p className='mb-0 mt-2 fw-bold fs-6'>1 BNB = 3300 <span className='cl-brown fw-bold'>$SAN</span>, no Tax Fee</p>
            <p className='mb-0 mt-2 fw-bold fs-6'>Max limit per transaction: 4 BNB</p>
            <p className='mb-0 mt-2 fw-bold fs-7'>your balance: {parseFloat(parseFloat(bnbBalance)/ETHUnit).toFixed(2)} BNB</p>
            <div Style={'display:flex; justify-content:center'}>
              <input type="text" className='text-input-presale' placeholder='input balance' value = {buyBalance} onChange={(e) => {
                setBuyBalance(e.target.value);
              }}/>
            </div>
            <p>You will receive <span className='cl-brown fw-bold'>{sanBalance} $SAN</span></p>
            {account? (
              <button type='button' className='btn launch-btn fw-bold' onClick={buyTokens}>Buy <span className='cl-brown fw-bold'>$SAN</span></button>  
            ) : (
              <button type='button' className='btn connect-btn fw-bold' onClick={connectMetaMask}>
                  <IoIosWallet />
                  <span className='ms-1'>Connect</span>
                </button>
            )}
            
          </div>
        </div>
      </div>

      {/* Runes */}
      <div className='container text-center' id='runes'>
        <p className='how-works fs-2 mt-5'>How It Works</p>

        <div className="container mt-4">
          <div className="row">
            <div className="col-sm-4 d-flex justify-content-center">
              <div>
                <img src="assets/cart.png" alt="cart" className='ring-img' />
                <p className='mb-0 mt-2 fw-bold fs-5'>Buy <span className='cl-brown fw-bold'>$SAN</span></p>
              </div>
            </div>

            <div className="col-sm-4 d-flex justify-content-center">
              <div>
                <img src="assets/runes.png" alt="ring" className='ring-img' />
                <p className='mb-0 mt-2 fw-bold fs-5'>Create a <span className='cl-green fw-bold'>Generator</span></p>
              </div>
            </div>

            <div className="col-sm-4 d-flex justify-content-center">
              <div>
                <img src="assets/reward.png" alt="ring" className='ring-img' />
                <p className='mb-0 mt-2 fw-bold fs-5'>Earn <span className='cl-blue fw-bold'>Rewards</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <div className="rune-box">
            {runes}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="container mt-5">
        <div className="d-flex" id='roadmap'>
          <div className="roadmap-text">
            <img src="assets/roadmap_text.png" alt="text" className='roadmap-text-img' />
          </div>

          <div className='roadmap'>
            <div className="row d-flex justify-content-center">
              <img src="assets/roadmap.png" alt="roadmap" className='roadmap-img' />
            </div>
            <div className="row d-flex justify-content-center mb-3">
              <div className="col-sm-3 px-3">
                <p align="center">Q1:2022</p>
                    <p>
                    - Presale launch<br/>
                    - Social Media Marketing Campaign<br/>
                    - Influencer Support Marketing<br/>
                    - Coin Market Cap & Coin Gecko Listings<br/>
                    - Charity Partnership<br/>
                    - App Launch<br/>
                    - Executives- contractors- investors meetings<br/>
                    - Potential investments
                </p>
              </div>
              <div className="col-sm-3 px-3">
              <p align="center">Q2:2022</p>
                <p>
                  - arge Influencer Support<br/>
                  - Exchange Listings<br/>
                  - First, donations<br/>
                  - Airdrop Giveaway<br/>
                  - Token Burn<br/>
                  - Product Development<br/>
                  - Product launching
                    </p>
              </div>
              <div className="col-sm-3 px-3">
              <p align="center">Q3:2023</p>
                <p>
                  - Donation to Charity Organization<br/>
                  - Celebrity Support Marketing<br/>
                  - Website Re-Branding<br/>
                  - Major exchange listings <br/> 
                  - TV & Commercials partnership<br/>
                  - Metaverse, NFTs, P2E games<br/>
                  - Product Sale Contracts  <br/>
                  - Online university
                  </p>
              </div>
              <div className="col-sm-3 px-3">
              <p align="center">Q4:2023</p>
                <p>
                  - University fund raising<br/>
                  - Sanenergy campaigns   <br/>
                  - Product sales & distribution campaign<br/>
                  - Partnerships<br/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Play Games */}
      <div className="container play-games my-5" id='playgames'>
        <div className="container d-flex justify-content-center">
          <img src="assets/play_games.png" alt="play_games" className='play-games-img' />
        </div>
        <img src="assets/games.png" alt="games" className='games-img' />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Home;