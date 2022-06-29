import { useContext } from 'react';

import { AuthGuardContext } from './../../providers/AuthGuard';

import home from './../../css/pages/home.module.css';

const MenuButton = () => {
  const { isOpenMenu, setOpenMenu } = useContext(AuthGuardContext);

  return (
    <>
      <button
        style={{ float: 'right', marginTop: '-10px' }}
        onClick={() => setOpenMenu(true)}
        className={`${home.menu_button} ${isOpenMenu ? home.active : ''}`}
      >
        <div className='openbtn-area'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p style={{ marginTop: '34px', color: 'white' }}>Menu</p>
      </button>
    </>
  );
};

export default MenuButton;
