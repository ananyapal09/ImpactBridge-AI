# 🌉 ImpactBridge AI

> AI-powered crowdfunding platform built to improve trust, transparency, and informed giving.

ImpactBridge AI connects donors with verified NGOs and fundraising campaigns while
providing AI-assisted campaign analysis, explainable safety scoring,
content-based recommendations, secure Razorpay payments, and digitally
verifiable donation certificates.

## 🚀 Live Demo

**Coming soon — deployment in progress**

## ✨ Highlights

- 🔐 JWT authentication with Donor, NGO & Admin roles
- 🏢 NGO verification and management
- 📢 Campaign creation and management
- 🤖 AI-powered campaign analysis
- 🛡️ Explainable campaign safety/risk scoring
- 🎯 TF-IDF + cosine similarity recommendations
- 💬 Campaign-specific AI assistant
- 💳 Razorpay payment integration
- 📊 Donor, NGO & Admin analytics dashboards
- 📜 Downloadable donation certificates
- 🔎 QR-based certificate verification
- ☁️ Cloudinary campaign image uploads

## 🎯 Problem Statement

Traditional crowdfunding and donation platforms often make it difficult for donors to answer important questions:

- Is the NGO trustworthy?
- Is the campaign legitimate?
- How risky is the campaign?
- Where will the donated money be used?
- Which campaign should I support?
- Can I understand the campaign before donating?
- Can I track the campaign's fundraising progress?

ImpactBridge addresses these problems by introducing an **AI-assisted trust and transparency layer** between NGOs and donors.

---

# ✨ Key Features
## 📜 Donation Certificates & Verification

After a successful donation, ImpactBridge generates a digitally
verifiable donation certificate.

### Certificate includes

- Donor name
- Campaign name
- NGO name
- Donation amount
- Donation date
- Payment status
- Unique certificate ID
- ImpactBridge verification stamp
- QR verification code

### Verification Flow

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


ImpactBridge supports multiple user roles with protected access.

- Donor authentication
- NGO authentication
- Admin authentication
- JWT-based authentication
- Role-based authorization
- Protected routes
- Separate dashboards for donors, NGOs, and administrators

---

## 🏢 NGO Management & Verification

NGOs can create profiles containing:

- Organization description
- Website
- Phone number
- Address
- Contact information

Administrators can verify NGO accounts before they are treated as verified organizations on the platform.

Verified NGO information is also used as one of the signals in the campaign trust-scoring system.

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

# 🤖 AI & Machine Learning Features

## 1. Explainable Fraud-Risk Scoring

ImpactBridge uses an **explainable rule-based scoring engine** to evaluate campaign trust and safety signals.

The scoring engine evaluates:

- NGO verification status
- Campaign description quality
- NGO website availability
- NGO address availability
- Campaign funding goal
- Campaign deadline

Instead of returning only a score, the system provides a **factor-level explanation** showing why the score changed.

### Scoring Model

The system starts with a baseline score of `50` and adjusts it based on campaign and NGO signals.

A higher score represents **stronger trust/safety and therefore lower perceived risk**.

Example:

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
fraudScore >= 70     → Low Risk
fraudScore 40–69     → Medium Risk
fraudScore < 40      → High Risk
```

> The current implementation uses the database field `fraudScore`. Despite the field name, a higher score represents stronger trust/safety and therefore lower perceived campaign risk.

---

## 2. LLM-Powered Campaign Analysis

ImpactBridge uses an LLM to generate a structured analysis of fundraising campaigns.

The AI analyzes:

- Campaign title
- Campaign category
- Campaign description
- Fundraising goal

The generated campaign report contains:

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

Example pipeline:

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

## 3. TF-IDF Campaign Recommendation Engine

ImpactBridge includes a content-based recommendation engine using **TF-IDF and cosine similarity**.

Campaign information is used to determine similarity and relevance between campaigns.

The recommendation system considers:

- Campaign title
- Campaign category
- Campaign description
- Campaign safety score
- Fundraising progress

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
Top Recommended Campaigns
```

The system generates campaign recommendations with explainable badges such as:

- 🥇 Best Impact
- 🚀 Fast Progress
- 🚑 Urgent
- 🎯 Almost Complete
- ⚠️ High Risk

Each recommendation also provides a reason explaining why the campaign was selected.

---

## 4. AI Campaign Assistant

Each campaign can be connected to an AI assistant that answers donor questions about the campaign.

The assistant can use information such as:

- Campaign description
- Campaign category
- Fundraising goal
- Amount raised
- AI verification
- Safety/fraud score
- AI-generated summary
- AI suggestions

Example flow:

```text
Donor Question
      ↓
Campaign Information
      ↓
AI Assistant
      ↓
Campaign-specific Answer
```

This allows donors to understand important campaign information before donating.

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

Campaign pages display:

- Amount raised
- Fundraising goal
- Progress percentage
- Days remaining
- Donation button
- NGO verification status
- AI verification information
- Campaign risk information

---

# 👥 User Roles

## 👤 Donor

Donors can:

- Browse campaigns
- Search campaigns
- Explore verified NGOs
- View campaign details
- View AI analysis
- Ask AI questions about campaigns
- Receive AI-powered recommendations
- Donate through Razorpay
- View campaign fundraising progress

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
- Verify NGOs
- Review campaign information
- View campaign details

