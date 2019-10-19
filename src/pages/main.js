import React, { useState, useEffect } from "react";
import Layout from "../components/MainLayout";
import {
  calculateMaxWidth,
  createLine,
  getRandomWidthsArray
} from "../utils/wireframe";
import { createArrayFromInt } from "../utils/helpers";
import styled from "styled-components";
import { Box, Heading, Button } from "rebass";
import RangeInput from "../components/RangeInput";

const Options = styled.div`
  margin: 1rem;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;

const Preview = styled.div`
  margin: 1rem;
  padding: 2rem;
  background-color: #fff;
  border: 2px dashed #aaa;
  border-radius: 8px;
`;

function Main() {
  const [radius, setRadius] = useState(2);
  const [lines, setLines] = useState(3);
  const [words, setWords] = useState(3);
  const [height, setHeight] = useState(12);
  const [spacing, setSpacing] = useState(4);
  const [structure, setStructure] = useState([]);

  const refreshState = () => setStructure(getRandomWidthsArray(lines, words));

  useEffect(() => {
    setStructure(getRandomWidthsArray(lines, words));
  }, [lines, words]);

  return (
    <Layout>
      <Options>
        <RangeInput
          label="Radius"
          name="radius"
          min={0}
          max={height / 2}
          onChange={e => setRadius(e.target.value)}
          value={radius}
        />
        <RangeInput
          label="Words"
          name="words"
          min={0}
          max={8}
          onChange={e => setWords(e.target.value)}
          value={words}
        />
        <RangeInput
          label="Lines"
          name="lines"
          min={0}
          max={10}
          onChange={e => setLines(e.target.value)}
          value={lines}
        />
        <RangeInput
          label="Words"
          name="words"
          min={4}
          max={20}
          onChange={e => setHeight(e.target.value)}
          value={height}
        />
        <RangeInput
          label="Spacing"
          name="spacing"
          min={4}
          max={20}
          onChange={e => setSpacing(e.target.value)}
          value={spacing}
        />
        <Button onClick={refreshState}>Refresh</Button>
      </Options>

      <Preview>
        <svg
          width={calculateMaxWidth(structure) + spacing * words}
          height={height * lines + spacing * lines}
        >
          {createArrayFromInt(lines).map((row, index) => {
            return (
              <g key={index}>
                {createLine(
                  index,
                  words,
                  spacing,
                  height,
                  radius,
                  structure[index]
                ).map(rect => (
                  <>{rect}</>
                ))}
              </g>
            );
          })}
        </svg>
      </Preview>
    </Layout>
  );
}

export default Main;
