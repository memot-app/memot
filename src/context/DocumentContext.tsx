"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/libs/supabase";

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

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Document | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("documents").select("*").single();
      if (error) {
        setError(error.message);
      } else {
        setData(data as Document);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <DocumentContext.Provider value={{ data, loading, error }}>
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
