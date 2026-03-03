import { useEffect } from "react";

const SITE_NAME = "PertuFilm";
const DEFAULT_DESCRIPTION =
  "Producție video profesionistă în Timișoara. Filmări corporate, comerciale, evenimente și post-producție.";

export function usePageMeta({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Producție Video Timișoara`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');

    const desc = description || DEFAULT_DESCRIPTION;

    if (metaDesc) metaDesc.setAttribute("content", desc);
    if (ogTitle) ogTitle.setAttribute("content", document.title);
    if (ogDesc) ogDesc.setAttribute("content", desc);

    return () => {
      document.title = prev;
    };
  }, [title, description]);
}
