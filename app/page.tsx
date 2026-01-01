"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Loader2, Leaf, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PlantDiseaseDetector() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    disease_bn: string
    confidence: number
    solutions_bn: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন")
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      setResult(null)
      setError(null)
    }
  }

  const handleDetect = async () => {
    if (!imageFile) {
      setError("অনুগ্রহ করে একটি ছবি নির্বাচন করুন")
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", imageFile)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("সার্ভার থেকে প্রতিক্রিয়া পেতে ব্যর্থ")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("রোগ সনাক্তকরণে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-10 h-10 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-green-900">উদ্ভিদ রোগ সনাক্তকরণ</h1>
          </div>
          <p className="text-lg text-green-700">আপনার ফসলের পাতার ছবি আপলোড করুন এবং রোগ সনাক্ত করুন</p>
        </div>

        {/* Upload Section */}
        <Card className="p-6 md:p-8 mb-6 bg-white/80 backdrop-blur-sm border-green-200 shadow-lg">
          <div className="space-y-6">
            {/* Image Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-all duration-200"
            >
              {selectedImage ? (
                <div className="space-y-4">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected plant"
                    className="max-h-64 mx-auto rounded-lg shadow-md"
                  />
                  <p className="text-green-700 font-medium">ছবি নির্বাচিত। অন্য ছবি নির্বাচন করতে ক্লিক করুন।</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 mx-auto text-green-400" />
                  <div>
                    <p className="text-xl font-semibold text-green-900 mb-2">পাতার ছবি আপলোড করুন</p>
                    <p className="text-green-600">ছবি নির্বাচন করতে এখানে ক্লিক করুন</p>
                  </div>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />

            {/* Detect Button */}
            <Button
              onClick={handleDetect}
              disabled={!selectedImage || loading}
              className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white disabled:bg-green-300"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  বিশ্লেষণ করা হচ্ছে...
                </>
              ) : (
                "রোগ সনাক্ত করুন"
              )}
            </Button>
          </div>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        {result && (
          <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-green-200 shadow-lg">
            <div className="space-y-6">
              {/* Disease Name */}
              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <h2 className="text-sm font-medium text-green-600 mb-2">রোগের নাম</h2>
                <p className="text-2xl font-bold text-green-900">{result.disease_bn}</p>
              </div>

              {/* Confidence */}
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <h2 className="text-sm font-medium text-blue-600 mb-2">নিশ্চিততা</h2>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-blue-900">{(result.confidence * 100).toFixed(1)}%</p>
                </div>
              </div>

              {/* Solutions */}
              <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-500">
                <h2 className="text-sm font-medium text-amber-600 mb-3">চিকিৎসা ও প্রতিরোধ</h2>
                <div className="text-amber-900 whitespace-pre-line leading-relaxed">{result.solutions_bn}</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
