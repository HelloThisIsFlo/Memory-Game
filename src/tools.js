function alphaPctToHex(alphaPct) {
  const hexValue = (alphaPct * 255) / 100;
  let hexString = hexValue.toString(16).toUpperCase();
  if (hexString.length == 1) {
    hexString = "0" + hexString;
  }
  return hexString;
}

module.exports = { alphaPctToHex };
