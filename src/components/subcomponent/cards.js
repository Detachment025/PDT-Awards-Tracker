// Regular Card definition
export function Card({
  text,
  size,
  pad = 2,
  bg = "white",
  textColor = "black",
}) {
  // Develop TailwindCSS classes for use
  const borderColor = `border-${bg}`;
  const bgColor = `bg-${bg}`;
  const txtColor = `text-${textColor}`;
  const paddingX = `px-${1 + pad}`;
  const padding = `p-${pad}`;
  const textSize = `text-${size}`;

  // Render component
  return (
    <div
      className={`text-left shadow-md rounded-md border-2
        ${borderColor} ${bgColor} ${txtColor} ${paddingX} ${padding}`}
      key={text}
    >
      <div className={`${textSize}`}>{text}</div>
    </div>
  );
}

// Key Value Card definition
export function StatCard({ keyContent, valueContent }) {
  // Render component
  return (
    <div
      className="text-left shadow-md rounded-lg border-2 px-4 py-5"
      key={keyContent}
    >
      <div className="text-xl">{keyContent}</div>
      <div className="text-5xl text-darkbermuda mt-3">{valueContent}</div>
    </div>
  );
}

// Button Card definition
export function ButtonCard({ text, size, setSelected, subtext = null }) {
  // Render component
  return (
    <button
      className="text-left shadow-md rounded-lg border-2 p-1.5 mb-3"
      key={text}
      onClick={() => setSelected(text)}
    >
      <div className={`text-${size}`}>{text}</div>
      <div>{subtext}</div>
    </button>
  );
}
