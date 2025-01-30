import { Code, Linkedin, Twitter, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="w-8 h-8 text-blue-400" />
              <span className="font-bold text-xl text-white">CodeMesh</span>
            </div>
            <p className="text-gray-400">
              Empowering developers and clients to collaborate, innovate, and build the future together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/about" className="hover:text-blue-400">About</a></li>
              <li><a href="/services" className="hover:text-blue-400">Services</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-400">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://github.com" className="text-gray-400 hover:text-blue-400">
                <Github className="w-6 h-6" />
              </a>
              <a href="mailto:info@codemesh.com" className="text-gray-400 hover:text-blue-400">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates and news straight to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Legal */}
        <div className="text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} CodeMesh. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;