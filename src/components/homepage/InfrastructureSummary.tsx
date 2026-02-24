import { Building2, Mic2, Palette, FileCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

const infrastructureItems = [
  {
    icon: Building2,
    title: "Venue Infrastructure",
    description:
      "Five strategically positioned premium venues with flexible configurations, rooftop access, and integrated technical capabilities.",
  },
  {
    icon: Mic2,
    title: "Unified Production",
    description:
      "Professional-grade sound, lighting, staging, and AV systems seamlessly coordinated across all district venues.",
  },
  {
    icon: Palette,
    title: "Branding Control",
    description:
      "District-wide signage, building wraps, digital integration, and environmental design under single creative direction.",
  },
  {
    icon: FileCheck,
    title: "Permitting & Coordination",
    description:
      "Single operator manages all street closures, fire marshal approvals, city coordination, and Metro compliance.",
  },
];

export default function InfrastructureSummary() {
  return (
    <section className="py-24 bg-[#0F1115]">
      <Container>
        <div className="space-y-16">
          <SectionHeading
            label="Infrastructure"
            title="Built for Scale"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infrastructureItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="p-8 space-y-6">
                  <IconComponent className="w-12 h-12 text-[#C49A6C]" />
                  <div className="space-y-3">
                    <h3 className="text-[#F0EDE8] text-xl font-bold">
                      {item.title}
                    </h3>
                    <p className="text-[#9B978F] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
