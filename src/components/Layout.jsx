import layout from './../css/layout/layout.module.css';
import { Sidebar } from './organisms/Organisms';
import { AuthGuardContext } from './../providers/AuthGuard';
import { useContext } from 'react';
import Modal from '@mui/material/Modal';

export const DefaultLayout = ({ children }) => {
  const { isOpenMenu, setOpenMenu } = useContext(AuthGuardContext);

  const handleClose = () => setOpenMenu(false);
  return (
    <>
      <div className={layout.layout}>
        <Modal open={isOpenMenu} onClose={handleClose}>
          <>
            <Sidebar />
          </>
        </Modal>
        <div className={layout.layout_page}>{children}</div>
      </div>
    </>
  );
};
