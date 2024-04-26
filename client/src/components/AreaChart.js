import { AreaChart } from "@mantine/charts";

export const AreaChartComp = ({ data, value, color, curve }) => {
    return (
        <AreaChart
            h={180}
            data={data}
            dataKey="published"
            series={[{ name: value, color: `${color}.6` }]}
            curveType={curve}
            tickLine="none"
            withXAxis={false}
        />
    );
};
