const { createContext, useContext } = require("react");

// Initialize a context variable
const Web3Context = createContext(null);

// A context provider. As you can see in the name
export default function Web3Provider({ children }) {
  return (
    // creatContext with null but it is already a context. So you can access Provider.
    <Web3Context.Provider value={{ test: "Hello" }}>
      {children}
    </Web3Context.Provider>
  );
}

// A simple use function
export function useWeb3() {
  // That provides useContext of the initialized context variable
  return useContext(Web3Context);
}
