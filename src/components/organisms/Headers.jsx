import { MenuButton } from './../atoms/atoms';
import { LoginName } from './../molecules/Molecules';

import headers from './../../css/organisms/headers.module.css';

const Headers = ({ name }) => {
  return (
    <div className={headers.wrapper}>
      <LoginName name={name} />
      <MenuButton />
    </div>
  );
};

export default Headers;
