import TenYearDreamForm from "../components/TenYearDreamForm";
import SpeakerButton from "../components/SpeakerButton";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

function TenYearDreamPage() {
  const dreamText =
    "Imagine that 10 years have passed by, and you are living your best possible life. Dream big! Don't restrict yourself at all. Don't overthink it; just allow yourself to envision the most magnificent possible future version of yourself. A decade in the future, what is the very best version of yourself doing? What do you look like? How do you go about your day to day? How do you speak to people you love? How are you loved in return? What kind of clothes do you wear? What kind of car do you drive? Are you a great cook? Do you love to read? Do you love to run?";

  const { loading, error, data } = useQuery(GET_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error occurred</div>;
  }

  return (
    
      <div className="flex justify-between items-center h-full m-5">
        <div className="flex-1 justify-between">
          <h1 className="text-center ">Ten Year Dream.</h1>
          <p>
            <span className="inline-flex items-center">
              <SpeakerButton text={dreamText} />
            </span>{" "}
            {dreamText}
          </p>
        </div>
        <div className="flex-1 justify-between h-full border-l border-gray-300 pl-8">
          <TenYearDreamForm user={data?.me} />
        </div>
      </div>
  
  );
}

export default TenYearDreamPage;