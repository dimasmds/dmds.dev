import React from 'react';
import PersonalInformation from '../../Pures/PersonalInformation';
import './style.scss';
import TechStack from '../../Pures/TechStack';
import WorkHistories from '../../Pures/WorkHistories';
import Footer from '../../Pures/Footer';

function HomePage() {
  return (
    <main>
      <div className="main__container">
        <PersonalInformation />
        <TechStack />
        <WorkHistories />
        <Footer />
      </div>
    </main>
  );
}

export default HomePage;
