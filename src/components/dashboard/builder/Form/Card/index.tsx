import React, { useState, useEffect, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CardSlider, CardWrapper } from './styles';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextButton } from '../../../../common/buttons';
import { ImageWrapper } from '../Image/styles';
import { v4 as uuidv4 } from 'uuid';
import Textarea from 'react-expanding-textarea';
import {
  BiImageAdd,
  BiTrash,
  BiChevronRight,
  BiChevronLeft,
  BiPlus,
} from 'react-icons/bi';

const FormCard = ({ messageId, childId }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const [isChangingHeading, setIsChangingHeading] = useState(false);
  const [isChangingBody, setIsChangingBody] = useState(false);

  const headingRef = useRef<HTMLInputElement>(null);
  const paragraphRef = useRef<HTMLTextAreaElement>(null);

  //Find index of specific object using findIndex method.
  const childIndex = builderState[messageId].children.findIndex(
    (obj) => obj.id == childId
  );

  //Card Navigation functions
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

  const makeCardActive = (
    cardIndex,
    activeCardIndex,
    length = 0,
    addNew = false
  ) => {
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
          heading: 'Subtitle #' + length,
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

  const getCardIndex = (id) => {
    return builderState[messageId].children[childIndex].cards.findIndex(
      (obj) => obj.id === id
    );
  };

  const isLastCard = () => {
    const cards = builderState[messageId].children[childIndex].cards;
    const length = cards.length - 1;
    const activeCardIndex = getActiveCardIndex(cards);
    return activeCardIndex == length;
  };

  //Form input submit methods
  const onUploadImage = (data, id) => {
    let cardIndex = getCardIndex(id);

    let reader = new FileReader();

    reader.onloadend = () => {
      var updatedCard = {
        ...builderState[messageId].children[childIndex].cards[cardIndex],
        selectedImage: data.image[0],
        imagePreviewUrl: reader.result,
      };

      setBuilderState([
        ...builderState,
        (builderState[messageId].children[childIndex].cards[
          cardIndex
        ] = updatedCard),
      ]);
    };

    reader.readAsDataURL(data.image[0]);
  };

  const onHeadingChange = (data, id) => {
    let cardIndex = getCardIndex(id);
    var updatedCard = {
      ...builderState[messageId].children[childIndex].cards[cardIndex],
      heading: data.heading,
    };
    setBuilderState([
      ...builderState,
      (builderState[messageId].children[childIndex].cards[
        cardIndex
      ] = updatedCard),
    ]);
  };

  const onParagraphChange = (data, id) => {
    let cardIndex = getCardIndex(id);
    var updatedCard = {
      ...builderState[messageId].children[childIndex].cards[cardIndex],
      body: data.body,
    };
    setBuilderState([
      ...builderState,
      (builderState[messageId].children[childIndex].cards[
        cardIndex
      ] = updatedCard),
    ]);
  };

  const handleDelete = () => {
    setBuilderState([
      ...builderState,
      builderState[messageId].children.splice(childIndex, 1),
    ]);
  };
  //UseEffects
  useEffect(() => {
    if (headingRef.current) {
      register(headingRef.current);
      headingRef.current.focus();
    }
  }, [isChangingHeading]);

  useEffect(() => {
    if (paragraphRef.current) {
      register(paragraphRef.current);
      paragraphRef.current.focus();
    }
  }, [isChangingBody]);

  return (
    <CardSlider>
      <div className="navigation_btn previous" onClick={handlePreviousButton}>
        <BiChevronLeft />
      </div>
      <div className="navigation_btn next" onClick={handleNextButton}>
        {isLastCard() ? <BiPlus /> : <BiChevronRight />}
      </div>
      <button className="action-btn" onClick={handleDelete}>
        <BiTrash />
      </button>
      {builderState[messageId].children[childIndex].cards.map((card) => {
        if (card.active) {
          return (
            <CardWrapper>
              <div className="card-image">
                <ImageWrapper>
                  {card.imagePreviewUrl ? (
                    <div>
                      <img src={card.imagePreviewUrl} alt="card-image" />
                    </div>
                  ) : (
                    <form
                      onChange={handleSubmit((data) =>
                        onUploadImage(data, card.id)
                      )}>
                      <input
                        ref={register}
                        type="file"
                        id={'card_image' + getCardIndex(card.id)}
                        name="image"
                        accept="image/*"
                      />
                      <label htmlFor={'card_image' + getCardIndex(card.id)}>
                        <BiImageAdd />
                        <p>Upload image</p>
                      </label>
                    </form>
                  )}
                </ImageWrapper>
              </div>
              <div className="card-text">
                <div
                  className={
                    isChangingHeading ? 'card-heading active' : 'card-heading'
                  }>
                  <form
                    onBlur={handleSubmit((data) =>
                      onHeadingChange(data, card.id)
                    )}>
                    <Textarea
                      className="card-title"
                      ref={headingRef}
                      maxLength={27}
                      id="heading"
                      name="heading"
                      defaultValue={card.heading}
                      onBlur={() => setIsChangingHeading(false)}
                      onClick={() => {
                        setIsChangingBody(false);
                        setIsChangingHeading(true);
                      }}
                    />
                  </form>
                </div>
                <div
                  className={isChangingBody ? 'card-body active' : 'card-body'}>
                  <form
                    onBlur={handleSubmit((data) =>
                      onParagraphChange(data, card.id)
                    )}>
                    <Textarea
                      className="card-paragraph"
                      maxLength={200}
                      placeholder="Enter your text here"
                      onBlur={() => setIsChangingBody(false)}
                      defaultValue={card.body}
                      id="body"
                      name="body"
                      ref={paragraphRef}
                      onClick={() => {
                        setIsChangingHeading(false);
                        setIsChangingBody(true);
                      }}
                    />
                  </form>
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
