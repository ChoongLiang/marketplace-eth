import detectEthereumProvider from "@metamask/detect-provider";
const {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} = require("react");
const Web3 = require("web3");

// Initialize a context variable
const Web3Context = createContext(null);

// A context provider. As you can see in the name
export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    web3: null,
    provider: null,
    contract: null,
    isLoading: true,
  });

  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3();
        setWeb3Api({
          web3: web3,
          provider: provider,
          contract: null,
          isLoading: false,
        });
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please install Metamask!");
      }
    };
    getProvider();
  }, []);

  // useMemo can invokes the provided function and caches the result
  // only update if the item changes, avoiding expensive render
  const _web3Api = useMemo(
    () => ({
      ...web3Api,
      isWeb3Loaded: web3Api.web3,
      connect: web3Api.provider
        ? async () => {
            try {
              const accounts = await web3Api.provider.request({
                method: "eth_requestAccounts",
              });
              setAccounts(accounts);
            } catch {
              location.reload();
            }
          }
        : console.error(
            "Cannot connect to wallet, please try refreshing your browser!"
          ),
    }),
    [web3Api]
  );

  return (
    // creatContext with null but it is already a context. So you can access Provider.
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

// A simple use function
export function useWeb3() {
  // That provides useContext of the initialized context variable
  return useContext(Web3Context);
}
