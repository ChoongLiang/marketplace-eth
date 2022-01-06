import { useEffect } from "react";
import useSWR from "swr";

const adminAddress = {
  // Keccak-256
  "0xbe589664adae35e9bd39af53e6751b33e97cc5bfc64206959fe2f32afd7c9362": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error(
          "Cannot retreive an account. Please refresh the browser."
        );
      }
      return account; // = data : accounts
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider]);

  return {
    mutate,
    ...rest,
    data,
    isAdmin: (data && adminAddress[web3.utils.keccak256(data)]) ?? false,
  };
};
