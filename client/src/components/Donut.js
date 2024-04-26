import { DonutChart } from "@mantine/charts";

export const DonutChartComp = ({ data }) => {
    return <DonutChart withLabelsLine labelsType="value" withLabels data={data} h={220} />;
};