---

# 🏗️ System Architecture

```text
                         IMPACTBRIDGE AI
                               │
              ┌────────────────┴────────────────┐
              │                                 │
       React Frontend                    Node.js Backend
              │                                 │
       ┌──────┼──────┐                  ┌───────┼────────┐
       │      │      │                  │       │        │
     Pages  Components Services       Routes Controllers Middleware
       │      │      │                  │
       └──────┴──────┘                  │
                                        │
                              ┌─────────┴──────────┐
                              │                    │
                         MongoDB Atlas          AI Layer
                                                   │
                              ┌────────────────────┼──────────────────┐
                              │                    │                  │
                       Fraud Scoring              LLM              TF-IDF
                              │                    │                  │
                       Risk Analysis        Campaign Report     Recommendations
```

---

# 🧠 AI Architecture

```text
                    NGO Creates Campaign
                             │
                             ▼
                   ┌──────────────────┐
                   │ AI Verification  │
                   └────────┬─────────┘
                            │
                            ▼
                ┌──────────────────────┐
                │ Explainable Fraud    │
                │ / Safety Scoring     │
                └──────────┬───────────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ▼                   ▼
        ┌────────────────┐   ┌──────────────────┐
        │ LLM Campaign   │   │ Recommendation   │
        │ Analysis       │   │ Engine           │
        └───────┬────────┘   └────────┬─────────┘
                │                     │
                ▼                     ▼
        AI Campaign Report      TF-IDF + Cosine
                               Similarity Ranking
                │                     │
                └──────────┬──────────┘
                           ▼
                     Donor Dashboard
```

---

# 🛠️ Technology Stack

## Frontend
- React.js
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Axios

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
- Explainable rule-based fraud-risk scoring
- LLM-powered campaign analysis
- OpenRouter integration
- Gemini API

## Payments
- Razorpay

## Testing
- Jest

---

# 🧪 Testing

The core fraud-risk scoring engine is covered using **Jest unit tests**.

The current test suite verifies:

- Verified NGO scoring
- Unverified NGO scoring
- Campaign description quality
- Website availability
- Address availability
- Campaign goal scoring
- Campaign deadline scoring
- Risk classification
- Score boundaries
- Explainable scoring breakdown

### Current Test Result

```text
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
```

Run the tests with:

```bash
cd server
npm test
```

---

# 📁 Project Structure

```text
ImpactBridge-AI/
│
├── client/
│   ├── public/
│   │   └── images/
│   │
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
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
│   └── testClaude.js
│

│

│   ├.
│  
│   ├── database.md
│   ├── features.md
│   └── wireframes.md
│
├── README.md
├── .gitignore
└── .git/
```

---

# ⚙️ Local Development Setup

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
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
```

Never commit actual API keys, database credentials, payment secrets, or JWT secrets to GitHub.

Use `.env.example` files for documentation instead.

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

## NGO

```text
POST /api/ngo/profile
GET  /api/ngo/dashboard
GET  /api/ngo/verified
```

## Donations

```text
POST /api/donations/create-order
POST /api/donations/verify
```

## AI

```text
POST /api/ai/chat
POST /api/ai/summarize
GET  /api/ai/recommendations
```

---

# 🔒 Security

ImpactBridge implements:

- JWT-based authentication
- Protected API routes
- Role-based authorization
- NGO ownership checks
- Payment signature verification
- Environment-based secret management
- Input validation
- Protected campaign modification endpoints

---

# 📊 Example Campaign Risk Analysis

Example output from the explainable scoring engine:

```text
Safety Score: 70
Risk Level: Low

✓ Verified NGO              +20
✓ Detailed Description      +10
✗ Website Missing           -10
✗ Address Missing           -10
✓ Reasonable Goal            +5
✓ Reasonable Deadline        +5
```

The system provides both the final score and the individual factors that contributed to it.

---

# 🧩 Example AI Recommendation

The recommendation engine can produce results such as:

```text
🥇 Education Support Campaign

Badge:
Best Impact

Reason:
Strong campaign relevance combined with favorable
safety and impact signals.
```

The recommendation system combines campaign relevance with safety and fundraising information to rank campaigns.

---

# 📈 Future Improvements

Potential future improvements include:

- Personalized donor profiles
- Donation-history-based recommendations
- User preference-based campaign recommendations
- Advanced anomaly detection
- Automated NGO document verification
- Campaign update verification
- Real-time impact tracking
- Automated impact reports
- Expanded automated test coverage
- Production monitoring
- CI/CD pipeline

---

# 🚀 Project Status

**Actively Developed**

Current platform capabilities include:

- Authentication
- Donor / NGO / Admin roles
- NGO management
- NGO verification
- Campaign management
- Donation processing
- AI campaign verification
- Explainable fraud-risk scoring
- LLM campaign analysis
- TF-IDF campaign recommendations
- AI campaign assistant
- Jest automated testing

---

# 🌉 ImpactBridge AI

### Transparency. Trust. Impact.

An AI-assisted crowdfunding platform focused on helping donors make more informed and trustworthy giving decisions.




