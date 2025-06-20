"use client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useInsights(filters) {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v && v !== "")
  );

  const query = new URLSearchParams(cleanFilters).toString();
 
  const { data, error, isLoading } = useSWR(
    `https://blackcoffe-xw31.onrender.com/api/insights?${query}`,
    fetcher
  );

  return {
    insights: Array.isArray(data) ? data : [],
    isLoading,
    isError: error,
  };
}
