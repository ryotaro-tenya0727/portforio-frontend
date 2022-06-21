import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import bread from './../../css/organisms/bread.module.css';

const BreadCrumbs = ({ breadcrumbs }) => {
  const length = breadcrumbs.length;

  return (
    <>
      <Breadcrumbs aria-label='breadcrumb' sx={{ pt: 1, fontWeight: 'bold' }}>
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
// {
//   index > 0 && <> / </>;
// }

export default BreadCrumbs;
