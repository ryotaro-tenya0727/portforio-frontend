import layout from './../css/layout/layout.module.css';

export const DefaultLayout = ({ children }) => {
  return (
    <div className={layout.layout}>
      <div className={layout.layout_page}>{children}</div>
    </div>
  );
};
