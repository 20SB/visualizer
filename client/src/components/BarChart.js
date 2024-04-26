import { BarChart } from "@mantine/charts";

export const BarChartComp = ({ data, value, color, curve }) => {
    return (
        <BarChart
            h={200}
            data={data}
            dataKey="published"
            series={[{ name: value, color: `${color}.6` }]}
            curveType={curve}
            tickLine="none"
            withXAxis={false}
            withGradient={true}
        />
    );
};
