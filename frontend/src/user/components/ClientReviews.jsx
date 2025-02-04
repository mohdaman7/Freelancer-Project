import { Star } from 'lucide-react';

const ClientReviews = () => {
    const testimonials = [
      {
        id: 1,
        name: 'Robert Johnson',
        role: 'CEO, TechStart',
        avatar: '/api/placeholder/48/48',
        comment: 'Found an amazing full-stack developer who transformed our project. The quality of talent on this platform is outstanding.',
        rating: 5
      },
      {
        id: 2,
        name: 'Emily Zhang',
        role: 'Founder, DesignLab',
        avatar: '/api/placeholder/48/48',
        comment: 'The mobile developer we hired delivered beyond expectations. The hiring process was smooth and professional.',
        rating: 5
      },
      {
        id: 3,
        name: 'David Miller',
        role: 'CTO, CloudScale',
        avatar: '/api/placeholder/48/48',
        comment: 'Excellent platform for finding specialized developers. We built our entire tech team through this service.',
        rating: 5
      }
    ];
  
    return (
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              What Clients Say About Our Developers
            </h2>
            <p className="text-gray-400">
              Join thousands of satisfied clients who have found their perfect tech talent through our platform.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-800 border border-gray-700 p-6 rounded-lg hover:border-blue-500/50 transition-all hover:shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.comment}</p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ClientReviews