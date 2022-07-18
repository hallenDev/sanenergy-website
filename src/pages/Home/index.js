import React from 'react';

import './style.css'

import RuneItem from '../../components/RuneItem';

const Home = () => {
  const rune_info = [
    {
      name1: "WIND",
      name2: "Wind",
      name3: "white",
      rewards: 0.05,
      tokens: 5,
      img_url: "assets/white_rune.png",
      img_alt: "white_rune"
    },
    {
      name1: "SOLAR",
      name2: "Solar",
      name3: "orange",
      rewards: 0.35,
      tokens: 30,
      img_url: "assets/orange_rune.png",
      img_alt: "orange_rune"
    },
    {
      name1: "TIDAL POWER",
      name2: "Tidal power",
      name3: "green",
      rewards: 1.25,
      tokens: 100,
      img_url: "assets/green_rune.png",
      img_alt: "green_rune"
    },
  ]

  const runes = rune_info.map((element, index) => (
    <RuneItem key={index} name1={element.name1} name2={element.name2} name3={element.name3} tokens={element.tokens} rewards={element.rewards} img_url={element.img_url} img_alt={element.img_alt} />
  ))

  const openDApp = () => {
    window.open("/app", "_self");
  }

  return (
    <React.Fragment>
      {/* <Header /> */}
      {/* About */}
      <div className="container" id='about'>
        <div className="row">
          <div className="col-md-6">
            <div style={{ height: '100%' }}>
              <div>
                <p className='fs-2 fw-bold'>Discover <span className='cl-brown'>Endless</span> Possibilities</p>
                <p>SANENERGY SOLUTION is a Crypto organization that provides a combination of staking services, and P2E games.  We are also interested in investments in the crypto community. </p>

                <button type='button' className='btn launch-btn fw-bold mt-5' onClick={openDApp}>Launch App</button>
              </div>

              <div>
                <img src="assets/agamotto.png" alt="logo" width="450" height="450" />
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
                    - Coin Market Cap (CMC) and Coin Gecko (CG) Listings<br/>
                    - Charity Development Partnership<br/>
                    - Financial App Launch<br/>
                    - Meetings between executives and contractors<br/>
                    - Meetings between investors, traders, marketers, and developers<br/>
                    - Potential investment destinations include P2E games, NFTs, Metaverse, clean energy suppliers and generators, DAOs, and so on.
                </p>
              </div>
              <div className="col-sm-3 px-3">
              <p align="center">Q2:2022</p>
                <p>- Large Influencer Support Marketing<br/>
                    - Exchange Listings<br/>
                    - First, donations are being made to selected communities affected by water, energy, sanitation, and flood<br/>
                    - Token Burn<br/>
                    - Launch NFTs<br/>
                    - Launch P2E game<br/>
                    - Development of NFT’s, Metaverse, P2E games, clean energy suppliers, generators etc.<br/>
                    - Potential outcomes including launching of the above.
                    </p>
              </div>
              <div className="col-sm-3 px-3">
              <p align="center">Q3:2023</p>
                <p>- First Donation to a Charity Organization for Environmental Clean-up Celebrity Support Marketing<br/>
                    - Website Re-Design, development, and Branding<br/>
                    - Binance Exchange and other major exchange listings<br/>
                    - Development of Television and Commercial Partnerships<br/>
                    - Discussions With the television companies regarding a potential Sanenergy Games projects On Their Network<br/>
                    - Official launching of Metaverse, NFTs, P2E games<br/>
                    - Product Sale Contracts with Clean Energy Suppliers and Generators<br/>
                    - The establishment of an online university</p>
              </div>
              <div className="col-sm-3 px-3">
              <p align="center">Q4:2023</p>
                <p>- First fund raising towards the building of university in a selected country<br/>
                    - Additional Sanenergy campaigns concerning wind, solar, and tidal power generators<br/>
                    - TV and marketing Campaign in relation product sales and distribution<br/>
                    - Furthermore, development partnerships with government, private, and non-governmental organizations in relation to the establishment of a university in a chosen country are being formed.</p>
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
    </React.Fragment>
  );
}

export default Home;