import TenYearDreamForm from "../components/TenYearDreamForm";
import SpeakerButton from "../components/SpeakerButton";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

function TenYearDreamPage() {
  const dreamText = `
Imagine yourself a decade from now, living your best possible life. Let go of all limitations and envision the most magnificent future version of yourself. Dream big and be specific!

What does your ideal self look like? How do you spend your days? What kind of relationships do you have with loved ones? Paint a vivid picture of your life, from the clothes you wear to the food you eat, the places you visit, and the hobbies you enjoy.

After a decade of personal growth, how much joy and optimism do you radiate? How do you treat others, and how do they treat you in return? What are your deepest values, and how do they shape your life?

Envision your dream home, family, and career. What does success look like for you? What drives and motivates you? How do you make a positive impact on the world around you?

Now, without a moment of hesitation or self-doubt, write down everything you've imagined. Fill the pages with words, sentences, pictures, or doodles that capture the essence of your best possible future self. Don't hold back – this is your chance to think as big as you can and create a vision that will inspire and guide you.

Embrace this opportunity to dream without limits. Let your imagination soar and create a future that excites and motivates you. Start with the phrase, "The best version of me is..." and let your thoughts flow freely. Remember, this is not the time for realistic thinking; it's the time to explore the boundless potential within you.

Get ready to embark on a journey of self-discovery and growth. Your ideal future awaits – all you have to do is take the first step and start writing!
`;

  const { loading, error, data } = useQuery(GET_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error occurred</div>;
  }

  return (
    <div className="m-5 flex h-full items-center justify-between">
      <div className="flex-1 justify-between">
        <h1 className="text-center ">Ten Year Dream.</h1>
        <p>
          <span className="inline-flex items-center">
            <SpeakerButton text={dreamText} />
          </span>{" "}
          {dreamText}
        </p>
      </div>
      <div className="h-full flex-1 justify-between border-l border-gray-300 pl-8">
        <TenYearDreamForm user={data?.me} />
      </div>
    </div>
  );
}

export default TenYearDreamPage;
