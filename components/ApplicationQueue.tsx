'use client'

import { useState } from 'react'
import { Eye, CheckCircle, XCircle, Clock, Filter, Search, FileText } from 'lucide-react'

const applications = [
  {
    id: 'APP001',
    customerName: 'John Doe',
    loanType: 'Home Loan',
    amount: '₹25,00,000',
    status: 'Under Review',
    appliedDate: '2024-01-15',
    assignedDate: '2024-01-20',
    priority: 'high',
    statusColor: 'status-pending',
    documentsComplete: true,
    kycVerified: true,
    creditScore: 750
  },
  {
    id: 'APP002',
    customerName: 'Jane Smith',
    loanType: 'Personal Loan',
    amount: '₹5,00,000',
    status: 'Document Verification',
    appliedDate: '2024-01-10',
    assignedDate: '2024-01-19',
    priority: 'medium',
    statusColor: 'status-verified',
    documentsComplete: false,
    kycVerified: true,
    creditScore: 680
  },
  {
    id: 'APP003',
    customerName: 'Mike Johnson',
    loanType: 'Car Loan',
    amount: '₹8,00,000',
    status: 'Pending KYC',
    appliedDate: '2024-01-12',
    assignedDate: '2024-01-18',
    priority: 'low',
    statusColor: 'status-pending',
    documentsComplete: true,
    kycVerified: false,
    creditScore: 720
  },
  {
    id: 'APP004',
    customerName: 'Sarah Wilson',
    loanType: 'Business Loan',
    amount: '₹15,00,000',
    status: 'Ready for Review',
    appliedDate: '2024-01-08',
    assignedDate: '2024-01-17',
    priority: 'high',
    statusColor: 'status-verified',
    documentsComplete: true,
    kycVerified: true,
    creditScore: 780
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

export default function ApplicationQueue() {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status.toLowerCase().includes(filterStatus.toLowerCase())
    const matchesPriority = filterPriority === 'all' || app.priority === filterPriority
    const matchesSearch = searchTerm === '' || 
      app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesPriority && matchesSearch
  })

  const handleApprove = (appId: string) => {
    console.log('Approving application:', appId)
    // Implement approval logic
  }

  const handleReject = (appId: string) => {
    console.log('Rejecting application:', appId)
    // Implement rejection logic
  }

  const handleReview = (appId: string) => {
    console.log('Reviewing application:', appId)
    // Navigate to detailed review page
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
      <div className="px-6 py-4 border-b border-secondary-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-secondary-900">Application Queue</h3>
          <div className="text-sm text-secondary-600">
            {filteredApplications.length} applications
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or application ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="review">Under Review</option>
              <option value="verification">Document Verification</option>
              <option value="ready">Ready for Review</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="border border-secondary-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-lg">
                      {app.loanType.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">{app.customerName}</h4>
                    <p className="text-sm text-secondary-600">{app.loanType} - #{app.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-secondary-900">{app.amount}</p>
                  <p className="text-sm text-secondary-600">Applied: {app.appliedDate}</p>
                </div>
              </div>

              {/* Application Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-secondary-500">Credit Score</p>
                  <p className="font-semibold text-secondary-900">{app.creditScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-secondary-500">Documents</p>
                  <p className={`font-semibold ${app.documentsComplete ? 'text-success-600' : 'text-error-600'}`}>
                    {app.documentsComplete ? 'Complete' : 'Incomplete'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-secondary-500">KYC Status</p>
                  <p className={`font-semibold ${app.kycVerified ? 'text-success-600' : 'text-error-600'}`}>
                    {app.kycVerified ? 'Verified' : 'Pending'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-secondary-500">Priority</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(app.priority)}`}>
                    {app.priority}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                    {app.status}
                  </span>
                  <span className="text-sm text-secondary-600">
                    Assigned: {app.assignedDate}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleReview(app.id)}
                    className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"
                    title="Review Application"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleApprove(app.id)}
                    className="p-2 text-secondary-400 hover:text-success-600 transition-colors"
                    title="Approve Application"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleReject(app.id)}
                    className="p-2 text-secondary-400 hover:text-error-600 transition-colors"
                    title="Reject Application"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-secondary-400" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No applications found</h3>
            <p className="text-secondary-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}
