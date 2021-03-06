import { triggerToaster } from '../actionCreators';
import Config from '../../config';
import Store from '../../store';

export function shepherdElectrumLock() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/lock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumLock',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function shepherdElectrumLogout() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/electrum/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdElectrumLogout',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function shepherdStopCoind(coin) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/coind/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: coin === 'SAFE' ? '' : JSON.stringify({ chain: coin }),
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'shepherdStopCoind',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function shepherdRemoveCoin(coin, mode) {
  return new Promise((resolve, reject, dispatch) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/coins/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coin === 'SAFE' && mode === 'native' ? {
        mode,
      } : {
        mode,
        chain: coin,
      }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdRemoveCoin',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      resolve(json);
      if (mode === 'native') {
        Store.dispatch(
          triggerToaster(
            `${coin} daemon is still running. If you want to completely stop it and remove use stop icon next time.`,
            'Warning',
            'warning'
          )
        );
      }
    })
  });
}

export function shepherdGetCoinList() {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/coinslist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdGetCoinList',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function shepherdPostCoinList(data) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:${Config.safewalletPort}/shepherd/coinslist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'payload': data }),
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdPostCoinList',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}

export function shepherdClearCoindFolder(coin, keepWalletDat) {
  return new Promise((resolve, reject) => {
    fetch(keepWalletDat ? `http://127.0.0.1:${Config.safewalletPort}/shepherd/kick?coin=${coin}&keepwallet=true` : `http://127.0.0.1:${Config.safewalletPort}/shepherd/kick?coin=${coin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'shepherdClearCoindFolder',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => resolve(json))
  });
}