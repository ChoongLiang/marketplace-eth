import { handler as createUseAccount } from "./useAccount";
export const setupHooks = (...dependencies) => {
  return {
    useAccount: createUseAccount(...dependencies),
  };
};
