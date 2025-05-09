import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, ZapIcon, BookOpenIcon, HelpCircleIcon } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <ZapIcon size={24} className="text-blue-400 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                rainforest
              </span>
            </Link>
            <p className="text-sm mt-3 text-slate-400 max-w-md">
              The world's first marketplace where you can pay with your
              computer's processing power instead of money. Mine for what you
              want, directly.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <GithubIcon size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <BookOpenIcon size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <HelpCircleIcon size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                  <span className="bg-slate-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Mining Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                  <span className="bg-slate-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Hashrate Calculator
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                  <span className="bg-slate-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4 text-lg">Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/order-status" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                  <span className="bg-slate-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                  <span className="bg-slate-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Admin Portal
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center">
                  <span className="bg-slate-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                  <GithubIcon size={14} className="mr-1" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Rainforest. Built for demo purposes.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-400">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-400">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-400">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>;
};