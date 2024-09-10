interface Props {
  direction: string;
  onClick?: () => void;
}

export default function PageButton({ direction, onClick }: Props) {
  const buttonStyle =
    "bg-gray-800 text-white p-2 rounded-full shadow-lg h-16 w-16 m-8 text-4xl hover:bg-gray-900 transition-colors duration-100";

  return (
    <>
      {direction === "left" ? (
        <button onClick={onClick} className={buttonStyle}>
          &lt;
        </button>
      ) : direction === "right" ? (
        <button onClick={onClick} className={buttonStyle}>
          &gt;
        </button>
      ) : (
        <button onClick={onClick} className={buttonStyle} />
      )}
    </>
  );
}
