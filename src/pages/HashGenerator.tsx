import { useState, useCallback, useEffect } from "react";
import { Card, Button, TextArea, Input } from "@heroui/react";
import { Fingerprint } from "lucide-react";

export default function HashGenerator() {
  const [inputData, setInputData] = useState("");
  const [hashes, setHashes] = useState({
    sha1: "",
    sha256: "",
    sha384: "",
    sha512: "",
  });

  const computeHash = async (algorithm: string, data: string) => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest(algorithm, dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const updateHashes = useCallback(async (data: string) => {
    if (!data) {
      setHashes({
        sha1: "",
        sha256: "",
        sha384: "",
        sha512: "",
      });
      return;
    }

    try {
      const [sha1, sha256, sha384, sha512] = await Promise.all([
        computeHash("SHA-1", data),
        computeHash("SHA-256", data),
        computeHash("SHA-384", data),
        computeHash("SHA-512", data),
      ]);

      setHashes({ sha1, sha256, sha384, sha512 });
    } catch (e) {
      console.error("Failed to generate hashes", e);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateHashes(inputData);
    }, 200); // debounce slightly
    return () => clearTimeout(timer);
  }, [inputData, updateHashes]);

  const copyToClipboard = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-success/20 text-success rounded-xl">
            <Fingerprint size={28} />
          </div>
          Hash Generator
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Generate secure cryptographic hashes instantly.
        </p>
      </div>

      <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6">
        <Card.Header className="flex gap-3 px-6 pt-6 pb-2">
          <Card.Title className="font-bold text-lg text-foreground/90 mt-1">
            Input Data
          </Card.Title>
        </Card.Header>
        <Card.Content className="px-6 flex flex-col gap-6 mt-2">
          <div className="bg-foreground/5 rounded-xl border border-foreground/5 p-2">
            <TextArea
              aria-label="Input"
              placeholder="Enter text to hash..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-full text-base font-mono"
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground/70 text-sm tracking-wide uppercase mt-4">
              Calculated Hashes
            </h3>

            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  {algo.toUpperCase()}
                </label>
                <div className="flex gap-2 items-center">
                  <Input
                    readOnly
                    value={hash}
                    className="font-mono text-sm"
                    placeholder={`Waiting for input...`}
                  />
                  <Button
                    isIconOnly
                    variant="ghost"
                    onPress={() => copyToClipboard(hash)}
                    isDisabled={!hash}
                  >
                    <Fingerprint size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
