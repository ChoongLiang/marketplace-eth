import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "content/courses/fetcher";
import { EthRates, WalletBar } from "@components/ui/web3";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import OrderModal from "@components/ui/order/modal";
import { useState } from "react";
import { useEthPrice } from "@components/hooks/web3/useEthPrice";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { account } = useAccount();
  const { network } = useNetwork();
  const { eth } = useEthPrice();
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
      <EthRates eth={eth.data} />
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <Button
                  variant="lightPurple"
                  onClick={() => setSelectedCourse(course)}
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
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
