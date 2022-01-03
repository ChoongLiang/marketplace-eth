import { CourseList } from "@components/ui/course";
import { getAllCourses } from "content/courses/fetcher";
import { WalletBar } from "@components/ui/web3";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button } from "@components/ui/common";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();
  return (
    <>
      <WalletBar
        account={account.data}
        network={{
          data: network.data,
          targetNetwork: network.targetNetwork,
          isSupported: network.isSupported,
          networkDataInitialized: network.networkDataInitialized,
        }}
      />
      <CourseList
        courses={courses}
        Footer={() => (
          <div className="mt-4">
            <Button variant="lightPurple">Purchase</Button>
          </div>
        )}
      />
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}
