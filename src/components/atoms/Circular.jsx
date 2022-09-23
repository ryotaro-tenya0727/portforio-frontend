import CircularProgress from '@mui/material/CircularProgress';
import useMedia from 'use-media';

const Circular = ({ large, small, top = '10px' }) => {
  const isWide = useMedia({ minWidth: '700px' });
  return (
    <div style={{ textAlign: 'center', marginTop: top }}>
      <CircularProgress
        sx={{
          color: '#ff94df',
          mt: -0.4,
          fontSize: '80px',
          '@media screen and (min-width:700px)': {
            mt: -1,
          },
        }}
        size={isWide ? large : small}
      />
    </div>
  );
};

export default Circular;
