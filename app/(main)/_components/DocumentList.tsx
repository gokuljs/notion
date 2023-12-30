"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Item } from "./item";

interface DocumentListProps {
  parentDocumentId: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}

const DocumentList = ({ parentDocumentId, level, data }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <p>No pages inside</p>
    </>
  );
};

export default DocumentList;
