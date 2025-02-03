import { Info, InfoLabel, InfoValue } from "./styles";

export const renderInfo = (label: string, value: string | undefined) => {
  if (!value) return null;
  return (
    <Info>
      <InfoLabel>{label}:</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </Info>
  );
};