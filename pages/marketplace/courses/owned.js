import { MarketHeader } from "@components/ui/marketplace";
import { OwnedCourseCard } from "@components/ui/course";
import { Button, Loader, Message } from "@components/ui/common";
import { getAllCourses } from "content/courses/fetcher";
import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { useRouter } from "next/router";
import Link from "next/link";
import { useWeb3 } from "@components/providers";

export default function OwnedCourses({ courses }) {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);
  const router = useRouter();
  const { requireInstall } = useWeb3();
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {ownedCourses.isEmpty && (
          <Message type="warning">
            You don't have any courses.{` `}
            <Link href="/marketplace">
              <a className="subtitle underline">Purchase here.</a>
            </Link>
          </Message>
        )}
        {account.isEmpty && (
          <div>
            <Message type="warning">
              Wallet not detected. Please connect to wallet.
            </Message>
          </div>
        )}
        {requireInstall && (
          <div>
            <Message type="warning">
              Please install{` `}
              <Link href="https://metamask.io/" target="_blank">
                <a className="subtitle underline">Metamask.</a>
              </Link>
            </Message>
          </div>
        )}
        {ownedCourses.data?.map((course) => (
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
        ))}
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
