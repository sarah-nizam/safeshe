// import React, { useRef, useState } from 'react';
// import Modal from 'react-modal';


// const Camera: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const startCamera = () => {
//     setIsModalOpen(true);

//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         })
//         .catch((error) => {
//           console.error('Error accessing camera:', error);
//         });
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);

//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       const tracks = stream.getTracks();

//       tracks.forEach((track) => {
//         track.stop();
//       });
//     }
//   };

//   return (
//     <div>
//       <button onClick={startCamera}>Start Camera</button>

//       <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
//         <button onClick={closeModal}>Close</button>
//         <video ref={videoRef} autoPlay />
//       </Modal>
//     </div>
//   );
// };

// export default Camera;

import React, { useRef } from 'react';
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  rem,
  Box,
} from "@mantine/core"

const useStyles = createStyles((theme) => ({
  sosb:{
    cursor:"pointer",
    height:rem(100),
    width:rem(250),
    borderRadius:10,
    borderColor:theme.colors.brand[0] ,
    backgroundColor:theme.colors.brand[6],
    fontSize:rem(20),

    "&:hover": {
      background: theme.colors.brand[6],
      color: "white",

      "& .icon": {
          backgroundColor: "white",
      },
  },

  },

  tex:{
    fontSize:rem(40),
    color:theme.colors.gray[0],
  },

  mainbod:{
  textAlign: "center",
  marginTop:rem(80),
  },

  title:{
    fontWeight:200,
    fontSize:12,
  },
 
}))

const CameraRecorder: React.FC = () => {
  const { classes } = useStyles()
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      chunksRef.current.push(event.data);
    }
  };

  const handleDownload = () => {
    const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded_video.mp4';
    a.click();

    chunksRef.current = [];
    URL.revokeObjectURL(url);
  };

  return (
    <div className={classes.mainbod}>
      <button className={classes.sosb} onClick={handleStartRecording}>Start Recording</button>
      <button className={classes.sosb}  onClick={handleStopRecording}>Stop Recording</button>
      <button className={classes.sosb} onClick={handleDownload}>Download</button>
      <video ref={videoRef} width="640" height="480" />
    </div>
  );
};

export default CameraRecorder;
