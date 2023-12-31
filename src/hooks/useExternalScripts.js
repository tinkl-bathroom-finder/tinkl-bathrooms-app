// Thank you to Kaushal Joshi (@clumsycoder) 
// at https://hackernoon.com/how-to-add-script-tags-in-react 
// for instructions on how to create a custom hook
import { useEffect } from 'react';

export default function useExternalScripts({ url }){
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute("src", url);
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  }, [url]);
};