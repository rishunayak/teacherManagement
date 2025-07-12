"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Calendar,
  GraduationCap,
  CreditCard,
  Settings,
  Phone,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  BookOpen,
} from "lucide-react"
import { TeacherProfile } from "./teacher-profile"
import { ScheduleView } from "./schedule-view"
import { QualificationsManager } from "./qualifications-manager"
import { PaymentInterface } from "./payment-interface"

interface TeacherData {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  birthDate: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  qualifications: {
    private: { subject: string; rate: number }[]
    group: { subject: string; rate: number }[]
  }
  stats: {
    totalStudents: number
    monthlyEarnings: number
    upcomingLessons: number
    completionRate: number
  }
}

const mockTeacherData: TeacherData = {
  id: "1",
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  phone: "+91 8957736763",
  avatar: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
  birthDate: "1985-03-15",
  address: {
    street: "123 Vidya Nagar, Sector 15",
    city: "Gurgaon",
    state: "Haryana",
    zipCode: "122001",
  },
  qualifications: {
    private: [
      { subject: "Mathematics", rate: 800 },
      { subject: "Physics", rate: 900 },
      { subject: "Chemistry", rate: 750 },
      { subject: "Hindi", rate: 600 },
    ],
    group: [
      { subject: "Mathematics", rate: 500 },
      { subject: "Physics", rate: 550 },
      { subject: "Chemistry", rate: 450 },
      { subject: "Hindi", rate: 400 },
    ],
  },
  stats: {
    totalStudents: 32,
    monthlyEarnings: 45000,
    upcomingLessons: 12,
    completionRate: 94,
  },
}

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [teacher] = useState<TeacherData>(mockTeacherData)

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {teacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Welcome back, {teacher.name.split(" ")[0]}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  {teacher.email}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="self-start sm:self-auto bg-white/80 backdrop-blur-sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto p-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg border-0">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
            <TabsTrigger
              value="qualifications"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Qualifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                key="overview"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100 text-sm font-medium">Total Students</p>
                            <p className="text-3xl font-bold">{teacher.stats.totalStudents}</p>
                          </div>
                          <Users className="h-8 w-8 text-blue-200" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-100 text-sm font-medium">Monthly Earnings</p>
                            <p className="text-3xl font-bold">₹{teacher.stats.monthlyEarnings.toLocaleString("en-IN")}</p>
                          </div>
                          <DollarSign className="h-8 w-8 text-green-200" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-100 text-sm font-medium">Upcoming Lessons</p>
                            <p className="text-3xl font-bold">{teacher.stats.upcomingLessons}</p>
                          </div>
                          <Clock className="h-8 w-8 text-purple-200" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-orange-100 text-sm font-medium">Completion Rate</p>
                            <p className="text-3xl font-bold">{teacher.stats.completionRate}%</p>
                          </div>
                          <BookOpen className="h-8 w-8 text-orange-200" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-blue-500" />
                          Qualifications Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-slate-600 dark:text-slate-400 mb-2">
                            Private Lessons
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {teacher.qualifications.private.map((qual, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 transition-colors duration-200"
                              >
                                {qual.subject} - ₹{qual.rate}/hr
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-slate-600 dark:text-slate-400 mb-2">Group Lessons</h4>
                          <div className="flex flex-wrap gap-2">
                            {teacher.qualifications.group.map((qual, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 transition-colors duration-200"
                              >
                                {qual.subject} - ₹{qual.rate}/hr
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-green-500" />
                          Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
                          <Phone className="h-4 w-4 text-slate-500" />
                          <span className="text-sm">{teacher.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
                          <Mail className="h-4 w-4 text-slate-500" />
                          <span className="text-sm">{teacher.email}</span>
                        </div>
                        <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200">
                          <MapPin className="h-4 w-4 text-slate-500 mt-0.5" />
                          <div className="text-sm">
                            <div>{teacher.address.street}</div>
                            <div>
                              {teacher.address.city}, {teacher.address.state} {teacher.address.zipCode}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="profile">
              <motion.div
                key="profile"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <TeacherProfile teacher={teacher} />
              </motion.div>
            </TabsContent>

            <TabsContent value="schedule">
              <motion.div
                key="schedule"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <ScheduleView />
              </motion.div>
            </TabsContent>

            <TabsContent value="qualifications">
              <motion.div
                key="qualifications"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <QualificationsManager qualifications={teacher.qualifications} />
              </motion.div>
            </TabsContent>

            <TabsContent value="payments">
              <motion.div
                key="payments"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <PaymentInterface />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}