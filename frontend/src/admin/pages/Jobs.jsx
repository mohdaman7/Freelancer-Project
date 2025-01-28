import { useState } from 'react';
import {
  Search, Plus, Briefcase, Code, Star, Clock, DollarSign,
  MessageCircle, Award, Users, MapPin, Shield, ThumbsUp
} from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const JobsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services', icon: Code },
    { id: 'mentorship', name: 'Mentorship', icon: Users },
    { id: 'development', name: 'Development', icon: Briefcase },
    { id: 'consulting', name: 'Consulting', icon: MessageCircle },
    { id: 'code-review', name: 'Code Review', icon: Search },
    { id: 'bug-fixes', name: 'Bug Fixes', icon: Shield }
  ];

  const services = [
    {
      id: 1,
      title: "Full Stack Development Mentorship",
      provider: {
        name: "Sarah Johnson",
        rating: 4.9,
        projects: 156,
        response: "< 2 hours",
        location: "San Francisco, CA",
        verified: true
      },
      tags: ["React", "Node.js", "MongoDB"],
      pricing: {
        hourly: 75,
        fixed: 500
      },
      category: "mentorship",
      availability: "Available",
      description: "Get personalized mentorship in full-stack development. Includes code reviews, architecture planning, and best practices.",
      highlights: ["1-on-1 Sessions", "Project Reviews", "Career Guidance"],
      completionRate: 98,
      successRate: 95
    }
  ];

  const renderServiceCard = (service) => (
    <div
      key={service.id}
      className="p-6 bg-white rounded-lg shadow transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-semibold text-blue-600">
              {service.provider.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium ml-1">{service.provider.rating}</span>
              </div>
              {service.provider.verified && (
                <span className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-md text-gray-600">
                  <Shield className="w-3 h-3" />
                  Verified
                </span>
              )}
              <span className="text-gray-400">({service.provider.projects} projects)</span>
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-sm rounded ${
            service.availability === "Available"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {service.availability}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{service.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {service.tags.map(tag => (
          <span
            key={tag}
            className="px-2 py-1 text-sm border rounded bg-gray-50"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4 text-green-500" />
          <div>
            <div className="text-sm font-medium">{service.completionRate}%</div>
            <div className="text-xs text-gray-500">Completion</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-sm font-medium">{service.provider.location}</div>
            <div className="text-xs text-gray-500">Location</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-500" />
          <div>
            <div className="text-sm font-medium">{service.provider.response}</div>
            <div className="text-xs text-gray-500">Response Time</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {service.highlights.map(highlight => (
          <div key={highlight} className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{highlight}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">${service.pricing.hourly}/hr</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Fixed Price:</span>
            <span className="font-semibold ml-1">${service.pricing.fixed}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
            View Profile
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 mt-16">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Developer Services</h1>
                <p className="text-gray-600">Find the perfect developer or service for your needs</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Offer Your Services
              </button>
            </div>

            {/* Search and Filter Section */}
            <div className="p-4 mb-8 bg-white rounded-lg shadow">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search services, skills, or developers..."
                    className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md"
                >
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-2 border rounded-md"
                >
                  <option value="all">All Prices</option>
                  <option value="0-50">$0 - $50/hr</option>
                  <option value="51-100">$51 - $100/hr</option>
                  <option value="101+">$101+/hr</option>
                </select>
              </div>

              {/* Category Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "border hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-6">
              {services.map(renderServiceCard)}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobsPage;
