'use client'

import { Clock, CheckCircle, AlertCircle, FileText, User } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'application',
    title: 'Home Loan Application Submitted',
    description: 'Your home loan application has been submitted for review',
    time: '2 hours ago',
    status: 'success',
    icon: FileText
  },
  {
    id: 2,
    type: 'document',
    title: 'Document Upload Required',
    description: 'Please upload your salary slip for verification',
    time: '1 day ago',
    status: 'warning',
    icon: AlertCircle
  },
  {
    id: 3,
    type: 'approval',
    title: 'Personal Loan Approved',
    description: 'Congratulations! Your personal loan has been approved',
    time: '3 days ago',
    status: 'success',
    icon: CheckCircle
  },
  {
    id: 4,
    type: 'profile',
    title: 'Profile Updated',
    description: 'Your contact information has been updated',
    time: '1 week ago',
    status: 'info',
    icon: User
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'text-success-600 bg-success-100'
    case 'warning':
      return 'text-warning-600 bg-warning-100'
    case 'error':
      return 'text-error-600 bg-error-100'
    default:
      return 'text-secondary-600 bg-secondary-100'
  }
}

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
      <div className="px-6 py-4 border-b border-secondary-200">
        <h3 className="text-lg font-semibold text-secondary-900">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900">{activity.title}</p>
                  <p className="text-sm text-secondary-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-secondary-500 mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View all activity →
          </button>
        </div>
      </div>
    </div>
  )
}
