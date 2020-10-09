// check whether targeting web or electron
const isElectron = require('is-electron');
const TARGET = isElectron() ? 'electron' : 'web';
const WEB = TARGET === 'web';
const ELECTRON = !WEB;

function alertWebUnimplemented() {
  if (WEB) {
    alert('Not yet implemented!');
  }
  return WEB;
}

export { TARGET, WEB, ELECTRON, alertWebUnimplemented };
