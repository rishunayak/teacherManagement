"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, User, MapPin, Video } from "lucide-react"

interface Lesson {
  id: string
  title: string
  student: string
  type: "private" | "group"
  subject: string
  time: string
  duration: number
  location: "online" | "in-person"
  status: "scheduled" | "completed" | "cancelled"
}

const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "Advanced Calculus - JEE Preparation",
    student: "Arjun Patel",
    type: "private",
    subject: "Mathematics",
    time: "09:00",
    duration: 60,
    location: "online",
    status: "scheduled",
  },
  {
    id: "2",
    title: "Physics Group Session - NEET",
    student: "Batch 12A",
    type: "group",
    subject: "Physics",
    time: "14:00",
    duration: 90,
    location: "in-person",
    status: "scheduled",
  },
  {
    id: "3",
    title: "Organic Chemistry",
    student: "Sneha Gupta",
    type: "private",
    subject: "Chemistry",
    time: "16:30",
    duration: 60,
    location: "online",
    status: "scheduled",
  },
  {
    id: "4",
    title: "Hindi Literature - CBSE",
    student: "Rahul Singh",
    type: "private",
    subject: "Hindi",
    time: "11:00",
    duration: 45,
    location: "in-person",
    status: "scheduled",
  },
  {
    id: "5",
    title: "Biology Group - Medical Entrance",
    student: "Batch 11B",
    type: "group",
    subject: "Biology",
    time: "15:30",
    duration: 75,
    location: "online",
    status: "scheduled",
  },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function ScheduleView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<"calendar" | "list">("calendar")

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date | null) => {
    if (!date) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const hasLessons = (date: Date | null) => {
    if (!date) return false
    // Mock logic - in real app, check against actual lessons
    return date.getDate() % 3 === 0
  }

  const getTodaysLessons = () => {
    // Mock logic - in real app, filter lessons by selected date
    return mockLessons
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Schedule & Availability</h2>
        <div className="flex gap-2">
          <Button 
            variant={view === "calendar" ? "default" : "outline"} 
            onClick={() => setView("calendar")} 
            size="sm"
            className="transition-all duration-300"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Button 
            variant={view === "list" ? "default" : "outline"} 
            onClick={() => setView("list")} 
            size="sm"
            className="transition-all duration-300"
          >
            <Clock className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Lesson
          </Button>
        </div>
      </motion.div>

      {view === "calendar" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="hover:bg-blue-50 transition-all duration-300">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="hover:bg-blue-50 transition-all duration-300">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((date, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => date && setSelectedDate(date)}
                      className={`
                        p-2 text-sm rounded-lg transition-all duration-200 relative
                        ${!date ? "invisible" : ""}
                        ${isToday(date) ? "bg-blue-500 text-white font-bold shadow-lg" : ""}
                        ${isSelected(date) && !isToday(date) ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100" : ""}
                        ${!isToday(date) && !isSelected(date) ? "hover:bg-slate-100 dark:hover:bg-slate-700" : ""}
                      `}
                    >
                      {date?.getDate()}
                      {hasLessons(date) && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  {selectedDate.toDateString() === new Date().toDateString()
                    ? "Today's Schedule"
                    : `Schedule for ${selectedDate.toLocaleDateString()}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getTodaysLessons().map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{lesson.title}</h4>
                      <Badge variant={lesson.type === "private" ? "default" : "secondary"} className="text-xs">
                        {lesson.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>{lesson.student}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>
                          {lesson.time} ({lesson.duration} min)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.location === "online" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                        <span className="capitalize">{lesson.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {getTodaysLessons().length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-slate-500 dark:text-slate-400"
                  >
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No lessons scheduled for this day</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ) : (
        /* List View */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle>Upcoming Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg"
                      >
                        {lesson.subject[0]}
                      </motion.div>
                      <div>
                        <h4 className="font-semibold">{lesson.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {lesson.student} • {lesson.time} • {lesson.duration} min
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={lesson.type === "private" ? "default" : "secondary"}>{lesson.type}</Badge>
                      <Badge
                        variant="outline"
                        className={
                          lesson.location === "online"
                            ? "border-green-500 text-green-700"
                            : "border-blue-500 text-blue-700"
                        }
                      >
                        {lesson.location === "online" ? "Online" : "In-Person"}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}