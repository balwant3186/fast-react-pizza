import React from "react";

type HomeProps = {
  children?: React.ReactNode;
};

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <h1>
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
      </h1>
    </div>
  );
};
export default Home;
