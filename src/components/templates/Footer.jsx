import { Link } from 'react-router-dom';
import footer from './../../css/templates/footer.module.css';

const Footer = () => {
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className={footer.wrapper}>
        <div className={footer.links}>
          <Link to='/term-of-service' onClick={returnTop}>
            利用規約
          </Link>
          <Link to='/privacy-policy' onClick={returnTop}>
            プライバシーポリシー
          </Link>
        </div>
        © 2022 Nakayama
      </div>
    </>
  );
};

export default Footer;
