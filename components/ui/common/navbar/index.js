import { useWeb3 } from "@components/providers";
import Link from "next/link";
import { Button } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3";
import { useRouter } from "next/router";

export default function Navbar() {
  const { isWeb3Loaded, isLoading, connect } = useWeb3();
  const { account } = useAccount();
  const { pathname } = useRouter();
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <a
                  href="#"
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                >
                  Home
                </a>
              </Link>
              <Link href="/">
                <a
                  href="#"
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                >
                  Features
                </a>
              </Link>
              <Link href="/marketplace">
                <a
                  href="#"
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                >
                  Marketplace
                </a>
              </Link>
            </div>
            <div>
              <Link href="/">
                <a
                  href="#"
                  className="font-medium mr-8 text-gray-500 hover:text-gray-900"
                >
                  Wishlist
                </a>
              </Link>
              {isLoading ? (
                <Button disabled={true}>Loading</Button>
              ) : isWeb3Loaded ? (
                account.data ? (
                  <Button hoverable={false} className="cursor-default">
                    Hi There {account.isAdmin && "Admin"}
                  </Button>
                ) : (
                  <Button onClick={connect}>Connect</Button>
                )
              ) : (
                <Button
                  onClick={() => {
                    window.open("https://metamask.io/", "_blank");
                  }}
                >
                  Install Metamask
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="overline uppercase font-light ">{account.data}</div>
        </div>
      )}
    </section>
  );
}
