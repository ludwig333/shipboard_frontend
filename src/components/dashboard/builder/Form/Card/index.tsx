import React, { useState, useEffect, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CardSlider, CardWrapper } from './styles';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextButton, ContentButton } from '../../../../common/buttons';
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
import { addCard, deleteCardGroup, updateCard, uploadImage } from '../../../../../apis/cards';
import { toast } from 'react-toastify';
import { saveButton } from '../../../../../apis/buttons';

const FormCard = ({ messageId, childId, showBtnEditor, setEditorContent }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const [isChangingHeading, setIsChangingHeading] = useState(false);
  const [isChangingBody, setIsChangingBody] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const headingRef = useRef<HTMLInputElement>(null);
  const paragraphRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  //Find index of specific object using findIndex method.
  const childIndex = builderState[messageId].children.findIndex(
    (obj) => obj.id == childId
  );

  //Card Navigation functions
  const handleNextButton = (id) => {
    const cards = builderState[messageId].children[childIndex].cards;
    const length = cards.length - 1;
    const activeCardIndex = getActiveCardIndex(cards);
    setActiveCardIndex(activeCardIndex + 1);

    if (activeCardIndex == length) {
      makeCardActive(activeCardIndex + 1, activeCardIndex, length + 2, true);
    } else {
      makeCardActive(activeCardIndex + 1, activeCardIndex);
    }
  };

  const handlePreviousButton = () => {
    const cards = builderState[messageId].children[childIndex].cards;
    const activeCardIndex = getActiveCardIndex(cards);
    setActiveCardIndex(activeCardIndex - 1);
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
      addCard(childId).then((response) => {
        setBuilderState(
          builderState.map((message, index) => { 
            if (index == messageId) { 
              message.children.map((child, ind) => { 
                if (ind == childIndex) {
                  //First set active card to inactive
                  child.cards.map((card, inx) => {
                    if (inx == activeCardIndex) {
                      card.active = false
                    }
                    return card;
                })
                //Then push a new card with active true;
                  child.cards.push(response.data)
                }
              })
            }
            return message;
          })
        );
      }).catch((err) => {
        toast.error("Something went wrong");
      });
    } else {
      setBuilderState(
        builderState.map((message, index) => { 
          if (index == messageId) { 
            message.children.map((child, ind) => { 
              if (ind == childIndex) {
                child.cards.map((card, inx) => { 
                  if (inx == cardIndex) { 
                    card.active = true
                  }
                  if (inx == activeCardIndex) { 
                    card.active = false
                  }
                  return card;
                })
              }
              return child;
            })
          }
          return message;
        })
      );
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
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('name', data.image[0].name);

    reader.onloadend = () => {
      var paragraphHeight = paragraphRef.current.scrollHeight;
      uploadImage(formData, id).then((response) => {
        setBuilderState(
          builderState.map((item, index) => {
            if (index == messageId) {
              item.children.map((child, ind) => {
                if (ind == childIndex) {
                  child.cards.map((card, s) => {
                    if (s == cardIndex) {
                      card.selectedImage = data.image[0];
                      card.imagePreviewUrl = reader.result;
                      card.height = paragraphHeight + 200;
                    }
                    return card;
                  });
                }
                return child;
              });
            }
            return item;
          })
        );
      }).catch((err) => {
        toast.error("Something went wrong");
      })
    };

    reader.readAsDataURL(data.image[0]);
  };

  const onHeadingChange = (data, id) => {
    let cardIndex = getCardIndex(id);
    var paragraphHeight = paragraphRef.current.scrollHeight;

    updateCard({
      heading: data.heading,
      height: paragraphHeight + 200
    }, id).then((response) => {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.children.map((child, ind) => {
              if (ind == childIndex) {
                child.cards.map((card, s) => {
                  if (s == cardIndex) {
                    card.heading = data.heading;
                    card.height = paragraphHeight + 200;
                  }
                });
              }
            });
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error("Something went wrong");
    })
  };

  const onParagraphChange = (data, id) => {
    let cardIndex = getCardIndex(id);

    var paragraphHeight = paragraphRef.current.scrollHeight;

    updateCard({
      body: data.body,
      height: paragraphHeight + 200
    }, id).then((response) => {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.children.map((child, ind) => {
              if (ind == childIndex) {
                child.cards.map((card, s) => {
                  if (s == cardIndex) {
                    card.body = data.body;
                    card.height = paragraphHeight + 200;
                  }
                });
              }
            });
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error("Something went wrong");
    })
  };

  const handleAddButton = () => {
    const cards = builderState[messageId].children[childIndex].cards;
    const activeCardIndex = getActiveCardIndex(cards);
    const activeCard = builderState[messageId].children[childIndex].cards[activeCardIndex];
    const buttonNumber = activeCard.buttons.length + 1;
    saveButton({
      name: 'Button #' + buttonNumber,
      parent_type: 'card',
      parent: activeCard.id
    }).then((response) => {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.children.map((child) => {
              if (child.id == childId) {
                child.cards.map((card, inx) => {
                  if (card.active == true) {
                    card.buttons.push(response.data);
                  }
                })
              }
            });
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error("Something went wrong")
    })      
  }

  const handleDelete = () => {
    deleteCardGroup(childId).then((response) => {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.height -= 250;
            item.children.splice(childIndex, 1);
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error("Something went wrong");
    })
  };

  useEffect(() => {
    if (paragraphRef.current) {
      register(paragraphRef.current,  {required: true, minLength: 3})
    }
  }, [activeCardIndex]);

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
            <CardWrapper ref={cardRef}>
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
                    <input
                      className="card-title"
                      ref={register({required: true, minLength: 3 })}
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
                <div className="card-base">
                {card.buttons && card.buttons.map((button, index) => {
                    return (
                      <React.Fragment key={button.id}>
                        <ContentButton
                          ref={buttonRef}
                          onClick={(event) => {
                          setEditorContent({
                            name: button.name,
                            id: button.id,
                            messageId: builderState[messageId].id,
                            childId: childId,
                            activeCardId: card.id,
                            type: 'card'
                          });
                          showBtnEditor();
                      }}>{button.name}</ContentButton>
                      </React.Fragment>
                    );
                  })}
                </div>
                <AddTextButton height="4rem" width="100%" onClick={handleAddButton}>
                  Add Button
                </AddTextButton>
              </div>
            </CardWrapper>
          );
        }
      })}
    </CardSlider>
  );
};

export default FormCard;
