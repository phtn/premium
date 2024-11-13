import { useAuthCtx } from "@/app/ctx/auth";
import { useVex } from "@/app/ctx/convex";
import { InsertCategorySchema } from "@/server/db/zod.category";
import { Err, Ok } from "@/utils/helpers";
import { useState, useCallback } from "react";

export const useForm = () => {
  const { uid } = useAuthCtx();
  const { category } = useVex();
  const [loading, setLoading] = useState(false);
  const [validInsertArgs, setValidInsertArgs] = useState(false);

  const insertCategory = useCallback(
    async (formData: FormData) => {
      const validatedCategoryFields = InsertCategorySchema.safeParse({
        name: formData.get("name"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        photo_url: formData.get("photo_url"),
        remarks: formData.get("remarks"),
      });

      setValidInsertArgs(validatedCategoryFields.success);
      if (!uid?.startsWith("guest")) return;
      if (!validatedCategoryFields.success) return;

      category
        .create({ ...validatedCategoryFields.data, uid })
        .then(Ok(setLoading, "1 category added."))
        .catch(Err(setLoading, "Failed to add category."));
    },
    [uid, category],
  );

  return { loading, insertCategory, validInsertArgs };
};
