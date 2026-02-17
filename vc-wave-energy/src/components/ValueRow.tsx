interface Props {
  label: string;
  value: number | string;
  unit?: string;
}

function ValueRow({ label, value, unit }: Props) {
  return (
    <div className="grid grid-cols-2 space-y-12 w-full text-center">
      <dt className="text-white text-4xl leading-10">{label}</dt>
      <dd className="text-center text-4xl text-white font-bold" aria-live="polite">
        {" "}
        {value}
        {unit ? `${unit}` : ""}{" "}
      </dd>
    </div>
  );
}

export default ValueRow;
