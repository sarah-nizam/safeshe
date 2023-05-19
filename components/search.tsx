import React, { useState, useEffect } from 'react';
import { send } from 'emailjs-com';
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
  width: rem(50),
  },

  title:{
    fontWeight:200,
    fontSize:12,
  },
 
}))

const AudioRecorder: React.FC = () => {
  const { classes } = useStyles()
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  let mediaRecorder: MediaRecorder | null = null;
  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
  }, [audioURL]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setIsRecording(true);

        const chunks: Blob[] = [];
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener('dataavailable', (event) => {
          chunks.push(event.data);
        });
        mediaRecorder.addEventListener('stop', () => {
          setIsRecording(false);
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          setAudioURL(URL.createObjectURL(audioBlob));
          sendAudioByEmail(audioBlob);
        });
        mediaRecorder.start();

        timer = setTimeout(stopRecording, 10000); // Stop recording after 10 seconds
      })
      .catch((error) => console.error('Error accessing microphone:', error));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      clearTimeout(timer!);
    }
  };

  const sendAudioByEmail = (audioBlob: Blob) => {
    const emailServiceId = 'service_p1dndys';
    const emailUserId = 'n6qR7s9_Fy062lUHu';
    const emailTemplateId = 'template_52qvbwi';

    // Send the email using EmailJS
    send(emailServiceId, emailTemplateId, {
      to_email: 'mehtaaastha56@gmail.com',
      from_name: 'Sashakti',
      message: 'Please find the attached voice recording.',
      attachment: {
        data: audioBlob,
        type: 'audio/webm',
        name: 'recording.webm',
      },
    }, emailUserId)
      .then(() => {
        console.log('Email sent successfully');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <span className={classes.mainbod}>
    <div>
      <span className={classes.title}>
      <h1>Click the button below to send an email and start recording an SOS call</h1>
      </span>
      <div>
        <button className={classes.sosb} onClick={startRecording} disabled={isRecording}>
          <span className={classes.tex}>
          {isRecording ? 'Recording...' : 'SOS'}
          </span>
        </button>
      </div>
      <div>
        <h2>The recorded audio:</h2>
        {audioURL && (
          <audio src={audioURL} controls>
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
    </span>
  );
};

export default AudioRecorder;