import React, { useState, useEffect } from 'react';
import { BsCart4 } from 'react-icons/bs';
import { AiFillFilter } from 'react-icons/ai';
import { FaDatabase } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify'
import { useWeb3React } from "@web3-react/core";

import 'reactjs-popup/dist/index.css';
import './style.css'

import tokenABI from '../../constants/ABI/token.json';
import nodeABI from '../../constants/ABI/node.json';
import { tokenAddr, whiteRuneAddr, orangeRuneAddr, greenRuneAddr, AVAXUSDTLP, AVAXAGMTLP, avaxAddr, usdtAddr } from '../../constants/Addresses';

import MyRuneItem from '../../components/MyRuneItem';

import isEmpty from '../../utils/is-empty';

const DApp = () => {
  const { library, account } = useWeb3React();

  const [green_checked, setGreenCheck] = useState(false);
  const [orange_checked, setOrangeCheck] = useState(false);
  const [white_checked, setWhiteCheck] = useState(false);

  const [rune, setRune] = useState("Wind");
  const [runeColor, setRuneColor] = useState("white");

  const [token, setToken] = useState(undefined);
  const [whiteRune, setWhiteRune] = useState(undefined);
  const [orangeRune, setOrangeRune] = useState(undefined);
  const [greenRune, setGreenRune] = useState(undefined);
  const [avax, setAvax] = useState(undefined);
  const [usdt, setUsdt] = useState(undefined);
  const [tokenPrice, setPrice] = useState(0);

  const [totalNodes, setTotalNode] = useState(0);
  const [totalWhite, setTotalWhite] = useState(0);
  const [totalOrange, setTotalOrange] = useState(0);
  const [totalGreen, setTotalGreen] = useState(0);

  const [userWhite, setUserWhite] = useState(0);
  const [userOrange, setUserOrange] = useState(0);
  const [userGreen, setUserGreen] = useState(0);
  const [balance, setBalance] = useState(0);
  const [approved, setApproved] = useState(false);

  const [whiteReward, setWhiteReward] = useState(0);
  const [orangeReward, setOrangeReward] = useState(0);
  const [greenReward, setGreenReward] = useState(0);

  const [whiteNode, setWhiteNode] = useState([]);
  const [orangeNode, setOrangeNode] = useState([]);
  const [greenNode, setGreenNode] = useState([]);

  const [myRuneItems, setMyRuneItems] = useState(null);

  const [name, setName] = useState("");

  const ETHUnit = 1e18;
  const MaxUint256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  const runePrice = [3 * ETHUnit, 6 * ETHUnit, 12 * ETHUnit];

  // create contract instance
  useEffect(() => {
    if (library !== undefined) {
      const _token = new library.eth.Contract(tokenABI, tokenAddr);
      const _whiteRune = new library.eth.Contract(nodeABI, whiteRuneAddr);
      const _orangeRune = new library.eth.Contract(nodeABI, orangeRuneAddr);
      const _greenRune = new library.eth.Contract(nodeABI, greenRuneAddr);

      const _avax = new library.eth.Contract(tokenABI, avaxAddr);
      const _usdt = new library.eth.Contract(tokenABI, usdtAddr);

      setToken(_token);
      setWhiteRune(_whiteRune);
      setOrangeRune(_orangeRune);
      setGreenRune(_greenRune);
      setAvax(_avax);
      setUsdt(_usdt);
    } else {
      setToken(undefined);
      setWhiteRune(undefined);
      setOrangeRune(undefined);
      setGreenRune(undefined);
      setAvax(undefined);
      setUsdt(undefined);
    }
  }, [library])

  // get global values such as total node number, total white, orange, green Rune numbers
  useEffect(() => {
    if (token === undefined || avax === undefined || usdt === undefined) {
      setTotalNode(0);
      setTotalWhite(0);
      setTotalOrange(0);
      setTotalGreen(0);
      setPrice(0);
      return;
    }

    const ID = setInterval(() => {

      usdt.methods.balanceOf(AVAXUSDTLP).call().then((usdtBal) => {
        avax.methods.balanceOf(AVAXUSDTLP).call().then((avaxBal1) => {
          avax.methods.balanceOf(AVAXAGMTLP).call().then((avaxBal2) => {
            token.methods.balanceOf(AVAXAGMTLP).call().then((tokenBal) => {
              const res = parseFloat(avaxBal2) / parseFloat(tokenBal) * parseFloat(usdtBal) / parseFloat(avaxBal1) * 1000000000000;
              setPrice(res.toFixed(5));
            })
          })
        })
      })

      token.methods.getTotalCreatedNodes().call().then((_totalNodes) => {
        setTotalNode(_totalNodes);
      })
      whiteRune.methods.totalNodesCreated().call().then((_totalWhite) => {
        setTotalWhite(_totalWhite);
      })
      orangeRune.methods.totalNodesCreated().call().then((_totalOrange) => {
        setTotalOrange(_totalOrange);
      })
      greenRune.methods.totalNodesCreated().call().then((_totalGreen) => {
        setTotalGreen(_totalGreen);
      })
    }, 3000);

    return () => clearInterval(ID);
  }, [token, avax, usdt])

  // get user data, token balance, rewards, user white, orange, green node
  useEffect(() => {
    if (account === undefined || token === undefined) {
      setBalance(0);
      setUserWhite(0);
      setUserOrange(0);
      setUserGreen(0);
      setApproved(false);

      setWhiteReward(0);
      setOrangeReward(0);
      setGreenReward(0);

      setWhiteNode([]);
      setOrangeNode([]);
      setGreenNode([]);
      return;
    }

    const ID = setInterval(() => {
      token.methods.allowance(account, tokenAddr).call().then((_approved) => {
        if (_approved == 0) setApproved(false);
        else setApproved(true);
      })

      token.methods.balanceOf(account).call().then((_balance) => {
        setBalance(_balance);
      })

      token.methods.getNodeNumberOf(account, 0).call().then((_white) => {
        if (_white != 0) {
          token.methods.getRewardAmountOf(account, 0).call().then((_whiteReward) => {
            setWhiteReward(_whiteReward);
          })
          whiteRune.methods._getNodesNames(account).call().then((names) => {
            whiteRune.methods._getNodesRewardAvailable(account).call().then((rewards) => {
              let tmp = [];
              let nameArray = names.split("#");
              let rewardArray = rewards.split("#");
              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  reward: rewardArray[i],
                  rune: "White"
                });
              }
              setWhiteNode(tmp);
            })
          })
        } else {
          setWhiteReward(0)
          setWhiteNode([]);
        }
        setUserWhite(_white);
      })
      token.methods.getNodeNumberOf(account, 1).call().then((_orange) => {
        if (_orange != 0) {
          token.methods.getRewardAmountOf(account, 1).call().then((_orangeReward) => {
            setOrangeReward(_orangeReward);
          })
          orangeRune.methods._getNodesNames(account).call().then((names) => {
            orangeRune.methods._getNodesRewardAvailable(account).call().then((rewards) => {
              let tmp = [];
              let nameArray = names.split("#");
              let rewardArray = rewards.split("#");
              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  reward: rewardArray[i],
                  rune: "Orange"
                });
              }
              setOrangeNode(tmp);
            })
          })
        } else {
          setOrangeReward(0);
          setOrangeNode([]);
        }

        setUserOrange(_orange);
      })
      token.methods.getNodeNumberOf(account, 2).call().then((_green) => {
        if (_green != 0) {
          token.methods.getRewardAmountOf(account, 2).call().then((_greenReward) => {
            setGreenReward(_greenReward);
          })
          greenRune.methods._getNodesNames(account).call().then((names) => {
            greenRune.methods._getNodesRewardAvailable(account).call().then((rewards) => {
              let tmp = [];
              let nameArray = names.split("#");
              let rewardArray = rewards.split("#");
              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  reward: rewardArray[i],
                  rune: "Green"
                });
              }
              setGreenNode(tmp);
            })
          })
        } else {
          setGreenReward(0);
          setGreenNode([]);
        }
        setUserGreen(_green);
      })
    }, 3000);

    return () => clearInterval(ID);
  }, [account, token, whiteRune, orangeRune, greenRune])

  useEffect(() => {
    let runeItems;
    let myRuneItemsComponents;

    if (white_checked && !orange_checked && !green_checked) {
      runeItems = whiteNode;
    } else if (!white_checked && orange_checked && !green_checked) {
      runeItems = orangeNode;
    } else if (!white_checked && !orange_checked && green_checked) {
      runeItems = greenNode;
    } else if (white_checked && orange_checked && !green_checked) {
      runeItems = whiteNode.concat(orangeNode);
    } else if (white_checked && !orange_checked && green_checked) {
      runeItems = whiteNode.concat(greenNode);
    } else if (!white_checked && orange_checked && green_checked) {
      runeItems = orangeNode.concat(greenNode);
    } else {
      runeItems = whiteNode.concat(orangeNode).concat(greenNode);
    }

    // console.log(runeItems)
    myRuneItemsComponents = runeItems.map((data, index) => {
      // console.log(data[0])
      // console.log(data[1])
      // console.log(data[2])
      return <MyRuneItem key={index} name={data.name} rune={data.rune} reward={data.reward} />
    })
    setMyRuneItems(myRuneItemsComponents);
  }, [green_checked, orange_checked, white_checked, whiteNode, orangeNode, greenNode])

  const selectRune = e => {
    let runeType;

    if (e.target.id) {
      runeType = e.target.id;
    } else {
      runeType = e.target.parentNode.id;
    }

    setRune(runeType);

    if (runeType === 'Tidal') {
      setRuneColor("#5AFE6C");
    } else if (runeType === 'Solar') {
      setRuneColor("#F0951D");
    } else if (runeType === 'Wind') {
      setRuneColor("white");
    }
  }

  const onCheckFilter = e => {
    if (e.target.id === 'green') {
      setGreenCheck(!green_checked);
    } else if (e.target.id === 'orange') {
      setOrangeCheck(!orange_checked);
    } else if (e.target.id === 'white') {
      setWhiteCheck(!white_checked);
    }
  }

  const resetCheckBox = () => {
    setGreenCheck(false);
    setOrangeCheck(false);
    setWhiteCheck(false);
  }

  const popupStyle = {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '0.5rem',
    width: '8rem'
  }

  const Approve = () => {
    token.methods.approve(tokenAddr, MaxUint256).send({ from: account }).then(() => {
      // alert - "Approved Successfully"
      toast.success("Approved Successfully");
    })
  }

  const CreateNode = () => {

    const nameLength = name.length;
    if (nameLength <= 3 || nameLength >= 32) {
      // alert("invalid name length");
      toast.warning("Rune name must be between 3 and 32");
      return;
    }
    // check double name
    for (let i = 0; !isEmpty(whiteNode) && i < whiteNode[0].length; i++) {
      if (whiteNode[0][i] === name) {
        // alert - "double name issue"
        // alert("double name in white");
        toast.warning("The name already exists in White");
        return;
      }
    }
    for (let i = 0; !isEmpty(orangeNode) && i < orangeNode[0].length; i++) {
      if (orangeNode[0][i] === name) {
        // alert - "double name issue"
        // alert("double name on orange")
        toast.warning("The name already exists in Orange");
        return;
      }
    }
    for (let i = 0; !isEmpty(greenNode) && i < greenNode[0].length; i++) {
      if (greenNode[0][i] === name) {
        // alert - "double name issue"
        toast.warning("The name already exists in Green");
        return;
      }
    }
    let id = 0;
    if (rune === 'White') id = 0;
    if (rune === 'Orange') id = 1;
    if (rune === 'Green') id = 2;

    if (balance < runePrice[id]) {
      // alert("insufficient balance");
      toast.error("Insufficient balance");
      return;
    }

    token.methods.createNodeWithTokens(name, id).send({ from: account }).then(() => {
      // alert("new Node created");
      toast.success("New Rune created");
      setName("");
    })

  }

  const ClaimReward = () => {
    token.methods.cashoutAll().send({ from: account }).then(() => {
      // alert - 'You claimed your rewards'
      toast.info("You claimed your rewards");
    })
  }

  return (
    <React.Fragment>
      {/* <DAppHeader /> */}
      {/* Welcome */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-8 d-flex align-items-center">
            <div>
              <p className='fw-bold fs-2'><span className='cl-brown'>Welcome</span> Sorcerer</p>
              <p className='fw-normal fs-5'>You can view, manage, and launch your Sanenergy generators from this panel. You can also see how many distributed rewards you have and claim them here. If you then want, you can use them to create more Sanenergy generators, up to a maximum of 100 per wallet.</p>
              <div className="d-flex flex-wrap mt-4">
                <div className="token-price fw-bold d-flex flex-wrap align-items-center my-2 me-4">
                  <BsFillCheckCircleFill className='me-2' />
                  <span className='me-2'>Ensure that you are on</span>
                  <span className='cl-blue'> app.sanenergy.finance</span>
                </div>
                <div className="token-price fw-bold my-2">
                  <span className='cl-brown me-2'>Current $SAN price:</span>
                  <span>{tokenPrice} $</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 d-flex justify-content-center">
            <img src="assets/structure.png" alt="structure" className='structure-img' />
          </div>
        </div>
      </div>

      {/* My Rune, Total Rune, Reward */}
      <div className="container mt-5">

        <div className='d-flex flex-row flex-wrap justify-content-center'>
          {/* My Runes */}
          <div className="rune-reward-info d-flex align-items-center">
            <div className='d-flex align-items-center'>
              <img src="assets/my_runes.png" alt="my_runes" className='myrunes-img me-2' />
              <span>My Generators:</span>
              <span className='ms-2'>{parseInt(userWhite) + parseInt(userOrange) + parseInt(userGreen)} / 100</span>
            </div>
          </div>
          {/* Total Runes */}
          <div className="rune-reward-info d-flex align-items-center">
            <div>
              <div className="row my-2">
                <div className='d-flex align-items-center'>
                  <img src="assets/white_rune.png" alt="white_rune" className='runes-img' />
                  <span>Wind Generators:</span>
                  <span className="ms-2">{userWhite} / {totalWhite}</span>
                </div>
              </div>
              <div className="row my-2">
                <div className='d-flex align-items-center'>
                  <img src="assets/orange_rune.png" alt="white_rune" className='runes-img me-2' />
                  <span className='cl-orange'>Solar Generators:</span>
                  <span className="ms-2 cl-orange">{userOrange} / {totalOrange}</span>
                </div>
              </div>
              <div className="row my-2">
                <div className='d-flex align-items-center'>
                  <img src="assets/green_rune.png" alt="white_rune" className='runes-img me-2' />
                  <span className='cl-green'>Tidal Generators:</span>
                  <span className="ms-2 cl-green">{userGreen} / {totalGreen}</span>
                </div>
              </div>
              <div className="row my-2">
                <div className='d-flex align-items-center'>
                  <div className='runes-img me-2' />
                  <span>Total Generators:</span>
                  <span className="ms-2">{totalNodes}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Rewards */}
          <div className="rune-reward-info d-flex align-items-center">
            <div>
              <div className='d-flex align-items-center'>
                <AiFillDollarCircle className='cl-blue fs-5 me-2' />
                <span className='cl-blue'>Rewards:</span>
                <span className="ms-2 cl-blue">{((parseFloat(whiteReward) + parseFloat(orangeReward) + parseFloat(greenReward)) / ETHUnit).toFixed(4)}</span>
              </div>
              <div className='d-flex justify-content-center'>
                {
                  (whiteReward != 0 || orangeReward != 0 || greenReward != 0) ? (
                    <button type='button' className='btn dapp-btn fw-bold mt-4' onClick={ClaimReward}>Claim Rewards</button>
                  ) : (
                    <button type='button' className='btn dapp-btn fw-bold mt-4' disabled={true}>Claim Rewards</button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Runes */}
      <div className="container mt-5">
        <div className="dapp-world-map-bg">
          <div className="dapp-world-map">
            <div className="d-flex flex-row flex-wrap justify-content-between">
              <div className='dapp-rune-info'>
                <div className={rune === 'Wind' ? "rune-selected dapp-rune-field" : "dapp-rune-field"} id='Wind' onClick={selectRune}>
                  <img src="assets/white_rune.png" alt="white_rune" className='dapp-rune-img' />
                </div>
                <p className='fw-bold my-2 text-center'><span className='cl-brown'>5 $SAN</span> Per Generator</p>
                <p className='fw-bold m-0 text-center'>Earn <span className='cl-brown'>0.05 $SAN</span> per day</p>
              </div>
              <div className='dapp-rune-info'>
                <div className={rune === 'Solar' ? "rune-selected dapp-rune-field" : "dapp-rune-field"} id='Solar' onClick={selectRune}>
                  <img src="assets/orange_rune.png" alt="orange_rune" className='dapp-rune-img' />
                </div>
                <p className='fw-bold my-2 text-center'><span className='cl-brown'>30 $SAN</span> Per Generator</p>
                <p className='fw-bold m-0 text-center'>Earn <span className='cl-brown'>0.35 $SAN</span> per day</p>
              </div>
              <div className='dapp-rune-info'>
                <div className={rune === 'Tidal' ? "rune-selected dapp-rune-field" : "dapp-rune-field"} id='Tidal' onClick={selectRune}>
                  <img src="assets/green_rune.png" alt="green_rune" className='dapp-rune-img' />
                </div>
                <p className='fw-bold my-2 text-center'><span className='cl-brown'>100 $SAN</span> Per Generator</p>
                <p className='fw-bold m-0 text-center'>Earn <span className='cl-brown'>1.25 $SAN</span> per day</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Agamotto, Create Rune */}
      <div className="container mt-5">
        <div className="row m-0 gx-5">
          <div className="col-md-6 mb-4 d-flex align-items-end">
            <div>
              <p className='m-0'>Create a  Generator with $SAN tokens to earn lifetime high-yield $ token rewards.</p>
              <p>Rewards calculations are based on many factors, including the number of generators, generator revenue, token price, and protocol revenue, and they are variable.</p>
              <div className="d-flex mt-4 flex-wrap">
                <a
                  type='button'
                  href={`https://traderjoexyz.com/trade?outputCurrency=${tokenAddr}#/`}
                  target="_blank"
                  rel='noreferrer'
                  className='btn dapp-btn fw-bold w-fit-content me-3 my-2'
                >
                  <BsCart4 />
                  <span className='ms-2'>Buy $SAN</span>
                </a>
                <span className='btn dapp-btn fw-bold w-fit-content my-2'>My $SAN: {(parseFloat(balance) / ETHUnit).toFixed(3)}</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 d-flex align-items-end">
            <div>
              <input type="text" className='rune-name' placeholder='Enter Generator Name' value={name} onChange={(e) => {
                setName(e.target.value);
              }} />
              <p className="my-2 fw-bold">
                Selected Generator: <span style={{ color: `${runeColor}` }}>{rune} Generator</span>
              </p>
              <p>Please approve the contract before creating a Generator if this is your first interaction </p>
              <div className="d-flex mt-4 flex-wrap">
                {
                  (approved === false) ? (
                    <button type='button' className='btn dapp-btn fw-bold me-3 my-2' onClick={Approve}><span>Approve</span></button>
                  ) : (
                    <button type='button' className='btn dapp-btn fw-bold me-3 my-2' disabled={true}><span>Approve</span></button>
                  )
                }

                {
                  (approved === false) ? (
                    <button type='button' className='btn dapp-btn fw-bold my-2' disabled={true}><span>Create</span></button>
                  ) : (
                    <button type='button' className='btn dapp-btn fw-bold my-2' onClick={CreateNode}><span>Create</span></button>
                  )
                }

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Runes and Rewards */}
      <div className="container my-5">
        <div className="reward-history-field">
          <div className="row underline m-0 pt-3 pb-2 px-2">
            <div className="col-6">Name</div>
            <div className="col-3">
              <Popup
                trigger={
                  <div className='d-flex align-items-center rpc'>
                    <AiFillFilter className='filter-icon' />
                    <span className='ms-1'>RPC</span>
                  </div>
                }
                position="top left"
                arrow={false}
                contentStyle={popupStyle}
              >
                <div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={white_checked} checked={white_checked} id="white" onChange={onCheckFilter} />
                    <label className="form-check-label" htmlFor="white">
                      Wind
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={orange_checked} checked={orange_checked} id="orange" onChange={onCheckFilter} />
                    <label className="form-check-label" htmlFor="orange">
                      Solar
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={green_checked} checked={green_checked} id="green" onChange={onCheckFilter} />
                    <label className="form-check-label" htmlFor="green">
                      Tidal
                    </label>
                  </div>
                  <hr className='my-2' />
                  <button
                    type='button'
                    className='btn btn-sm btn-secondary me-2'
                    onClick={resetCheckBox}
                    disabled={!green_checked && !orange_checked && !white_checked ? true : false}
                  >Reset</button>
                  {/* <button type='button' className='btn btn-sm btn-success'>OK</button> */}
                </div>
              </Popup>
            </div>
            <div className="col-3">Rewards</div>
          </div>

          {!isEmpty(myRuneItems) ? (
            <div className="scroll-field">
              {myRuneItems}
            </div>
          ) : (
            <div className="no-data-field">
              <div className='text-center'>
                <FaDatabase className='display-2' />
                <p className="mb-0 mt-2">No Data</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </React.Fragment>
  );
}

export default DApp;