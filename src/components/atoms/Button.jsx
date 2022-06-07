import button from './../../css/atoms/button.module.css';

const Button = ({ children }) => {
  return <button className={button.button_card}>{children}</button>;
};

export default Button;
