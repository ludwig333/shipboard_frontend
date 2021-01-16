import React, { useEffect, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ImageWrapper } from './styles';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextButton } from '../../../../common/buttons';
import { BiImageAdd, BiTrash } from 'react-icons/bi';


const FormImage = ({ messageId, childId }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  const imageRef = useRef<HTMLInputElement>(null);

  //Find index of specific object using findIndex method.
  const childIndex = builderState[messageId].children.findIndex(
    (obj) => obj.id == childId
  );
  
  const image = builderState[messageId].children[childIndex];

  const onSubmit = (data) => {  
    let reader = new FileReader();

    reader.onloadend = () => {
      var height = 180
      var updatedChildren = { ...builderState[messageId].children[childIndex], selectedImage: data.image[0], imagePreviewUrl: reader.result, height }  
      
      setBuilderState([
        ...builderState,
        builderState[messageId].children[childIndex] = updatedChildren
      ]);
    };

    reader.readAsDataURL(data.image[0]);
  };

  const handleDelete = () => {
    
    setBuilderState([
      ...builderState,
      builderState[messageId].height -= 150,
      builderState[messageId].children.splice(childIndex, 1),
    ]);
  };

  useEffect(() => {
    if (imageRef.current) {
      register(imageRef.current);
    }
  });

  return (
    <ImageWrapper>
      {image.imagePreviewUrl ? (
        <div>
          <img src={image.imagePreviewUrl} alt="image"/>
          {/* <AddTextButton height="4rem" width="100%">
            Add Button
          </AddTextButton> */}
        </div>
      ) : (
        <form onChange={handleSubmit(onSubmit)}>
          <input
            ref={imageRef}
            type="file"
              id={"file"+ childIndex}
            name="image"
            accept="image/*"
          />
            <label htmlFor={"file" + childIndex}>
            <BiImageAdd />
            <p>Upload image</p>
          </label>
        </form>
      )}
      <button className="action-btn">
        <BiTrash onClick={handleDelete} />
      </button>
    </ImageWrapper>
  );
};

export default FormImage;
