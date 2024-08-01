"use client"
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { ListofJudges } from "@/lib/samplejudges.js";
import styled from 'styled-components';

interface OwnProps {}

type Props = OwnProps;

const Heading = styled.h2`
  font-size: 2em;
  color: #000000;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
`;

const JudgeInfo = styled.div`
  margin-top: 10px;
  text-align: center;

  h3 {
    margin: 10px 0 5px;
    font-size: 1.2em;
    color: #52B752;
    font-weight: bold;
  }

  p {
    margin: 0;
    color: #757575;
    word-wrap: break-word; /* Ensure word wrapping */
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

const Card = styled.div`
  margin: 20px;
  padding: 20px;
  width: 250px; /* Adjust the width as needed */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const JudgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Judges: FunctionComponent<Props> = (props) => {
  return (
    <div className="mt-7 max-w-screen">
      <Heading>Judges</Heading>
      <JudgesContainer>
        {ListofJudges.map((data, index) => (
          <Card key={index}>
            <Image
              src={data.src}
              alt={data.alt}
              height={200}
              width={200}
              className="mr-5 mb-4"
            />
            <JudgeInfo>
              <h3>{data.head}</h3>
              <p>{data.info}</p>
              <div>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin style={{ fontSize: '40px' }} />
                </a>
              </div>
            </JudgeInfo>
          </Card>
        ))}
      </JudgesContainer>
    </div>
  );
};

export default Judges;

                            
                               
                              
                            
                        
       