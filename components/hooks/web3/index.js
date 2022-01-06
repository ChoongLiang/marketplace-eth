import { useHooks } from "@components/providers/web3";

const _isEmpty = (data) => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};

const enhanceHook = (swrResponse) => {
  const { data, error } = swrResponse;
  const hasInitialResponse = !!(data || error);
  const isEmpty = hasInitialResponse && _isEmpty(data);
  return {
    ...swrResponse,
    isEmpty,
    networkDataInitialized: hasInitialResponse,
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

export const useOwnedCourses = (...args) => {
  const response = enhanceHook(
    useHooks((hooks) => hooks.useOwnedCourses)(...args)
  );

  return {
    ownedCourses: response,
  };
};

export const useOwnedCourse = (...args) => {
  const response = enhanceHook(
    useHooks((hooks) => hooks.useOwnedCourse)(...args)
  );

  return {
    ownedCourse: response,
  };
};

export const useManagedCourses = (account) => {
  const response = enhanceHook(
    useHooks((hooks) => hooks.useManagedCourses)(account)
  );

  return {
    managedCourses: response,
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
