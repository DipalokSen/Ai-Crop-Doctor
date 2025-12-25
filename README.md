# 🌱 AI-Powered Plant Disease Detection & Recommendation System

An end-to-end AI-driven web application that detects plant diseases from leaf images using a **Convolutional Neural Network (CNN)** and provides **Bengali (Bangla)** treatment and prevention recommendations through **Google Gemini API**.

This system is designed to assist local farmers in Bangladesh by enabling early disease detection and actionable guidance to reduce crop loss.

---

## 📌 Table of Contents
- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Solution Approach](#solution-approach)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Demo](#project-demo)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Usage Instructions](#usage-instructions)
- [Dataset & Model Details](#dataset--model-details)
- [API Endpoints](#api-endpoints)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)
- [Developer Notes](#developer-notes)
- [License](#license)
- [Author](#author)

---

## 📖 Project Overview

Agricultural productivity in Bangladesh is heavily affected by plant diseases, often due to late detection and lack of expert guidance. This project leverages **Artificial Intelligence** to automatically detect plant diseases from leaf images and generate **localized, farmer-friendly recommendations in Bengali**.

The system combines:
- A **trained CNN model** for disease classification
- A **FastAPI backend** for inference
- A **React frontend** for usability
- **Gemini AI** for intelligent recommendations

---

## ❗ Problem Statement

- Farmers struggle to identify plant diseases accurately
- Expert agricultural consultation is not always accessible
- Language barriers reduce the effectiveness of existing tools
- Late detection leads to significant crop loss

---

## 💡 Solution Approach

1. User uploads a plant leaf image
2. Image is preprocessed and passed to a trained CNN model
3. The system predicts the disease and confidence score
4. Gemini API generates treatment and prevention guidance
5. All outputs are displayed in **Bengali (Bangla)**

---

## 🚀 Key Features

- 🌿 CNN-based plant disease detection
- 📊 Prediction confidence score
- 🧠 AI-generated treatment & prevention advice
- 🇧🇩 Bengali language output for accessibility
- 🌐 Web-based, easy-to-use interface
- 🔄 Modular backend (easy model replacement)

---

## 🏗 System Architecture


---

## 🛠 Technology Stack

### Frontend
- React
- HTML5, CSS3
- Bootstrap 5

### Backend
- Python 3.x
- FastAPI
- Uvicorn

### AI / Machine Learning
- TensorFlow / PyTorch
- Convolutional Neural Network (CNN)

### External API
- Google Gemini API

---

## 🎥 Project Demo

📺 **YouTube Demo Link:**  
👉 https://www.youtube.com/watch?v=YOUR_VIDEO_ID

---
## ⚙ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/plant-disease-detection.git
cd plant-disease-detection
