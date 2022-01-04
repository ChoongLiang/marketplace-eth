import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "content/courses/fetcher";
import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import OrderModal from "@components/ui/order/modal";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { canPurchase } = useWalletInfo();

  return (
    <>
      <MarketHeader />
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
