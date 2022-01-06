import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Modal, Message } from "@components/ui/common";
import { Curriculum, Hero, Keypoints } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({ course }) {
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account);
  const courseState = ownedCourse.data?.state;
  const isLocked = courseState === "purchased" || courseState === "deactivated";
  return (
    <>
      <div className="py-4">
        <Hero
          title={course.title}
          description={course.description}
          coverImage={course.coverImage}
          isOwner={!!ownedCourse.data}
        />
      </div>
      <Keypoints points={course.wsl} />
      {courseState && (
        <div className="max-w-5xl mx-auto">
          {courseState === "purchased" && (
            <div>
              <Message type="warning">
                Course has been purchased successfully. Activation may take up
                to 24 hours.
                <i className="block font-normal">
                  Please contact us at tcltannn@gmail.com
                </i>
              </Message>
            </div>
          )}
          {courseState === "activated" && (
            <div>
              <Message type="success">
                Course is activated. Happy learning!
              </Message>
            </div>
          )}
          {courseState === "deactivated" && (
            <div>
              <Message type="danger">
                Course has been deactivated. Watching functionality has been
                temporarily disabled.
                <i className="block font-normal">
                  Please contact us at tcltannn@gmail.com
                </i>
              </Message>
            </div>
          )}
        </div>
      )}
      <Curriculum locked={false} courseState={"activated"} />
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
