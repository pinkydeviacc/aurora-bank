'use client'

import { 
  Shield, 
  Clock, 
  Smartphone, 
  FileText, 
  CheckCircle, 
  Users,
  BarChart3,
  Bell
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: 'Your data is protected with 256-bit SSL encryption and secure authentication protocols.',
    color: 'text-success-600'
  },
  {
    icon: Clock,
    title: 'Quick Processing',
    description: 'Get loan approval in as little as 24 hours with our automated eligibility checks.',
    color: 'text-primary-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Apply for loans on any device with our responsive, mobile-optimized interface.',
    color: 'text-warning-600'
  },
  {
    icon: FileText,
    title: 'Digital Documentation',
    description: 'Upload and manage all your documents digitally with our secure document management system.',
    color: 'text-secondary-600'
  },
  {
    icon: CheckCircle,
    title: 'e-KYC Verification',
    description: 'Complete Aadhaar and PAN verification instantly with our integrated e-KYC system.',
    color: 'text-success-600'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Get personalized assistance from our loan officers throughout the application process.',
    color: 'text-primary-600'
  },
  {
    icon: BarChart3,
    title: 'Real-time Tracking',
    description: 'Track your loan application status in real-time with detailed progress updates.',
    color: 'text-warning-600'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Receive instant notifications via email and SMS for all important updates.',
    color: 'text-secondary-600'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Why Choose Aurora Bank?
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Experience the future of banking with our innovative digital loan platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 card-hover shadow-sm text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center`}>
                  <IconComponent className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-secondary-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">₹500Cr+</div>
              <div className="text-secondary-600">Loans Disbursed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">24hrs</div>
              <div className="text-secondary-600">Average Processing Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-secondary-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
