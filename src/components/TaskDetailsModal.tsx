import React, { useState, useRef } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  MessageCircle, 
  Paperclip, 
  Send,
  Download,
  Upload,
  Clock,
  CheckCircle,
  Pause
} from 'lucide-react';
import { Task, Comment } from '../types';
import { apiService } from '../services/api';
import { format, parseISO } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
  onTaskUpdated: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ 
  task, 
  onClose, 
  onTaskUpdated 
}) => {
  const [comments, setComments] = useState<Comment[]>(task.comments);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Postponed':
        return <Pause className="w-5 h-5 text-yellow-500" />;
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Postponed':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Marketing':
        return 'bg-purple-100 text-purple-800';
      case 'Technical':
        return 'bg-blue-100 text-blue-800';
      case 'Support':
        return 'bg-green-100 text-green-800';
      case 'Administration':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const updatedComments = await apiService.addComment(task._id, newComment);
      setComments(updatedComments);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await apiService.uploadFile(task._id, file);
      onTaskUpdated(); // Refresh the task data
    } catch (error) {
      console.error('Failed to upload file:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDownload = (attachment: any) => {
    const link = document.createElement('a');
    link.href = `https://barzah-tasks.onrender.com/${attachment.path}`;
    link.download = attachment.originalName;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getStatusIcon(task.status)}
            <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Task Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{task.title}</h3>
              
              <div className="flex items-center space-x-3 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                  {getStatusIcon(task.status)}
                  <span className="ml-2">{task.status}</span>
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(task.category)}`}>
                  {task.category}
                </span>
              </div>

              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {task.description}
              </p>

              {/* Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-3" />
                    <span className="font-medium">Assigned to:</span>
                    <span className="ml-2">{task.assignedTo.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-3" />
                    <span className="font-medium">Assigned by:</span>
                    <span className="ml-2">{task.assignedBy.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-3" />
                    <span className="font-medium">Due date:</span>
                    <span className="ml-2">{format(parseISO(task.dueDate), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-3" />
                    <span className="font-medium">Created:</span>
                    <span className="ml-2">{format(parseISO(task.createdAt), 'MMM dd, yyyy')}</span>
                  </div>
                  {task.completedBy && task.completedAt && (
                    <>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-3" />
                        <span className="font-medium">Completed by:</span>
                        <span className="ml-2">{task.completedBy.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-3" />
                        <span className="font-medium">Completed:</span>
                        <span className="ml-2">{format(parseISO(task.completedAt), 'MMM dd, yyyy at h:mm a')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Paperclip className="w-5 h-5 mr-2" />
                  Attachments ({task.attachments.length})
                </h4>
                <div className="flex items-center space-x-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                  </button>
                </div>
              </div>

              {task.attachments.length > 0 ? (
                <div className="space-y-2">
                  {task.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center space-x-3">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {attachment.originalName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {format(parseISO(attachment.uploadedAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDownload(attachment)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No attachments yet</p>
              )}
            </div>

            {/* Comments */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Comments ({comments.length})
              </h4>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="mb-6">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingComment || !newComment.trim()}
                    className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed h-fit"
                  >
                    {isSubmittingComment ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </form>

              {/* Comments List */}
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{comment.user.name}</span>
                        <span className="text-xs text-gray-500">
                          {format(parseISO(comment.createdAt), 'MMM dd, yyyy at h:mm a')}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No comments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;