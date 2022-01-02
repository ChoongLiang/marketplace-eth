import { useEffect } from "react";
import useSWR from "swr";

const adminAddress = {
  "0xE9455ad2a70916544c6a65163eb3fEd38Dbc5A4A": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0]; // = data
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider]);

  return {
    account: {
      mutate,
      ...rest,
      data,
      isAdmin: (data && adminAddress[data]) ?? false,
    },
  };
};
