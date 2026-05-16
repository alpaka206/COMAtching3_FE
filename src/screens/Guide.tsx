// @ts-nocheck
import Image from "next/image";
import HeaderBack from "../components/HeaderBack";
import Footer from "../components/Footer";
import Background from "../components/Background";

function Guide() {
  return (
    <div className="container">
      <Background/>
      <HeaderBack />
      <div className="content">
        <Image
          src="/assets/guide.png"
          alt="서비스 이용 가이드"
          width={786}
          height={3050}
          sizes="(max-width: 480px) 72vw, 354px"
          className="guide-image"
          priority
        />
      </div>
      <Footer />
    </div>
  );
}

export default Guide;
