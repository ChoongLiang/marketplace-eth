import { WalletBar, EthRates } from "@components/ui/web3";
import { Breadcrumbs } from "@components/ui/common";

const LINKS = [
  {
    href: "/marketplace",
    value: "Marketplace",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/manage",
    value: "Manage Courses",
  },
];

export default function Header() {
  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} />
      </div>
    </>
  );
}
