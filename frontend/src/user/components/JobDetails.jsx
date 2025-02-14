import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Clock, DollarSign, FileText, Calendar, CheckCircle } from "lucide-react";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposal, setProposal] = useState({
    proposalText: "",
    proposedBudget: "",
    proposedDeadline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/jobs/job/${id}`);
        setJob(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error("Failed to load job details");
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`http://localhost:3000/api/job/${id}/proposal`, proposal, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success("Proposal submitted successfully!", {
        description: "The client will review your submission shortly.",
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });
      
      // Reset form
      setProposal({
        proposalText: "",
        proposedBudget: "",
        proposedDeadline: "",
      });
      
    } catch (err) {
      toast.error("Submission failed", {
        description: err.response?.data?.message || "Could not submit proposal",
        icon: <XCircle className="w-5 h-5 text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {job.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Job Details Cards */}
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">Budget</span>
              </div>
              <p className="text-2xl mt-2">${job.budget}</p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="font-semibold">Deadline</span>
              </div>
              <p className="mt-2">
                {new Date(job.deadline).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Proposals</span>
              </div>
              <p className="mt-2">{job.proposals?.length || 0} submitted</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Project Description
            </h2>
            <p className="text-gray-300 leading-relaxed">{job.description}</p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5" /> Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4 text-green-400" /> {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Submit Your Proposal
            </h2>
            
            <form onSubmit={handleSubmitProposal} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Proposal Details</label>
                <textarea
                  placeholder="Describe your approach, relevant experience, and why you're the best fit..."
                  value={proposal.proposalText}
                  onChange={(e) => setProposal({ ...proposal, proposalText: e.target.value })}
                  className="w-full p-4 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                    onChange={(e) => setProposal({ ...proposal, proposedBudget: e.target.value })}
                    className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Proposed Deadline</label>
                  <input
                    type="date"
                    value={proposal.proposedDeadline}
                    onChange={(e) => setProposal({ ...proposal, proposedDeadline: e.target.value })}
                    className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;