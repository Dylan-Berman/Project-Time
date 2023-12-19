import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import useYProvider from "y-partykit/react";
import Collaboration from "@tiptap/extension-collaboration";

import { getBaseExtensions } from "../../party/extensions";

export default function TextEditor() {
  const provider = useYProvider({
    host: "flamingo-party.chris-windsor.partykit.dev",
    room: "testdoc", // replace with your own document name
    options: {
      // y-websocket options
    },
  });

  const editor = useEditor({
    extensions: [
      ...getBaseExtensions(),
      Collaboration.configure({
        document: provider.doc,
      }),
    ],
  });

  return (
    <EditorContent
      style={{ border: "1px solid white", color: "black" }}
      editor={editor}
    />
  );
}
