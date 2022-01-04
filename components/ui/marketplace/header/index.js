import { WalletBar, EthRates } from "@components/ui/web3";
import { Breadcrumbs } from "@components/ui/common";

export default function Header() {
  return (
    <>
      <WalletBar />
      <EthRates />
      <div className="flex flex-row-reverse">
        <Breadcrumbs />
      </div>
    </>
  );
}
