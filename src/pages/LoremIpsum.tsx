import { useState } from "react";
import { Card, Button, TextArea, Slider } from "@heroui/react";
import { AlignLeft } from "lucide-react";

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "reprehenderit",
  "in",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

function generateSentence(): string {
  const length = Math.floor(Math.random() * 10) + 5;
  const words = [];
  for (let i = 0; i < length; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentencesCount: number): string {
  const sentences = [];
  for (let i = 0; i < sentencesCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    const parts = [];
    for (let i = 0; i < paragraphs; i++) {
      const sentencesCount = Math.floor(Math.random() * 4) + 4; // 4 to 7 sentences per paragraph
      parts.push(generateParagraph(sentencesCount));
    }
    setOutput(parts.join("\n\n"));
  };

  const copyToClipboard = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-secondary/20 text-secondary rounded-xl">
            <AlignLeft size={28} />
          </div>
          Lorem Ipsum Generator
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Generate random placeholder text for UI block mocking.
        </p>
      </div>

      <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6">
        <Card.Header className="flex gap-3 px-6 pt-6 pb-2">
          <Card.Title className="font-bold text-lg text-foreground/90 mt-1">
            Generation Settings
          </Card.Title>
        </Card.Header>
        <Card.Content className="px-6 flex flex-col gap-8 mt-2">
          <div className="px-2 flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground/70">
              Number of Paragraphs
            </span>
            <Slider
              step={1}
              maxValue={10}
              minValue={1}
              value={paragraphs}
              onChange={(v) => setParagraphs(v as number)}
              className="max-w-md"
            />
          </div>

          <div className="flex gap-4">
            <Button
              variant="secondary"
              onPress={handleGenerate}
              className="flex-1 shadow-lg shadow-secondary/20 font-medium bg-secondary text-secondary-foreground"
            >
              Generate Text
            </Button>
            <Button
              variant="ghost"
              onPress={copyToClipboard}
              isDisabled={!output}
              className="font-medium"
            >
              Copy to Clipboard
            </Button>
          </div>

          {output && (
            <div className="bg-foreground/5 rounded-xl border border-foreground/5 p-2 animate-in fade-in slide-in-from-bottom-2">
              <TextArea
                aria-label="Output"
                readOnly
                value={output}
                className="w-full text-base opacity-90 leading-relaxed font-sans"
                rows={12}
              />
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
