import { Link } from 'react-router-dom';
import { pathRoutes } from 'router/router';
import { LogoTypography } from './LogoTypography.styled';

export const Logo = () => {
  return (
    <Link to={pathRoutes.welcome}>
      <LogoTypography variant="h1" noWrap>
        RSTrack
      </LogoTypography>
    </Link>
  );
};
