import React from 'react';
import PersonalInformation from '../../Pures/PersonalInformation';
import './style.scss';
import TechStack from '../../Pures/TechStack';
import WorkHistories from '../../Pures/WorkHistories';
import Badges from '../../Pures/Badges';

function HomePage() {
  return (
    <main>
      <PersonalInformation />
      <TechStack />
      <WorkHistories />
      <Badges />
    </main>
  );
}

export default HomePage;
