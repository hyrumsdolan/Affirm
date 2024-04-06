import React, { useState } from 'react';
import SelectableButton from '../components/SelectableButton';
import Button from '../components/Button';

const WelcomeBack = () => {
  const [gratitudes, setGratitudes] = useState(['The weather was so god damn beautiful today', '', '', '', '']);
  const [mainDream] = useState('Become Elon Bezos');

  const handleGratitudeChange = (index, value) => {
    const updatedGratitudes = [...gratitudes];
    updatedGratitudes[index] = value;
    setGratitudes(updatedGratitudes);
  };

  const renderGratitudeInputs = new Array(10).fill('enter a gratitude...');


  const groupItems = (items, groupSize) => {
    let grouped = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };
  const groupedDreams = groupItems(renderGratitudeInputs, 3);

  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-2xl mb-4">welcome back :)</h1>
        <p className="text-lg">Let's get affirming.</p>
      </header>

      <main className="">
      <div className="flex flex-col items-center">
    {groupedDreams.map((group, index) => (
      <div key={index} className="flex justify-center gap-4 mb-4">
        {group.map((dream, index) => (
          <div className="" key={index}>
            <SelectableButton
              initialText={dream}
              disabled={false}
            />
          </div>
        ))}
      </div>
    ))}
  </div>

        <section className="flex flex-col items-center text-center mt-8">
          <div className="main-dream">
            <span className="text-lg font-bold">The main dream</span>
            <div className="mt-4">
              <SelectableButton
                initialText={mainDream}
                disabled={true}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="welcome-footer text-center mt-8">
        <Button
          className="m-auto"
          navigateTo="/next-page"
        >
          save & continue
        </Button>
      </footer>
    </>
  );
};

export default WelcomeBack;