"use client";

import { createContext, useContext, useState } from "react";

export interface Document {
  privacy_policy?: string;
  terms_of_service?: string;
  community_guidelines?: string;
  maintenance_status?: string;
  patch_notes?: string;
  updated_at: string;
  created_at: string;
}

interface DocumentContextType {
  data: Document | null;
  loading: boolean;
  error: string | null;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({
  children,
  initialData,
  error,
}: {
  children: React.ReactNode;
  initialData: Document | null;
  error: string | null;
}) {
  // 🔹 初期データをそのまま useState で保持（再取得はしない）
  const [data] = useState<Document | null>(initialData);
  const [loading] = useState<boolean>(false);
  const [contextError] = useState<string | null>(error);

  return (
    <DocumentContext.Provider value={{ data, loading, error: contextError }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocumentContext() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocumentContext must be used within a DocumentProvider");
  }
  return context;
}
