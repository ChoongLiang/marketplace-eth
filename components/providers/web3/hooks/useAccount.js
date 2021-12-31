import { useEffect, useState } from "react";

export const handler = (web3) => () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function getAccount() {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }

    web3 && getAccount();
  }, [web3]);

  return {
    account,
  };
};
