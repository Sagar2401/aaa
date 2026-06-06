import React, {useEffect} from 'react';
import { BrowserRouter } from "react-router";
import RoutesManager from './RoutesManager.js';
import './App.css';
import './base.scss';
import './assets/font/Nurom-Bold.ttf';
import './assets/font/Poppins-Medium.ttf';
import './assets/font/Poppins-SemiBold.ttf';
import store from './store'
import { useState } from "react";
import {Provider} from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Favicon from 'react-favicon'

import desktopFavicon from './assets/images/favicons/desktop.png'; 
import mobileFavicon from './assets/images/favicons/mobile.png'; 
import AccountManager from './components/AccountManager'
import ModalController from './components/ModalController'

import { coinbaseWallet, hooks as coinbaseWalletHooks } from './utils/connectors/coinbaseWallet.ts'
import { hooks as metaMaskHooks, metaMask } from './utils/connectors/metaMask.ts'
import { hooks as networkHooks, network } from './utils/connectors/network.ts'
import { hooks as walletConnectHooks, walletConnect } from './utils/connectors/walletConnect.ts'
import { hooks as walletConnectV2Hooks, walletConnectV2 } from './utils/connectors/walletConnectV2.ts'

//import DailyBonusPopup from './components/DailyBonusPopup'
import { detectMob } from './utils/globalActions';
import axios from 'axios';
import {serverUrl} from './utils/constant'

const connectors = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [walletConnectV2, walletConnectV2Hooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [network, networkHooks],
]

/* axios defaults */
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.baseURL = serverUrl;

function App() {
  document.title = "Mooning Monkey"
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const init = async () => {
      setIsMobile(detectMob());
    }
    init()
  }, [])
  const cleareAllInterval = () => {
    
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }

  }
  return (
    <div>
      <Favicon url={isMobile ? desktopFavicon : desktopFavicon} />
      
      <Provider store={store}>
        
          <Web3ReactProvider connectors={connectors}>
            <BrowserRouter>
              <RoutesManager/>
              <AccountManager/>
              <ModalController/>
            </BrowserRouter>
          </Web3ReactProvider>
        
      </Provider>
    </div>
  );
}

export default App;
