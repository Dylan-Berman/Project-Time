import { onConnect } from "y-partykit";

import { createClient } from "@supabase/supabase-js";
import { TiptapTransformer } from "@hocuspocus/transformer";
import { getBaseExtensions } from "./extensions";

import * as Y from "yjs";

const transformer = TiptapTransformer.extensions(getBaseExtensions());
const rootFragmentField = "default";

export default class {
  constructor(party) {
    this.party = party;
  }
  async onConnect(conn) {
    const party = this.party;
    const supabase = createClient(
      "https://usaumovsbhqfkocqqyjf.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYXVtb3ZzYmhxZmtvY3FxeWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0MjMyMTksImV4cCI6MTk4NDk5OTIxOX0.wIXOxTk6AO4Ftm-fMxqz0VmQfh6vJSbOiWu44nfA5SE",
      { auth: { persistSession: false } }
    );
    await onConnect(conn, this.party, {
      async load() {
        const { data, error } = await supabase
          .from("documents")
          .select("document")
          .eq("name", party.id)
          .maybeSingle();

        if (error) {
          console.error("ERROR", error);
        }

        if (data) {
          const doc = transformer.toYdoc(data.document, rootFragmentField);
          return doc;
        } else {
          return new Y.Doc();
        }
      },
      callback: {
        handler: async (doc) => {
          doc;
          const json = transformer.fromYdoc(doc, rootFragmentField);
          console.log(JSON.stringify(json.content, null, 2));

          const { data, error } = await supabase.from("documents").upsert(
            {
              name: party.id,
              document: json,
            },
            { onConflict: "name" }
          );

          if (error) {
            console.error("ERROR", error);
          }

          console.log("DATA", data);
        },
      },
    });
  }
}
