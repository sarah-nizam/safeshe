import React, { useState } from 'react';
import {
    createStyles,
    Text,
    Container,
    ActionIcon,
    Group,
    rem,
    Paper,
    Input,
    Button,
    Switch,
    Title,
    Center,
} from "@mantine/core"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    mainbod:{
        textAlign:"center",
        marginTop:rem(150),
    },

    sosb:{
        cursor:"pointer",
        height:rem(50),
        width:rem(150),
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

      lab:{
        fontSize:rem(25),

      },

      inp:{
        height:rem(30),
        width:rem(500),
        borderRadius:rem(10),

      },
  }))

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { classes } = useStyles()
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission or any other action here
    console.log(formValues);
  };

  return (
    <div className={classes.mainbod}>
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Leave Us a Review!</h1>
        <label className={classes.lab} htmlFor="name">Name:</label>
        <input className={classes.inp} type="text" id="name" name="name" value={formValues.name} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.lab} htmlFor="email">Email:</label>
        <input className={classes.inp} type="email" id="email" name="email" value={formValues.email} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.lab} htmlFor="message">Message:</label>
        <textarea className={classes.inp} id="message" name="message" value={formValues.message} onChange={handleChange} />
      </div>
      <button className={classes.sosb} type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ContactForm;