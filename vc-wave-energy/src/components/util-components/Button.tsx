interface Props {
  text: string;
  onClick: (whichButton: string) => void;
  styles?: string;
};

function Button({ text, onClick, styles }: Props) {
  return <button 
  onClick={() => onClick(text)}
  className={styles}>
    {text}
    </button>;
}

export default Button;
