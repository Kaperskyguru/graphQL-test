const graphql = require('graphql');
const Calculator = require('../cryptoCalculator.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLSchema
} = graphql;

var Types = new GraphQLEnumType({
    name: 'RGB',
    values: {
        BUY: {
            value: 'buy'
        },
        SELL: {
            value: 'sell'
        },
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        calculatePrice: {
            type: GraphQLString,
            args: {
                type: {
                    type: Types
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