# AI-Powered Plant Disease Detection Web Application

A full-stack Next.js web application for detecting plant diseases using your trained CNN model and providing treatment solutions in Bengali using Gemini API.

## Features

- Image Upload: Simple drag-and-drop or click to upload plant leaf images
- Your Trained CNN Model: Uses your pre-trained model for accurate disease detection (34 disease classes)
- Bengali Language Support: All results displayed in Bengali (Bangla)
- AI-Powered Solutions: Gemini API provides treatment and prevention advice in Bengali
- Farmer-Friendly UI: Clean, accessible interface designed for farmers

## Tech Stack

- Frontend: Next.js 16 (React), TailwindCSS
- Backend: Next.js API Routes
- AI Model: Your trained CNN model (TensorFlow.js)
- Generative AI: Google Gemini API (for remedies only)

## Prerequisites

- Node.js 18+ and npm/yarn
- Gemini API Key (Get it from Google AI Studio)
- Your trained CNN model converted to TensorFlow.js format

## Installation & Setup

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Testing the Application (Mock Mode)

The app currently runs in **mock mode** for testing purposes. This allows you to:
- Test the complete UI flow
- See how disease detection results are displayed
- Verify Gemini API integration for treatment recommendations
- Ensure the interface works well for farmers

To test in mock mode, simply run the app - it will return sample predictions.

### 3. Convert Your Keras Model to TensorFlow.js (For Production)

When you're ready to use your real trained model:

\`\`\`bash
# Install tensorflowjs converter
pip install tensorflowjs

# Convert your model
tensorflowjs_converter \
    --input_format=keras \
    path/to/your/model.h5 \
    public/models
\`\`\`

This will create `model.json` and weight files in `public/models/`.

### 4. Configure Environment Variables

The app uses environment variables that are already configured in your v0 workspace:

- `GEMINI_API_KEY`: Already set in your workspace (for treatment recommendations)
- `MODEL_PATH`: Optional - set this when you have converted your model to TensorFlow.js format

**Current Mode**: Without `MODEL_PATH` set, the app runs in mock mode for testing.

If running locally, create a `.env.local` file:

\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
# MODEL_PATH=/models/model.json  # Uncomment when model is ready
\`\`\`

### 5. Verify Model Preprocessing

The preprocessing in `lib/model.ts` matches your training setup:
- Resize to 224x224
- Normalize to [0, 1] range (rescale=1./255)

If your model uses different preprocessing, update the `preprocessImage` function in `lib/model.ts`.

### 6. Run the Application

\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

**Note**: Currently runs in mock mode. Set `MODEL_PATH` to enable your trained model.

## Usage

1. Open the application in your browser
2. Click or drag to upload a plant leaf image
3. Click "রোগ সনাক্ত করুন" (Detect Disease) button
4. View results:
   - Disease name in Bengali (from your model's prediction)
   - Prediction confidence from your trained model
   - Treatment and prevention solutions in Bengali (from Gemini API)

## Supported Disease Classes (34 Total)

Your model detects the following diseases:

**Apple:** Scab, Black rot, Cedar apple rust, Healthy
**Cherry:** Powdery mildew, Healthy
**Corn:** Cercospora leaf spot, Common rust, Northern Leaf Blight, Healthy
**Grape:** Black rot, Esca, Leaf blight, Healthy
**Orange:** Citrus greening
**Peach:** Bacterial spot, Healthy
**Pepper:** Bacterial spot, Healthy
**Potato:** Early blight, Late blight, Healthy
**Strawberry:** Leaf scorch, Healthy
**Tomato:** Bacterial spot, Early blight, Late blight, Leaf Mold, Septoria leaf spot, Spider mites, Target Spot, Yellow Leaf Curl Virus, Mosaic virus, Healthy

## Architecture

\`\`\`
User uploads image → Frontend (Next.js)
                         ↓
                    API Route (/api/predict)
                         ↓
                ┌────────┴────────┐
                ↓                 ↓
    Your CNN Model          Gemini API
    (TensorFlow.js)         (Remedies)
    (Prediction)
                ↓                 ↓
                └────────┬────────┘
                         ↓
              Results in Bengali
\`\`\`

## How It Works

1. **Image Upload**: User uploads plant leaf image via the UI
2. **Preprocessing**: Image is resized to 224x224 and normalized (0-1 range)
3. **Disease Detection**: 
   - **Mock Mode** (current): Returns sample prediction for testing
   - **Production Mode**: Your trained CNN model predicts the disease
4. **Translation**: English class name is translated to Bengali
5. **Treatment Generation**: Gemini API generates treatment advice in Bengali
6. **Display Results**: All information is shown in a farmer-friendly format

## Customization

### Update Preprocessing

If your model uses different preprocessing, update `lib/model.ts`:

\`\`\`typescript
// For different image size
const resized = tf.image.resizeBilinear(imageTensor, [256, 256])

// For different normalization (e.g., standardization)
const mean = [0.485, 0.456, 0.406]
const std = [0.229, 0.224, 0.225]
// Apply standardization...
\`\`\`

### Update Bengali Translations

To modify disease name translations, update the `BENGALI_TRANSLATIONS` object in `app/api/predict/route.ts`.

### Customize Gemini Prompts

To change how treatment advice is generated, modify the prompt in the `getGeminiSolutions` function in `app/api/predict/route.ts`.

## Troubleshooting

### Running in Mock Mode
- The app currently uses mock predictions for testing
- You can test the full UI flow and Gemini API integration
- To enable your real model, convert it to TensorFlow.js and set `MODEL_PATH`

### Model not loading
- If `MODEL_PATH` is not set, app runs in mock mode (this is expected)
- Verify your model is in `public/models/` directory
- Check that `model.json` and weight files exist
- Ensure `MODEL_PATH` environment variable is set correctly

### Gemini API errors
- Verify `GEMINI_API_KEY` is set in the Vars section of the v0 sidebar
- Check API quota limits
- Fallback responses will be used if API fails

## Deployment

Deploy directly from v0 by clicking the "Publish" button, which will deploy to Vercel with all environment variables configured.

Or deploy manually:

\`\`\`bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
\`\`\`

Make sure to set environment variables in your Vercel project settings.

## Notes

- **Current Status**: App runs in mock mode for testing the complete workflow
- **Production Ready**: Convert your model to TensorFlow.js and set MODEL_PATH
- Your trained CNN model will be used for ALL disease predictions
- Gemini API is ONLY used for generating treatment remedies in Bengali
- Model runs on the server using TensorFlow.js Node backend
- Images are not stored or logged
- Preprocessing must exactly match your training setup

## Support

- Next.js docs: https://nextjs.org/docs
- TensorFlow.js docs: https://www.tensorflow.org/js
- Gemini API docs: https://ai.google.dev/docs
