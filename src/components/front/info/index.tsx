import React from 'react';
import { InfoWrapper } from './styles';
import phoneChatbot from '../../../assets/images/phone-chatbot@2x.png';
import { PrimaryHeader, Paragraph } from '../../common/typography';

function Info() {
  return (  
    <InfoWrapper>
      <div className="info-image">
        <img src={phoneChatbot} alt="Chabot Phone" />
      </div>
      <div className="info-text">
        <PrimaryHeader className="heading">
          Build, Test and Publish
        </PrimaryHeader>
        <div className="paragraph">
          <Paragraph>
            Build chatbot as you always wanted with our flow builder platform. Test
            your bot and refine your flow. Publish your bot to
            the platform of your choice and let users get quality service from
            your business. Need help, select a template from our template
            collection and customize it as per your requirements.
          </Paragraph>
        </div>
      </div>
    </InfoWrapper>
  );
}

export default Info;
