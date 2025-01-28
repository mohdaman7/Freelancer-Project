import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search, Filter, Plus, Briefcase, Code, Star, Clock, DollarSign,
  MessageCircle, Award, TrendingUp, Users
} from 'lucide-react';

const Jobs = () => {
//   const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services', icon: Code },
    { id: 'mentorship', name: 'Mentorship', icon: Users },
    { id: 'development', name: 'Development', icon: Briefcase },
    { id: 'consulting', name: 'Consulting', icon: MessageCircle },
    { id: 'code-review', name: 'Code Review', icon: Search }
  ];

  const services = [
    {
      id: 1,
      title: "Full Stack Development Mentorship",
      provider: {
        name: "Sarah Johnson",
        rating: 4.9,
        projects: 156,
        response: "< 2 hours"
      },
      tags: ["React", "Node.js", "MongoDB"],
      pricing: {
        hourly: 75,
        fixed: 500
      },
      category: "mentorship",
      availability: "Available",
      description: "Get personalized mentorship in full-stack development. Includes code reviews, architecture planning, and best practices.",
      highlights: ["1-on-1 Sessions", "Project Reviews", "Career Guidance"]
    },
    {
      id: 2,
      title: "API Development & Integration",
      provider: {
        name: "Michael Chen",
        rating: 4.8,
        projects: 98,
        response: "< 1 hour"
      },
      tags: ["REST", "GraphQL", "AWS"],
      pricing: {
        hourly: 90,
        fixed: 800
      },
      category: "development",
      availability: "Available Next Week",
      description: "Expert API development and integration services. Specializing in RESTful and GraphQL APIs with cloud deployment.",
      highlights: ["API Design", "Documentation", "Security"]
    }
  ];

  const renderServiceCard = (service) => (
    <Card key={service.id} className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{service.provider.rating}</span>
                <span className="text-gray-400">({service.provider.projects} projects)</span>
              </div>
            </CardDescription>
          </div>
          <Badge variant={service.availability === "Available" ? "success" : "warning"}>
            {service.availability}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">{service.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {service.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="px-2 py-1">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
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
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Response: {service.provider.response}</span>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Developer Services</h1>
          <p className="text-gray-600">Find the perfect developer or service for your needs</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Offer Your Services
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Search services, skills, or developers..."
              className="w-full"
              prefix={<Search className="w-4 h-4 text-gray-400" />}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Sort
          </Button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="flex items-center gap-2 whitespace-nowrap"
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(renderServiceCard)}
      </div>
    </div>
  );
};

export default Jobs;