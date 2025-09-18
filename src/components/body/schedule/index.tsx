import React from 'react';

const Schedule: React.FC = () => {
  return (
    <div>
      <h1>Sections</h1>
      <h2>Scientific</h2>
      <ol>
        <li>Mycology, Microbiology and Plant Pathology</li>
        <li>Algae, Bryophytes and Pteridophytes</li>
        <li>Seed Plants: Anatomy and Reproductive Biology</li>
        <li>
          Seed Plants: Taxonomy, Ethnobotany and Plant Resource Utilization
        </li>
        <li>Cytogenetics, Plant Breeding and Molecular Biology</li>
        <li>Ecology and Environmental Biology</li>
        <li>Plant Physiology and Biochemistry</li>
        <li>Plant Biotechnology</li>
      </ol>

      <h2>Special Sections</h2>
      <h3>NEHU Golden Jubilee Thematic Sections</h3>
      <ol>
        <li>
          Biology of Plant diversity for Bioeconomy with special reference to
          North-East India
        </li>
        <li>Plant-Animal-Microbe Interactions</li>
      </ol>

      <h2>Others</h2>
      <ol>
        <li>Posters (All the sections)</li>
        <li>Young Botanist Award / Woman Botanist Award </li>
      </ol>
    </div>
  );
};
export default Schedule;
