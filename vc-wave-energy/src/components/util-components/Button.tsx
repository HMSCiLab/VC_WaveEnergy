interface Props {
  text: string;
  onClick: (whichButton: string) => void;
  styles?: string;
  disabled?: boolean;
}

function Button({ text, onClick, styles, disabled }: Props) {
  return (
    <button onClick={() => onClick(text)} className={styles} disabled={disabled}>
      {text}
    </button>
  
  );
}

export default Button;
