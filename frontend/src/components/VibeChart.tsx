import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { CategoryGroup } from "../types/spotify";

interface Props {
  groups: CategoryGroup[];
}

export default function VibeChart({ groups }: Props) {
  const data = groups.map((g) => ({
    name: `${g.emoji} ${g.category}`,
    value: g.songs.length,
    color: g.color,
  }));

  return (
    <div className="w-full max-w-lg mx-auto">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
            }}
            formatter={(value) => [`${value} songs`, ""]}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: "#aaa", fontSize: "12px" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
