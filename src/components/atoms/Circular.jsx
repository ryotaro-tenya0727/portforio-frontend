import CircularProgress from '@mui/material/CircularProgress';
import useMedia from 'use-media';

const Circular = ({
  large,
  small,
  top = '10px',
  color = '#ff94df',
  circleStyle = { textAlign: 'center', marginTop: top },
}) => {
  const isWide = useMedia({ minWidth: '700px' });
  return (
    <div style={circleStyle}>
      <CircularProgress
        sx={{
          color: color,
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
