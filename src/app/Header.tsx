export const Header = () => {
  return (
    <div className="flex justify-between items-center gap-2 sm:gap-0">
      <h1 className="text-lg md:text-xl font-bold">Event Explorer</h1>
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-green-50 px-1.5 py-1 rounded-lg border border-blue-200 shadow-sm self-start sm:self-auto">
        <div className="text-xs font-sm text-gray-700 hidden sm:block">
          Powered by
        </div>
        <div className="flex items-center gap-1">
          <a
            href="https://demonstrations.org/"
            className="text-[10px] sm:text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            demonstrations.org
          </a>
          <span className="text-gray-400  hidden sm:block">•</span>
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            className="text-[10px] sm:text-xs bg-green-100 text-green-800 px-1.5 p-1 rounded-full font-medium hover:bg-green-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            title="Creative Commons Attribution-ShareAlike 4.0"
          >
            CC BY-SA 4.0
          </a>
        </div>
      </div>
    </div>
  );
};
