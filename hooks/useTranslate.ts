import locales from "locales";
import rosseta from "rosetta";
import { useRouter } from "next/router";

const i18n = rosseta({ ...locales });

export default function useTranslate() {
  const { locale } = useRouter();

  i18n.locale(locale);

  return i18n;
}
