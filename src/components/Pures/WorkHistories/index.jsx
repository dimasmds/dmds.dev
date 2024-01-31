import React from 'react';
import './style.scss';
import { workHistories } from '../../../content';

const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const splitDate = date.toDateString().split(' ');
  return `${splitDate[1]} ${splitDate[3]}`;
};

const calculateWorkHistoriesTime = (startDate, endDate) => {
  const startDateTime = new Date(startDate);
  const endDateTime = new Date(endDate || new Date());
  const timeDiff = Math.abs(endDateTime.getTime() - startDateTime.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // convert to x years y mounth format
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const yearsText = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
  const monthsText = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';

  if (yearsText && monthsText) {
    return `${yearsText}, ${monthsText}`;
  }

  return yearsText || monthsText;
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
                  <span className="work-histories__item__info__date_range">
                    {calculateWorkHistoriesTime(startDate, endDate)}
                  </span>
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
