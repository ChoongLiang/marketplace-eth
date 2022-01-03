import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";

export const setupHooks = (...dependencies) => {
  console.log("setting up hooks");
  return {
    useAccount: createAccountHook(...dependencies),
    useNetwork: createNetworkHook(...dependencies),
  };
};
