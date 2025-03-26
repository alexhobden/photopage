import Image from "next/image";

type Props = {
  ImageSrc: string;
};

export const MainImage = ({ ImageSrc }: Props) => {
  return (
    <div className="relative w-full lg:w-auto flex-1">
      <Image
        src={`/${ImageSrc}.jpg`} // Make sure it's in /public
        alt="Skull"
        layout="fill"
        objectFit="contain"
        className="lg:py-14 lg:pr-20"
      />
      <div className="hidden lg:block border-white h-20 w-20 border-b-[0.8px] border-l-[0.8px] bottom-12 left-16  lg:absolute"></div>
      <div className="hidden lg:block border-white h-20 w-20 border-t-[0.8px] border-r-[0.8px] top-12 right-36  lg:absolute"></div>
    </div>
  );
};
