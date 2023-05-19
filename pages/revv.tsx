import React, { useState, useEffect } from 'react';
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
        fontSize:20,
    
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


type Review = {
  id: number;
  name: string;
  comment: string;
};

const ReviewForm: React.FC = () => {
    const { classes } = useStyles()
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Retrieve reviews from localStorage when the component is mounted
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews) as Review[]);
    }
  }, []);

  useEffect(() => {
    // Store reviews in localStorage whenever the reviews state changes
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (name.trim() === '' || comment.trim() === '') {
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      name,
      comment,
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
    setName('');
    setComment('');
  };

  return (
    <div className={classes.mainbod}>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.lab} htmlFor="name">Name:</label>
          <input className={classes.inp}
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label className={classes.lab} htmlFor="comment">Comment:</label>
          <textarea className={classes.inp}
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button className={classes.sosb} type="submit">Submit</button>
      </form>

      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.name}</strong>: {review.comment}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewForm;