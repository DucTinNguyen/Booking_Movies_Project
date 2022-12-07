import React from 'react'
import 'react-responsive-modal/styles.css';
import ReactPlayer from "react-player";
import { Modal } from 'react-responsive-modal';
export default function PopupVideo(props) {
  const {open,setOpen} = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={()=>{setOpen(false);}}
        styles={{
          modal: {
            maxWidth: "unset",
            width: "50%",
            padding: "unset"
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)"
          },
          closeButton: {
            background: "yellow"
          }
        }}
        center
      >
        <ReactPlayer
          url={props.url}
          width="100%"
          muted={true}
          // height='300px'
        />
      </Modal>
    </div>
    
  )
}
