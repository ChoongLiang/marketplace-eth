import { useWeb3 } from "@components/providers";
import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { getAllCourses } from "content/courses/fetcher";

export default function Home({ courses }) {
  return (
    <>
      <Hero />
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

// Either do this. Wrapping Home with Base Layout before
// Home page gets compiled OR directly wrap _app

// I wrapped _app so that it will be easier to control baseLayout component at 1 place only

// const Wrapper = ({ ...props }) => (
//   <BaseLayout>
//     <Home {...props} />
//   </BaseLayout>
// );
// export default Wrapper;
