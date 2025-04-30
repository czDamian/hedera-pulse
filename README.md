# Hedera Pulse

## 🚀 Overview

Hedera Pulse is an AI-powered platform that revolutionizes token creation and management on the Hedera network. Leveraging artificial intelligence, it provides real-time analytics and simplified token operations.

## 🎯 Problem Statement

- Complex and time-consuming token creation process
- Limited tools for token analysis and monitoring
- Manual security verification requirements
- Lack of real-time insights into token health

## ✨ Solutions

- One-click token creation with AI assistance
- Automated token analysis and risk assessment
- Real-time security audits
- Visual token distribution analytics

## 🔥 Key Features

- **Real-time Analytics**: Instant token health metrics
- **Security Checks**: Automated risk assessment
- **Distribution Tracking**: Visual holder analytics
- **Wallet Integration**: Seamless account management

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/czDamian/hedera-pulse.git

# Navigate to project
cd hedera-pulse

# Install dependencies
npm install
```

## ⚙️ Environment Setup

Create `.env` file in root directory:

```env

# Operator account - HEX encoded private key
OPERATOR_ACCOUNT_PRIVATE_KEY= " "
OPERATOR_ACCOUNT_EVM_ADDRESS= " "
NEXT_PUBLIC_EVM_ADDRESS= " "
OPERATOR_ACCOUNT_ID= " "
OPERATOR_ACCOUNT_ID_2= " "
NEXT_PUBLIC_FEE_AMOUNT=2

# Gemini
GEMINI_API_KEY = "  "

```

## 📚 Usage Guide

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production
npm start
```

## 🔌 API Endpoints

### Token Creation

```http
POST /api/create-token
Content-Type: application/json

{
  "tokenName": "string",
  "tokenSymbol": "string",
  "initialSupply": "number"
}
```

### Token Analysis

```http
GET /api/analyze-token?tokenId=0.0.xxx
```

### Token List

```http
GET /api/my-tokens?address=xxx
```

## 🏗️ Tech Stack

- Next.js 13
- Tailwind CSS
- Hedera SDK
- Google Gemini AI
- ethers.js

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

[MIT License](LICENSE)

## 💬 Support

Open an issue or email dev.czdamian@gmail.com

## 🔒 Security

Report concerns to dev.czdamian@gmail.com

## 👨‍💻 Development Team

- Damian Olebuezie - Frontend and AI Developer
- Ani Stephanie - UI Designer

## 📊 Project Status

![Active Development](https://github.com/czDamian/hedera-pulse/blob/main/public/landing.png)

---

Built with 💚 by Hedera Pulse Team
