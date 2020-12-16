import React from 'react';
import { FeatureWrapper, FeatureGrid } from './styles';
import {
  PrimaryHeader,
  SecondaryHeader,
  Paragraph,
} from '../../common/typography';

import feature1 from '../../../assets/images/features/1.png';
import feature2 from '../../../assets/images/features/2.png';
import feature3 from '../../../assets/images/features/3.png';
import feature4 from '../../../assets/images/features/4.png';
import feature5 from '../../../assets/images/features/5.png';

const Feature = () => {
  return (
    <FeatureWrapper>
      <PrimaryHeader className="heading">Key Features</PrimaryHeader>
      <FeatureGrid>
        <div className="feature">
          <img src={feature1} alt="feature1" />
          <SecondaryHeader>Easy to develop</SecondaryHeader>
          <Paragraph>
            Create components connected them and make the bot flow in ease
          </Paragraph>
        </div>
        <div className="feature">
          <img src={feature5} alt="feature1" />
          <SecondaryHeader>Multipe Platform</SecondaryHeader>
          <Paragraph>
            Create one bot and publish it in different platforms such as
            facebook, slack, telegram, etc.
          </Paragraph>
        </div>
        <div className="feature">
          <img src={feature3} alt="feature1" />
          <SecondaryHeader>Template Variety</SecondaryHeader>
          <Paragraph>
            Free templates which can be used to setup your bot.
          </Paragraph>
        </div>
        <div className="feature">
          <img src={feature4} alt="feature1" />
          <SecondaryHeader>Rich Content</SecondaryHeader>
          <Paragraph>
            Various message content such as text, gallery, buttons.
          </Paragraph>
        </div>
        <div className="feature">
          <img src={feature5} alt="feature1" />
          <SecondaryHeader>Feature 5</SecondaryHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, t ut labore
            et dolore magna aliqua.
          </Paragraph>
        </div>
        <div className="feature">
          <img src={feature5} alt="feature1" />
          <SecondaryHeader>Feature 6</SecondaryHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </Paragraph>
        </div>
      </FeatureGrid>
    </FeatureWrapper>
  );
};

export default Feature;
