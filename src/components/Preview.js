import React from "react";
import getRandomInterjection from "interjection-js";
import styled from "styled-components";
import { rgba } from "polished";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToasts } from "react-toast-notifications";
import { Box } from "rebass/styled-components";
import { FiCopy } from "react-icons/fi";

const Container = styled(Box)`
  margin: 1rem;
  padding: 8rem 4rem;
  background-color: #fff;
  border: 2px dashed ${props => props.theme.colors.primary};
  border-radius: 8px;
  position: relative;
  min-height: 100%;
`;

const CopyWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  padding: 1rem;
  background-color: ${props => rgba(props.theme.colors.primary, 0.1)};
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > svg {
    color: ${props => rgba(props.theme.colors.primary, 1)};
  }
  &:hover {
    background-color: ${props => rgba(props.theme.colors.primary, 1)};
    & > svg {
      color: white;
    }
  }
`;

function Preview({ svgString, svgElement }) {
  const { addToast } = useToasts();

  return (
    <Container width={1}>
      <CopyToClipboard
        text={svgString}
        onCopy={() =>
          addToast(`${getRandomInterjection()}! Copied! 👏`, {
            appearance: "success",
            autoDismiss: true
          })
        }
      >
        <CopyWrapper>
          <FiCopy size={20} />
        </CopyWrapper>
      </CopyToClipboard>
      {svgElement}
    </Container>
  );
}

export default Preview;
