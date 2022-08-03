import layout from './../../css/layout/layout.module.css';

const LoginName = ({ name }) => {
  return <p className={layout.login_name}>{name}さんログイン中</p>;
};

export default LoginName;
