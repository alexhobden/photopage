interface MenuItemProps {
  title: string;
  onClick: () => void;
}

export default function MenuItem({ title, onClick }: MenuItemProps) {
  return (
    <div className="py-2 hover:bg-white/20 transition-colors">
      <p
        className="text-white uppercase tracking-[0.25em] text-4xl"
        onClick={onClick}
      >
        {title}
      </p>
    </div>
  );
}
