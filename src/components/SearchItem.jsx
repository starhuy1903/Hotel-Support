const SearchItem = () => {
  return (
    <div className="searchItem border border-solid border-slate-300 p-[10px] flex justify-between gap-5 mb-5 rounded-md">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg w-52 h-52 object-cover"
      />
      <div className="siDesc flex flex-col gap-[10px] flex-2">
        <h1 className="siTitle text-xl font-bold text-teal-600">
          Tower Street Apartments
        </h1>
        <span className="siDistance text-sm">500m from center</span>
        <span className="siTaxiOp text-sm bg-[#008009] text-white w-max p-1 rounded-md">
          Free airport taxi
        </span>
        <span className="siSubtitle text-sm font-bold">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures text-sm">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp text-sm text-[#008009] font-bold">
          Free cancellation{" "}
        </span>
        <span className="siCancelOpSubtitle text-sm text-[#008009]">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails flex-1 flex flex-col justify-between">
        <div className="siRating flex justify-between">
          <span className="font-medium">Excellent</span>
          <button className="bg-teal-600 text-white p-[5px] font-bold border-none">
            8.9
          </button>
        </div>
        <div className="siDetailTexts text-right flex flex-col gap-[5px]">
          <span className="siPrice text-2xl">$112</span>
          <span className="siTaxOp text-sm text-slate-700">
            Includes taxes and fees
          </span>
          <button className="siCheckButton bg-amber-500 text-white font-bold py-[10px] px-[5px] border-none cursor-pointer rounded-md">
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
