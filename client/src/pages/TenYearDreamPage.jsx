import TenYearDreamForm from "../components/TenYearDreamForm";
import SpeakerButton from "../components/SpeakerButton";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

function TenYearDreamPage() {
  const dreamParagraphs = [
    "Imagine yourself a decade from now, living your best possible life. Let go of all limitations and envision the most magnificent future version of yourself. Dream big and be specific!",
    "What does your ideal self look like? How do you spend your days? What kind of relationships do you have with loved ones? Paint a vivid picture of your life, from the clothes you wear to the food you eat, the places you visit, and the hobbies you enjoy.",
    "After a decade of personal growth, how much joy and optimism do you radiate? How do you treat others, and how do they treat you in return? What are your deepest values, and how do they shape your life?",
    "Envision your dream home, family, and career. What does success look like for you? What drives and motivates you? How do you make a positive impact on the world around you?",
    "Now, without a moment of hesitation or self-doubt, write down everything you've imagined. Fill the pages with words, sentences, pictures, or doodles that capture the essence of your best possible future self. Don't hold back – this is your chance to think as big as you can and create a vision that will inspire and guide you.",
    "Embrace this opportunity to dream without limits. Let your imagination soar and create a future that excites and motivates you. Start with the phrase, 'The best version of me is...' and let your thoughts flow freely. Remember, this is not the time for realistic thinking; it's the time to explore the boundless potential within you.",
    "Get ready to embark on a journey of self-discovery and growth. Your ideal future awaits – all you have to do is take the first step and start writing!"
  ];

  const { loading, error, data } = useQuery(GET_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error occurred</div>;
  }

  return (
    // Merge had significantly different div setups and needs to be toyed with a bit

    <div className="flex h-full flex-col items-center justify-between p-10 transition-all duration-300 dark:bg-zinc-900 dark:text-white md:flex-row">
      <div className="mb-10 flex-1 justify-between md:mb-0">
        <h1 className="m-5 text-center text-2xl md:text-3xl lg:text-4xl">
          Ten Year Dream
        </h1>
        <div className="mx-5 text-center text-xs sm:text-sm md:mx-10 md:text-base">
          <span className="inline-flex items-center">
            <SpeakerButton audioSrc="https://res.cloudinary.com/dkonhzar9/video/upload/v1712647969/ten-year-dream-prompt_gua9vc.mp3" />
          </span>
          {dreamParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-2 mt-1  font-light">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div className="mb-5 mt-5 flex h-full flex-1 flex-col justify-between border-gray-100 transition-all duration-300 dark:border-zinc-700 md:border-l md:pl-8">
        <div className="flex-1"></div>
        <div className="h-1/2">
          <TenYearDreamForm user={data?.me} />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default TenYearDreamPage;
