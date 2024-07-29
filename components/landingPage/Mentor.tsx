// src/components/Mentors.tsx
"use client"
import React from 'react';
import styled from 'styled-components';
import {MentorsData} from '@/lib/listofmentors.js'

interface Mentor {
  name: string;
  title: string;
  linkedin: string;
}

const MentorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 2em;
  color: #000000;
  margin-bottom: 20px;
  font-weight: bold;
`;

const CardsContainer = styled.div`
  display: grid;
  flex-wrap: wrap;
  justify-content: center;
  gap: 60px;
  grid-template-columns: repeat(3, 1fr);
`;

const MentorCard = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  padding: 30px;
`;

const MentorPhoto = styled.div`
display: flex;
  justify-content: center;
  margin-bottom: 15px;
  img {
    border-radius: 50%;
    width: 120px;
    height: 120px;
  }
`;

const MentorInfo = styled.div`
  margin-top: 10px;

  h3 {
    margin: 10px 0 5px;
    font-size: 1.2em;
    color: #52B752;
    font-weight: bold;
  }

  p {
    margin: 0;
    color: #757575;
  }
    a {
    display: inline-block;
    margin-top: 10px;
    color: #52B752; /* Green color for the link */
    text-decoration: none;
    font-weight: bold; /* Bold text for the link */
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Mentors: React.FC = () => {
  return (
    <MentorsContainer>
      <Heading>Meet Our Mentors</Heading>
      <CardsContainer>
        {MentorsData.map((mentor:Mentor, index) => (
          <MentorCard key={index}>
            <MentorPhoto>
              <img src={`https://via.placeholder.com/100`} alt={mentor.name} />
            </MentorPhoto>
            <MentorInfo>
              <h3>{mentor.name}</h3>
              <p>{mentor.title}</p>
              <a href={mentor?.linkedin??""} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </MentorInfo>
          </MentorCard>
        ))}
      </CardsContainer>
    </MentorsContainer>
  );
};

export default Mentors;
