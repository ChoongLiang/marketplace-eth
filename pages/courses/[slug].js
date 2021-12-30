import { Modal } from "@components/common";
import { Curriculum, Hero, Keypoints } from "@components/course";
import { BaseLayout } from "@components/layout";

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
