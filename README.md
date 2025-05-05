# Hedera Pulse

## 🚀 Overview

Hedera Pulse is an AI-powered platform that revolutionizes token creation and management on the Hedera network. Leveraging artificial intelligence, it provides real-time analytics and simplified token operations.

![Project Image ](https://github.com/czDamian/hedera-pulse/blob/main/public/landing.png)

## ❗ Notice

To test this project using the live link [Hedera Pulse](https://hedera-pulse.vercel.app/), ensure the following:

1. Connect to **Metamask Wallet** on a desktop device.
2. Switch to the **Hedera Testnet**.
3. Obtain some Hedera Testnet tokens from the [Hedera Portal](https://portal.hedera.com/).

Once set up, you can proceed to create tokens. Note that analyzing tokens does not incur any gas fees!

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

## 🤖 AI Agent Implementation

### HCS-10 Integration

Hedera Pulse leverages the HCS-10 standard for AI agent communication and token creation:

```javascript
// AI Agent Initialization
const aiClient = new HCS10Client({
  network: "testnet",
  operatorId: process.env.AI_AGENT_ACCOUNT_ID,
  operatorPrivateKey: process.env.AI_AGENT_PRIVATE_KEY,
  prettyPrint: true,
});
```

### Message Flow

1. **Agent Creation**: During setup, an AI agent is created using the HCS-10 standard
2. **Topic Management**: The agent uses dedicated topics for:
   - Inbound requests (`AI_AGENT_INBOUND_TOPIC_ID`)
   - Token creation messages
   - Agent state management

### Token Creation Process

1. User request is sent to agent via HCS
2. Agent processes request using standardized message format:

```javascript
{
  op: "create_token",
  operator_id: "0.0.xxx",
  tokenData: {
    name: "TokenName",
    symbol: "TKN",
    initialSupply: 1000000,
    creator: "walletAddress"
  }
}
```

3. Agent creates token using Hedera Token Service
4. Response is sent back through HCS

### Benefits

- **Decentralized Communication**: All agent interactions are recorded on HCS
- **Standardized Messages**: Following HCS-10 ensures compatibility
- **Automated Processing**: AI agent handles token creation autonomously
- **Verifiable Actions**: All operations are traceable on Hedera network

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/czDamian/hedera-pulse.git

# Navigate to project
cd hedera-pulse

# Install dependencies
npm install
```

Run the script to create the AI Agent and add the Agent Id and PrivateKey in the env file

```bash
node createAgent.js
```

OUR AI AGENT CAN BE FOUND ON MOONSCAPE
![HederaPulseAI Agent](https://moonscape.tech/openconvai/agents/0.0.5933017)

if you created the AI agent successfully, you will see the details in the console similar to this

```bash
{
  accountId: '0.0.xxxxx',
  privateKey: '30xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  operatorId: '0.0.xxxxx',
  inboundTopicId: '0.0.xxxxxxxx',
  outboundTopicId: '0.0.xxxxxx',
  profileTopicId: '0.0.xxxxxxx',
  pfpTopicId: '0.0.xxxxxxx'
 }

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
AI_AGENT_ACCOUNT_ID = ""
AI_AGENT_PRIVATE_KEY = ""

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

![Token Creation](https://github.com/czDamian/hedera-pulse/blob/main/public/create.png)

```http
POST /api/create-token
Content-Type: application/json

{
  "tokenName": "string",
  "tokenSymbol": "string",
  "walletAddress": "string",
  "initialSupply": "number"
}
```

### Token Analysis

![Token Analysis](https://github.com/czDamian/hedera-pulse/blob/main/public/analysis.png)

Note that only Hedera Formatted Addresses are supported for now (0.0.xxx)

```http
GET /api/analyze-token?tokenId=0.0.xxx
```

### Token List

Both Hedera and EVM addresses are supported

```http
GET /api/my-tokens?address=xxx
```

## 🏗️ Tech Stack

- Next.js 15
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

---

Built with 💚 by Hedera Pulse Team
