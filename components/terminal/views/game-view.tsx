export function GameView() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <div className="t-section-title">YERIS RUNNER</div>
        <div className="t-section-sub">
          // space / tap to jump · dodge obstacles · ship the project
        </div>
      </div>
      <hr className="t-divider" />
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingBottom: '16px',
        }}
      >
        <iframe
          src="/game.html"
          style={{
            width: '100%',
            maxWidth: '800px',
            height: '400px',
            border: '1px solid #0d2a14',
            background: '#000',
            display: 'block',
          }}
          title="Yeris Runner"
          scrolling="no"
        />
      </div>
    </div>
  )
}
