import useSWR from "swr";

export const handler = (web3, contract) => (courses, account) => {
  const swrResponse = useSWR(
    () => (web3 && contract && account ? "web3/ownedCourses" : null),
    () => {
      const courseList = [];
      for (let i = 0; i < courses.length; i++) {
        courseList.push(courses[i].id);
      }
      return courseList;
    }
  );
  return swrResponse;
};
