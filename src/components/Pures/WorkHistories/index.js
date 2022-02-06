import React from 'react';
import './style.scss';
import { workHistories } from '../../../content';

const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const splitDate = date.toDateString().split(' ');
  return `${splitDate[1]} ${splitDate[3]}`;
};

function WorkHistories() {
  return (
    <div className="work-histories">
      <h3>Experiences</h3>
      <div className="work-histories__list">
        {
          workHistories.map(({
            name, company, endDate, startDate, logo,
          }) => (
            <div key={name} className="work-histories__item">
              <img src={logo} alt={company} />
              <div className="work-histories__item__info">
                <h4>{name}</h4>
                <p className="work-histories__item__info__company-name">{company}</p>
                <p className="work-histories__item__info__date">
                  {getFormattedDate(startDate)}
                  {' '}
                  -
                  {' '}
                  {endDate ? getFormattedDate(endDate) : 'Present'}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default WorkHistories;
