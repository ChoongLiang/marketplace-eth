import { Navbar, Footer } from "@components/common";

export default function BaseLayout({ childProps }) {
  return (
    <div className="overflow-hidden">
      <div className=" max-w-7xl mx-auto px-4">
        <Navbar />
        <div className="fit">{childProps}</div>
      </div>
      <Footer />
    </div>
  );
}
