import { Modal } from "@components/ui/common";
import { Curriculum, Hero, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";

export default function Course() {
  return (
    <BaseLayout>
      <div className="py-4">
        <Hero />
      </div>
      <Keypoints />
      <Curriculum />
      <Modal />
    </BaseLayout>
  );
}
