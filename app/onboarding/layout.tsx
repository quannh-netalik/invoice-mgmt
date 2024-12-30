import { FC, ReactNode } from "react";
import { requiredUser } from "../utils/hooks";
import prisma from "../utils/db";
import { redirect } from "next/navigation";

const OnboardingLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const session = await requiredUser();
  const data = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
    },
  });

  if (data?.firstName && data?.lastName && data?.address) {
    redirect("/dashboard");
  }

  return <>{children}</>;
};

export default OnboardingLayout;
