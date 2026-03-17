import { ActivationFramework } from "@/types/activation";
import { activationFrameworks as staticFrameworks } from "@/data/activations";

export async function getActivationFrameworks(): Promise<ActivationFramework[]> {
  return staticFrameworks;
}
