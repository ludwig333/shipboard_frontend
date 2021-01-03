import React, { useState, useEffect, useRef, useContext } from 'react';
import { CardWrapper } from './styles';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextButton } from '../../../../common/buttons';


const FormCard = () => {
  const [builderState, setBuilderState] = useContext(BuilderContext);

  return (
    <CardWrapper>
          <AddTextButton height="4rem" width="100%">Add Button</AddTextButton>
    </CardWrapper>
  );
};

export default FormCard;