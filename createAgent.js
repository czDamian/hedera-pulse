import dotenv from "dotenv";
dotenv.config();

import {
  HCS10Client,
  AgentBuilder,
  InboundTopicType,
  AIAgentCapability,
} from "@hashgraphonline/standards-sdk";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

if (
  !process.env.OPERATOR_ACCOUNT_ID ||
  !process.env.OPERATOR_DER_ENCODED_ACCOUNT_PRIVATE_KEY
) {
  console.error(
    "Missing environment variables! Make sure OPERATOR_ACCOUNT_ID and OPERATOR_DER_ENCODED_ACCOUNT_PRIVATE_KEY are set."
  );
  process.exit(1);
}

// Get the current directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

// Read profile picture
const pfpPath = join(__dirname, "../public", "logo.png");
const pfpBuffer = fs.readFileSync(pfpPath);

const client = new HCS10Client({
  network: "testnet",
  operatorId: process.env.OPERATOR_ACCOUNT_ID,
  operatorPrivateKey: process.env.OPERATOR_DER_ENCODED_ACCOUNT_PRIVATE_KEY,
});

const agentBuilder = new AgentBuilder()
  .setName("HederaPulseAI")
  .setBio("AI agent for Managing Token Interactions on the Hedera network")
  .setCapabilities([
    AIAgentCapability.TEXT_GENERATION,
    AIAgentCapability.SMART_CONTRACT_AUDIT,
  ])
  .setAlias("HederaPulse")
  .setCreator(process.env.OPERATOR_ACCOUNT_ID)
  .setType("autonomous")
  .setModel("agent-model-2024")
  .addSocial("x", "@hederapulse")
  .addProperty("version", "1.0.0")
  .addProperty("permissions", ["read_network", "propose_transaction"])
  .setProfilePicture(pfpBuffer, "logo.png")
  .setNetwork("testnet")
  .setInboundTopicType(InboundTopicType.PUBLIC);

async function registerAgent() {
  try {
    console.log("Creating and registering agent...");
    console.log("PROFILE DATA", agentBuilder.build());

    const agent = await client.createAndRegisterAgent(agentBuilder, {
      initialBalance: 70, //create the agent with sufficient balance in order for the tx not to fail
    });

    if (agent.success) {
      console.log(`Agent created with ID: ${agent.metadata?.accountId}`);
      console.log(`Inbound Topic: ${agent.metadata?.inboundTopicId}`);
      console.log(`Outbound Topic: ${agent.metadata?.outboundTopicId}`);
      console.log(`Profile Topic: ${agent.metadata?.profileTopicId}`);

      // Store credentials securely - these are needed to operate the agent later
      const agentCredentials = {
        accountId: agent.metadata?.accountId,
        privateKey: agent.metadata?.privateKey, // Store securely!
        inboundTopicId: agent.metadata?.inboundTopicId,
        outboundTopicId: agent.metadata?.outboundTopicId,
        profileTopicId: agent.metadata?.profileTopicId,
      };
      console.log("Agent credentials:", agentCredentials);
      // console.log("all details", agent.metadata);

      return agent;
    } else {
      console.error(`Failed to create agent: ${agent.error}`);
      return { success: false, error: agent.error };
    }
  } catch (error) {
    console.error("Agent registration failed:", error.message);
    throw error;
  }
}

registerAgent();
