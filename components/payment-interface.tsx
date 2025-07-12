"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, TrendingUp, Download, Search, Eye, CheckCircle, Clock, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Payment {
  id: string
  date: string
  student: string
  subject: string
  type: "private" | "group"
  amount: number
  status: "completed" | "pending" | "failed"
  method: "card" | "bank" | "paypal" | "upi" | "paytm" | "googlepay" | "phonepe"
  lessonDate: string
}

interface PaymentStats {
  totalEarnings: number
  monthlyEarnings: number
  pendingPayments: number
  completedLessons: number
}

const mockPayments: Payment[] = [
  {
    id: "PAY-001",
    date: "2024-01-15",
    student: "Arjun Patel",
    subject: "Mathematics",
    type: "private",
    amount: 800,
    status: "completed",
    method: "upi",
    lessonDate: "2024-01-14",
  },
  {
    id: "PAY-002",
    date: "2024-01-14",
    student: "Batch 12A",
    subject: "Physics",
    type: "group",
    amount: 2200,
    status: "completed",
    method: "bank",
    lessonDate: "2024-01-13",
  },
  {
    id: "PAY-003",
    date: "2024-01-13",
    student: "Sneha Gupta",
    subject: "Chemistry",
    type: "private",
    amount: 750,
    status: "pending",
    method: "paytm",
    lessonDate: "2024-01-12",
  },
  {
    id: "PAY-004",
    date: "2024-01-12",
    student: "Vikash Kumar",
    subject: "Mathematics",
    type: "private",
    amount: 800,
    status: "failed",
    method: "card",
    lessonDate: "2024-01-11",
  },
  {
    id: "PAY-005",
    date: "2024-01-11",
    student: "Ananya Reddy",
    subject: "Physics",
    type: "private",
    amount: 900,
    status: "completed",
    method: "upi",
    lessonDate: "2024-01-10",
  },
  {
    id: "PAY-006",
    date: "2024-01-10",
    student: "Rohit Sharma",
    subject: "Hindi",
    type: "private",
    amount: 600,
    status: "completed",
    method: "googlepay",
    lessonDate: "2024-01-09",
  },
]

const mockStats: PaymentStats = {
  totalEarnings: 125000,
  monthlyEarnings: 45000,
  pendingPayments: 3,
  completedLessons: 68,
}

export function PaymentInterface() {
  const [payments] = useState<Payment[]>(mockPayments)
  const [stats] = useState<PaymentStats>(mockStats)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending" | "failed">("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getMethodIcon = (method: Payment["method"]) => {
    switch (method) {
      case "card":
        return "💳"
      case "bank":
        return "🏦"
      case "upi":
        return "📱"
      case "paytm":
        return "💰"
      case "googlepay":
        return "🔵"
      case "phonepe":
        return "🟣"
      default:
        return "💳"
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Payment Dashboard</h2>
        <Button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </motion.div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Earnings</p>
                  <p className="text-3xl font-bold">₹{stats.totalEarnings.toLocaleString("en-IN")}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">This Month</p>
                  <p className="text-3xl font-bold">₹{stats.monthlyEarnings.toLocaleString("en-IN")}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Pending Payments</p>
                  <p className="text-3xl font-bold">{stats.pendingPayments}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Completed Lessons</p>
                  <p className="text-3xl font-bold">{stats.completedLessons}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payment Management */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg border-0">
          <TabsTrigger
            value="transactions"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
          >
            <CreditCard className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300"
          >
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search by student, subject, or payment ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={statusFilter === "all" ? "default" : "outline"}
                      onClick={() => setStatusFilter("all")}
                      size="sm"
                      className="transition-all duration-300"
                    >
                      All
                    </Button>
                    <Button
                      variant={statusFilter === "completed" ? "default" : "outline"}
                      onClick={() => setStatusFilter("completed")}
                      size="sm"
                      className="transition-all duration-300"
                    >
                      Completed
                    </Button>
                    <Button
                      variant={statusFilter === "pending" ? "default" : "outline"}
                      onClick={() => setStatusFilter("pending")}
                      size="sm"
                      className="transition-all duration-300"
                    >
                      Pending
                    </Button>
                    <Button
                      variant={statusFilter === "failed" ? "default" : "outline"}
                      onClick={() => setStatusFilter("failed")}
                      size="sm"
                      className="transition-all duration-300"
                    >
                      Failed
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPayments.map((payment, index) => (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                        >
                          {getMethodIcon(payment.method)}
                        </motion.div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{payment.student}</h4>
                            <Badge variant="outline" className="text-xs">
                              {payment.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {payment.subject} • {new Date(payment.date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500">ID: {payment.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{payment.amount}</p>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(payment.status)}
                            <Badge className={`text-xs ${getStatusColor(payment.status)}`}>{payment.status}</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50 transition-all duration-300">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                  {filteredPayments.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-slate-500 dark:text-slate-400"
                    >
                      <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No transactions found matching your criteria</p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Payment Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Payment Methods</h4>
                    <div className="space-y-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">📱 UPI/Digital Wallets</span>
                        <span className="font-semibold">70%</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">🏦 Net Banking</span>
                        <span className="font-semibold">20%</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">💳 Credit/Debit Cards</span>
                        <span className="font-semibold">10%</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Lesson Types Revenue</h4>
                    <div className="space-y-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">Private Lessons</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">₹28,500</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">Group Lessons</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">₹16,500</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}