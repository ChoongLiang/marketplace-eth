import { MarketHeader } from "@components/ui/marketplace";
import { OwnedCourseCard } from "@components/ui/course";
import { Button, Loader, Message } from "@components/ui/common";
import { getAllCourses } from "content/courses/fetcher";
import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { useRouter } from "next/router";

export default function OwnedCourses({ courses }) {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account);
  const router = useRouter();
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {ownedCourses.data ? (
          ownedCourses.data.map((course) => (
            <OwnedCourseCard course={course} key={course.id}>
              <Message>My custom message!</Message>
              <Button
                onClick={() => {
                  router.push(`/courses/${course.slug}`);
                }}
              >
                Watch the course
              </Button>
            </OwnedCourseCard>
          ))
        ) : (
          <div className="m-auto mt-20">
            <Loader />
          </div>
        )}
      </section>
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
