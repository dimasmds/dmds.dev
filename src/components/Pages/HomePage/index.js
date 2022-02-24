import React from 'react';
import PersonalInformation from '../../Pures/PersonalInformation';
import './style.scss';
import TechStack from '../../Pures/TechStack';
import WorkHistories from '../../Pures/WorkHistories';

function HomePage() {
  return (
    <main>
      <PersonalInformation />
      <TechStack />
      <WorkHistories />
    </main>
  );
}

export default HomePage;
