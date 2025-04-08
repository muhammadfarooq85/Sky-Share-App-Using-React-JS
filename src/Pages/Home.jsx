// Libraries Imports
import { Helmet } from "react-helmet";
// Local Imports
import LayoutComp from "../Components/Layout";

function HomePage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sky Share</title>
        <meta
          name="description"
          content="Sky Share - Easily share your files and text online with our simple, fast, and secure platform."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sky-share.vercel.app" />
        <meta property="og:title" content="Sky Share" />
        <meta
          property="og:description"
          content="Easily share your files and text online with Sky Share. Fast, secure, and simple to use."
        />
        <meta property="og:url" content="https://sky-share.vercel.app" />
      </Helmet>
      <LayoutComp />
    </>
  );
}

export default HomePage;
