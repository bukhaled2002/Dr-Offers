import ImageUpload from "@/components/ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FieldType } from "@/types/types";
import {
  type FieldErrors,
  type Path,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormTrigger,
} from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FormFieldProps<T extends Record<string, any>> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: FieldType;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  trigger: UseFormTrigger<T>;
  setValue: UseFormSetValue<T>;
  value?: string | number | null | undefined;
  /** Optional: For select fields, define options */
  className?: string;
  selectOptions?: { label: string; value: string }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormField<T extends Record<string, any>>({
  name,
  label,
  placeholder,
  type = "text",
  errors,
  register,
  trigger,
  setValue,
  value,
  className,
  selectOptions = [],
}: FormFieldProps<T>) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-gray-700">{label}</Label>

      {type === "image" ? (
        <ImageUpload
          name={name}
          trigger={trigger}
          setValue={setValue}
          image_url={value as string}
        />
      ) : type === "select" ? (
        <Select
          value={value as string}
          onValueChange={(val) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setValue(name, val as any, { shouldValidate: true })
          }
        >
          <SelectTrigger className="w-full font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <SelectValue placeholder={placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className="focus:ring-2 font-semibold focus:ring-primary/20 focus:border-primary"
        />
      )}

      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
