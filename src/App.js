// App.js
import React, { useState, useEffect } from 'react';
import { User, Briefcase, Target, TrendingUp, Users, BookOpen, ChevronRight, Star, MapPin, Clock, Zap, Brain, Award, Search, Filter, Bell, Settings } from 'lucide-react';
import './index.css'; 

// Mock data
const mockEmployee = {
  id: 1,
  name: "Sarah Chen",
  role: "Senior Software Engineer",
  department: "Engineering",
  location: "San Francisco",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  skillsScore: 92,
  skills: [
    { name: "React", level: "Expert", endorsed: 12 },
    { name: "Python", level: "Advanced", endorsed: 8 },
    { name: "Machine Learning", level: "Intermediate", endorsed: 5 },
    { name: "Leadership", level: "Advanced", endorsed: 15 },
    { name: "Data Analysis", level: "Intermediate", endorsed: 7 }
  ],
  interests: ["AI/ML", "Product Strategy", "Team Leadership"],
  careerGoals: "Transition to Technical Product Manager"
};

const mockOpportunities = [
  {
    id: 1,
    type: "Full-Time",
    title: "Technical Product Manager",
    department: "Product",
    match: 94,
    location: "San Francisco",
    duration: "Permanent",
    skills: ["Product Strategy", "Technical Leadership", "Data Analysis"],
    description: "Lead cross-functional teams to deliver AI-powered products"
  },
  {
    id: 2,
    type: "Project",
    title: "AI Ethics Committee Lead",
    department: "Ethics & Compliance",
    match: 89,
    location: "Remote",
    duration: "6 months (20% time)",
    skills: ["Machine Learning", "Ethics", "Leadership"],
    description: "Establish guidelines for responsible AI development"
  },
  {
    id: 3,
    type: "Mentorship",
    title: "Junior Developer Mentor",
    department: "Engineering",
    match: 87,
    location: "San Francisco",
    duration: "Ongoing",
    skills: ["React", "Leadership", "Communication"],
    description: "Guide 3-4 junior developers in their technical growth"
  },
  {
    id: 4,
    type: "Learning",
    title: "Advanced Product Strategy Course",
    department: "Learning & Development",
    match: 91,
    location: "Online",
    duration: "8 weeks",
    skills: ["Product Strategy", "Market Analysis", "Strategic Thinking"],
    description: "Comprehensive course on product strategy and market positioning"
  }
];

const mockSkillsGap = [
  { skill: "Cloud Architecture", currentCount: 45, neededCount: 78, gap: -33 },
  { skill: "Data Science", currentCount: 32, neededCount: 55, gap: -23 },
  { skill: "UX Design", currentCount: 28, neededCount: 40, gap: -12 },
  { skill: "Cybersecurity", currentCount: 15, neededCount: 35, gap: -20 },
  { skill: "Machine Learning", currentCount: 62, neededCount: 45, gap: 17 }
];

const SkillsMarketplace = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Full-Time': return <Briefcase className="w-4 h-4" />;
      case 'Project': return <Target className="w-4 h-4" />;
      case 'Mentorship': return <Users className="w-4 h-4" />;
      case 'Learning': return <BookOpen className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Full-Time': return 'bg-blue-100 text-blue-800';
      case 'Project': return 'bg-green-100 text-green-800';
      case 'Mentorship': return 'bg-purple-100 text-purple-800';
      case 'Learning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || opp.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {mockEmployee.name}!</h1>
            <p className="text-blue-100">You have 4 new opportunities matching your skills and interests</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl font-bold">{mockEmployee.skillsScore}</div>
              <div className="text-sm text-blue-100">Skills Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Applications</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Skills Endorsed</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div>
            <p className="text-sm text-gray-600">Projects Completed</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Learning Hours</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Top Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            AI-Powered Recommendations
          </h2>
        </div>
        <div className="p-6 space-y-4">
          {mockOpportunities.slice(0, 3).map(opp => (
            <div key={opp.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${getTypeColor(opp.type)}`}>
                  {getTypeIcon(opp.type)}
                </div>
                <div>
                  <h3 className="font-medium">{opp.title}</h3>
                  <p className="text-sm text-gray-600">{opp.department} • {opp.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{opp.match}%</div>
                  <div className="text-xs text-gray-500">Match</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Opportunities = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>All</option>
            <option>Full-Time</option>
            <option>Project</option>
            <option>Mentorship</option>
            <option>Learning</option>
          </select>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOpportunities.map(opp => (
          <div key={opp.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(opp.type)}`}>
                    {getTypeIcon(opp.type)}
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(opp.type)}`}>
                      {opp.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{opp.match}%</div>
                  <div className="text-xs text-gray-500">Match</div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{opp.title}</h3>
              <p className="text-gray-600 mb-4">{opp.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {opp.department}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {opp.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {opp.duration}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Required Skills:</div>
                <div className="flex flex-wrap gap-2">
                  {opp.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Profile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="flex items-center gap-6">
            <img
              src={mockEmployee.avatar}
              alt={mockEmployee.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{mockEmployee.name}</h1>
              <p className="text-gray-600">{mockEmployee.role}</p>
              <p className="text-gray-500">{mockEmployee.department} • {mockEmployee.location}</p>
              <div className="mt-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Skills Score: {mockEmployee.skillsScore}/100</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Skills & Expertise</h2>
        </div>
        <div className="p-6 space-y-4">
          {mockEmployee.skills.map(skill => (
            <div key={skill.name} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-600">{skill.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: skill.level === 'Expert' ? '90%' : skill.level === 'Advanced' ? '75%' : '60%' }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 flex items-center gap-1 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {skill.endorsed}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Goals */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Career Goals & Interests</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-medium mb-2">Primary Goal</h3>
            <p className="text-gray-700">{mockEmployee.careerGoals}</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Areas of Interest</h3>
            <div className="flex flex-wrap gap-2">
              {mockEmployee.interests.map(interest => (
                <span key={interest} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      {/* Skills Gap Analysis */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Skills Gap Analysis
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockSkillsGap.map(item => (
              <div key={item.skill} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{item.skill}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Current: {item.currentCount}</span>
                    <span>Needed: {item.neededCount}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.gap < 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {item.gap > 0 ? '+' : ''}{item.gap}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Talent Flow Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Internal Mobility Rate</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">23%</div>
          <p className="text-sm text-gray-600">+5% from last quarter</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Avg. Time to Fill</h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600">12 days</div>
          <p className="text-sm text-gray-600">-8 days improvement</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Employee Satisfaction</h3>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">4.7/5</div>
          <p className="text-sm text-gray-600">Based on 1,234 responses</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">TalentFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
              <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
              <img
                src={mockEmployee.avatar}
                alt={mockEmployee.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border">
              <nav className="p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'opportunities' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  Opportunities
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'profile' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  My Profile
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'analytics' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  Analytics
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'opportunities' && <Opportunities />}
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'analytics' && <Analytics />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsMarketplace;