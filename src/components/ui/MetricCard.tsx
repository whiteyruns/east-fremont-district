interface MetricCardProps {
  value: string;
  label: string;
  sublabel?: string;
}

export default function MetricCard({ value, label, sublabel }: MetricCardProps) {
  return (
    <div className="text-center space-y-2">
      <div className="font-mono text-5xl lg:text-6xl font-bold text-[#F0EDE8] tracking-tight">
        {value}
      </div>
      <p className="text-[#9B978F] text-sm font-medium">
        {label}
      </p>
      {sublabel && (
        <p className="text-[#6B6760] text-xs">
          {sublabel}
        </p>
      )}
    </div>
  );
}
