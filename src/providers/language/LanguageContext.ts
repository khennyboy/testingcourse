import { createContext } from "react";
import type { Language } from "./type";


type LanguageContextType = {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  getLabel: (labelId: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export default LanguageContext;
