import { useState, useMemo } from "react";
import { Card, Input, TextArea, Chip } from "@heroui/react";
import { Regex } from "lucide-react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const matchResult = useMemo(() => {
    if (!pattern) return null;
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [...testString.matchAll(regex)];
      return matches;
    } catch (e: any) {
      return { error: e.message };
    }
  }, [pattern, flags, testString]);

  // A simple way to highlight matches: split by regex and inject spans.
  const highlightedString = useMemo(() => {
    if (
      !pattern ||
      !testString ||
      matchResult === null ||
      "error" in matchResult
    )
      return testString;
    if (matchResult.length === 0) return testString;

    try {
      // Split the string by the regex to interleave matches.
      // This is a naive highlight that works best when matches don't overlap in weird ways.
      const regex = new RegExp(
        `(${pattern})`,
        flags.includes("g") ? flags : flags + "g",
      );
      const parts = testString.split(regex);

      return parts.map((part, i) => {
        // Since we emit the capture group `(pattern)`, every odd index in `parts` is a match.
        if (i % 2 !== 0 && part !== "") {
          return (
            <mark
              key={i}
              className="bg-success/30 text-success-700 px-0.5 rounded-sm"
            >
              {part}
            </mark>
          );
        }
        return <span key={i}>{part}</span>;
      });
    } catch {
      return testString;
    }
  }, [pattern, flags, testString, matchResult]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-primary/20 text-primary rounded-xl">
            <Regex size={28} />
          </div>
          Regex Tester
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Test regular expressions against strings in real-time.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6">
          <Card.Header className="flex gap-3 px-6 pt-6 pb-2">
            <Card.Title className="font-bold text-lg text-foreground/90 mt-1">
              Expression
            </Card.Title>
          </Card.Header>
          <Card.Content className="px-6 flex flex-col gap-4 mt-2">
            <div className="flex gap-2 items-center">
              <span className="text-xl font-mono text-foreground/50">/</span>
              <Input
                placeholder="[a-z]+"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full font-mono text-lg bg-foreground/5 border-foreground/5 py-4"
              />
              <span className="text-xl font-mono text-foreground/50">/</span>
              <Input
                placeholder="g, i, m"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                className="w-24 font-mono text-lg bg-foreground/5 border-foreground/5 py-4"
              />
            </div>
            {matchResult && "error" in matchResult && (
              <p className="text-danger text-sm mt-1">{matchResult.error}</p>
            )}
          </Card.Content>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6">
            <Card.Header className="flex justify-between items-center px-6 pt-6 pb-2">
              <Card.Title className="font-bold text-lg text-foreground/90 mt-1">
                Test String
              </Card.Title>
            </Card.Header>
            <Card.Content className="px-6 mt-2">
              <div className="bg-foreground/5 rounded-xl border border-foreground/5 p-2 h-full min-h-[250px] relative">
                <TextArea
                  aria-label="Input"
                  placeholder="Enter string here..."
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  className="w-full text-base font-mono absolute inset-0 opacity-0 z-10 min-h-[250px] text-transparent caret-foreground bg-transparent shadow-none" // invisible but clickable
                />
                {/* Visual layer for highlighting */}
                <div className="absolute inset-0 p-4 font-mono text-base whitespace-pre-wrap break-words pointer-events-none text-foreground/80 leading-relaxed overflow-y-auto">
                  {testString ? (
                    highlightedString
                  ) : (
                    <span className="opacity-40">Enter string here...</span>
                  )}
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card className="border-none shadow-xl glass-panel relative overflow-hidden pb-6">
            <Card.Header className="flex justify-between items-center px-6 pt-6 pb-2">
              <Card.Title className="font-bold text-lg text-foreground/90 mt-1">
                Match Results
              </Card.Title>
              {matchResult && !("error" in matchResult) && (
                <Chip color="success" size="sm" className="font-bold px-3">
                  {matchResult.length} Macthes
                </Chip>
              )}
            </Card.Header>
            <Card.Content className="px-6 mt-2 overflow-y-auto max-h-[250px]">
              {matchResult && !("error" in matchResult) ? (
                matchResult.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {matchResult.map((match, i) => (
                      <div
                        key={i}
                        className="flex flex-col bg-foreground/5 p-3 rounded-lg border border-foreground/5"
                      >
                        <div className="flex justify-between text-xs text-foreground/50 mb-1 font-mono">
                          <span>Match {i + 1}</span>
                          <span>Index: {match.index}</span>
                        </div>
                        <span className="font-mono text-success-600 bg-success/10 px-2 py-1 rounded inline-block self-start break-all">
                          {match[0]}
                        </span>
                        {match.length > 1 && (
                          <div className="mt-2 pt-2 border-t border-foreground/10 flex flex-col gap-1">
                            {match.slice(1).map((group, j) => (
                              <div
                                key={j}
                                className="text-xs font-mono flex gap-2 items-center"
                              >
                                <span className="text-foreground/40">
                                  Group {j + 1}:
                                </span>
                                <span className="text-foreground/80">
                                  {group}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-foreground/50 text-center py-8">
                    No matches found.
                  </p>
                )
              ) : (
                <p className="text-foreground/50 text-center py-8">
                  Enter a valid regex to see results.
                </p>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
