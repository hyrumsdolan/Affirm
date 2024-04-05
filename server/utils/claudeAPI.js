
const Anthropic = require("@anthropic-ai/sdk");


async function claudeAPICall(input) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // Your API key here
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 4096,
    temperature: 0,
    system: `You are an AI assistant helping the user record key dreams, goals and reflections as part of the Start Today Journal process created by Rachel Hollis. The user will share a long-form version of their hopes, dreams and thoughts with you. Your role is to carefully listen and then condense their entry down to the key elements, separating each distinct dream/goal/idea with a pipe symbol (|). The last element should be the core dream.

    For example, if the user writes several paragraphs about their dreams of traveling the world, starting a business, and improving their health, you would summarize it as:
    Travel to new countries and experience different cultures | Launch own business and become an entrepreneur | Get fit and prioritize health through better diet and consistent exercise
    
    The goal is to succinctly capture the essence of what matters most to the user based on what they share and keep it concise as possible without losing meaning. Say nothing else other than the summary of the goals. Remember to keep each idea distinct and separated by pipes.`,
    messages: [{ role: "user", content: input }]
  });

  const response = msg.content[0].text;
  console.log(response);
  return response;
}

module.exports = claudeAPICall;
