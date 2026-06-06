import {connect} from 'react-redux'
import { useState, useEffect } from 'react';

import './index.scss';
import ContainerComponent from "../ContainerComponent";
import PlayerCell from "./PlayerCell.js";
import {GAME_STATE} from '../../utils/types'

const testData = [
    {
        username: "Pleaseloveme",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "SNP7",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "1576746",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "kaito9791",
        amount: 1,
        multiplier: "141",
        gameResult: "23"
    },
    {
        username: "riksawa",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "cintya",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "yurimaru123",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "koshiozaki",
        amount: 1,
        multiplier: "141",
        gameResult: "23"
    },
    {
        username: "hapylife",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "RAMA1985",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "R7B",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "fungi",
        amount: 1,
        multiplier: "141",
        gameResult: "23"
    },
    {
        username: "vim95",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "LK25",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "Success5000",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "Kopk",
        amount: 1,
        multiplier: "141",
        gameResult: "23"
    },
    {
        username: "KG67",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "xxxxxcode",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "ABCDSh",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "Onechancer",
        amount: 1,
        multiplier: "141",
        gameResult: "23"
    },
    {
        username: "1628",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "Uyen",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "Rnrnl",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "sdfaq",
        amount: 1,
        multiplier: "141",
        gameResult: "23"
    },
    {
        username: "A12345",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "TheKeysInc",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "TTT31",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "dtdxong",
        amount: 1,
        multiplier: "141",
        gameResult: "23"
    },
    {
        username: "ContraryMan",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    },
    {
        username: "bill33",
        amount: 1,
        multiplier: "2",
        gameResult: "23"
    }
]
let displayBetsInterval = null
let currentAllBets = []
let currentGameState = GAME_STATE.NONE
let currentDisplayBets = []
const PlayersDesktop = (props) => {
    const {allBets, onlinePlayerCount, gameState, displayValue} = props;
    const [totalBet, setTotalBet] = useState(0)
    const [displayBets, setDisplayBets] = useState([])
    useEffect(() => {
        currentAllBets = allBets;
        // Calculate total bet
        let _totalBet = 0;
        for (let i = 0; i < allBets.length; i++) {
            _totalBet += Number(allBets[i].amount); 
        }
        setTotalBet(_totalBet);
        if(currentGameState !== GAME_STATE.WAITING) {
            setDisplayBets(currentAllBets)
        }
    },[allBets]);
    useEffect(() => {
        if(currentGameState !== GAME_STATE.WAITING) {
            let unReachedValues = allBets.filter(bet => bet.multiplier >= displayValue);
            let reachedValues = allBets.filter(bet => bet.multiplier < displayValue);
            let resultBets = unReachedValues.concat(reachedValues)
            if(JSON.stringify(resultBets) !== JSON.stringify(currentDisplayBets)) {
                currentDisplayBets = resultBets
                setDisplayBets(resultBets)
            }
        }
    },[displayValue, allBets]);
    useEffect(() => {
        // Calculate total bet
        currentGameState = gameState
        clearInterval(displayBetsInterval)
        switch(gameState) {
            case GAME_STATE.WAITING:
                currentDisplayBets = []
                setDisplayBets([])
                
                displayBetsInterval = setInterval(() => updateDisplayValue(), 500)
                break;
            case GAME_STATE.RUNNING:
                currentDisplayBets = currentAllBets
                setDisplayBets(currentAllBets)
                break;
            default:
                console.log("none state")
                currentDisplayBets = []
                //test
                //displayBetsInterval = setInterval(() => updateDisplayValue(), 500)
                break;
        }
    },[gameState]);
    const updateDisplayValue = () => {
        let _remindBets = currentAllBets.filter(bet => {
            let betOnDisplay = currentDisplayBets.find(_displayBet => _displayBet.username === bet.username)
            return betOnDisplay === undefined || betOnDisplay === null
        })
        let displayCount = Math.random() * (8 - 3) + 3
        currentDisplayBets = currentDisplayBets.concat(_remindBets.slice(0, displayCount))
        
        setDisplayBets(currentDisplayBets)
    }
    return (
        <ContainerComponent className="height-100-p">
            <div className="players">
                <div>
                    
                    <div className="player-table">
                        <table className="table">
                            <tr>
                                <th className="h-player">Players: <span>{displayBets.length}</span></th>
                                <th className="h-wager">Bet</th>
                                <th className="h-multi">Mult</th>
                                <th className="h-payout">Payout</th>
                            </tr>
                            {
                                // displayBets.length > 0 &&
                                // displayBets.map((data, index) => 
                                //     index < 50 ?
                                //         <PlayerCell key={data.username} p_address="" p_name={data.username} 
                                //             wager={data.amount} mulitplayer={data.multiplier} 
                                //             payout="+2.50 BNB"
                                //             pay_type="bnb1"/>
                                //     :    <></>
                                // )
                                testData.length > 0 &&
                                testData.map((data, index) => 
                                    index < 50 ?
                                        <PlayerCell key="data.username" p_address="" p_name={data.username} 
                                            wager={data.amount} mulitplayer={data.multiplier} 
                                            payout="+2.50 BNB"
                                            pay_type="bnb1"/>
                                    :    <></>
                                )
                            }
                        </table>
                    </div>
                </div>
                <div className="total-info">
                    <div>Online: <span>{onlinePlayerCount}</span></div>
                    <div>Playing: <span>{displayBets.length}</span></div>
                    <div>Bet Amount: <span>{Number(Number(totalBet).toFixed(0)).toLocaleString('en-US')}</span></div>
                </div>
            </div>
            
        </ContainerComponent>
    );
}

const mapStateToProps  = (state) => (
    {
        allBets: state.usersBetData.allBets,
        displayValue: state.displayData.value,
        gameState: state.gameValue.gameState,
        onlinePlayerCount: state.usersBetData.onlinePlayerCount 
    }
)

export default connect(mapStateToProps, {})(PlayersDesktop)