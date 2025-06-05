import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomCodeBlock from "@/components/customCodeBlock";

export default function CheckApiEndpoint() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    // Safely assign environment URL for SSR
    if (typeof window !== "undefined") {
      setBaseUrl(`${import.meta.env.VITE_API_URL}`);
    }
  }, []);

  const responseJson = `[
  {
    "data": "yes",
    "status": "success"
  }
]`;

  return (
    <div className="space-y-8 py-6">
      <div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Check API
        </h2>
        <p className="py-3">
          You can test the API by sending a query like{" "}
          <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">
            /check?data=yes
          </code>
        </p>

        <Button variant="outline">
            <a href={`${baseUrl}/check?data=yes`} target="_blank">
                <h3 className="pt-2 text-sm uppercase tracking-widest">Request [GET]</h3>
            </a> 
        </Button>
        <div className="py-4">
          <CustomCodeBlock
            showLineNumbers={false}
            codeString={`${baseUrl}/check?data=yes`}
            language="jsx"
          />
        </div>

        <div className="py-3">
          <div className="pb-3">
            <Button variant="outline">
              <h3 className="pt-2 text-sm uppercase tracking-widest">Response [JSON]</h3>
            </Button>
          </div>
          <CustomCodeBlock
            showLineNumbers={true}
            codeString={responseJson}
            language="json"
          />
        </div>
      </div>
    </div>
  );
}
