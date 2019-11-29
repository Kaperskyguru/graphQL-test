const {
  cryptoPriceFromServer,
  calculateAmount,
  calculateExchangeRate,
  convertToNGN
} = require("./cryptoCalculator");

const { graphql } = require("graphql");
const tester = require("graphql-tester").tester;
const schema = require("../src/schema/schema");

describe("Calculator", () => {
  it("Retrieves BTC current value from the server", async () => {
    let currentBTCAmount = await cryptoPriceFromServer();
    expect(currentBTCAmount).toBeDefined();
  });

  // it('throws an error if could not retrieve', async () => {
  //     // expect.assertions(1);
  //     // console.log(cryptoPriceFromServer());

  //     await expect(cryptoPriceFromServer()).resolves.toBeUndefined();
  // })

  it("calculates amount", async () => {
    // expect(cryptoPriceFromServer()).not.toHaveBeenCalled();

    let currentBTCAmount = await cryptoPriceFromServer();

    // expect(cryptoPriceFromServer()).toHaveBeenCalled();

    // expect(calculateAmount()).not.toHaveBeenCalled();

    const result = calculateAmount("sell", 0.2, currentBTCAmount);

    // expect(cryptoPriceFromServer()).toHaveBeenCalledWith('sell', 0.2, currentBTCAmount);

    expect(result).toBeGreaterThan(0);
  });

  it("calculates exchange rate", async () => {
    let currentBTCAmount = await cryptoPriceFromServer();
    const amountInUSD = calculateAmount("sell", 0.2, currentBTCAmount);
    const result = calculateExchangeRate(amountInUSD, 350);
    expect(result).toBe(amountInUSD * 350);
  });

  it("converts currency to naira format", async () => {
    let currentBTCAmount = await cryptoPriceFromServer();
    const amountInUSD = calculateAmount("sell", 0.2, currentBTCAmount);
    const amount = calculateExchangeRate(amountInUSD, 350);
    const result = convertToNGN(amount);
    expect(result).toMatch(/NGN/);
  });
});

describe("GraphQL Resolvers", () => {
  const self = this;
  const PORT = process.env.PORT || 4000;

  beforeAll(() => {
    self.test = tester({
      url: `http://127.0.0.1:${PORT}/graphql`,
      contentType: "application/json"
    });
  });

  it("return current currency value in naira", async done => {
    self
      .test(
        JSON.stringify({
          query: `query{calculatePrice(type:SELL, margin:0.2, exchangeRate:360)}
          `
        }),
        { jar: true }
      )
      .then(res => {
        expect(res.data.calculatePrice).toMatch(/NGN/);
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        done();
      })
      .catch(err => {
        console.log(err);

        expect(err).toBe(null);
        done();
      });
  });
});
