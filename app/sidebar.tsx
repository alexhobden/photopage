export const Sidebar = () => {
  return (
    <div className="w-full lg:w-1/5 font-glasgow bg-green-500/20 p-4">
      <div>
        <div className="relative ">
          <h1 className="lg:text-[1.75em] font-light text-center tracking-[0.75em]">
            ALEX
          </h1>
          <h1 className="lg:text-[1.75em] font-light text-center tracking-[0.75em]">
            HOBDEN
          </h1>
          <div className="border-white h-4 w-4 border-b-[0.8px] border-l-[0.8px] bottom-0  absolute"></div>
          <div className="border-white h-4 w-4 border-t-[0.8px] border-r-[0.8px] top-0 right-0  absolute"></div>
        </div>
        <div className="w-full border-t border-white opacity-70 my-2"></div>
        <div className="hidden lg:block">
          <p className="text-xl text-center uppercase tracking-[0.75em] opacity-70">
            Collections
          </p>
        </div>
      </div>
    </div>
  );
};
