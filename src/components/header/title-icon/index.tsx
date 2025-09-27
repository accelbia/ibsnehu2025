import './index.css';
const TitleIcon = () => {
  const handleClick = () => {
    window.location.reload(); // Reloads the page to reset to default
  };

  return (
    <>
      <div className='title desktop' onClick={handleClick}>
        <h1>
          XLVIII ALL INDIA BOTANICAL CONFERENCE{' '}
          <span
            style={{
              fontStyle: 'italic',
              textTransform: 'lowercase',
            }}
          >
            of
          </span>
          <br />
          THE INDIAN BOTANICAL SOCIETY
          <br />
        </h1>
        <p>
          And International Symposium on Biology and Biotechnology of Plant Diversity for Bioeconomy
        </p>
      </div>

      <div className='title mobile' onClick={handleClick}>
        <h1>
          XLVIII AIBC{' '}
          <span
            style={{
              fontStyle: 'italic',
              textTransform: 'lowercase',
            }}
          >
            of
          </span>{' '}
          IBS
        </h1>
      </div>
    </>
  );
};

export default TitleIcon;
