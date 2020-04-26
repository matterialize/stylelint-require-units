import { css } from "styled-components/native";
import { metrics, fonts } from "../../themes";

export const WrapperCss = css`
  flex: 1;
  margin: ${metrics.smallSpacing}px;
  padding: ${metrics.mediumSpacing}px;
  position: relative;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16);
`;

export const TitleCss = css`
  margin: ${metrics.smallSpacing}px;
  font-size: 16px;
  line-height: 20px;
  font-family: ${fonts.GothamRounded.bold};
`;

export const IconCss = css`
  width: 30px;
  height: 48px;
  margin: 0px ${metrics.smallSpacing}px;
`;

export const MessageCss = css`
  font-size: 14px;
  margin: ${metrics.smallSpacing}px;
  line-height: 20px;
  text-align: center;
  font-family: ${fonts.GothamRounded.book};
`;

export const CloseCss = css`
  top: 25px;
  right: 25px;
  position: absolute;
`;

export const CloseIconCss = css`
  width: 10px;
  height: 10px;
`;

export const InfoMessageCss = css`
  margin: ${metrics.smallSpacing};
`;
