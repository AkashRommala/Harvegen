'use client'

import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiCalendar, FiAward, FiBook, FiZap, FiCpu, FiCheckCircle, FiClock, FiDownload } from 'react-icons/fi'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

function Profile() {
  const [userStats, setUserStats] = useState({
    name: 'Embedded Engineer',
    email: 'engineer@example.com',
    joinDate: 'January 2024',
    completedProjects: 12,
    tutorialsCompleted: 8,
    totalLearningTime: '45 hours',
    currentStreak: 7,
    level: 'Intermediate',
    badges: 15
  })

  const [progressData, setProgressData] = useState([
    { category: 'STM32', progress: 75, total: 100, color: 'bg-blue-500' },
    { category: 'Arduino', progress: 90, total: 100, color: 'bg-green-500' },
    { category: 'FreeRTOS', progress: 45, total: 100, color: 'bg-purple-500' },
    { category: 'IoT', progress: 60, total: 100, color: 'bg-emerald-500' }
  ])

  const [recentActivity, setRecentActivity] = useState([
    { action: 'Completed', item: 'GPIO: Input, Output & EXTI Interrupts', time: '2 hours ago', type: 'tutorial' },
    { action: 'Started', item: 'Smart Irrigation System', time: '1 day ago', type: 'project' },
    { action: 'Downloaded', item: 'STM32 Schematics Pack', time: '3 days ago', type: 'resource' },
    { action: 'Completed', item: 'UART: From Config to Circular Buffers', time: '1 week ago', type: 'tutorial' }
  ])

  const [achievements, setAchievements] = useState([
    { title: 'First Steps', desc: 'Complete your first tutorial', earned: true, icon: FiBook },
    { title: 'Project Builder', desc: 'Complete 5 projects', earned: true, icon: FiZap },
    { title: 'MCU Master', desc: 'Learn 3 different microcontrollers', earned: false, icon: FiCpu },
    { title: 'Week Streak', desc: 'Learn for 7 consecutive days', earned: true, icon: FiCalendar },
    { title: 'Resource Collector', desc: 'Download 10 resources', earned: false, icon: FiDownload }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
              <FiUser className="w-12 h-12 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{userStats.name}</h1>
              <p className="text-white/80 text-lg mb-4">{userStats.email}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  Member since {userStats.joinDate}
                </span>
                <span className="flex items-center gap-2">
                  <FiAward className="w-4 h-4" />
                  Level {userStats.level} • {userStats.badges} badges
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.completedProjects}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <FiZap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tutorials Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.tutorialsCompleted}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <FiBook className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Learning Time</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalLearningTime}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FiClock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.currentStreak} days</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <FiCheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Learning Progress</CardTitle>
                <CardDescription>Track your progress across different embedded systems topics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {progressData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{item.category}</span>
                      <span className="text-sm text-gray-600">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${item.color}`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl mt-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Recent Activity</CardTitle>
                <CardDescription>Your latest learning milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'tutorial' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'project' ? 'bg-emerald-100 text-emerald-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'tutorial' ? <FiBook className="w-4 h-4" /> :
                         activity.type === 'project' ? <FiZap className="w-4 h-4" /> :
                         <FiDownload className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action} {activity.item}</p>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Achievements */}
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Achievements</CardTitle>
                <CardDescription>Unlock these milestones as you learn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                    achievement.earned 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.desc}</p>
                    </div>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-xl mt-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Quick Actions</CardTitle>
                <CardDescription>Continue your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="default" className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl">
                  Continue Learning
                </Button>
                <Button variant="outline" className="w-full border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white">
                  View All Projects
                </Button>
                <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-900">
                  Download Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile