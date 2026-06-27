"use client";

import { ReactFlow, Background, BackgroundVariant, Handle, Position } from "@xyflow/react";
import type { Node, Edge, NodeProps } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "@/lib/cn";

type BotData = { kind: string; label: string; color: string };

// Custom node styled to match the brand (cream card + category dot).
function BotNode({ data }: NodeProps) {
  const d = data as unknown as BotData;
  return (
    <div className="w-[180px] rounded-xl border border-ink-15 bg-cream px-4 py-3 shadow-[0_1px_0_rgba(26,26,26,0.04)]">
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} isConnectable={false} />
      <div className="flex items-center gap-2">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
        <span className="font-mono text-[11px] tracking-[0.08em] text-ink-55">{d.kind}</span>
      </div>
      <p className="mt-2 font-sans text-[14px] font-medium tracking-tight text-ink">{d.label}</p>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} isConnectable={false} />
    </div>
  );
}

const nodeTypes = { bot: BotNode };

const initialNodes: Node[] = [
  { id: "1", type: "bot", position: { x: 0, y: 70 }, data: { kind: "Gatilho", label: "/sorteio", color: "#5865F2" } },
  { id: "2", type: "bot", position: { x: 250, y: 0 }, data: { kind: "Condição", label: "tem cargo VIP?", color: "#3B6FB0" } },
  { id: "3", type: "bot", position: { x: 500, y: 70 }, data: { kind: "Ação", label: "enviar embed + sortear", color: "#4F6231" } },
];

const edgeStyle = { stroke: "var(--color-blurple)", strokeWidth: 1.75 };
const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: edgeStyle },
  { id: "e2-3", source: "2", target: "3", animated: true, style: edgeStyle },
];

// Interactive node-graph demo of the actual product editor (React Flow —
// the framework named in the proposal). Nodes are draggable; scroll/zoom on
// the canvas is disabled so it never hijacks page scroll.
export function BotFlowEditor({ className }: { className?: string }) {
  return (
    <div className={cn("h-[340px] overflow-hidden rounded-2xl border border-ink-15 bg-cream sm:h-[400px]", className)}>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.28 }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        panOnDrag={false}
        preventScrolling={false}
        minZoom={0.4}
        maxZoom={1.5}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--color-ink-15)" />
      </ReactFlow>
    </div>
  );
}
