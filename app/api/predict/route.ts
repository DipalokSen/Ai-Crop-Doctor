import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { predict } from "@/lib/model"

// Initialize Gemini API
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null

const BENGALI_TRANSLATIONS: Record<string, string> = {
  Apple___Apple_scab: "আপেল স্ক্যাব",
  Apple___Black_rot: "আপেল কালো পচন",
  Apple___Cedar_apple_rust: "আপেল মরিচা রোগ",
  Apple___healthy: "সুস্থ আপেল",
  "Cherry_(including_sour)___Powdery_mildew": "চেরি পাউডারি মিলডিউ",
  "Cherry_(including_sour)___healthy": "সুস্থ চেরি",
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "ভুট্টা ধূসর পাতার দাগ",
  "Corn_(maize)__Common_rust": "ভুট্টা সাধারণ মরিচা",
  "Corn_(maize)___Northern_Leaf_Blight": "ভুট্টা উত্তর পাতা ঝলসানো",
  "Corn_(maize)___healthy": "সুস্থ ভুট্টা",
  Grape___Black_rot: "আঙ্গুর কালো পচন",
  "Grape___Esca_(Black_Measles)": "আঙ্গুর এস্কা রোগ",
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "আঙ্গুর পাতা ঝলসানো",
  Grape___healthy: "সুস্থ আঙ্গুর",
  "Orange___Haunglongbing_(Citrus_greening)": "কমলা সিট্রাস গ্রিনিং",
  Peach___Bacterial_spot: "পীচ ব্যাকটেরিয়াল দাগ",
  Peach___healthy: "সুস্থ পীচ",
  "Pepper,_bell___Bacterial_spot": "মরিচ ব্যাকটেরিয়াল দাগ",
  "Pepper,_bell___healthy": "সুস্থ মরিচ",
  Potato___Early_blight: "আলু আগাম ঝলসানো",
  Potato___Late_blight: "আলু নাবী ঝলসানো",
  Potato___healthy: "সুস্থ আলু",
  Strawberry___Leaf_scorch: "স্ট্রবেরি পাতা ঝলসানো",
  Strawberry___healthy: "সুস্থ স্ট্রবেরি",
  Tomato___Bacterial_spot: "টমেটো ব্যাকটেরিয়াল দাগ",
  Tomato___Early_blight: "টমেটো আগাম ঝলসানো",
  Tomato___Late_blight: "টমেটো নাবী ঝলসানো",
  Tomato___Leaf_Mold: "টমেটো পাতা ছাতা",
  Tomato___Septoria_leaf_spot: "টমেটো সেপ্টোরিয়া পাতার দাগ",
  "Tomato___Spider_mites Two-spotted_spider_mite": "টমেটো মাকড়সা মাইট",
  Tomato___Target_Spot: "টমেটো টার্গেট স্পট",
  Tomato___Tomato_Yellow_Leaf_Curl_Virus: "টমেটো হলুদ পাতা কুঁকড়ে যাওয়া ভাইরাস",
  Tomato___Tomato_mosaic_virus: "টমেটো মোজাইক ভাইরাস",
  Tomato___healthy: "সুস্থ টমেটো",
}

async function getGeminiSolutions(diseaseName: string): Promise<string> {
  if (!genAI) {
    console.log("[v0] GEMINI_API_KEY not set, using fallback solutions")
    return `এটি ${BENGALI_TRANSLATIONS[diseaseName] || diseaseName} রোগ। 
        
চিকিৎসা:
• রোগাক্রান্ত পাতা ও ডালপালা অপসারণ করুন
• জৈব ছত্রাকনাশক প্রয়োগ করুন
• সঠিক সেচ ব্যবস্থা নিশ্চিত করুন

প্রতিরোধ:
• রোগ প্রতিরোধী জাত ব্যবহার করুন
• উদ্ভিদের মধ্যে পর্যাপ্ত দূরত্ব রাখুন
• নিয়মিত পরিদর্শন করুন

দ্রষ্টব্য: বিস্তারিত পরামর্শের জন্য স্থানীয় কৃষি বিশেষজ্ঞের সাথে যোগাযোগ করুন।`
  }

  try {
    console.log("[v0] Calling Gemini API for disease:", diseaseName)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `You are an agricultural expert helping farmers in Bangladesh. 
        
The plant disease detected is: ${diseaseName}

Provide a comprehensive response in Bengali (Bangla) language that includes:
1. A brief explanation of this disease
2. Practical treatment methods that farmers can apply
3. Prevention measures to avoid future occurrences
4. Any organic or eco-friendly solutions if available

Keep the language simple and easy to understand for farmers. Use bullet points for clarity.
Write ONLY in Bengali script.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log("[v0] Gemini API response received, length:", text.length)
    return text
  } catch (error) {
    console.error("[v0] Error calling Gemini API:", error)
    return `জেমিনি API এ সমস্যা হয়েছে। 
        
${BENGALI_TRANSLATIONS[diseaseName] || diseaseName} রোগের জন্য সাধারণ পরামর্শ:
• রোগাক্রান্ত অংশ অপসারণ করুন
• জৈব বালাইনাশক ব্যবহার করুন
• পরিচ্ছন্নতা বজায় রাখুন
• স্থানীয় কৃষি বিশেষজ্ঞের পরামর্শ নিন`
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] === New prediction request received ===")

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.log("[v0] Error: No file provided")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!file.type.startsWith("image/")) {
      console.log("[v0] Error: File is not an image, type:", file.type)
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    console.log("[v0] Processing image:", file.name, "Size:", file.size, "bytes")

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    console.log("[v0] Image converted to buffer, size:", buffer.length, "bytes")

    const prediction = await predict(buffer)
    console.log("[v0] Prediction complete:", prediction.className, "Confidence:", prediction.confidence)

    // Translate to Bengali
    const diseaseBengali = BENGALI_TRANSLATIONS[prediction.className] || prediction.className
    console.log("[v0] Bengali translation:", diseaseBengali)

    const solutions = await getGeminiSolutions(prediction.className)
    console.log("[v0] Solutions retrieved, length:", solutions.length)

    const response = {
      disease_bn: diseaseBengali,
      confidence: prediction.confidence,
      solutions_bn: solutions,
      disease_en: prediction.className,
    }

    console.log("[v0] === Sending successful response ===")
    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] === ERROR in prediction route ===")
    console.error("[v0] Error details:", error)
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Prediction failed. Please try again.",
      },
      { status: 500 },
    )
  }
}
