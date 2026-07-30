<div align="center">

# 🩺 SymptoAI — Clinical AI Triage & Medical Decision Support System

**Production-grade, edge-accelerated medical symptom checker, emergency severity classifier, and interactive patient triage platform.**

[![Next.js 14](https://img.shields.io/badge/Next.js-14.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel Edge](https://img.shields.io/badge/Deployment-Vercel_Edge-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=for-the-badge)](LICENSE)

</div>

---

## ⚡ Overview

**SymptoAI** bridges the gap between patient uncertainty and clinical care by providing sub-second, structured symptom assessment and triage guidance. Built on Next.js 14 Edge Runtime and powered by high-throughput LLM inference, SymptoAI converts unstructured patient complaints (via text or voice) into actionable clinical insights—complete with differential condition alignment, specialist recommendations, red-flag warnings, and instant emergency alerts.

> **Disclaimer:** SymptoAI is an AI decision-support prototype built for educational and clinical triage demonstration purposes. It does not replace professional medical diagnosis, advice, or emergency treatment.

---

## ✨ Key Features

* **⚡ Sub-Second Edge Triage:** Ultra-fast inference powered by Edge API routes and low-latency LLM backends (Groq Llama-3.3-70b / Google Gemini 1.5 Flash).
* **🚨 Critical Red-Flag Safety Overrides:** Automatic safety intercepts for life-threatening emergency symptoms (chest pain, stroke signs, severe respiratory distress) with instant 911 quick-action banners.
* **🎙️ Speech-to-Text Voice Intake:** Integrated Web Speech API (`webkitSpeechRecognition`) for hands-free natural language symptom input.
* **🏥 Differential Condition Mapping:** Probabilistic matching of reported symptoms against clinical conditions with specialist referral guidance.
* **🎨 Calm Healthcare UX:** Purpose-built medical design system using Tailwind CSS, soft teal accents, and scannable visual hierarchy.
* **💬 Conversational Follow-Up Assistant:** Context-aware patient Q&A chat for post-triage home care, symptom monitoring, and doctor preparation.

---

## 📐 System Architecture

┌────────────────────────────────┐
                           │     Patient Intake Interface    │
                           │  (Text / Voice / Quick Select) │
                           └───────────────┬────────────────┘
                                           │
                                           ▼
                           ┌────────────────────────────────┐
                           │   Next.js 14 Edge API Route    │
                           │    (/api/analyze - Sub-100ms)   │
                           └───────────────┬────────────────┘
                                           │
                                           ▼
                           ┌────────────────────────────────┐
                           │    Clinical Prompt Engine &    │
                           │     Emergency Triage Rules     │
                           └───────────────┬────────────────┘
                                           │
                                           ▼
                           ┌────────────────────────────────┐
                           │ High-Throughput LLM Inference  │
                           │  (Groq Llama 3.3 / Gemini 1.5)  │
                           └───────────────┬────────────────┘
                                           │
                                           ▼
                           ┌────────────────────────────────┐
                           │   Structured Medical Response  │
                           │   (Severity, Differentials,    │
                           │   Specialists, Red Flags)      │
                           └────────────────────────────────┘



## 🛠️ Tech Stack

| Domain | Technology |

| **Framework** | Next.js 14 (App Router, React 18, Server Components) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS + Lucide Icons + Custom Medical Color Palette |
| **AI Inference** | Groq API (`llama-3.3-70b-versatile`) / Google Gemini REST API |
| **Voice Processing** | Web Speech API (`webkitSpeechRecognition`) |
| **Deployment** | Vercel Edge Network |

---

## 🚀 Quickstart & Local Setup

### Prerequisites

* Node.js 18.x or higher
* npm / pnpm / yarn
* Groq API Key or Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Prakhar00001/SymptoAI.git](https://github.com/Prakhar00001/SymptoAI.git)
   cd SymptoAI

1) Install dependencies:

npm install


2) Configure Environment Variables:

Create a .env.local file in the root directory:

GROQ_API_KEY=your_groq_api_key_here


3) Launch Development Server:

npm run dev

Open http://localhost:3000 in Google Chrome or MS Edge.


🧪 Demo Scenarios to Try

1) Standard Assessment (Migraine with Aura):

Click the "Migraine with Aura" preset button.

Click Run Medical Assessment. Observe differential condition mapping and primary care/neurologist recommendations.



2) Emergency Red-Flag Intercept:

Click the "Chest Pain (ER Emergency)" preset button.

Run the assessment to trigger the high-priority EmergencyAlert banner with 911 quick-dial capabilities.



🛡️ Safety & Ethics
SymptoAI incorporates multi-layered safety guardrails:

JSON Schema Enforcement: Ensures deterministic structured output without arbitrary text formatting.

Emergency Override Priority: Immediate escalation for red-flag clinical criteria over secondary symptoms.

Ubiquitous Medical Disclaimers: Explicit disclaimers on every triage output directing users to certified medical professionals.