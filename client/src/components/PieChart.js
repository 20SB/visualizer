import { PieChart } from "@mantine/charts";

export const PieChartComp = ({ data }) => {
    return (
        <PieChart
            withLabelsLine
            labelsPosition="outside"
            labelsType="value"
            withLabels
            withTooltip
            data={data}
            h={220}
        />
    );
};
