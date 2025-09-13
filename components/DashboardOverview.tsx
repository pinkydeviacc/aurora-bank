'use client'

import { CreditCard, TrendingUp, Clock, CheckCircle, FileText } from 'lucide-react'

const stats = [
  {
    name: 'Active Applications',
    value: '2',
    change: '+1 from last month',
    changeType: 'positive',
    icon: FileText
  },
  {
    name: 'Total Loans',
    value: '₹15,00,000',
    change: '+₹5,00,000 from last month',
    changeType: 'positive',
    icon: CreditCard
  },
  {
    name: 'Approval Rate',
    value: '85%',
    change: '+5% from last month',
    changeType: 'positive',
    icon: TrendingUp
  },
  {
    name: 'Avg. Processing Time',
    value: '2.5 days',
    change: '-0.5 days from last month',
    changeType: 'positive',
    icon: Clock
  }
]

const recentApplications = [
  {
    id: 'APP001',
    type: 'Home Loan',
    amount: '₹25,00,000',
    status: 'Under Review',
    date: '2024-01-15',
    statusColor: 'status-pending'
  },
  {
    id: 'APP002',
    type: 'Personal Loan',
    amount: '₹5,00,000',
    status: 'Approved',
    date: '2024-01-10',
    statusColor: 'status-approved'
  }
]

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-secondary-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
        <div className="px-6 py-4 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900">Recent Applications</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">{app.type}</p>
                    <p className="text-sm text-secondary-600">Application #{app.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-secondary-900">{app.amount}</p>
                  <p className="text-sm text-secondary-600">{app.date}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              View all applications →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
