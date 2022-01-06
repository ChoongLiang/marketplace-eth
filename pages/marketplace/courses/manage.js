import { MarketHeader } from "@components/ui/marketplace";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { Button } from "@components/ui/common";
import { useAccount, useManagedCourses } from "@components/hooks/web3";

export default function ManageCourses() {
  const { account } = useAccount();
  const { managedCourses } = useManagedCourses(account.data);
  console.log(managedCourses);
  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course) => (
          <ManagedCourseCard course={course} key={course.ownedCourseId}>
            <div className="mr-2 flex relative rounded-md">
              <input
                type="text"
                name="account"
                id="account"
                className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                placeholder="0x2341ab..."
              />
              <Button>Verify</Button>
            </div>
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
}
