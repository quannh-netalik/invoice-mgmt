import { signOut } from "../utils/auth";
import { requiredUser } from "../utils/hooks";

const DashboardRoute = async () => {
  const session = await requiredUser();

  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default DashboardRoute;
