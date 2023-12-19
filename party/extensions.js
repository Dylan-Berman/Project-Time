import StarterKit from "@tiptap/starter-kit";

/** Shared extensions for client and server */
export function getBaseExtensions() {
  return [
    StarterKit.configure({
      // The Collaboration extension comes with its own history handling
      history: false,
    }),
  ];
}
