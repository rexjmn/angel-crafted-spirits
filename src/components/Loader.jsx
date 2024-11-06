const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
      <span className="text-white text-xl font-semibold absolute bg-black z-10">Loading...</span>
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className={`absolute rounded-full border-2 border-white animate-pulse-circle delay-${index + 1}`}
          style={{ animationDelay: `${index * 200}ms` }}
        ></div>
      ))}
    </div>
  );
};

export default Loader;