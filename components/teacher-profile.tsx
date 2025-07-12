"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Edit3, Save, X, Upload, User, Mail, Phone, MapPin, Calendar } from "lucide-react"

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

interface TeacherProfileProps {
  teacher: TeacherData
}

export function TeacherProfile({ teacher }: TeacherProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(teacher)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsEditing(false)

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleCancel = () => {
    setFormData(teacher)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Teacher Profile</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isLoading} className="bg-green-500 hover:bg-green-600 transition-all duration-300">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button onClick={handleCancel} variant="outline" disabled={isLoading} className="transition-all duration-300">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="h-32 w-32 ring-4 ring-blue-100 dark:ring-blue-900 shadow-lg">
                  <AvatarImage src={formData.avatar} alt={formData.name} />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {formData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              {isEditing && (
                <Button variant="outline" size="sm" className="transition-all duration-300 hover:bg-blue-50">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Photo
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-green-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-105"
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-md transition-all duration-200"
                    >
                      <User className="h-4 w-4 text-slate-500" />
                      <span>{formData.name}</span>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-sm font-medium">
                    Birth Date
                  </Label>
                  {isEditing ? (
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-105"
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-md transition-all duration-200"
                    >
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span>{new Date(formData.birthDate).toLocaleDateString("en-IN")}</span>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-105"
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-md transition-all duration-200"
                    >
                      <Mail className="h-4 w-4 text-slate-500" />
                      <span>{formData.email}</span>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Mobile Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-105"
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-md transition-all duration-200"
                    >
                      <Phone className="h-4 w-4 text-slate-500" />
                      <span>{formData.phone}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Address Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3"
        >
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-500" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="street" className="text-sm font-medium">
                    Street Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="street"
                      value={formData.address.street}
                      onChange={(e) => handleInputChange("address.street", e.target.value)}
                      placeholder="House No., Street, Area"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-105"
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-slate-50 dark:bg-slate-700 rounded-md transition-all duration-200"
                    >
                      <span>{formData.address.street}</span>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">
                    City
                  </Label>
                  {isEditing ? (
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange("address.city", e.target.value)}
                      placeholder="City"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-105"
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-slate-50 dark:bg-slate-700 rounded-md transition-all duration-200"
                    >
                      <span>{formData.address.city}</span>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    State
                  </Label>
                  {isEditing ? (
                    <Input
                      id="state"
                      value={formData.address.state}
                      onChange={(e) => handleInputChange("address.state", e.target.value)}
                      placeholder="State"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-105"
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-slate-50 dark:bg-slate-700 rounded-md transition-all duration-200"
                    >
                      <span>{formData.address.state}</span>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-sm font-medium">
                    PIN Code
                  </Label>
                  {isEditing ? (
                    <Input
                      id="zipCode"
                      value={formData.address.zipCode}
                      onChange={(e) => handleInputChange("address.zipCode", e.target.value)}
                      placeholder="XXXXXX"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:scale-105"
                    />
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 bg-slate-50 dark:bg-slate-700 rounded-md transition-all duration-200"
                    >
                      <span>{formData.address.zipCode}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}