import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (course, account) => {
  const swrResponse = useSWR(
    // `web3/ownedCourse/${account}` => like useEffect, will track these variable
    () => (web3 && contract && account ? `web3/ownedCourse/${account}` : null),
    async () => {
      const courseHash = createCourseHash(web3)(course.id, account);
      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();
      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return null;
      }
      return normalizeOwnedCourse(web3)(course, ownedCourse);
    }
  );
  return swrResponse;
};
