interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      {label && (
        <p className="text-[#C49A6C] text-xs font-semibold tracking-widest uppercase">
          {label}
        </p>
      )}
      <h2 className="text-[#F0EDE8] text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-[#9B978F] text-lg leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}
