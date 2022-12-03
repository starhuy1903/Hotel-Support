import React from "react";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header  />
      {/* homeContainer */}
      <div className="flex flex-col items-center mt-12 gap-8">
        <Featured />
        {/* homeTitle */}
        <h1 className="w-[1024px] text-xl">Browse by property type</h1>
        {/* <PropertyList /> */}
        {/*  */}
        <h1 className="w-[1024px] text-xl">Homes guests love</h1>
        {/* <FeaturedProperties /> */}
        {/* <MailList /> */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
