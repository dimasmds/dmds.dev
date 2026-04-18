import React from 'react';
import PersonalInformation from '../../Pures/PersonalInformation';
import './style.scss';
import TechStack from '../../Pures/TechStack';
import WorkHistories from '../../Pures/WorkHistories';
import Badges from '../../Pures/Badges';
import Marquee from '../../Pures/Marquee';
import FeaturedTalks from '../../Pures/FeaturedTalks';
import SEO from '../../Pures/SEO';
import { tags } from '../../../content';

function HomePage() {
  return (
    <main className="home-page">
      <SEO
        title="Software Engineer"
        description="Engineering Manager with 5+ years of experience in web development. AWS Certified, React Developer, Node.js enthusiast based in Bandung."
        url="https://dmds.dev/"
      />
      <PersonalInformation />

      <div className="home-page__marquee-strip">
        <Marquee speed={50}>
          {tags.map(({ name, icon: Icon }) => (
            <span key={name} className="home-page__marquee-item">
              <Icon />
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="home-page__marquee-strip home-page__marquee-strip--reverse">
        <Marquee speed={45} reverse>
          {tags.map(({ name, icon: Icon }) => (
            <span key={name} className="home-page__marquee-item home-page__marquee-item--alt">
              <Icon />
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      <TechStack />
      <FeaturedTalks />
      <WorkHistories />
      <Badges />
    </main>
  );
}

export default HomePage;
