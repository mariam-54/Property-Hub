import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get pathnames from the current location
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ marginY: 2 }}
    >
      <Link 
        color="inherit"
        onClick={() => navigate('/')}
        sx={{ cursor: 'pointer' }}
      >
        Home
      </Link>

      {/* Map through path segments */}
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return isLast ? (
          <Typography color="textPrimary" key={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <Link
            color="inherit"
            onClick={() => navigate(to)}
            key={to}
            sx={{ cursor: 'pointer' }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;