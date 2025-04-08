// Libraries Imports
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
// Local Imports
const HomePage = lazy(() => import("../Pages/Home"));
import PageNotFound from "../Pages/404";
import LoaderComp from "../Components/Loader";

function RouterComp() {
  return (
    <Suspense
      fallback={
        <div className="loader-container h-screen">
          <LoaderComp />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default RouterComp;
