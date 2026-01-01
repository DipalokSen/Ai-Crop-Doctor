// Mock prediction system for v0 preview
// Replace this with actual TensorFlow.js implementation after converting your model

export const CLASS_NAMES = [
  "Apple___Apple_scab",
  "Apple___Black_rot",
  "Apple___Cedar_apple_rust",
  "Apple___healthy",
  "Cherry_(including_sour)___Powdery_mildew",
  "Cherry_(including_sour)___healthy",
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
  "Corn_(maize)__Common_rust",
  "Corn_(maize)___Northern_Leaf_Blight",
  "Corn_(maize)___healthy",
  "Grape___Black_rot",
  "Grape___Esca_(Black_Measles)",
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
  "Grape___healthy",
  "Orange___Haunglongbing_(Citrus_greening)",
  "Peach___Bacterial_spot",
  "Peach___healthy",
  "Pepper,_bell___Bacterial_spot",
  "Pepper,_bell___healthy",
  "Potato___Early_blight",
  "Potato___Late_blight",
  "Potato___healthy",
  "Strawberry___Leaf_scorch",
  "Strawberry___healthy",
  "Tomato___Bacterial_spot",
  "Tomato___Early_blight",
  "Tomato___Late_blight",
  "Tomato___Leaf_Mold",
  "Tomato___Septoria_leaf_spot",
  "Tomato___Spider_mites Two-spotted_spider_mite",
  "Tomato___Target_Spot",
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
  "Tomato___Tomato_mosaic_virus",
  "Tomato___healthy",
]

/**
 * Mock prediction function for testing in v0 environment
 * This returns random predictions to test the UI flow
 */
export async function predict(imageBuffer: Buffer): Promise<{ className: string; confidence: number }> {
  console.log("[v0] Running mock prediction, image size:", imageBuffer.length, "bytes")

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return a random disease for testing
  const randomIndex = Math.floor(Math.random() * CLASS_NAMES.length)
  const confidence = 0.75 + Math.random() * 0.2 // Random confidence between 0.75-0.95

  const result = {
    className: CLASS_NAMES[randomIndex],
    confidence: Math.round(confidence * 100) / 100,
  }

  console.log("[v0] Mock prediction result:", result)

  return result
}
