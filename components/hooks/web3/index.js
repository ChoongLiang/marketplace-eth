import { useHooks } from "@components/providers/web3";

const enhanceHook = (swrResponse) => {
  return {
    ...swrResponse,
    networkDataInitialized: swrResponse.data || swrResponse.error,
  };
};

export const useNetwork = () => {
  const swrResponse = enhanceHook(useHooks((hooks) => hooks.useNetwork)());
  return {
    network: swrResponse,
  };
};

export const useAccount = () => {
  const swrResponse = enhanceHook(useHooks((hooks) => hooks.useAccount)());
  return {
    account: swrResponse,
  };
};

export const useOwnedCoursesHook = () => {
  const response = useHooks((hooks) => hooks.useOwnedCourses)();
  return {
    ownedCourses: { data: response },
  };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();
  const canPurchase = !!(account.data && network.isSupported);
  return {
    account,
    network,
    canPurchase,
  };
};
