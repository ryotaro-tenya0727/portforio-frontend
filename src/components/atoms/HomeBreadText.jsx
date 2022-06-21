import HomeIcon from '@mui/icons-material/Home';

const HomeBreadText = () => {
  return (
    <span>
      <HomeIcon
        sx={{
          fontSize: '21px',
          mb: '-4.5px',
          mr: '2px',
          color: '#4b4649',
        }}
      />
      ホーム
    </span>
  );
};

export default HomeBreadText;
