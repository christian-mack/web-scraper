import { Gem, Heart, Search, User } from "lucide-react";
import Link from "next/link";

const navLinks = [
  {
    name: "search",
    icon: <Search />,
  },
  {
    name: "heart",
    icon: <Heart />,
  },
  {
    name: "user",
    icon: <User />,
  },
];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Gem />
          <p className="nav-logo">
            Scrape<span className="text-primary">rly</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navLinks.map((link) => (
            <div key={link.name}>{link.icon}</div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
