const axios = require('axios');

async function CryptoPriceCalculator(type, margin, exchangeRate) {
    const BTCPrice = await cryptoPriceFromServer();
    return convertToNGN(calculateAmount(type, margin, BTCPrice));
}

async function cryptoPriceFromServer() {
    const currentBtcPrice = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`).then(res => res.data);

    if (currentBtcPrice.USD) {
        console.log(currentBtcPrice.USD);
        return currentBtcPrice.USD
    }
    return 0;
}

function calculateAmount(type, margin, currentBtcPrice) {
    const percent = margin / 100;
    let btc = 0;
    if (type == 'sell') {
        // Substrat
        btc = currentBtcPrice - percent;

    } else if (type == 'buy') {
        // Add
        btc = currentBtcPrice + percent;
    }

    return btc;
}

function convertToNGN(amount) {
    let formattedAmount = amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return `NGN ${formattedAmount}`;
}

exports.calculate = async function(type, margin, exchangeRate) {
    return await CryptoPriceCalculator(type, margin, exchangeRate)
};