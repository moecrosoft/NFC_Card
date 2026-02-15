
export default function StampClaim() {
  const handleClaim = () => {
    // TODO: Implement claim functionality
    console.log(`Claiming stamp for Group 5`);

    localStorage.setItem("stamps", "")
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12 leading-tight">
          You received Group 5
          <br />
          Stamp!
        </h1>

        {/* Stamp Image */}
        <div className="mb-12">
          <img
            src={stampImage}
            alt={`Group 5 Stamp`}
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* Claim Button */}
        <button
          onClick={handleClaim}
          className="bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-4 px-16 rounded-2xl transition-colors"
        >
          CLAIM
        </button>
      </div>
    </div>
  );
}
