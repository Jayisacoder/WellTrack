# WellTrack

**AI-Powered Mental Wellness Tracking**

WellTrack is a comprehensive mental health tracking application that helps users monitor their emotional well-being and receive personalized, AI-driven insights. Built as a requirements-driven MVP for the Learning Portfolio assessment.

---

## 📋 Project Overview

WellTrack transforms how individuals approach mental wellness by combining simple daily tracking with powerful AI analysis. Users log their mood, stress, sleep, and activities, and receive personalized recommendations based on patterns discovered in their data.

---

## 🎯 Problem Summary

Mental health has become a critical concern in modern society, yet individuals face significant barriers to effective self-monitoring:

- **Lack of Consistency** – People fail to track regularly, missing important patterns
- **Data Without Insight** – Traditional journals collect data but offer no analysis
- **Invisible Patterns** – Without tools, correlations between lifestyle and mood go unnoticed
- **Barrier to Professional Help** – Many lack access to professionals who could interpret their patterns
- **Overwhelming Complexity** – Existing solutions require too much time or technical knowledge

WellTrack addresses these challenges through a streamlined interface and AI-powered analysis.

---

## ✨ Features

### Core Features
- **Daily Wellness Tracking** – Log mood, stress, sleep, exercise, and notes in under 2 minutes
- **Secure Authentication** – Role-based access with bcrypt password hashing
- **Personal Dashboard** – View your wellness history and trends
- **Responsive Design** – Works seamlessly on desktop and mobile

### 🤖 AI Integration
WellTrack's AI is the core differentiator. It:

- **Analyzes Patterns** – Examines correlations between activities, sleep, stress, and mood
- **Calculates Insights** – Compares metrics across different conditions (exercise vs no exercise, good sleep vs poor sleep)
- **Generates Personalized Recommendations** – Provides specific, actionable advice based on YOUR data
- **Learns Over Time** – Uses up to 30 days of history for increasingly accurate insights

**Example AI Output:**
> "Your mood averages 7.8 on days when you exercise and get 7+ hours of sleep, compared to 5.2 on days without. Consider prioritizing morning workouts and a consistent bedtime routine."

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **JavaScript** | Programming language (not TypeScript) |
| **Prisma** | Database ORM |
| **PostgreSQL** | Database (Neon) |
| **Tailwind CSS** | Styling |
| **bcryptjs** | Password hashing |
| **NextAuth** | Authentication |
| **OpenAI API** | AI-powered insights |

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon account)
- OpenAI API key (or Gemini API key)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jayisacoder/WellTrack.git
   cd welltrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your:
   - Database connection string
   - NextAuth secret
   - AI API key
   - LP Staff emails

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 📄 Page Structure

| Page | Route | Access | Purpose |
|------|-------|--------|---------|
| Home | `/` | Public | Introduction & navigation |
| About | `/about` | Public | CCC.1.1 – Problem explanation |
| Why WellTrack? | `/why-welltrack` | Public | CCC.1.2 – Solution planning |
| Features | `/features` | Public | CCC.1.3 – Features & AI justification |
| Product | `/product` | Authenticated | Interactive MVP (input + AI output) |
| Rubric Evidence | `/rubric-evidence` | LP Staff Only | Assessment criteria documentation |
| Reflection | `/reflection` | LP Staff Only | Developer insights & learnings |

---

## 💭 Reflection

### Development Approach
This project was built with a **requirements-driven methodology**, prioritizing exact alignment with the rubric over feature expansion. Every page exists to satisfy a specific assessment criterion.

### Key Learnings
- **Middleware-based auth** – Learned to protect routes at the edge with NextAuth JWT validation
- **AI prompt engineering** – Crafted prompts that produce actionable, data-driven insights
- **Prisma with PostgreSQL** – Implemented relational data modeling for users and wellness entries
- **Disciplined scope** – Resisted feature creep to deliver exactly what was required

### Challenges Overcome
1. **Role-based access control** – Implementing LP Staff-only pages required understanding Next.js middleware patterns
2. **AI integration** – Structuring user data into meaningful prompts that produce useful output
3. **Data correlations** – Calculating relationships between wellness metrics for AI context

### What I Would Do Differently
- Add data visualization (charts/graphs) for wellness trends
- Implement weekly/monthly summary emails
- Add export functionality for sharing with healthcare providers

---

## 📝 License

This project was created for educational purposes as part of the Learning Portfolio assessment.

---

Built with ❤️ using Next.js and AI
