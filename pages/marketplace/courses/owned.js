import { MarketHeader } from "@components/ui/marketplace";
import { OwnedCourseCard } from "@components/ui/course";
import { Button, Message } from "@components/ui/common";
import { getAllCourses } from "content/courses/fetcher";
import { useAccount, useOwnedCourses } from "@components/hooks/web3";

export default function OwnedCourses({ courses }) {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account);
  return (
    <>
      <MarketHeader />
      {JSON.stringify(ownedCourses.data)}
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message>My custom message!</Message>
          <Button>Watch the course</Button>
        </OwnedCourseCard>
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
