import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "content/courses/fetcher";
import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import OrderModal from "@components/ui/order/modal";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";

export default function Marketplace({ courses }) {
  const { web3, contract } = useWeb3();
  const { canPurchase, account } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handlePurchaseCourse = async (order) => {
    // First course id: 1410474 => 31 34 31 30 34 37 34
    // 0x31343130343734
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);

    // 0x31343130343734000000000000000000 - course
    // 0xE9455ad2a70916544c6a65163eb3fEd38Dbc5A4A - address
    // 31343130343734000000000000000000E9455ad2a70916544c6a65163eb3fEd38Dbc5A4A - combine
    // get 241b6c21ddaaaff355b023143fe4e1f9cd2d6130bc8e4754855a6b0d198839d7
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );

    // test@gmail.com - email
    // af257bcc3cf653863a77012256c927f26d8ab55c5bea3751063d049d0538b902
    const emailHash = web3.utils.sha3(order.email);

    // af257bcc3cf653863a77012256c927f26d8ab55c5bea3751063d049d0538b902 - email
    // 241b6c21ddaaaff355b023143fe4e1f9cd2d6130bc8e4754855a6b0d198839d7 - order
    // af257bcc3cf653863a77012256c927f26d8ab55c5bea3751063d049d0538b902241b6c21ddaaaff355b023143fe4e1f9cd2d6130bc8e4754855a6b0d198839d7
    // get 0xecdb4f91629c2274ee5d518f353c917acac9badad626d94034ab46e3f4a24596
    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    const price = web3.utils.toWei(String(order.price), "ether");

    try {
      const result = await contract.methods.purchaseCourse(hexCourseId, proof, {
        from: account.data,
        value: price,
      });
    } catch (error) {
      console.error(error);
      console.error("Purchase course failed");
    }
  };

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
          onSubmit={handlePurchaseCourse}
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
