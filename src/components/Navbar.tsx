import { ThemeSwitch } from "@/components/ThemeSwitch";

interface Props {
  title: string;
}

export function Navbar({ title }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <ThemeSwitch />
      </div>
    </div>
  );
}
