import { Modal } from "@components/ui/common";
import { Curriculum, Hero, Keypoints } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({ course }) {
  return (
    <>
      <div className="py-4">
        <Hero
          title={course.title}
          description={course.description}
          coverImage={course.coverImage}
        />
      </div>
      <Keypoints points={course.wsl} />
      <Curriculum locked={true} />
      <Modal />
    </>
  );
}

// This is telling Next JS,
// What paths does it need to render,
// meaning specifying dynamic routes.
// ie. for this [slug].js, its the slug.
// So you return to next js all the pages that need to be rendered and the params(url)!

// Put data into structure like:
// path [ 0: { params : { slug: 'some-slug-goes-here' }}, 1: {{...}}]
// path = array, array.size is the number of dynamic pages that needs to be rendered
// Then each element of the array looks like - 0: {params: {slug: "next-js-typescript-with-shopify-integration-full-guide"}} <- the params or URL

export function getStaticPaths() {
  const { data } = getAllCourses();
  return {
    paths: data.map((course) => ({
      params: {
        slug: course.slug,
      },
    })),
    fallback: false,
  };
}

// So when you get to here, to get the props,
// directly destructuring params, which you nested above in static Path.
// You then get params: {"slug":"next-js-typescript-with-shopify-integration-full-guide"}.
// Then you get all the data and then you match the params.
// Boom! Magic! You get all the required information for the page.

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const course = data.filter((c) => c.slug === params.slug)[0];

  return {
    props: {
      course,
    },
  };
}
