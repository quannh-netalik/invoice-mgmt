import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { FC } from "react";
import Logo from "../Logo";

const Navbar: FC = () => {
  return (
    <div className="flex items-center justify-between py-5">
      <Logo />
      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
};

export default Navbar;
