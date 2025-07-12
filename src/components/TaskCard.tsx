import React from 'react';
import { 
  Calendar, 
  User, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock,
  Pause,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Task } from '../types';
import { format, isAfter, parseISO } from 'date-fns';
import { apiService } from '../services/api';

interface TaskCardProps {
  task: Task;
  onViewDetails: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: () => void;
  onComplete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onViewDetails,
  onEdit,
  onDelete,
  onComplete
}) => {
  const isOverdue = task.status !== 'Completed' && isAfter(new Date(), parseISO(task.dueDate));

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Postponed':
        return <Pause className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiService.deleteTask(task._id);
        onDelete();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${
      isOverdue ? 'border-red-200 bg-red-50/30' : 'border-gray-200'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {task.title}
            </h3>
            <div className="flex items-center space-x-2 mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {getStatusIcon(task.status)}
                <span className="ml-1">{task.status}</span>
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                {task.category}
              </span>
            </div>
          </div>
          <button
            onClick={() => onViewDetails(task)}
            className="text-blue-600 hover:text-blue-800 transition-colors p-1"
            title="View Details"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {task.description}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-2" />
            <span>Assigned to: {task.assignedTo?.name || 'غير محدد'}
            </span>
          </div>
          <div className={`flex items-center text-sm ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
            <Calendar className="w-4 h-4 mr-2" />
            <span>Due: {format(parseISO(task.dueDate), 'MMM dd, yyyy')}</span>
            {isOverdue && <AlertTriangle className="w-4 h-4 ml-2 text-red-500" />}
          </div>
        </div>

        {/* Attachments and Comments Count */}
        {(task.attachments.length > 0 || task.comments.length > 0) && (
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
            {task.attachments.length > 0 && (
              <span>{task.attachments.length} attachment{task.attachments.length !== 1 ? 's' : ''}</span>
            )}
            {task.comments.length > 0 && (
              <span>{task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        )}

        {/* Completed Task Info */}
        {task.status === 'Completed' && task.completedBy && task.completedAt && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-green-800">
              ✅ Completed by <strong>{task.completedBy.name}</strong>
            </p>
            <p className="text-xs text-green-600">
              {format(parseISO(task.completedAt), 'MMM dd, yyyy at h:mm a')}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg"
              title="Edit Task"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-lg"
              title="Delete Task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          {task.status !== 'Completed' && (
            <button
              onClick={() => onComplete(task._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-1"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Complete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;