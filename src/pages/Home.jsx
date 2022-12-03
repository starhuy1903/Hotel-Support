import React from "react";
import Featured from "../components/Featured";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PropertyList from "../components/PropertyList";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col items-center mt-12 gap-8">
        <Featured />
        <h1 className="w-[1024px] text-xl font-bold">
          Browse by property type
        </h1>
        <PropertyList />
        <h1 className="w-[1024px] text-xl font-bold">Homes guests love</h1>
        <FeaturedProperties />
        {/* <MailList /> */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
