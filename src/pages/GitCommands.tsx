import { Card, Chip } from "@heroui/react";
import { GitCommit, RefreshCw, Layers } from "lucide-react";

interface CommandGroup {
  title: string;
  icon: any;
  commands: { id: string; desc: string; code: string; warning?: boolean }[];
}

export default function GitCommands() {
  const groups: CommandGroup[] = [
    {
      title: "Rewrite History (Squash / Rebase)",
      icon: Layers,
      commands: [
        {
          id: "squash-n",
          desc: "Interactive rebase the last 3 commits (to squash or edit)",
          code: "git rebase -i HEAD~3",
        },
        {
          id: "squash-hash",
          desc: "Interactive rebase from a specific commit hash",
          code: "git rebase -i <hash>",
        },
        {
          id: "rebase-branch",
          desc: "Rebase current branch onto main",
          code: "git rebase main",
          warning: true,
        },
      ],
    },
    {
      title: "Reset & Undoing",
      icon: RefreshCw,
      commands: [
        {
          id: "reset-soft",
          desc: "Undo last commit but keep changes staged",
          code: "git reset --soft HEAD~1",
        },
        {
          id: "reset-hard",
          desc: "Undo last commit and DISCARD all changes",
          code: "git reset --hard HEAD~1",
          warning: true,
        },
        {
          id: "reset-hash",
          desc: "Reset branch pointer to a specific hash (mixed)",
          code: "git reset <hash>",
        },
      ],
    },
    {
      title: "Commit Modifiers",
      icon: GitCommit,
      commands: [
        {
          id: "amend-message",
          desc: "Update the message of the last commit",
          code: 'git commit --amend -m "New message"',
        },
        {
          id: "amend-no-edit",
          desc: "Add staged files to the last commit without changing message",
          code: "git commit --amend --no-edit",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-extrabold flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-warning/20 text-warning-600 rounded-xl">
            <GitCommit size={28} />
          </div>
          Git Commands Cheat Sheet
        </h2>
        <p className="text-foreground/60 mt-2 text-lg">
          Essential powerful commands for daily workflows, wrapped in a
          beautiful UI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, groupIndex) => (
          <Card
            key={group.title}
            className="border-none shadow-xl glass-panel relative overflow-hidden"
            style={{ animationDelay: `${groupIndex * 100}ms` }}
          >
            <Card.Header className="flex gap-3 px-6 pt-6 pb-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <group.icon size={20} />
              </div>
              <Card.Title className="font-bold text-lg text-foreground/90">
                {group.title}
              </Card.Title>
            </Card.Header>
            <Card.Content className="px-6 pb-6 gap-4 flex flex-col pt-2">
              {group.commands.map((cmd) => (
                <div
                  key={cmd.id}
                  className="flex flex-col gap-2 p-4 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-xl border border-foreground/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground/80">
                      {cmd.desc}
                    </span>
                    {cmd.warning && (
                      <Chip
                        size="sm"
                        color="danger"
                        variant="soft"
                        className="font-semibold px-2"
                      >
                        Careful
                      </Chip>
                    )}
                  </div>
                  <pre className="bg-black/40 text-primary-200 text-xs p-3 rounded-lg overflow-x-auto font-mono shadow-inner border border-white/5">
                    <code>{cmd.code}</code>
                  </pre>
                </div>
              ))}
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
