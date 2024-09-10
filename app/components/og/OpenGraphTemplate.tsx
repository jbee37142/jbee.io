interface Props {
  title: string;
  date: string;
}

export function OpenGraphTemplate({ title, date }: Props) {
  return (
    <div
      style={{
        padding: 72,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        fontFamily: 'Freesentation, Roboto, sans-serif',
      }}
    >
      <img
        src="https://jbee.io/img/open-graph-template.png"
        alt=""
        width="1280px"
        height="720px"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          width: 960,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p
          style={{
            color: '#343A40',
            fontSize: 80,
            fontWeight: 700,
            wordBreak: 'keep-all',
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
