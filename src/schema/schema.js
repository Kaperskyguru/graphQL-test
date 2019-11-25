const graphql = require('graphql');
const Calculator = require('../cryptoCalculator.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLSchema
} = graphql;

// type Query {
//     calculatePrice(type: String!, margin: Float!, exchangeRate: Float!): String
// }
const CalculatePriceType = new GraphQLObjectType({
    name: 'CalculatePrice',
    fields: () => ({
        amount: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        calculatePrice: {
            type: GraphQLString,
            args: {
                type: {
                    type: GraphQLString
                },
                margin: {
                    type: GraphQLFloat
                },
                exchangeRate: {
                    type: GraphQLFloat
                },
            },
            resolve(parent, args) {
                // Calculate Price
                const rate = Number(args.exchangeRate);
                const margin = Number(args.margin);
                const type = args.type;
                return Calculator.calculate(type, margin, rate);
            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery
});