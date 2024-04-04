import { Link } from 'react-router-dom';

import { Button } from './../atoms/atoms';

import loading from './../../css/templates/loading.module.css';
import button from './../../css/atoms/button.module.scss';
const Page404 = () => {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Link to='/'>
        <Button className={button.recommended_and_diary_button}>
          ホームへ
        </Button>
      </Link>
      <img
        src={`https://res.cloudinary.com/dfvvyyfgk/image/upload/v1656838850/404-min_kddsth.png`}
        alt='picture'
        className={loading.loading_image}
      />
    </div>
  );
};

export default Page404;
