import LogoImage from './logo.png'

interface LogoProps {
  size: number;
}

export function Logo({ size }: LogoProps) {
  return (
    <img src={LogoImage} alt="logo" width={size} />
  );
}
