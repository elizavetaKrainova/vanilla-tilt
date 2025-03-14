import { useState, useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import './App.css';

function App() {
  const vanillaTiltOptions = {
    max: 25,
    speed: 40,
    perspective: 500,
  };

  const [details, setDetails] = useState(null);
  const div = useRef();

  useEffect(() => {
    const rectangleElement = div.current;
    VanillaTilt.init(rectangleElement, vanillaTiltOptions);

    //Set listener to get position details.
    rectangleElement.addEventListener('tiltChange', (event) => {
      setDetails(event.detail);
    });

    //Cleanup function. Destroy vanillaTilt after unmount.
    return () => {
      rectangleElement.vanillaTilt.destroy();
    };
  }, []);

  const renderDetails = details
    ? Object.entries(details).map(([key, value]) => (
        <p className='rectangle__details' key={key}>
          {key}: {value}
        </p>
      ))
    : '';

  return (
    <>
      <div
        ref={div}
        className='rectangle'
        data-tilt
        data-tilt-full-page-listening
      >
        {renderDetails}
      </div>
    </>
  );
}

export default App;
