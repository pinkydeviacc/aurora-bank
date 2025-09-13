'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Home, CreditCard, Car, Briefcase, GraduationCap, Building } from 'lucide-react'
import toast from 'react-hot-toast'

interface LoanApplicationFormProps {
  currentStep: number
  onStepChange: (step: number) => void
}

const loanTypes = [
  { id: 'home', name: 'Home Loan', icon: Home, description: 'Buy your dream home' },
  { id: 'personal', name: 'Personal Loan', icon: CreditCard, description: 'For personal expenses' },
  { id: 'car', name: 'Car Loan', icon: Car, description: 'Drive home your favorite car' },
  { id: 'business', name: 'Business Loan', icon: Briefcase, description: 'Grow your business' },
  { id: 'education', name: 'Education Loan', icon: GraduationCap, description: 'Invest in education' },
  { id: 'property', name: 'Property Loan', icon: Building, description: 'Commercial property' }
]

export default function LoanApplicationForm({ currentStep, onStepChange }: LoanApplicationFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Step 1: Loan Details
    loanType: '',
    loanAmount: '',
    tenure: '',
    purpose: '',
    
    // Step 2: Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    fatherName: '',
    motherName: '',
    spouseName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Step 3: Financial Information
    employmentType: '',
    companyName: '',
    designation: '',
    monthlyIncome: '',
    workExperience: '',
    existingLoans: '',
    emiAmount: '',
    
    // Step 4: Documents
    documents: {
      aadhaar: null as File | null,
      pan: null as File | null,
      salarySlip: null as File | null,
      bankStatement: null as File | null,
      addressProof: null as File | null
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }))
  }

  const handleNext = () => {
    if (currentStep < 5) {
      onStepChange(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Loan application submitted successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to submit application. Please try again.')
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-secondary-900 mb-4">Select Loan Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loanTypes.map((type) => {
            const IconComponent = type.icon
            return (
              <button
                key={type.id}
                onClick={() => setFormData(prev => ({ ...prev, loanType: type.id }))}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.loanType === type.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-secondary-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <IconComponent className="w-6 h-6 text-primary-600 mr-3" />
                  <span className="font-medium text-secondary-900">{type.name}</span>
                </div>
                <p className="text-sm text-secondary-600">{type.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Loan Amount (₹)</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter loan amount"
            required
          />
        </div>
        <div>
          <label className="form-label">Tenure (Years)</label>
          <select
            name="tenure"
            value={formData.tenure}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option value="">Select tenure</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
            <option value="15">15 Years</option>
            <option value="20">20 Years</option>
            <option value="25">25 Years</option>
            <option value="30">30 Years</option>
          </select>
        </div>
      </div>

      <div>
        <label className="form-label">Purpose of Loan</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleInputChange}
          className="form-input"
          rows={3}
          placeholder="Describe the purpose of your loan"
          required
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-secondary-900 mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="form-label">Marital Status</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option value="">Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
      </div>

      {formData.maritalStatus === 'married' && (
        <div>
          <label className="form-label">Spouse's Name</label>
          <input
            type="text"
            name="spouseName"
            value={formData.spouseName}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
      )}

      <div>
        <label className="form-label">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="form-input"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-secondary-900 mb-4">Financial Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Employment Type</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option value="">Select type</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self Employed</option>
            <option value="business">Business</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <div>
          <label className="form-label">Monthly Income (₹)</label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Work Experience (Years)</label>
          <input
            type="number"
            name="workExperience"
            value={formData.workExperience}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">Existing Loans</label>
          <select
            name="existingLoans"
            value={formData.existingLoans}
            onChange={handleInputChange}
            className="form-input"
            required
          >
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      {formData.existingLoans === 'yes' && (
        <div>
          <label className="form-label">Monthly EMI Amount (₹)</label>
          <input
            type="number"
            name="emiAmount"
            value={formData.emiAmount}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
      )}
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-secondary-900 mb-4">Upload Documents</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: 'aadhaar', label: 'Aadhaar Card', required: true },
          { key: 'pan', label: 'PAN Card', required: true },
          { key: 'salarySlip', label: 'Salary Slip (Last 3 months)', required: true },
          { key: 'bankStatement', label: 'Bank Statement (Last 6 months)', required: true },
          { key: 'addressProof', label: 'Address Proof', required: true }
        ].map((doc) => (
          <div key={doc.key} className="border border-secondary-200 rounded-lg p-4">
            <label className="form-label">
              {doc.label} {doc.required && <span className="text-error-500">*</span>}
            </label>
            <div className="mt-2">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(doc.key, file)
                }}
                className="form-input"
                required={doc.required}
              />
              {formData.documents[doc.key as keyof typeof formData.documents] && (
                <p className="text-sm text-success-600 mt-1">
                  ✓ {formData.documents[doc.key as keyof typeof formData.documents]?.name}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-secondary-900 mb-4">Review Application</h3>
      
      <div className="bg-secondary-50 rounded-lg p-6">
        <h4 className="text-lg font-medium text-secondary-900 mb-4">Application Summary</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-secondary-600">Loan Type:</span>
            <span className="font-medium">{loanTypes.find(t => t.id === formData.loanType)?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-600">Loan Amount:</span>
            <span className="font-medium">₹{formData.loanAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-600">Tenure:</span>
            <span className="font-medium">{formData.tenure} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-600">Applicant:</span>
            <span className="font-medium">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary-600">Monthly Income:</span>
            <span className="font-medium">₹{formData.monthlyIncome}</span>
          </div>
        </div>
      </div>

      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <h4 className="font-medium text-warning-800 mb-2">Important Notes:</h4>
        <ul className="text-sm text-warning-700 space-y-1">
          <li>• Please ensure all information is accurate and complete</li>
          <li>• All documents must be clear and legible</li>
          <li>• Application will be processed within 24-48 hours</li>
          <li>• You will receive updates via email and SMS</li>
        </ul>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      default: return renderStep1()
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
      {renderCurrentStep()}
      
      <div className="flex justify-between mt-8 pt-6 border-t border-secondary-200">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>
        
        {currentStep < 5 ? (
          <button
            onClick={handleNext}
            className="btn-primary flex items-center"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="btn-success flex items-center"
          >
            Submit Application
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  )
}
