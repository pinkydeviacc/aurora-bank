'use client'

import { FileText, Clock, CheckCircle, XCircle, TrendingUp, Users } from 'lucide-react'

const stats = [
  {
    name: 'Pending Reviews',
    value: '12',
    change: '+3 from yesterday',
    changeType: 'positive',
    icon: Clock,
    color: 'text-warning-600 bg-warning-100'
  },
  {
    name: 'Approved Today',
    value: '8',
    change: '+2 from yesterday',
    changeType: 'positive',
    icon: CheckCircle,
    color: 'text-success-600 bg-success-100'
  },
  {
    name: 'Rejected Today',
    value: '2',
    change: '-1 from yesterday',
    changeType: 'positive',
    icon: XCircle,
    color: 'text-error-600 bg-error-100'
  },
  {
    name: 'Total Applications',
    value: '156',
    change: '+12 this week',
    changeType: 'positive',
    icon: FileText,
    color: 'text-primary-600 bg-primary-100'
  },
  {
    name: 'Approval Rate',
    value: '78%',
    change: '+3% this month',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'text-success-600 bg-success-100'
  },
  {
    name: 'Active Customers',
    value: '89',
    change: '+5 this week',
    changeType: 'positive',
    icon: Users,
    color: 'text-secondary-600 bg-secondary-100'
  }
]

const recentApplications = [
  {
    id: 'APP001',
    customerName: 'John Doe',
    loanType: 'Home Loan',
    amount: '₹25,00,000',
    status: 'Under Review',
    assignedDate: '2024-01-20',
    priority: 'high',
    statusColor: 'status-pending'
  },
  {
    id: 'APP002',
    customerName: 'Jane Smith',
    loanType: 'Personal Loan',
    amount: '₹5,00,000',
    status: 'Document Verification',
    assignedDate: '2024-01-19',
    priority: 'medium',
    statusColor: 'status-verified'
  },
  {
    id: 'APP003',
    customerName: 'Mike Johnson',
    loanType: 'Car Loan',
    amount: '₹8,00,000',
    status: 'Approved',
    assignedDate: '2024-01-18',
    priority: 'low',
    statusColor: 'status-approved'
  }
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-error-100 text-error-800'
    case 'medium':
      return 'bg-warning-100 text-warning-800'
    case 'low':
      return 'bg-success-100 text-success-800'
    default:
      return 'bg-secondary-100 text-secondary-800'
  }
}

export default function OfficerOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
        <div className="px-6 py-4 border-b border-secondary-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-secondary-900">Recent Applications</h3>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              View all →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">{app.customerName}</p>
                    <p className="text-sm text-secondary-600">{app.loanType} - #{app.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-secondary-900">{app.amount}</p>
                  <p className="text-sm text-secondary-600">Assigned: {app.assignedDate}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(app.priority)}`}>
                    {app.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
