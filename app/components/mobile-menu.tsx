import MenuItem from "./menu-item";

export default function MobileMenu() {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-start pt-40 font-glasgow gap-8 text-center">
      <MenuItem title="Home" onClick={() => {}} />
      <MenuItem title="About" onClick={() => {}} />
      <MenuItem title="Contact" onClick={() => {}} />
    </div>
  );
}
