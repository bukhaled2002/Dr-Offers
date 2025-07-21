function SectionHeader({
  text,
  primaryText,
}: {
  text?: string;
  primaryText?: string;
}) {
  return (
    <div className="relative my-5">
      <h2 className="text-xl font-semibold py-2">
        {text}
        <span className="text-[#6d2c13]">{primaryText}</span>
        <span className="bg-primary h-[3px] w-60 absolute bottom-0 left-0 rounded-4xl" />
      </h2>
    </div>
  );
}

export default SectionHeader;
