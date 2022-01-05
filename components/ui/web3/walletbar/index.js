import { useWeb3 } from "@components/providers";
import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";

export default function WalletBar() {
  const { network, account } = useWalletInfo();
  const { data, isSupported, networkDataInitialized, targetNetwork } = network;
  const { requireInstall } = useWeb3();
  return (
    <section className="text-white bg-indigo-600 rounded-lg">
      <div className="p-8">
        <h1 className="text-base break-words xs:text-lg">
          Hello, {account.data}
        </h1>
        <h2 className="subtitle mb-5 text-sm xs:text-lg">
          I hope you are having a great day!
        </h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <Button className="mr-2 xs:text-sm text-base" variant="white">
              Learn how to purchase
            </Button>
          </div>
          <div>
            {requireInstall && (
              <div className="bg-yellow-500 p-3 rounded-lg">
                Cannot connect to network. Please install Metamask.
              </div>
            )}
            {networkDataInitialized && !isSupported && (
              <div className="bg-red-500 p-3 rounded-lg">
                <div>
                  Please connect to:{" "}
                  <strong className="text-2xl">{targetNetwork}</strong>
                </div>
              </div>
            )}
            {data && (
              <div>
                <span>Currently on </span>
                <strong className="text-2xl">{data}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
