import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  BarChart3,
  CheckCircle,
  Clock,
  Pause,
  AlertTriangle
} from 'lucide-react';
import { Task, TaskStats } from '../types';
import { apiService } from '../services/api';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import TaskDetailsModal from './TaskDetailsModal';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({
    'In Progress': 0,
    'Postponed': 0,
    'Completed': 0,
    'Overdue': 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: ''
  });
  const [view, setView] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filters, view]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const statusFilter = view === 'completed' ? 'Completed' : 
                          filters.status === 'all' ? undefined : filters.status;
      
      const taskFilters = {
        status: statusFilter,
        category: filters.category === 'all' ? undefined : filters.category,
        search: filters.search || undefined
      };

      const fetchedTasks = await apiService.getTasks(taskFilters);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const fetchedStats = await apiService.getStats();
      setStats(fetchedStats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleTaskCreated = () => {
    fetchTasks();
    fetchStats();
    setShowTaskModal(false);
  };

  const handleTaskUpdated = () => {
    fetchTasks();
    fetchStats();
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleTaskDeleted = () => {
    fetchTasks();
    fetchStats();
  };

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      if (task) {
await apiService.updateTask(taskId, {
  title: task.title,
  description: task.description,
  category: task.category,
  dueDate: task.dueDate,
  assignedTo: task.assignedTo._id,  // استخدم _id فقط
  status: 'Completed'
});


        fetchTasks();
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

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

  const activeTasks = tasks.filter(task => task.status !== 'Completed');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
<div className="min-h-screen bg-gray-50">
  {/* Header */}
  <div className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6"> {/* Adjusted for mobile stacking */}
        <div className="text-center sm:text-left mb-4 sm:mb-0"> {/* Centered text on mobile */}
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Task Dashboard</h1> {/* Smaller text on mobile */}
          <p className="text-sm sm:text-base text-gray-600">Manage your team's tasks efficiently</p> {/* Smaller text on mobile */}
        </div>
        <button
          onClick={() => setShowTaskModal(true)}
          className="bg-[#84aaac] text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-[#6b8d8e] transition-all duration-200 flex items-center space-x-2 shadow-lg w-full sm:w-auto justify-center" /* Full width on mobile */
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> {/* Smaller icon on mobile */}
          <span>Add New Task</span>
        </button>
      </div>
    </div>
  </div>

  {/* Stats Cards */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"> {/* Adjusted padding */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"> {/* Responsive grid */}
      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100"> {/* Adjusted padding */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats['In Progress']}</p> {/* Smaller text on mobile */}
          </div>
          <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" /> {/* Smaller icon on mobile */}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Postponed</p>
            <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats['Postponed']}</p>
          </div>
          <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">{stats['Completed']}</p>
          </div>
          <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Overdue</p>
            <p className="text-xl sm:text-2xl font-bold text-red-600">{stats['Overdue']}</p>
          </div>
          <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
        </div>
      </div>
    </div>

    {/* View Toggle */}
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0"> {/* Stack on mobile */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-full sm:w-auto justify-center"> {/* Full width on mobile */}
        <button
          onClick={() => setView('active')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-all duration-200 w-1/2 sm:w-auto ${ /* Equal width buttons on mobile */
            view === 'active'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Active Tasks ({activeTasks.length})
        </button>
        <button
          onClick={() => setView('completed')}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-all duration-200 w-1/2 sm:w-auto ${ /* Equal width buttons on mobile */
            view === 'completed'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Completed Tasks ({completedTasks.length})
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"> {/* Stack on mobile */}
        <div className="relative w-full sm:w-auto"> {/* Full width on mobile */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full" /* Full width on mobile */
          />
        </div>

        {view === 'active' && (
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto" /* Full width on mobile */
          >
            <option value="all">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Postponed">Postponed</option>
          </select>
        )}

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto" /* Full width on mobile */
        >
          <option value="all">All Categories</option>
          <option value="Marketing">Marketing</option>
          <option value="Technical">Technical</option>
          <option value="Support">Support</option>
          <option value="Administration">Administration</option>
        </select>
      </div>
    </div>

    {/* Tasks Grid */}
    {isLoading ? (
      <div className="flex justify-center items-center py-10 sm:py-12"> {/* Adjusted padding */}
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : tasks.length === 0 ? (
      <div className="text-center py-10 sm:py-12"> {/* Adjusted padding */}
        <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" /> {/* Smaller icon on mobile */}
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1.5 sm:mb-2"> {/* Smaller text on mobile */}
          {view === 'completed' ? 'No completed tasks' : 'No active tasks'}
        </h3>
        <p className="text-sm sm:text-base text-gray-500"> {/* Smaller text on mobile */}
          {view === 'completed' 
            ? 'Completed tasks will appear here' 
            : 'Create your first task to get started'
          }
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"> {/* Responsive grid */}
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onViewDetails={handleViewDetails}
            onEdit={handleEditTask}
            onDelete={handleTaskDeleted}
            onComplete={handleCompleteTask}
          />
        ))}
      </div>
    )}
  </div>

  {/* Modals */}
  {showTaskModal && (
    <TaskModal
      task={editingTask}
      onClose={() => {
        setShowTaskModal(false);
        setEditingTask(null);
      }}
      onSave={editingTask ? handleTaskUpdated : handleTaskCreated}
    />
  )}

  {showDetailsModal && selectedTask && (
    <TaskDetailsModal
      task={selectedTask}
      onClose={() => {
        setShowDetailsModal(false);
        setSelectedTask(null);
      }}
      onTaskUpdated={fetchTasks}
    />
  )}
</div>
  );
};

export default Dashboard;