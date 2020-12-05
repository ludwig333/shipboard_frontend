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
        <PrimaryHeader className="heading">Build, Test and Publish</PrimaryHeader>
        <div className="paragraph">
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aliquam
          fringilla vrisus enim. Viverra purus malesuada in non ipsum massa
          semper elementumLorem ipsum dolor sit amet, consectetur adipiscing
          elit. Eget aliquam fringilla vrisus enim. Viverra purus malesuada in
          non ipsum massa semper elementum Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Eget aliquam fringilla vrisus enim.
          Viverra purus malesuada in non ipsum massa semper elementum{' '}
        </Paragraph>
        </div>
      </div>
    </InfoWrapper>
  );
}

export default Info;
