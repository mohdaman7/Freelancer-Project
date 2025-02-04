


const JobPostBanner = () => {
    return (
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Find Your Perfect Developer?
              </h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Post a job and connect with our community of skilled developers ready to bring your vision to life.
              </p>
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center group"
                onClick={() => {/* Handle post job click */}}
              >
                Post a Job Now
                <svg 
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default JobPostBanner