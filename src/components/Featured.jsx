const Featured = () => {
  return (
    // featured
    <div className="w-full max-w-5xl flex justify-between gap-5 z-[1]">
      {/* featuredItem */}
      <div className="relative text-white rounded-lg overflow-hidden h-[250px] flex-1">
        {/* featuredImg */}
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          className="w-full h-full object-cover"
        />
        {/* featuredTitles */}
        <div className="absolute bottom-5 left-5">
          <h1 className="text-3xl font-bold">Dublin</h1>
          <h2 className="text-xl font-semibold">123 properties</h2>
        </div>
      </div>

      {/* featuredItem */}
      <div className="relative text-white rounded-lg overflow-hidden h-[250px] flex-1">
        {/* featuredImg */}
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="w-full h-full object-cover"
        />
        {/* featuredTitles */}
        <div className="absolute bottom-5 left-5">
          <h1 className="text-3xl font-bold">Reno</h1>
          <h2 className="text-xl font-semibold">533 properties</h2>
        </div>
      </div>
      <div className="relative text-white rounded-lg overflow-hidden h-[250px] flex-1">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-5 left-5">
          <h1 className="text-3xl font-bold">Austin</h1>
          <h2 className="text-xl font-semibold">532 properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;