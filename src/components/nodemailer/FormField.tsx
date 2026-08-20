import { Label } from "@/components/ui/label";
import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export const FormField = ({
  label,
  error,
  children,
}: FieldProps) => {
  return (
    <div className="space-y-2 w-full">
      <Label>{label}</Label>

      {children}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
