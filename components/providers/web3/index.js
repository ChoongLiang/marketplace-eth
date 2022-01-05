import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "@utils/loadContract";
import { setupHooks } from "./hooks/setupHooks";
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
    hooks: setupHooks(),
  });

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const contract = await loadContract("CourseMarketplace", provider);
        setWeb3Api({
          web3,
          provider,
          contract: null,
          isLoading: false,
          hooks: setupHooks(web3, provider),
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
  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      // isWeb3Loaded: web3 != null,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider.request({
                method: "eth_requestAccounts",
              });
            } catch (error) {
              console.error(error);
              location.reload();
            }
          }
        : () =>
            console.error(
              "Cannot connect to wallet, please try refreshing your browser!"
            ),
    };
  }, [web3Api]);

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

export function useHooks(callback) {
  const { hooks } = useWeb3();
  return callback(hooks);
}
