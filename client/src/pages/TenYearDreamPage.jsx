import TenYearDreamForm from '../components/TenYearDreamForm';
import SpeakerButton from '../components/SpeakerButton';
import './TenYearDreamPage.css';

function TenYearDreamPage() {
  const dreamText = "Imagine that 10 years have passed by, and you are living your best possible life. Dream big! Don't restrict yourself at all. Don't overthink it; just allow yourself to envision the most magnificent possible future version of yourself. A decade in the future, what is the very best version of yourself doing? What do you look like? How do you go about your day to day? How do you speak to people you love? How are you loved in return? What kind of clothes do you wear? What kind of car do you drive? Are you a great cook? Do you love to read? Do you love to run?";

  return (
    <div className="dream-page flex justify-between max-w-5xl mx-auto mt-8">
      <div className="w-1/2 pr-8">
        <h1>Ten Year Dream.</h1>
        <p>
          <span className="icon-wrapper speaker-button"><SpeakerButton text={dreamText} /></span>
          {' '}{dreamText}
        </p>

      </div>
      <div className="w-1/2 pl-8 border-l border-gray-300">
        <TenYearDreamForm />
      </div>
    </div>
  );
}

export default TenYearDreamPage;