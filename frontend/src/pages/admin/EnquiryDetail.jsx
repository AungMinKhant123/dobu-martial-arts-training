import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  CheckCircle2,
  Clock,
  RefreshCcw,
} from "lucide-react";
import Button from "../../components/Button";
import {
  getAdminEnquiryById,
  markAdminEnquiryAsRead,
  replyAdminEnquiry,
  generateAdminEnquiryReply,
} from "../../services/adminEnquiryService";

const statusStyles = {
  PENDING: "bg-amber-500 text-black",
  READ: "bg-sky-500 text-white",
  REPLIED: "bg-emerald-500 text-white",
};

const EnquiryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const formattedDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const loadEnquiry = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAdminEnquiryById(id);
        setEnquiry(data);
        setSubject(data.replySubject || `Re: ${data.subject}`);
        setMessage(data.replyMessage || "");
      } catch (err) {
        console.error("Unable to load enquiry", err);
        setError(err.message || "Unable to load enquiry.");
      } finally {
        setLoading(false);
      }
    };
    loadEnquiry();
  }, [id]);

  const handleMarkAsRead = async () => {
    if (!enquiry) return;
    try {
      setLoading(true);
      const updated = await markAdminEnquiryAsRead(id);
      setEnquiry(updated);
    } catch (err) {
      console.error("Unable to mark enquiry as read", err);
      setError(err.message || "Unable to mark as read.");
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setError("Reply subject and message are required.");
      return;
    }
    try {
      setReplyLoading(true);
      setError("");
      const updated = await replyAdminEnquiry(id, { subject, message });
      setEnquiry(updated);
    } catch (err) {
      console.error("Unable to send reply", err);
      setError(err.message || "Unable to send reply.");
    } finally {
      setReplyLoading(false);
    }
  };

  const handleGenerateReply = async () => {
    try {
      setAiLoading(true);
      setError("");
      const response = await generateAdminEnquiryReply(id);
      setSubject(response.data?.subject || response.subject || subject);
      setMessage(response.data?.message || response.message || message);
    } catch (err) {
      console.error("Unable to generate reply", err);
      setError(err.message || "Unable to generate reply.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-white hover:bg-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span>Enquiry detail</span>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
          <p className="text-sm uppercase opacity-60">Status</p>
          <p
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[enquiry?.status] || "bg-slate-700 text-white"}`}
          >
            {enquiry?.status || "Loading"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 text-center text-slate-400">
          Loading enquiry details...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
          {error}
        </div>
      ) : enquiry ? (
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase opacity-60">Customer</p>
                <p className="text-xl font-semibold text-white">
                  {enquiry.name}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
                  <p className="text-xs uppercase opacity-60">Email</p>
                  <p className="mt-2 text-sm text-slate-200">{enquiry.email}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
                  <p className="text-xs uppercase opacity-60">Phone</p>
                  <p className="mt-2 text-sm text-slate-200">
                    {enquiry.phone || "—"}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
                <p className="text-xs uppercase opacity-60">Subject</p>
                <p className="mt-2 text-sm text-slate-200">{enquiry.subject}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
                <p className="text-xs uppercase opacity-60">Message</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-200">
                  {enquiry.message}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
                  <p className="text-xs uppercase opacity-60">Received</p>
                  <p className="mt-2 text-sm text-slate-200">
                    {formattedDate(enquiry.createdAt)}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
                  <p className="text-xs uppercase opacity-60">Reply sent</p>
                  <p className="mt-2 text-sm text-slate-200">
                    {enquiry.repliedAt
                      ? formattedDate(enquiry.repliedAt)
                      : "Not yet replied"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {enquiry.status === "PENDING" && (
                <Button
                  variant="accent"
                  onClick={handleMarkAsRead}
                  disabled={loading}
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark as Read
                </Button>
              )}
              <Button variant="outline" onClick={() => navigate(-1)}>
                Back to Inbox
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase opacity-60">
                    Reply to customer
                  </p>
                  <p className="mt-1 text-lg font-semibold">Draft response</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateReply}
                  disabled={aiLoading}
                >
                  <RefreshCcw className="w-4 h-4" />{" "}
                  {aiLoading ? "Generating..." : "Generate reply"}
                </Button>
              </div>
              <form onSubmit={handleReplySubmit} className="space-y-4 mt-6">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={8}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm opacity-70">
                    Reply recipients: {enquiry.email}
                  </p>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={replyLoading}
                  >
                    <Mail className="w-4 h-4" />{" "}
                    {replyLoading
                      ? "Sending reply..."
                      : enquiry.status === "REPLIED"
                        ? "Update reply"
                        : "Send reply"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EnquiryDetail;
