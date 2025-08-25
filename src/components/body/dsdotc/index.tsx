import React from 'react';
import Masonry from 'react-layout-masonry';
import people from './data.json';

const Dsdotc: React.FC = () => {
  const repeatedPeople = [...people, ...people]; // for infinite scroll effect

  return (
    <div>
      <h1>DISTINGUISHED SPEAKERS/DELEGATES OF THE CONFERENCE</h1>
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <Masonry columns={8} gap={16}>
          {repeatedPeople.map((person, index) => (
            <div
              key={index}
              style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: 8,
                marginBottom: 16,
                width: 140,
                height: 250,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <img
                src={person.photo}
                alt={person.name}
                style={{
                  width: 140,
                  height: 160,
                  objectFit: 'cover',
                  borderRadius: 8,
                  marginBottom: 4,
                }}
              />
              <h2 style={{ fontSize: '0.8rem', margin: 0 }}>{person.name}</h2>
              <h3 style={{ fontSize: '0.7rem', margin: 0 }}>{person.honor}</h3>
                <p
                style={{
                  fontSize: '0.6rem',
                  margin: 0,
                  wordWrap: 'break-word',
                  textAlign: 'center',
                }}
                >
                {person.designation}
                </p>
            </div>
          ))}
        </Masonry>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Dsdotc;
