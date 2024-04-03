
const Anthropic = require("@anthropic-ai/sdk");


async function claudeAPICall(input) {
  const anthropic = new Anthropic({
    apiKey: "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",
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
