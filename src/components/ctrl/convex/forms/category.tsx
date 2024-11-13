import { type HTMLInputTypeAttribute, memo, type ReactNode } from "react";
import { Wrapper } from "./components";
import { useForm } from "./useForm";
import { InputField } from "@/components/ui/input";
import {
  DocumentTextIcon,
  MagnifyingGlassPlusIcon,
  PencilSquareIcon,
  PhotoIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { type InsertCategory } from "convex/categories/create";
import { type DualIcon } from "@/types";

function CategoryContent() {
  const { insertCategory } = useForm();
  return (
    <Wrapper>
      <div className="h-6" />
      <form action={insertCategory} className="h-full overflow-auto px-6">
        {input_fields.map((field) => (
          <Row
            key={field.name}
            title={field.title}
            description={field.description}
          >
            <div className="w-full space-y-2.5">
              <InputField placeholder={field.placeholder} {...field} />
              <p className="text-xs font-medium text-default-600">
                {field.suggestion}
              </p>
            </div>
          </Row>
        ))}
      </form>
    </Wrapper>
  );
}
export const CategoryForm = memo(CategoryContent);

interface RowProps {
  children: ReactNode;
  title: string;
  description?: string;
}
const Row = ({ children, description, title }: RowProps) => (
  <section className="grid h-36 w-full grid-cols-10">
    <div className="col-span-4 flex h-full w-full flex-col space-y-2 border-b border-primary-100 pt-10">
      <p className="font-semibold capitalize">{title}</p>
      <p className="max-w-[36ch] font-sans text-xs font-light leading-[18px]">
        {description}
      </p>
    </div>
    <div className="col-span-6 flex h-full w-full items-start border-b border-primary-100 px-4 pt-6">
      {children}
    </div>
  </section>
);

interface CategoryFields {
  title: string;
  description: string;
  icon: DualIcon;
  isRequired: boolean;
  name: keyof InsertCategory;
  onChange: VoidFunction;
  placeholder?: string;
  suggestion: string;
  type: HTMLInputTypeAttribute;
}
const input_fields: CategoryFields[] = [
  {
    title: "category name",
    description: "Categories are extremely useful for search.",
    icon: Squares2X2Icon,
    isRequired: true,
    name: "name",
    onChange: () => null,
    placeholder: "Category name",
    suggestion: "",
    type: "text",
  },

  {
    title: "description",
    description: "description",
    icon: DocumentTextIcon,
    isRequired: false,
    name: "description",
    onChange: () => null,
    placeholder: "Describe our category",
    suggestion: "",
    type: "text",
  },
  {
    title: "slug",
    description:
      "Slugs are like shortcuts and bookmarks. Great for search and navigation.",
    icon: MagnifyingGlassPlusIcon,
    isRequired: true,
    name: "slug",
    onChange: () => null,
    placeholder: "slug",
    suggestion: "Recommended: ",
    type: "text",
  },
  {
    title: "Photo URL",
    description: "photo_url",
    icon: PhotoIcon,
    isRequired: false,
    name: "photo_url",
    onChange: () => null,
    placeholder: "photo_url",
    suggestion: "",
    type: "text",
  },

  {
    title: "remarks",
    description: "remarks",
    icon: PencilSquareIcon,
    isRequired: false,
    name: "remarks",
    onChange: () => null,
    placeholder: "remarks",
    suggestion: "",
    type: "text",
  },
];
