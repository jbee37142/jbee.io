interface Props {
  title: string;
  date: string;
}

export function OpenGraphTemplate({ title, date }: Props) {
  return (
    <div
      style={{
        padding: 64,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#000000',
        fontFamily: 'Freesentation, Roboto, sans-serif',
      }}
    >
      <img
        src="https://jbee.io/img/open-graph-template.jpg"
        alt=""
        style={{
          width: '100%',
          objectFit: 'cover',
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: 'scaleX(-1)',
        }}
      />
      <div
        style={{
          width: 700,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <p
          style={{
            color: '#343A40',
            fontSize: 80,
            fontWeight: 700, 
          }}
        >
          {title}
        </p>
        <p
          style={{
            color: '#6E6E6E',
            fontSize: 36,
            fontWeight: 500,
          }}
        >
          {date}
        </p>
      </div>
    </div>
  );
}
