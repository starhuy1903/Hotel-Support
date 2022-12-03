import React from 'react'

const Footer = () => {
  return (
    // footer
    <div className="w-[1024px] text-sm">
      {/* fLists */}
      <div className="w-full flex justify-between mb-12">
        {/* fList */}
        <ul className="list-none p-0">
          <li className="mb-[10px] text-indigo-500 cursor-pointer">
            Countries
          </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Regions</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Cities</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">
            Districts
          </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Airports</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Hotels</li>
        </ul>
        <ul className="list-none p-0">
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Homes </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">
            Apartments{" "}
          </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Resorts </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Villas</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Hostels</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Guest houses</li>
        </ul>
        <ul className="list-none p-0">
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Unique places to stay </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Reviews</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Unpacked: Travel articles </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Travel communities </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Seasonal and holiday deals </li>
        </ul>
        <ul className="list-none p-0">
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Car rental </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Flight Finder</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Restaurant reservations </li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Travel Agents </li>
        </ul>
        <ul className="list-none p-0">
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Curtomer Service</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Partner Help</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Careers</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Sustainability</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Press center</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Safety Resource Center</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Investor relations</li>
          <li className="mb-[10px] text-indigo-500 cursor-pointer">Terms & conditions</li>
        </ul>
      </div>
      <div className="fText">Copyright © 2022 Hotelbooking.</div>
    </div>
  );
}

export default Footer