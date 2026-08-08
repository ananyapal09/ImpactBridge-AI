# 🌉 ImpactBridge AI

> AI-powered crowdfunding platform built to improve trust, transparency, and informed giving.

ImpactBridge AI is a full-stack social-impact platform that connects donors with verified NGOs and fundraising campaigns while providing AI-assisted campaign analysis, explainable safety scoring, campaign recommendations, secure online donations, and digitally verifiable donation certificates.

---

## 🌐 Live Demo

**Frontend:**
https://impact-bridge-ai-kkyu.vercel.app

**Backend API:**
https://impactbridge-backend-vd61.onrender.com

**GitHub Repository:**
https://github.com/ananyapal09/ImpactBridge-AI

---

## 📌 Overview

Traditional crowdfunding platforms can make it difficult for donors to determine:

- Whether an NGO is trustworthy
- Whether a campaign appears legitimate
- How risky a campaign may be
- Where donated funds are intended to be used
- Which campaigns are most relevant to them
- Whether a campaign provides enough information before donating
- How campaign fundraising is progressing

ImpactBridge AI addresses these challenges by adding an **AI-assisted trust and transparency layer** between NGOs and donors.

The platform combines:

- NGO verification
- Campaign management
- Explainable safety/risk scoring
- LLM-powered campaign analysis
- TF-IDF-based recommendations
- Campaign-specific AI assistance
- Razorpay payments
- Donation certificates
- QR-based certificate verification
- Donor, NGO, and Admin dashboards

---

# ✨ Key Features

## 🔐 Authentication & Authorization

ImpactBridge supports multiple user roles with protected access.

- JWT-based authentication
- Donor authentication
- NGO authentication
- Admin authentication
- Role-based authorization
- Protected routes
- Separate dashboards for donors, NGOs, and administrators
- Secure login and registration flow

---

## 🏢 NGO Management & Verification

NGOs can create profiles containing:

- Organization description
- Website
- Phone number
- Address
- Contact information

Administrators can review and verify NGO accounts before they are treated as verified organizations on the platform.

Verified NGO information is also used as one of the signals in the campaign safety-scoring system.

---

## 📢 Campaign Management

NGOs can:

- Create campaigns
- Upload campaign images
- Set fundraising goals
- Define deadlines
- Select campaign categories
- Update campaigns
- Delete campaigns
- Track campaign progress
- View campaign statistics

### Supported Categories

- Education
- Healthcare
- Disaster Relief
- Animal Welfare
- Environment
- Women Empowerment
- Child Welfare
- Other

---

# 🤖 AI & Machine Learning

## 1. 🛡️ Explainable Campaign Safety Scoring

ImpactBridge uses an **explainable rule-based scoring engine** to evaluate campaign trust and safety signals.

The scoring engine evaluates factors such as:

- NGO verification status
- Campaign description quality
- NGO website availability
- NGO address availability
- Campaign funding goal
- Campaign deadline

Instead of returning only a score, the system provides a **factor-level explanation** showing why the score changed.

### Example

```text
Verified NGO              +20
Detailed Description      +10
Official Website          +10
Verified Address          +10
Reasonable Goal            +5
Reasonable Deadline        +5
--------------------------------
Safety Score               100
Risk Level                  Low
```

### Risk Classification

```text
Score >= 70     → Low Risk
Score 40–69     → Medium Risk
Score < 40      → High Risk
```

> The current implementation uses the database field `fraudScore`. Despite the field name, a higher score represents stronger trust/safety and therefore lower perceived campaign risk.

---

## 2. 🧠 LLM-Powered Campaign Analysis

ImpactBridge uses an LLM to generate structured campaign insights.

The AI analyzes:

- Campaign title
- Campaign category
- Campaign description
- Fundraising goal

The generated campaign report can contain:

### AI Summary
A concise explanation of what the campaign is trying to achieve.

### Beneficiaries
Identifies who is expected to benefit from the campaign.

### Urgency
Evaluates how urgent the campaign appears based on the provided campaign information.

### Trust Assessment
Provides an AI-generated assessment of campaign transparency and donor trust.

### AI Suggestions
Provides suggestions that can help improve campaign transparency and credibility.

### Analysis Pipeline

```text
Campaign Details
       ↓
LLM Analysis
       ↓
Campaign Summary
       ↓
Beneficiary Analysis
       ↓
Urgency Assessment
       ↓
Trust Assessment
       ↓
Transparency Suggestions
```

---

## 3. 🎯 TF-IDF Campaign Recommendation Engine

ImpactBridge includes a content-based recommendation engine using:

- TF-IDF vectorization
- Cosine similarity

Campaign information is processed to determine similarity and relevance between campaigns.

The recommendation system considers campaign information together with safety and fundraising signals when ranking campaigns.

