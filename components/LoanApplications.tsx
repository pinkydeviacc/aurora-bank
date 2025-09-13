'use client'

import { useState } from 'react'
import { Plus, Eye, Edit, Trash2, Filter } from 'lucide-react'

const applications = [
  {
    id: 'APP001',
    type: 'Home Loan',
    amount: '₹25,00,000',
    status: 'Under Review',
    appliedDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    statusColor: 'status-pending',
    progress: 60
  },
  {
    id: 'APP002',
    type: 'Personal Loan',
    amount: '₹5,00,000',
    status: 'Approved',
    appliedDate: '2024-01-10',
    lastUpdated: '2024-01-18',
    statusColor: 'status-approved',
    progress: 100
  },
  {
    id: 'APP003',
    type: 'Car Loan',
    amount: '₹8,00,000',
    status: 'Document Verification',
    appliedDate: '2024-01-12',
    lastUpdated: '2024-01-19',
    statusColor: 'status-verified',
    progress: 40
  }
]

const statusSteps = [
  'Applied',
  'Document Verification',
  'Under Review',
  'Approved',
  'Disbursed'
]

export default function LoanApplications() {
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status.toLowerCase().includes(filterStatus.toLowerCase())
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
      <div className="px-6 py-4 border-b border-secondary-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary-900">Loan Applications</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-secondary-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
            </div>
            <button className="btn-primary flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </button>
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
                      {app.type.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">{app.type}</h4>
                    <p className="text-sm text-secondary-600">Application #{app.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-secondary-900">{app.amount}</p>
                  <p className="text-sm text-secondary-600">Applied: {app.appliedDate}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-secondary-600 mb-2">
                  <span>Progress</span>
                  <span>{app.progress}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${app.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Steps */}
              <div className="flex items-center justify-between mb-4">
                {statusSteps.map((step, index) => {
                  const isActive = app.progress >= (index + 1) * 20
                  const isCurrent = app.status.toLowerCase().includes(step.toLowerCase())
                  
                  return (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        isActive ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-600'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`ml-2 text-xs ${
                        isCurrent ? 'text-primary-600 font-medium' : 'text-secondary-500'
                      }`}>
                        {step}
                      </span>
                      {index < statusSteps.length - 1 && (
                        <div className={`w-8 h-0.5 mx-2 ${
                          isActive ? 'bg-primary-600' : 'bg-secondary-200'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                    {app.status}
                  </span>
                  <span className="text-sm text-secondary-600">
                    Last updated: {app.lastUpdated}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-secondary-400 hover:text-primary-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-secondary-400 hover:text-primary-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-secondary-400 hover:text-error-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-secondary-400" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No applications found</h3>
            <p className="text-secondary-600 mb-4">Get started by applying for your first loan.</p>
            <button className="btn-primary">Apply for Loan</button>
          </div>
        )}
      </div>
    </div>
  )
}
