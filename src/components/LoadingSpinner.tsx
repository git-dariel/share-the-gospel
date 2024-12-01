const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="relative">
        {/* Outer spinning circle */}
        <div className="w-12 h-12 rounded-full border-4 border-black/10 border-t-black animate-spin"></div>
        
        {/* Inner pulsing logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Loading text with fade-in animation */}
      <div className="ml-4 text-lg font-medium text-black/70 animate-fade-in">
        Loading...
      </div>
    </div>
  );
};

export default LoadingSpinner;