### Recommendation Pipeline

```text
Campaign Data
      ↓
Text Processing
      ↓
TF-IDF Vectorization
      ↓
Cosine Similarity
      ↓
Safety Score
      ↓
Funding Progress
      ↓
Recommendation Ranking
      ↓
Recommended Campaigns
```

The system can generate explainable recommendation badges such as:

- 🥇 Best Impact
- 🚀 Fast Progress
- 🚑 Urgent
- 🎯 Almost Complete
- ⚠️ High Risk

Each recommendation can also provide a reason explaining why the campaign was selected.

---

## 4. 💬 Campaign AI Assistant

Each campaign can be connected to an AI assistant that answers donor questions about the campaign.

The assistant can use information such as:

- Campaign description
- Campaign category
- Fundraising goal
- Amount raised
- AI analysis
- Safety/fraud score
- AI-generated summary
- AI suggestions

### AI Assistant Flow

```text
Donor Question
      ↓
Campaign Information
      ↓
AI Assistant
      ↓
Campaign-specific Answer
```

This allows donors to better understand important campaign information before donating.

---

# 💳 Secure Online Donations

ImpactBridge integrates **Razorpay** for online donations.

### Donation Flow

```text
Donor
  ↓
Select Campaign
  ↓
Enter Donation Amount
  ↓
Create Razorpay Order
  ↓
Razorpay Checkout
  ↓
Payment
  ↓
Payment Verification
  ↓
Donation Recorded
  ↓
Campaign Raised Amount Updated
```

Campaign pages provide information such as:

- Amount raised
- Fundraising goal
- Progress percentage
- Days remaining
- NGO verification status
- Campaign safety information
- Donation option

---

# 📜 Donation Certificates & Verification

After a successful donation, ImpactBridge generates a digitally verifiable donation certificate.

### Certificate Includes

- Donor name
- Campaign name
- NGO name
- Donation amount
- Donation date
- Payment status
- Unique certificate ID
- Verification information
- QR verification code

### Certificate Verification Flow

```text
Successful Donation
        ↓
Certificate ID Generated
        ↓
Certificate PDF Generated
        ↓
QR Code Embedded
        ↓
Donor Downloads Certificate
        ↓
QR Scanned
        ↓
ImpactBridge Verification Page
        ↓
Certificate & Donation Verified
```

This allows third parties to verify whether a donation certificate corresponds to a valid ImpactBridge donation record.

---

# 👥 User Roles

## 👤 Donor

Donors can:

- Browse campaigns
- Search campaigns
- Explore verified NGOs
- View campaign details
- View AI campaign analysis
- Ask campaign-specific AI questions
- Receive campaign recommendations
- Donate through Razorpay
- View their donations
- Access donation certificates
- Verify donation certificates

---

## 🏢 NGO

NGOs can:

- Register and authenticate
- Create an NGO profile
- Create fundraising campaigns
- Upload campaign images
- Set campaign goals
- Set campaign deadlines
- View their campaigns
- Track funds raised
- View campaign statistics
- Update campaigns
- Delete campaigns

---

## 🛡️ Admin

Administrators can:

- Manage users
- Manage campaigns
- Manage donations
- View analytics
- Review and verify NGOs
- Review campaign information
- View campaign details
- Monitor platform activity

---

# 🏗️ System Architecture

```text
                         IMPACTBRIDGE AI
                               │
                               ▼
                    ┌────────────────────┐
                    │   React + Vite     │
                    │     Frontend       │
                    │      Vercel        │
                    └─────────┬──────────┘
                              │
                           REST API
                              │
                              ▼
                    ┌────────────────────┐
                    │  Node.js + Express │
                    │      Backend       │
                    │       Render       │
                    └─────────┬──────────┘
                              │
              ┌───────────────┼────────────────┐
              │               │                │
              ▼               ▼                ▼
       ┌────────────┐  ┌────────────┐  ┌─────────────┐
       │ MongoDB    │  │ Razorpay   │  │ AI Services │
       │ Atlas      │  │ Payments   │  │             │
       └────────────┘  └────────────┘  └─────────────┘
                                             │
                              ┌──────────────┼──────────────┐
                              │              │              │
                              ▼              ▼              ▼
                         LLM Analysis   Safety Scoring   TF-IDF
                                                         Recommendations
```

---

# 🧠 AI Architecture

