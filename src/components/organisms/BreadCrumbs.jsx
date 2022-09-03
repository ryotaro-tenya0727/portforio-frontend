import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import bread from './../../css/organisms/bread.module.css';

const BreadCrumbs = ({ breadcrumbs }) => {
  const length = breadcrumbs.length;
  return (
    <>
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{
          fontWeight: 'bold',
          mt: -5,
          '@media screen and (max-width:700px)': {
            fontSize: '12px',
            mt: -5,
          },
        }}
      >
        {breadcrumbs.map((item, i) => (
          <li key={i}>
            {i !== length - 1 ? (
              <Link to={item.to} className={bread.non_active}>
                {item.title}
              </Link>
            ) : (
              <span className={bread.active}>{item.title}</span>
            )}
          </li>
        ))}
      </Breadcrumbs>
    </>
  );
};

export default BreadCrumbs;
