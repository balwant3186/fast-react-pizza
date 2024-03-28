import React from "react";
import CreateUser from "../features/user/CreateUser";

type HomeProps = {
  children?: React.ReactNode;
};

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="my-10 px-4 text-center text-sm sm:my-16">
      <h1 className="mb-8 text-xl md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
};
export default Home;