```text
                    NGO Creates Campaign
                             │
                             ▼
                  ┌────────────────────┐
                  │ Campaign Analysis  │
                  └─────────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
       Safety Scoring   LLM Analysis   TF-IDF Engine
              │             │             │
              ▼             ▼             ▼
        Risk Signals   AI Campaign     Similarity
                       Report          Ranking
              │             │             │
              └─────────────┼─────────────┘
                            ▼
                    Donor Experience
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        Recommendations  AI Assistant  Campaign Insights
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React

## Backend

- Node.js
- Express.js
- JWT Authentication
- REST APIs
- Multer

## Database

- MongoDB
- MongoDB Atlas
- Mongoose

## AI / Machine Learning

- TF-IDF
- Cosine Similarity
- Explainable rule-based safety scoring
- LLM-powered campaign analysis
- OpenRouter
- Gemini API

## Payments

- Razorpay

## Media Storage

- Cloudinary

## Testing

- Jest

## Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

# 📂 Project Structure

```text
ImpactBridge-AI/
│
├── client/
│   ├── public/
│   │   └── images/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── ai/
│   │   │   ├── auth/
│   │   │   ├── campaigns/
│   │   │   ├── dashboard/
│   │   │   ├── hero/
│   │   │   ├── howitworks/
│   │   │   ├── impact/
│   │   │   ├── layout/
│   │   │   ├── ngo/
│   │   │   ├── testimonials/
│   │   │   └── trust/
│   │   │
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── server.js
│   ├── testAI.js
│   ├── testClaude.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🧪 Testing

The project includes Jest tests for the campaign safety/fraud scoring engine.

The test suite covers areas including:

- Verified NGO scoring
- Unverified NGO scoring
- Campaign description quality
- Website availability
- Address availability
- Campaign goal scoring
- Campaign deadline scoring
- Risk classification
- Score boundaries
- Explainable scoring factors

Run the tests with:

```bash
cd server
npm test
```

---

# ⚙️ Local Development Setup

## 1. Clone the repository

```bash
git clone https://github.com/ananyapal09/ImpactBridge-AI.git
cd ImpactBridge-AI
```

## 2. Install frontend dependencies

```bash
cd client
npm install
```

## 3. Install backend dependencies

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

OPENROUTER_API_KEY=your_openrouter_api_key
GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

For the frontend, configure:

```env
VITE_API_URL=http://localhost:3000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> Never commit real API keys, database credentials, payment secrets, or JWT secrets to GitHub. Use `.env.example` files as templates.

---

# ▶️ Running the Application

## Start Backend

```bash
cd server
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

## Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Vite will provide the frontend development URL.

---

# 🔌 API Modules

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Campaigns

```text
GET    /api/campaigns
GET    /api/campaigns/:id
POST   /api/campaigns
PUT    /api/campaigns/:id
DELETE /api/campaigns/:id
```

## NGOs

```text
GET /api/ngos
```

Additional protected NGO endpoints are available for NGO profile and management operations.

## Donations

```text
POST /api/donations/create-order
POST /api/donations/verify
```

## AI

```text
POST /api/ai/chat
POST /api/ai/summary
GET  /api/ai/recommendations
```

Additional protected endpoints are available for user, campaign, donation, and admin operations.

---

# 🔒 Security

ImpactBridge implements:

- JWT-based authentication
- Protected API routes
- Role-based authorization
- NGO ownership checks
- Payment verification
- Environment-based secret management
- Protected campaign modification endpoints
- CORS configuration for local development and production
- No production secrets committed to the repository
- Sensitive credentials excluded from application logs

---

# 🚀 Deployment

The production application is deployed using:

```text
                         GitHub
                        /      \
                       /        \
                      ▼          ▼
                  Vercel       Render
                     │            │
                     │            │
               React + Vite   Node + Express
                                  │
                                  ▼
                            MongoDB Atlas
```

### Production URLs

**Frontend**

https://impact-bridge-ai-kkyu.vercel.app

**Backend**

https://impactbridge-backend-vd61.onrender.com

---

# 📈 Future Improvements

Potential future improvements include:

- Personalized donor profiles
- Donation-history-based recommendations
- Advanced anomaly detection
- Automated NGO document verification
- Campaign update verification
- Real-time impact tracking
- Automated impact reports
- Expanded automated test coverage
- CI/CD improvements
- Production monitoring and observability

---

# 📌 Project Status

## Production Ready 🚀

ImpactBridge AI currently supports:

- ✅ Donor / NGO / Admin authentication
- ✅ NGO management and verification
- ✅ Campaign management
- ✅ Online donations
- ✅ Razorpay payment integration
- ✅ Donation certificates
- ✅ QR-based certificate verification
- ✅ AI campaign analysis
- ✅ Explainable campaign safety scoring
- ✅ TF-IDF campaign recommendations
- ✅ Campaign AI assistant
- ✅ Donor dashboard
- ✅ NGO dashboard
- ✅ Admin dashboard
- ✅ MongoDB persistence
- ✅ Cloud deployment
- ✅ Production frontend-backend integration

---

# 🌉 ImpactBridge AI

### Transparency. Trust. Impact.

An AI-assisted crowdfunding platform designed to help donors make more informed and trustworthy giving decisions.