const axios = require('axios');

const baseURL = `https://min-api.cryptocompare.com/data`;

async function CryptoPriceCalculator(type, margin, exchangeRate) {
    const BTCPrice = await cryptoPriceFromServer();
    const amountInUSD = calculateAmount(type, margin, BTCPrice)
    return convertToNGN(calculateExchangeRate(amountInUSD, exchangeRate));
}

async function cryptoPriceFromServer() {
    const currentBtcPrice = await axios.get(`${baseURL}/price?fsym=BTC&tsyms=USD`).then(res => res.data);

    if (currentBtcPrice.USD) {
        return currentBtcPrice.USD
    }
    return 0;
}

function calculateAmount(type, margin, currentBtcPrice) {
    const percent = margin / 100;
    let btc = 0;
    if (type == 'sell') {
        // Substract
        btc = currentBtcPrice - percent;

    } else if (type == 'buy') {
        // Add
        btc = currentBtcPrice + percent;
    }

    return btc;
}

function calculateExchangeRate(amountInUSD, rate) {
    return amountInUSD * rate;
}

function convertToNGN(amount) {
    const roundedAmount = amount.toFixed(2);
    let formattedAmount = roundedAmount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return `NGN ${formattedAmount}`;
}

exports.calculate = async function (type, margin, exchangeRate) {
    return await CryptoPriceCalculator(type, margin, exchangeRate)
};