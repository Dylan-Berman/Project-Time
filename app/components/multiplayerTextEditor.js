import dynamic from "next/dynamic";

const MultiplayerTextEditor = dynamic(() => import("./textEditor"), {
  ssr: false,
});

export default MultiplayerTextEditor;
