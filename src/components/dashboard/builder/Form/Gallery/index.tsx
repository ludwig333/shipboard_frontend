import React, { useState, useEffect, useRef, useContext } from 'react';
import { GalleryWrapper } from './styles';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextButton } from '../../../../common/buttons';


const FormGallery = () => {
  const [builderState, setBuilderState] = useContext(BuilderContext);

  return (
    <GalleryWrapper>
          <AddTextButton height="4rem" width="100%">Add Button</AddTextButton>
    </GalleryWrapper>
  );
};

export default FormGallery;