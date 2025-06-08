
import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Gift, Plane, Bus, Train, Star, Zap, Shield, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '../hooks/use-mobile';

const LandingPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      {/* Header - Mobile Optimized */}
      <header className="bg-white shadow-lg border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-1.5 lg:p-2 rounded-xl">
                <Smartphone className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <span className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Billyatra
              </span>
            </div>
            
            {/* Only show auth buttons on mobile */}
            {isMobile && (
              <div className="hidden sm:flex space-x-2 lg:space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50 text-sm lg:text-base">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-sm lg:text-base">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button - Only on mobile */}
            {isMobile && (
              <div className="sm:hidden">
                <Menu className="h-6 w-6 text-gray-600" />
              </div>
            )}
          </div>
          
          {/* Mobile Auth Buttons - Only on mobile */}
          {isMobile && (
            <div className="sm:hidden pb-4 flex space-x-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full border-orange-200 text-orange-600 hover:bg-orange-50">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button size="sm" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white py-12 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
            Instant Mobile Recharge
            <span className="block text-yellow-300 mt-2">& Much More!</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8 text-orange-100 px-4 max-w-4xl mx-auto">
            Recharge your mobile, get exciting offers, win scratch cards, and enjoy seamless booking services
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            {isMobile && (
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 text-base lg:text-lg px-6 lg:px-8 py-2.5 lg:py-3">
                  Get Started
                </Button>
              </Link>
            )}
            <Link to="/recharge">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-orange-600 text-base lg:text-lg px-6 lg:px-8 py-2.5 lg:py-3">
                {isMobile ? 'Quick Recharge' : 'Start Recharging'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-12 lg:py-20 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">Why Choose Billyatra?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">Experience the future of mobile recharge and travel booking</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center p-4 lg:p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="bg-blue-500 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Zap className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Instant Recharge</h3>
              <p className="text-sm lg:text-base text-gray-600">Lightning-fast mobile recharge for all operators with instant confirmation</p>
            </div>
            
            <div className="text-center p-4 lg:p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <div className="bg-green-500 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Gift className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2">Scratch Cards & Rewards</h3>
              <p className="text-sm lg:text-base text-gray-600">Win exciting prizes with scratch cards after every recharge</p>
            </div>
            
            <div className="text-center p-4 lg:p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
              <div className="bg-purple-500 w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold mb-2">100% Secure</h3>
              <p className="text-sm lg:text-base text-gray-600">Bank-grade security with encrypted transactions and data protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Mobile Optimized */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">Our Services</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Everything you need in one place</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-orange-100">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <Smartphone className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h3 className="text-sm lg:text-lg font-semibold mb-1 lg:mb-2">Mobile Recharge</h3>
              <p className="text-xs lg:text-sm text-gray-600">Instant recharge for all networks</p>
            </div>
            
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <Bus className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h3 className="text-sm lg:text-lg font-semibold mb-1 lg:mb-2">Bus Booking</h3>
              <p className="text-xs lg:text-sm text-gray-600">Coming Soon</p>
            </div>
            
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <Train className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h3 className="text-sm lg:text-lg font-semibold mb-1 lg:mb-2">Train Booking</h3>
              <p className="text-xs lg:text-sm text-gray-600">Coming Soon</p>
            </div>
            
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                <Plane className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <h3 className="text-sm lg:text-lg font-semibold mb-1 lg:mb-2">Flight Booking</h3>
              <p className="text-xs lg:text-sm text-gray-600">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-orange-600 to-pink-600 text-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Ready to Start Your Journey?</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 text-orange-100 max-w-2xl mx-auto">Join thousands of satisfied customers who trust Billyatra</p>
          {isMobile && (
            <Link to="/signup">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-base lg:text-lg px-6 lg:px-8 py-2.5 lg:py-3">
                Join Billyatra Today
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-white py-8 lg:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-1.5 lg:p-2 rounded-xl">
                <Smartphone className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold">Billyatra</span>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Star className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400" />
              <span className="text-xs lg:text-sm">Your trusted recharge partner</span>
            </div>
          </div>
          <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-xs lg:text-sm">&copy; 2024 Billyatra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
