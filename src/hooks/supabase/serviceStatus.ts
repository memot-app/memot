import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const useServiceStatus = () => {
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {

    const fetchServiceStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("config")
          .select("service_status, start_time, end_time")
          .single();

        if (error || !data) {
          setIsMaintenance(true); // ✅ API エラー時もメンテナンス画面に遷移
          return;
        }

        setIsMaintenance(data?.service_status === false || data?.service_status === null);
      } catch (e) {
        setIsMaintenance(true); // ✅ 予期せぬエラー時もメンテナンスモードに
      }
    };

    fetchServiceStatus();

    // ✅ リアルタイムで `config` の変更を監視
    const subscription = supabase
      .channel("realtime:config")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "config" },
        (payload) => {
          setIsMaintenance(
            payload.new.service_status === false || payload.new.service_status === null
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return { isMaintenance };
};