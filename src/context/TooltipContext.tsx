import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
  useEffect,
} from "react";

// interface TooltipContextType {
//   isVisible: boolean;
//   content: string;
//   showTooltip: (content: string) => void;
//   hideTooltip: () => void;
// }

interface TooltipContextType {
  isVisible: boolean;
  content: string;
  showTooltip: () => void;
  hideTooltip: () => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  //   const showTooltip = (text: string) => {
  //     setContent(text);
  //     setIsVisible(true);

  //     // Clear existing timeout if tooltip is shown again before previous one ends
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }

  //     // Hide tooltip after 10 seconds
  //     timeoutRef.current = setTimeout(() => {
  //       hideTooltip();
  //     }, 10000);
  //   };

  const showTooltip = () => {
    setIsVisible(true);

    // Clear existing timeout if tooltip is shown again before previous one ends
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hide tooltip after 10 seconds
    timeoutRef.current = setTimeout(() => {
      hideTooltip();
    }, 5000);
  };

  const hideTooltip = () => {
    setIsVisible(false);
    setContent("");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TooltipContext.Provider
      value={{ isVisible, content, showTooltip, hideTooltip }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = (): TooltipContextType => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltip must be used within a TooltipProvider");
  }
  return context;
};
