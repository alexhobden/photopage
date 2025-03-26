import Link from "next/link";

const Footer = () => {
  return (
    <div className=" lg:absolute text-xs lg:text-[1em] bottom-0 lg:flex justify-between font-glasgow px-4 lg:px-24 items-center w-full h-8 lg:h-14 bg-black/50 backdrop-blur-md text-white">
      <p>© 2025 Alex Hobden</p>
      <Link className="hover:underline" href={"/LegalNotice"}>
        Legal Notice
      </Link>
      <Link className="hover:underline" href={"/PrivacyPolicy"}>
        Pricacy Policy
      </Link>
    </div>
  );
};

export default Footer;
