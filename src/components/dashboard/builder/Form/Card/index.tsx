import React, { useState, useEffect, useRef, useContext } from 'react';
import { CardSlider, CardWrapper } from './styles';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextButton } from '../../../../common/buttons';
import { ImageWrapper } from '../Image/styles';
import { v4 as uuidv4 } from 'uuid';

import {
  BiImageAdd,
  BiTrash,
  BiChevronRight,
  BiChevronLeft,
  BiPlus
} from 'react-icons/bi';
import { TextArea } from '../Text/styles';

const FormCard = ({ messageId, childId }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);
  const [isChangingHeading, setIsChangingHeading] = useState(false);
  const [isChangingBody, setIsChangingBody] = useState(false);

  const headingRef = useRef<HTMLInputElement>(null);
  const paragraphRef = useRef<HTMLTextAreaElement>(null);

  //Find index of specific object using findIndex method.
  const childIndex = builderState[messageId].children.findIndex(
    (obj) => obj.id == childId
  );

  const handleHeadingChange = (e) => {};

  const handleBodyChange = (e) => {};

  const handleNextButton = (id) => {
    const cards = builderState[messageId].children[childIndex].cards;
    const length = cards.length - 1;
    const activeCardIndex = getActiveCardIndex(cards);

    if (activeCardIndex == length) {
      makeCardActive(activeCardIndex + 1, activeCardIndex, length + 2, true);
    } else {
      makeCardActive(activeCardIndex + 1, activeCardIndex);
    }
  };

  const handlePreviousButton = () => {
    const cards = builderState[messageId].children[childIndex].cards;
    const activeCardIndex = getActiveCardIndex(cards);
    if (activeCardIndex != 0) {
      makeCardActive(activeCardIndex - 1, activeCardIndex);
    }
  };

  const makeCardActive = (cardIndex, activeCardIndex, length = 0, addNew = false) => {
    if (addNew) {
      setBuilderState([
        ...builderState,
        (builderState[messageId].children[childIndex].cards[
          activeCardIndex
        ].active = false),
        builderState[messageId].children[childIndex].cards.push({
          id: uuidv4(),
          active: true,
          selectedImage: null,
          imagePreviewUrl: '',
          heading: 'Subtitle #'+ length,
          body: 'This is body paragraph',
        }),
      ]);
    } else {
      setBuilderState([
        ...builderState,
        (builderState[messageId].children[childIndex].cards[
          cardIndex
        ].active = true),
        (builderState[messageId].children[childIndex].cards[
          activeCardIndex
        ].active = false),
      ]);
    }
  };

  const getActiveCardIndex = (cards) => {
    return cards.findIndex((obj) => obj.active == true);
  };

  const isLastCard = () => {
    const cards = builderState[messageId].children[childIndex].cards;
    const length = cards.length - 1;
    const activeCardIndex = getActiveCardIndex(cards);
    return activeCardIndex == length;
  };

  useEffect(() => {
    headingRef.current && headingRef.current.focus();
    paragraphRef.current && paragraphRef.current.focus();
  }, [isChangingHeading]);

  return (
    <CardSlider>
      <div className="navigation_btn previous" onClick={handlePreviousButton}>
        <BiChevronLeft />
      </div>
      <div className="navigation_btn next" onClick={handleNextButton}>
        {isLastCard() ? <BiPlus /> : <BiChevronRight />}
      </div>
      <button className="action-btn">
        <BiTrash />
      </button>
      {builderState[messageId].children[childIndex].cards.map((card) => {
        if (card.active) {
          return (
            <CardWrapper>
              <div className="card-image">
                <ImageWrapper>
                  <form>
                    <input
                      type="file"
                      id="card_image"
                      name="image"
                      accept="image/*"
                    />
                    <label htmlFor="card_image">
                      <BiImageAdd />
                      <p>Upload image</p>
                    </label>
                  </form>
                </ImageWrapper>
              </div>
              <div className="card-text">
                <div className="card-heading">
                  {isChangingHeading ? (
                    <form>
                      <input
                        ref={headingRef}
                        type="text"
                        id="heading"
                        value="Subtitle"
                        onChange={handleHeadingChange}
                        onBlur={() => setIsChangingHeading(false)}
                      />
                    </form>
                  ) : (
                      <h3 onClick={() => setIsChangingHeading(true)}>{card.heading}</h3>
                  )}
                </div>
                <div className="card-body">
                  {isChangingBody ? (
                    <TextArea
                      id="paragraph"
                      ref={paragraphRef}
                      height="2"
                      placeholder="Enter your text here"
                      onBlur={() => setIsChangingBody(false)}
                    />
                  ) : (
                    <p onClick={() => setIsChangingBody(true)}>
                        {card.body}
                    </p>
                  )}
                </div>
              </div>
            </CardWrapper>
          );
        }
      })}
    </CardSlider>
  );
};

export default FormCard;
