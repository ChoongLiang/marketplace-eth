import detectEthereumProvider from "@metamask/detect-provider";
const { createContext, useContext, useEffect, useState } = require("react");
const Web3 = require("web3");

// Initialize a context variable
const Web3Context = createContext(null);

// A context provider. As you can see in the name
export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    web3: null,
    provider: null,
    contract: null,
    isInitialized: false,
  });

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3();
        setWeb3Api({
          web3: web3,
          provider: provider,
          contract: null,
          isInitialized: true,
        });
      } else {
        setWeb3Api((api) => ({ ...api, isInitialized: true }));
        console.error("Please install Metamask!");
      }
    };
    getProvider();
  }, []);
  return (
    // creatContext with null but it is already a context. So you can access Provider.
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
}

// A simple use function
export function useWeb3() {
  // That provides useContext of the initialized context variable
  return useContext(Web3Context);
}
