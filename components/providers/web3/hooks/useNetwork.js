import { useEffect } from "react/cjs/react.development";
import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  137: "Matic",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    const mutator = (chainId) =>
      mutate(NETWORKS[parseInt(chainId, 16)] ?? null);
    provider?.on("chainChanged", mutator);

    console.log(provider);
    return () => {
      provider?.removeListener("chainChanged", mutator);
    };
  }, [provider]);

  return {
    data,
    mutate,
    targetNetwork,
    isSupported: targetNetwork === data,
    ...rest,
  };
};
