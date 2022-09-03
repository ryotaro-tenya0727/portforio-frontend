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
          '@media screen and (max-width:700px)': {
            fontSize: '16.5px',
            mb: '-3.5px',
            // mr: 0.5,
          },
        }}
      />
      ホーム
    </span>
  );
};

export default HomeBreadText;
