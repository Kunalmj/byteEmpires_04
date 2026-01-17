import React, { useState } from 'react';
import { Leaf, Bell, MapPin, Calendar, User, Filter, Search, CheckCircle, Clock, AlertTriangle, Eye, XCircle, Download, Send, FileText, TrendingUp, Users, BarChart3 } from 'lucide-react';

const GovDashboard = () => {
  // Check if user is authorized
  const user = window.currentUser;
  
  // Mock complaints data
  const [complaints, setComplaints] = useState([
    {
      id: 'CP001',
      reportedBy: 'Rahul Sharma',
      email: 'rahul.s@gmail.com',
      type: 'Illegal Dumping',
      location: 'Sector 12, Kolkata',
      coordinates: '22.5726° N, 88.3639° E',
      date: '2026-01-15',
      time: '10:30 AM',
      severity: 'High',
      status: 'pending',
      description: 'Large amount of industrial waste dumped near residential area. Toxic smell detected.',
      images: ['waste1.jpg', 'waste2.jpg'],
      aiConfidence: 94,
      category: 'landfill'
    },
    {
      id: 'CP002',
      reportedBy: 'Priya Das',
      email: 'priya.das@yahoo.com',
      type: 'Deforestation',
      location: 'Sundarbans, West Bengal',
      coordinates: '21.9497° N, 88.8926° E',
      date: '2026-01-14',
      time: '02:15 PM',
      severity: 'Critical',
      status: 'viewed',
      description: 'Massive tree cutting observed. Approximately 2 hectares of forest cleared illegally.',
      images: ['forest1.jpg', 'forest2.jpg', 'forest3.jpg'],
      aiConfidence: 98,
      category: 'deforestation'
    },
    {
      id: 'CP003',
      reportedBy: 'Amit Kumar',
      email: 'amit.k@outlook.com',
      type: 'Soil Contamination',
      location: 'Industrial Area, Howrah',
      coordinates: '22.5958° N, 88.2636° E',
      date: '2026-01-16',
      time: '09:00 AM',
      severity: 'Medium',
      status: 'resolved',
      description: 'Chemical spillage detected. Soil appears discolored and vegetation dying.',
      images: ['soil1.jpg'],
      aiConfidence: 87,
      category: 'landfill'
    },
    {
      id: 'CP004',
      reportedBy: 'Sneha Ghosh',
      email: 'sneha.g@gmail.com',
      type: 'Illegal Dumping',
      location: 'Lake Road, Salt Lake',
      coordinates: '22.5755° N, 88.4329° E',
      date: '2026-01-17',
      time: '11:45 AM',
      severity: 'High',
      status: 'pending',
      description: 'Construction debris and plastic waste dumped in water body.',
      images: ['dump1.jpg', 'dump2.jpg'],
      aiConfidence: 91,
      category: 'landfill'
    },
    {
      id: 'CP005',
      reportedBy: 'Rajesh Mondal',
      email: 'rajesh.m@rediffmail.com',
      type: 'Forest Degradation',
      location: 'Buxa Tiger Reserve',
      coordinates: '26.7509° N, 89.6339° E',
      date: '2026-01-13',
      time: '03:30 PM',
      severity: 'Critical',
      status: 'viewed',
      description: 'Significant vegetation loss detected via satellite imagery. Suspected illegal mining.',
      images: ['reserve1.jpg'],
      aiConfidence: 96,
      category: 'deforestation'
    }
  ]);

  const [activeTab, setActiveTab] = useState('alerts');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Update complaint status
  const updateStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  // Filter complaints
  const filteredComplaints = complaints.filter(complaint => {
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || complaint.severity.toLowerCase() === filterSeverity;
    const matchesSearch = complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  // Stats
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    viewed: complaints.filter(c => c.status === 'viewed').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    critical: complaints.filter(c => c.severity === 'Critical').length
  };

  // Severity badge color
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'viewed': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Leaf className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Government Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-blue-400 cursor-pointer" />
                {stats.pending > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {stats.pending}
                  </span>
                )}
              </div>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="text-gray-400 hover:text-white"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Reports</div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.pending}</div>
            <div className="text-sm text-gray-400">Pending</div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.viewed}</div>
            <div className="text-sm text-gray-400">Viewed</div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.resolved}</div>
            <div className="text-sm text-gray-400">Resolved</div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.critical}</div>
            <div className="text-sm text-gray-400">Critical</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Complaints List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters & Search */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID, location, or reporter..."
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="viewed">Viewed</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Complaints List */}
            <div className="space-y-4">
              {filteredComplaints.map(complaint => (
                <div 
                  key={complaint.id}
                  onClick={() => setSelectedComplaint(complaint)}
                  className={`bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedComplaint?.id === complaint.id 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-gray-700 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{complaint.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(complaint.severity)}`}>
                          {complaint.severity}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(complaint.status)}`}>
                          {complaint.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-blue-400 font-semibold mb-1">{complaint.type}</p>
                      <div className="flex items-center text-sm text-gray-400 space-x-4">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {complaint.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {complaint.date}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-400 mb-2">AI Confidence</div>
                      <div className="text-2xl font-bold text-green-400">{complaint.aiConfidence}%</div>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{complaint.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="w-4 h-4 mr-1" />
                      Reported by: <span className="text-white ml-1">{complaint.reportedBy}</span>
                    </div>
                    <div className="flex space-x-2">
                      {complaint.status === 'pending' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(complaint.id, 'viewed');
                          }}
                          className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 px-4 py-2 rounded-lg text-blue-400 text-sm font-semibold transition"
                        >
                          Mark Viewed
                        </button>
                      )}
                      {complaint.status === 'viewed' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(complaint.id, 'resolved');
                          }}
                          className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 px-4 py-2 rounded-lg text-green-400 text-sm font-semibold transition"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredComplaints.length === 0 && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 text-center">
                  <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No complaints found matching your filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Details & Actions */}
          <div className="space-y-6">
            {selectedComplaint ? (
              <>
                {/* Complaint Details */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Complaint Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Complaint ID</label>
                      <p className="text-white font-semibold">{selectedComplaint.id}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Reporter Information</label>
                      <p className="text-white font-semibold">{selectedComplaint.reportedBy}</p>
                      <p className="text-blue-400 text-sm">{selectedComplaint.email}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Location</label>
                      <p className="text-white font-semibold">{selectedComplaint.location}</p>
                      <p className="text-gray-500 text-sm">{selectedComplaint.coordinates}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Date & Time</label>
                      <p className="text-white">{selectedComplaint.date} at {selectedComplaint.time}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Category</label>
                      <p className="text-white capitalize">{selectedComplaint.category}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Attached Images</label>
                      <div className="flex gap-2 mt-2">
                        {selectedComplaint.images.map((img, i) => (
                          <div key={i} className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                            <FileText className="w-8 h-8 text-gray-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 px-4 py-3 rounded-xl text-blue-400 font-semibold transition flex items-center justify-center">
                      <Eye className="w-5 h-5 mr-2" />
                      View on Map
                    </button>

                    <button className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 px-4 py-3 rounded-xl text-green-400 font-semibold transition flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Assign Team
                    </button>

                    <button className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 px-4 py-3 rounded-xl text-purple-400 font-semibold transition flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      Download Report
                    </button>

                    <button className="w-full bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 px-4 py-3 rounded-xl text-orange-400 font-semibold transition flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Escalate Issue
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 text-center">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select a complaint to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovDashboard;