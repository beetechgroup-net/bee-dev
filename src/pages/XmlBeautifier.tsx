import { useState } from "react";
import { Button, TextArea, Card } from "@heroui/react";
import { Copy, PlusSquare, Trash2, FileCode, AlertCircle } from "lucide-react";
import formatXml from "xml-formatter";

export default function XmlBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      const formatted = formatXml(input, {
        indentation: "  ",
        collapseContent: true,
        lineSeparator: "\n",
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid XML data");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
            <div className="p-2 bg-secondary/20 text-secondary-foreground rounded-xl">
              <FileCode size={28} />
            </div>
            XML Beautifier
          </h2>
          <p className="text-foreground/60 mt-1">
            Format, validate, and beautify your XML data instantly.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="danger"
            onPress={handleClear}
            className="font-medium"
          >
            <Trash2 size={16} className="mr-2" />
            Clear
          </Button>
          <Button
            variant="secondary"
            onPress={handleFormat}
            className="font-medium shadow-md shadow-secondary/20 bg-secondary text-secondary-foreground"
          >
            <PlusSquare size={16} className="mr-2" />
            Format XML
          </Button>
        </div>
      </div>

      {error && (
        <div className="animate-in fade-in slide-in-from-top-2 bg-danger/10 text-danger border border-danger/20 p-4 rounded-2xl flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[600px]">
        <Card className="flex flex-col border-none shadow-xl glass-panel relative overflow-visible">
          <Card.Header className="px-6 py-4 border-b border-foreground/5 flex justify-between items-center bg-foreground/5 rounded-t-2xl">
            <Card.Title className="text-sm font-semibold tracking-wide uppercase text-foreground/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warning"></span> Input
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex-1 p-0 flex flex-col">
            <TextArea
              className="h-full w-full font-mono text-sm leading-relaxed min-h-[500px]"
              placeholder={
                input === "" ? "Paste your raw XML payload here..." : undefined
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Card.Content>
        </Card>

        <Card className="flex flex-col border-none shadow-xl glass-panel relative overflow-visible">
          <Card.Header className="px-6 py-4 border-b border-foreground/5 flex justify-between items-center bg-foreground/5 rounded-t-2xl">
            <Card.Title className="text-sm font-semibold tracking-wide uppercase text-foreground/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success"></span> Output
            </Card.Title>
            <Button
              size="sm"
              variant="ghost"
              onPress={handleCopy}
              className="h-8"
            >
              <Copy size={14} className="mr-1.5" /> Copy
            </Button>
          </Card.Header>
          <Card.Content className="flex-1 p-0 flex flex-col">
            <TextArea
              readOnly
              className="h-full w-full font-mono text-sm leading-relaxed text-success-600 dark:text-success-400 min-h-[500px]"
              value={output}
              placeholder="Beautifully formatted XML will appear here..."
            />
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
