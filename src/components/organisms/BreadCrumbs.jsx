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
          pt: 2,
          fontWeight: 'bold',
          mt: -1,
          '@media screen and (max-width:700px)': {
            fontSize: '12px',
            pt: 1,
            mt: 1,
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
              <span className={bread.active}>{item.title}（現在のページ）</span>
            )}
          </li>
        ))}
      </Breadcrumbs>
    </>
  );
};

export default BreadCrumbs;
