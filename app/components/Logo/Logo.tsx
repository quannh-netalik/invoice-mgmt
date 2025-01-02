import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import LogoImage from "@/public/logo.png";

const Logo: FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={LogoImage} alt="Logo" className="size-7" />
      <p className="text-2xl font-bold">
        Invoice<span className="text-blue-600">Management</span>
      </p>
    </Link>
  );
};

export default Logo;
