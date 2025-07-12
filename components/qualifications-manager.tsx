"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { GraduationCap, Plus, Edit3, Trash2, Save, X, DollarSign, Users, User } from "lucide-react"

interface Qualification {
  subject: string
  rate: number
}

interface QualificationsData {
  private: Qualification[]
  group: Qualification[]
}

interface QualificationsManagerProps {
  qualifications: QualificationsData
}

export function QualificationsManager({ qualifications: initialQualifications }: QualificationsManagerProps) {
  const [qualifications, setQualifications] = useState(initialQualifications)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newQualification, setNewQualification] = useState({
    subject: "",
    rate: 0,
    type: "private" as "private" | "group",
  })
  const [isAddingNew, setIsAddingNew] = useState(false)
  const { toast } = useToast()

  const handleEdit = (type: "private" | "group", index: number) => {
    setEditingId(`${type}-${index}`)
  }

  const handleSave = (type: "private" | "group", index: number, updatedQual: Qualification) => {
    setQualifications((prev) => ({
      ...prev,
      [type]: prev[type].map((qual, i) => (i === index ? updatedQual : qual)),
    }))
    setEditingId(null)
    toast({
      title: "Qualification Updated",
      description: "Your qualification has been successfully updated.",
    })
  }

  const handleDelete = (type: "private" | "group", index: number) => {
    setQualifications((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
    toast({
      title: "Qualification Deleted",
      description: "The qualification has been removed.",
    })
  }

  const handleAddNew = () => {
    if (!newQualification.subject || newQualification.rate <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid subject and rate.",
        variant: "destructive",
      })
      return
    }

    setQualifications((prev) => ({
      ...prev,
      [newQualification.type]: [
        ...prev[newQualification.type],
        {
          subject: newQualification.subject,
          rate: newQualification.rate,
        },
      ],
    }))

    setNewQualification({ subject: "", rate: 0, type: "private" })
    setIsAddingNew(false)

    toast({
      title: "Qualification Added",
      description: "New qualification has been added successfully.",
    })
  }

  const QualificationCard = ({
    qualification,
    type,
    index,
  }: {
    qualification: Qualification
    type: "private" | "group"
    index: number
  }) => {
    const isEditing = editingId === `${type}-${index}`
    const [editData, setEditData] = useState(qualification)

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -2 }}
        className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:shadow-md transition-all duration-300"
      >
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor={`subject-${type}-${index}`} className="text-sm font-medium">
                Subject
              </Label>
              <Input
                id={`subject-${type}-${index}`}
                value={editData.subject}
                onChange={(e) => setEditData((prev) => ({ ...prev, subject: e.target.value }))}
                className="mt-1 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <Label htmlFor={`rate-${type}-${index}`} className="text-sm font-medium">
                Rate (₹/hour)
              </Label>
              <Input
                id={`rate-${type}-${index}`}
                type="number"
                value={editData.rate}
                onChange={(e) => setEditData((prev) => ({ ...prev, rate: Number(e.target.value) }))}
                className="mt-1 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleSave(type, index, editData)}
                className="bg-green-500 hover:bg-green-600 transition-all duration-300"
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="transition-all duration-300">
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">{qualification.subject}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                <DollarSign className="h-3 w-3" />₹{qualification.rate}/hour
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(type, index)} className="hover:bg-blue-50 transition-all duration-300">
                <Edit3 className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(type, index)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Qualifications & Rates</h2>
        <Button onClick={() => setIsAddingNew(true)} className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
          <Plus className="h-4 w-4 mr-2" />
          Add Qualification
        </Button>
      </motion.div>

      {/* Add New Qualification Modal */}
      <AnimatePresence>
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={() => setIsAddingNew(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-2xl"
            >
              <h3 className="text-lg font-semibold mb-4">Add New Qualification</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-subject" className="text-sm font-medium">
                    Subject
                  </Label>
                  <Input
                    id="new-subject"
                    value={newQualification.subject}
                    onChange={(e) => setNewQualification((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="e.g., Mathematics, Physics"
                    className="mt-1 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label htmlFor="new-rate" className="text-sm font-medium">
                    Rate (₹/hour)
                  </Label>
                  <Input
                    id="new-rate"
                    type="number"
                    value={newQualification.rate || ""}
                    onChange={(e) => setNewQualification((prev) => ({ ...prev, rate: Number(e.target.value) }))}
                    placeholder="₹0"
                    className="mt-1 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Lesson Type</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant={newQualification.type === "private" ? "default" : "outline"}
                      onClick={() => setNewQualification((prev) => ({ ...prev, type: "private" }))}
                      className="flex-1 transition-all duration-300"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Private
                    </Button>
                    <Button
                      type="button"
                      variant={newQualification.type === "group" ? "default" : "outline"}
                      onClick={() => setNewQualification((prev) => ({ ...prev, type: "group" }))}
                      className="flex-1 transition-all duration-300"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Group
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={handleAddNew} className="flex-1 bg-green-500 hover:bg-green-600 transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Qualification
                </Button>
                <Button variant="outline" onClick={() => setIsAddingNew(false)} className="flex-1 transition-all duration-300">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Private Lessons */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Private Lessons
                <Badge variant="secondary" className="ml-auto">
                  {qualifications.private.length} subjects
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <AnimatePresence>
                {qualifications.private.map((qualification, index) => (
                  <QualificationCard
                    key={`private-${index}`}
                    qualification={qualification}
                    type="private"
                    index={index}
                  />
                ))}
              </AnimatePresence>
              {qualifications.private.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-slate-500 dark:text-slate-400"
                >
                  <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No private lesson qualifications added yet</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Group Lessons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                Group Lessons
                <Badge variant="secondary" className="ml-auto">
                  {qualifications.group.length} subjects
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <AnimatePresence>
                {qualifications.group.map((qualification, index) => (
                  <QualificationCard key={`group-${index}`} qualification={qualification} type="group" index={index} />
                ))}
              </AnimatePresence>
              {qualifications.group.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-slate-500 dark:text-slate-400"
                >
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No group lesson qualifications added yet</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Summary Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-500" />
              Rate Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ₹
                  {qualifications.private.length > 0
                    ? Math.round(
                        qualifications.private.reduce((sum, q) => sum + q.rate, 0) / qualifications.private.length,
                      )
                    : 0}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Avg Private Rate</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₹
                  {qualifications.group.length > 0
                    ? Math.round(qualifications.group.reduce((sum, q) => sum + q.rate, 0) / qualifications.group.length)
                    : 0}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Avg Group Rate</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ₹
                  {Math.max(...qualifications.private.map((q) => q.rate), ...qualifications.group.map((q) => q.rate)) ||
                    0}
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400">Highest Rate</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 transition-all duration-300"
              >
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {qualifications.private.length + qualifications.group.length}
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Total Subjects</div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}