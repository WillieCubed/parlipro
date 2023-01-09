import { Link } from "react-router-dom";
import IconButton from "./components/IconButton";

export default function LandingPage() {
  return (
    <div className="h-full px-4 xl:grid xl:grid-cols-12">
      <section className="inline-block rounded-[16px] py-8 xl:col-start-2 xl:col-span-5 bg-primary-1 px-8 mt-[64px] shadow-md">
        <section>
          <div className="text-[96px] font-bold">ParliPro</div>
          <div className="mt-4 text-[34px] font-semibold">
            Presiding over meetings, done simply.
          </div>
        </section>
        <section className="mt-[96px] space-x-4 space-y-4">
          <IconButton to="/m/test/chair">Start meeting</IconButton>
          <IconButton to="/m/test/participant">Join meeting</IconButton>
          {/* <div className="text-md">
            or open a{" "}
            <Link
              className="text-blue-500 hover:underline focus:underline"
              to="/companion"
            >
              companion display
            </Link>
          </div> */}
        </section>
      </section>
    </div>
  );
}
