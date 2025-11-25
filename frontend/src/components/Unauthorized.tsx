import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <Lock size="48" />
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Unauthorized</h1>
        <p>
          You must{" "}
          <span className="underline text-gray-700">
            <Link to={"/"}>login in</Link>
          </span>{" "}
          to visit here
        </p>
      </div>
    </div>
  );
}
