"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TestimonialsData from "@/lib/listoftestimonials";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
  text-align:center;
`;

const Card = styled.div<{ fade: boolean }>`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 65vw;;
  height:310px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  transition: opacity 0.4s ease;
  opacity: ${({ fade }) => (fade ? 1 : 0)};

  @media (max-width: 768px) {
    max-width: 90vw;
    padding: 20px;
    height:50vh;
  }

  @media (max-width: 480px) {
    font-size: 0.9em;
    padding: 15px;
  }
`;

const Message = styled.p`
  font-size: 1em;
  color: #555;
  font-style:italic;
  font-family:cursive;
`;

const Name = styled.h3`
  color: #52B752;
  margin-top: 75px;
  font-weight: bold;
`;

const NavButtons = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #52b752;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Testimonials: React.FC = () => {
  const testimonials = TestimonialsData.filter(t => t?.message && t?.name);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true); // fade state

  const triggerFade = (direction: 'next' | 'prev') => {
    setFade(false);
    setTimeout(() => {
      setIndex((prevIndex) =>
        direction === 'next'
          ? (prevIndex + 1) % testimonials.length
          : prevIndex === 0
          ? testimonials.length - 1
          : prevIndex - 1
      );
      setFade(true);
    }, 200); // allow time for fade-out
  };

  useEffect(() => {
    const interval = setInterval(() => {
      triggerFade('next');
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <Container>
      <Heading>What People Say About GSW</Heading>
      <Card fade={fade}>
        <Message>&ldquo;{current.message}&rdquo;</Message>
        <Name>- {current.name}</Name>
      </Card>
      <NavButtons>
        <Button onClick={() => triggerFade('prev')}>&lt;--</Button>
        <Button onClick={() => triggerFade('next')}>--&gt;</Button>
      </NavButtons>
    </Container>
  );
};


export default Testimonials;
