export function SnakeView() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="pt-5 px-2 md:px-0">
        <div className="t-section-title">YERIS SNAKE</div>
        <div className="t-section-sub">
          {
            "// eat bugs · ship features · don't crash · space to start · arrow keys or WASD"
          }
        </div>
      </div>
      <hr className="t-divider" />
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingBottom: "16px",
        }}
      >
        <iframe
          src="/snake.html"
          style={{
            width: "100%",
            height: "100%",
            background: "#000",
            display: "block",
          }}
          title="Yeris Snake"
          scrolling="no"
        />
      </div>
    </div>
  );
}
