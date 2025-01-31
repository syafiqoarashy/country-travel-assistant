import styled from 'styled-components';

interface FlagProps {
  size?: 'small' | 'medium' | 'large';
}

const FlagContainer = styled.span<FlagProps>`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Segoe UI Emoji", "Segoe UI Symbol", "Apple Color Emoji";
  font-size: ${({ size }) => {
    switch (size) {
      case 'small': return '1.5rem';
      case 'large': return '3rem';
      default: return '2rem';
    }
  }};
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
`;

interface CountryFlagProps extends FlagProps {
  emoji: string;
  code: string;
  className?: string;
}

const Flag = ({ emoji, code, size = 'medium', className }: CountryFlagProps) => (
  <FlagContainer size={size} className={className} title={code}>
    {emoji}
  </FlagContainer>
);

export default Flag;