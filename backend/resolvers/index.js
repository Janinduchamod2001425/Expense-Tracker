import { mergeResolvers } from "@graphql-tools/merge";

// Import resolvers
import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, transactionResolver]);

export default mergedResolvers;
