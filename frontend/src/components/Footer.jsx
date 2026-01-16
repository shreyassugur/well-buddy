const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xs">W</div>
            <span className="font-bold text-gray-900">WellBuddy</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} WellBuddy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
