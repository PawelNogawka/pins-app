import { useEffect } from "react";

export const useTitle = (title) => {
  useEffect(() => {
    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    const updatedTitle = title.replace(/-/g, " ").capitalize();
    window.document.title = updatedTitle;
  }, [title]);
};
