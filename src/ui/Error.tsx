import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

type ErrorProps = {
  children?: React.ReactNode;
};

interface ErrorRes {
  message: string;
  data: string;
  status: number;
  statusText: string;
}

const Error: React.FC<ErrorProps> = () => {
  const navigate = useNavigate();

  const error = useRouteError() as ErrorRes;
  console.log("🚀 ~ error:", error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
};
export default Error;
