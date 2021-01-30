import React, { useEffect, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ImageWrapper } from './styles';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextButton } from '../../../../common/buttons';
import { BiImageAdd, BiTrash } from 'react-icons/bi';
import { uploadImage, deleteImage } from '../../../../../apis/images';
import { toast } from 'react-toastify';

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
    const formData = new FormData();

    formData.append('image', data.image[0]);
    formData.append('name', data.image[0].name);
    
    reader.onloadend = () => {
      var height = 180;
      uploadImage(formData, childId).then((response) => {
        setBuilderState(
          builderState.map((item, index) => {
            if (index == messageId) {
              item.children.map((child, ind) => {
                if (ind == childIndex) {
                  child.selectedImage = data.image[0];
                  child.imagePreviewUrl = reader.result;
                  child.height = height;
                }
              });
            }
            return item;
          })
        );
      }).catch((err) => {
        toast.error("Something went wrong")
      })
    };

    reader.readAsDataURL(data.image[0]);
  };

  const handleDelete = () => {
    deleteImage(childId).then((response) => {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.height -= 150;
            item.children.splice(childIndex,1)
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error("Something went wrong");
    })
   
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
          <img src={image.imagePreviewUrl} alt="image" />
          {/* <AddTextButton height="4rem" width="100%">
            Add Button
          </AddTextButton> */}
        </div>
      ) : (
        <form onChange={handleSubmit(onSubmit)}>
          <input
            ref={imageRef}
            type="file"
            id={'file' + childIndex}
            name="image"
            accept="image/*"
          />
          <label htmlFor={'file' + childIndex}>
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
