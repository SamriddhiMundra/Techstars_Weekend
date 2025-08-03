"use client";
import React, { useState } from "react";
import styled from "styled-components";
import FAQData from "@/lib/list_of_faqs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
`;

const SubHeading = styled.h5`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: grey;
  font-size: 1.2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 65vw;
  margin: 5px 0px;

  @media (max-width: 768px) {
    font-size: 0.9em;
    width: 90vw;
    padding: 15px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Answer = styled.div`
  font-size: 0.9em;
  color: #555;
  margin-top: 10px;
`;

const Button = styled.button`
  color: #52b752;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
`;

const FAQs: React.FC = () => {
  const faqs = FAQData.filter((t) => t?.question && t?.answer);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <Container>
      <Heading>Frequently Asked Questions</Heading>
      <SubHeading>(FAQs)</SubHeading>
      <>
        {faqs.map((faq, index) => (
          <Card key={index}>
            <Top>
              {faq.question}
              <Button onClick={() => toggle(index)}>
                {openIndex === index ? "-" : "+"}
              </Button>
            </Top>
           
            {openIndex === index && <Answer><hr/>{faq.answer}</Answer>}
          </Card>
        ))}
      </>
    </Container>
  );
};

export default FAQs;
