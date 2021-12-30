import { Modal } from "@components/common";
import { Curriculum, Hero, Keypoints } from "@components/course";

export default function Course() {
  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <Hero />
      <Keypoints />
      <Curriculum />
      <Modal />
    </div>
  );
}
