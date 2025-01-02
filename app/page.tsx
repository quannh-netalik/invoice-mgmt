import { FC } from "react";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

const Home: FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Landing />
    </main>
  );
};

export default Home;
