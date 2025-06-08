
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bus, Train, Plane, Clock, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const BookingPage = () => {
  const services = [
    {
      title: 'Bus Booking',
      icon: Bus,
      description: 'Book bus tickets across India with easy cancellation and refund policies',
      features: ['AC & Non-AC buses', 'Live tracking', 'Easy cancellation', 'Best prices'],
      gradient: 'from-blue-500 to-purple-500',
      comingSoon: true
    },
    {
      title: 'Train Booking',
      icon: Train,
      description: 'Book train tickets instantly with confirmed seats and quick booking',
      features: ['All classes available', 'PNR status', 'E-tickets', 'Tatkal booking'],
      gradient: 'from-green-500 to-teal-500',
      comingSoon: true
    },
    {
      title: 'Flight Booking',
      icon: Plane,
      description: 'Domestic and international flight bookings with best deals and offers',
      features: ['Domestic flights', 'International flights', 'Special offers', '24/7 support'],
      gradient: 'from-purple-500 to-pink-500',
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link to="/dashboard" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Travel Booking
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Clock className="h-10 w-10" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Coming Soon! 🚀
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            We're working hard to bring you the best travel booking experience. 
            Bus, train, and flight bookings will be available very soon!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-blue-800 font-semibold">
              🎯 Expected Launch: January 2025
            </p>
          </div>
        </div>

        {/* Services Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden relative">
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                
                <div className={`bg-gradient-to-r ${service.gradient} p-6 text-white`}>
                  <IconComponent className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    disabled 
                    className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Be the First to Know!</h2>
            <p className="text-xl text-indigo-100 mb-6">
              Get notified when our travel booking services go live
            </p>
            <div className="max-w-md mx-auto flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6">
                Notify Me
              </Button>
            </div>
            <p className="text-indigo-200 text-sm mt-4">
              We'll send you an email as soon as these services are available
            </p>
          </CardContent>
        </Card>

        {/* Meanwhile Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Meanwhile, explore our other services</h3>
          <div className="flex justify-center space-x-4">
            <Link to="/recharge">
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                Mobile Recharge
              </Button>
            </Link>
            <Link to="/offers">
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                View Offers
              </Button>
            </Link>
            <Link to="/coupons">
              <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                My Coupons
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
