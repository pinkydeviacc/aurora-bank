'use client'

import { CheckCircle, XCircle, Clock, FileText } from 'lucide-react'

const reviews = [
  {
    id: 1,
    applicationId: 'APP001',
    customerName: 'John Doe',
    action: 'Approved',
    reviewDate: '2 hours ago',
    status: 'success',
    icon: CheckCircle,
    comments: 'All documents verified, credit score excellent'
  },
  {
    id: 2,
    applicationId: 'APP002',
    customerName: 'Jane Smith',
    action: 'Rejected',
    reviewDate: '4 hours ago',
    status: 'error',
    icon: XCircle,
    comments: 'Insufficient income documentation'
  },
  {
    id: 3,
    applicationId: 'APP003',
    customerName: 'Mike Johnson',
    action: 'Under Review',
    reviewDate: '1 day ago',
    status: 'warning',
    icon: Clock,
    comments: 'Waiting for additional documents'
  },
  {
    id: 4,
    applicationId: 'APP004',
    customerName: 'Sarah Wilson',
    action: 'Approved',
    reviewDate: '2 days ago',
    status: 'success',
    icon: CheckCircle,
    comments: 'Strong financial profile, approved immediately'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'text-success-600 bg-success-100'
    case 'error':
      return 'text-error-600 bg-error-100'
    case 'warning':
      return 'text-warning-600 bg-warning-100'
    default:
      return 'text-secondary-600 bg-secondary-100'
  }
}

export default function RecentReviews() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
      <div className="px-6 py-4 border-b border-secondary-200">
        <h3 className="text-lg font-semibold text-secondary-900">Recent Reviews</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {reviews.map((review) => {
            const IconComponent = review.icon
            return (
              <div key={review.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(review.status)}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-secondary-900">{review.customerName}</p>
                    <span className="text-xs text-secondary-500">{review.reviewDate}</span>
                  </div>
                  <p className="text-sm text-secondary-600">#{review.applicationId}</p>
                  <p className="text-sm font-medium text-secondary-900 mt-1">{review.action}</p>
                  <p className="text-xs text-secondary-600 mt-1">{review.comments}</p>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View all reviews →
          </button>
        </div>
      </div>
    </div>
  )
}
