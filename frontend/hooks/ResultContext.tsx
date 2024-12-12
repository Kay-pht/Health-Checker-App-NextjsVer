// "use client";

// import { ResultType } from "@/interfaces/interfaces";
// import React, { createContext, ReactNode, useContext } from "react";

// interface ResultContextType {
//   result: ResultType | null;
//   setResult: (result: ResultType | null) => void;
// }

// const ResultContext = createContext<ResultContextType | undefined>(undefined);

// export function ResultProvider({ children }: { children: ReactNode }) {
//   const [result, setResult] = React.useState<ResultType | null>(null);

//   return (
//     <ResultContext.Provider value={{ result, setResult }}>
//       {children}
//     </ResultContext.Provider>
//   );
// }

// export const useResult = () => {
//   const context = useContext(ResultContext);
//   if (!context) {
//     throw new Error("useResult must be used within a ResultProvider");
//   }
//   return context;
// };
