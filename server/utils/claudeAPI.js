
const Anthropic = require("@anthropic-ai/sdk");


async function claudeAPICall(input) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    temperature: 0,
    messages: [{ role: "user", content: input }]
  });

  const response = msg.content[0].text;
  console.log(response);
  return response;
}

module.exports = claudeAPICall;
