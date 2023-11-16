function BoardBlocks(props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {props.boards_data.map((item) => (
        <div
          key={Math.random() * 10000000}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            margin: "10px",
            width: "200px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3>Board Name: {item?.boardname}</h3>
          <p>Member1: {item?.boardmember1}</p>
        </div>
      ))}
    </div>
  );
}

export default BoardBlocks;
