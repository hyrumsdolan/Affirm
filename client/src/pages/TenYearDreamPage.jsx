import TenYearDreamForm from "../components/TenYearDreamForm";
import SpeakerButton from "../components/SpeakerButton";
// import "./TenYearDreamPage.css";

function TenYearDreamPage() {
  const dreamText =
    "Imagine that 10 years have passed by, and you are living your best possible life. Dream big! Don't restrict yourself at all. Don't overthink it; just allow yourself to envision the most magnificent possible future version of yourself. A decade in the future, what is the very best version of yourself doing? What do you look like? How do you go about your day to day? How do you speak to people you love? How are you loved in return? What kind of clothes do you wear? What kind of car do you drive? Are you a great cook? Do you love to read? Do you love to run?";

  return (
    <div className="flex h-screen w-screen justify-center bg-slate-200 align-middle transition-all duration-200 dark:bg-zinc-950 dark:text-white">
      <div className="dream-page mx-8 flex max-w-5xl justify-between py-16 font-sans">
        <div className="w-1/2 pr-8">
          <h1 className="w-auto text-center text-6xl font-light">
            Ten Year Dream.
          </h1>
          <p>
            <span className="inline-flex justify-center align-middle">
              <SpeakerButton text={dreamText} />
            </span>{" "}
            {dreamText}
          </p>
        </div>
        <div className="w-1/2 overflow-hidden border-l border-gray-300 pl-8">
          <TenYearDreamForm />
        </div>
      </div>
    </div>
  );
}

export default TenYearDreamPage;
