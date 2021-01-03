import React, { useState } from 'react';


const initialCardState = {
  diffX: 0,
  diffY: 0,
  dragging: false,
  styles: {
    background: '#ffffff',
    left: '0',
    top: '0'
  }
}

const MessageCard: React.FC = () => {
  
  const [location, setLocation] = useState(initialCardState);

  const dragStart = (e) => {

    setLocation({ ...location, 
        diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
        diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
        dragging: true
      });
  }

  const dragging = (e)  => {
    var left = (e.screenX - location.diffX).toString();
    var top = (e.screenY - location.diffY).toString();
    if(location.dragging) {
      setLocation({
        ...location,
        styles: { ...location.styles,
          left: left,
          top: top
        }
      })
    }
  }    

  const dragEnd = (e) => {
    setLocation({...location, dragging:false})
  }

    return (
        <div style={location.styles} onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={dragEnd}>
            <div className='DialogTitle'>My Dialog</div>
            <div className='Contents'>
                Contents of the Dialog: 
                    - one
                    - two
                    - three 
            </div>
            <div className='closeButton' >
                Close
            </div>
        </div>
    );
}

export default MessageCard;