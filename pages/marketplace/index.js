import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { getAllCourses } from "content/courses/fetcher";
import { WalletBar } from "@components/ui/web3";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useEffect } from "react/cjs/react.development";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  useEffect(() => {
    console.log(account);
  }, []);
  return (
    <>
      <WalletBar account={account.data} />
      <CourseList courses={courses} />
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
