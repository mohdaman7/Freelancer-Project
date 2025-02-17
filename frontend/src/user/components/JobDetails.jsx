"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
import { toast } from "sonner"
import {
  XCircle,
  DollarSign,
  FileText,
  Calendar,
  CheckCircle,
  User,
  Briefcase,
  Clock,
  Code,
  Star,
  MessageSquare,
  Send,
  ArrowLeft,
} from "lucide-react"
import Navbar from "./Navbar"
import Footer from "./Footer"

const JobDetailsPage = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [proposal, setProposal] = useState({
    proposalText: "",
    proposedBudget: "",
    proposedDeadline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/jobs/job/${id}`)
        setJob(response.data.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
        toast.error("Failed to load job details")
      }
    }

    fetchJob()
  }, [id])

  const handleSubmitProposal = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.post(`http://localhost:3000/api/job/${id}/proposal`, proposal, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success("Proposal submitted successfully!", {
        description: "The client will review your submission shortly.",
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      })

      setProposal({
        proposalText: "",
        proposedBudget: "",
        proposedDeadline: "",
      })
    } catch (err) {
      toast.error("Submission failed", {
        description: err.response?.data?.message || "Could not submit proposal",
        icon: <XCircle className="w-5 h-5 text-red-500" />,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500 text-xl">Error: {error}</div>
    )

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/find-work"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors duration-200 mt-16"
        >
          <ArrowLeft className="w-5 h-5 mr-2 " />
          Back to Jobs
        </Link>
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-10 bg-gradient-to-r from-blue-600 to-purple-600">
            <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                {job.clientId?.name}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                {job.proposals?.length || 0} Proposals
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <DollarSign className="w-6 h-6 text-green-400 mr-2" />
                  <h3 className="text-lg font-semibold">Budget</h3>
                </div>
                <p className="text-2xl font-bold">${job.budget}</p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-lg font-semibold">Deadline</h3>
                </div>
                <p className="text-xl">
                  {new Date(job.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <Star className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-lg font-semibold">Experience Level</h3>
                </div>
                <p className="text-xl">{job.experienceLevel || "Not specified"}</p>
              </div>
            </div>
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-400" />
                  Project Description
                </h2>
                <p className="text-gray-300 leading-relaxed">{job.description}</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Code className="w-6 h-6 mr-2 text-purple-400" />
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" /> {skill}
                    </span>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <User className="w-6 h-6 mr-2 text-green-400" />
                  About the Client
                </h2>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <p className="mb-2">
                    <strong>Name:</strong> {job.clientId?.name}
                  </p>
                  <p className="mb-2">
                    <strong>Email:</strong> {job.clientId?.email}
                  </p>
                  <p>
                    <strong>Member since:</strong> {new Date(job.clientId?.createdAt).getFullYear()}
                  </p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Send className="w-6 h-6 mr-2 text-blue-400" />
                  Submit Your Proposal
                </h2>
                <form onSubmit={handleSubmitProposal} className="space-y-6 bg-gray-700 p-6 rounded-lg">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Proposal Details</label>
                    <textarea
                      placeholder="Describe your approach, relevant experience, and why you're the best fit..."
                      value={proposal.proposalText}
                      onChange={(e) => setProposal({ ...proposal, proposalText: e.target.value })}
                      className="w-full p-4 bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      rows="5"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Proposed Budget ($)</label>
                      <input
                        type="number"
                        placeholder="Enter your proposed budget"
                        value={proposal.proposedBudget}
                        onChange={(e) =>
                          setProposal({
                            ...proposal,
                            proposedBudget: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Proposed Deadline</label>
                      <input
                        type="date"
                        value={proposal.proposedDeadline}
                        onChange={(e) =>
                          setProposal({
                            ...proposal,
                            proposedDeadline: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Proposal"}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default JobDetailsPage

