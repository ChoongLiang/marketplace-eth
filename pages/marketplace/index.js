import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "content/courses/fetcher";
import { EthRates, WalletBar } from "@components/ui/web3";
import { useWalletInfo } from "@components/hooks/web3";
import { Breadcrumbs, Button } from "@components/ui/common";
import OrderModal from "@components/ui/order/modal";
import { useState } from "react";
import { useEthPrice } from "@components/hooks/web3/useEthPrice";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { eth } = useEthPrice();
  const { account, network, canPurchase } = useWalletInfo();

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
      <EthRates ethPrice={eth.data} perItem={eth.perItem} />
      <div className="flex flex-row-reverse">
        <Breadcrumbs />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchase}
            Footer={() => (
              <div className="mt-4">
                <Button
                  variant="lightPurple"
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchase}
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
