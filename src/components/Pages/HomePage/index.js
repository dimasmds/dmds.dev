import React from 'react';
import Navigation from '../../Pures/Navigation';
import { navigation } from '../../../content';
import PersonalInformation from '../../Pures/PersonalInformation';
import './style.scss';
import TechStack from '../../Pures/TechStack';
import WorkHistories from '../../Pures/WorkHistories';

function HomePage() {
  const { title } = navigation;

  return (
    <>
      <Navigation title={title} />
      <main>
        <div className="main__container">
          <PersonalInformation />
          <TechStack />
          <WorkHistories />
        </div>
      </main>
    </>
  );
}

export default HomePage;
