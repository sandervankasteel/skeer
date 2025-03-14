import BalanceHistoryChartCard from '@/Components/Charts/BalanceHistoryChartCard';
import BalanceSummaryCard from '@/Components/Dashboard/BalanceSummaryCard';
import TasksCard from '@/Components/Dashboard/TasksCard';
import { Card } from '@/Components/UI';
import { BalanceOverTimeData, CategoryData, TaskData } from '@/Data';
import { Account } from '@/Models';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Dashboard({
    accounts,
    balanceOverTimeData,
    categoryData,
    tasks,
}: PageProps<{
    accounts: Account[];
    balanceOverTimeData: BalanceOverTimeData[];
    categoryData: CategoryData[];
    tasks: TaskData[];
}>) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="space-y-4 xl:space-y-8">
                <div className="text-3xl font-bold">Dashboard</div>

                <div className="grid gap-4 xl:grid-cols-2 xl:gap-8">
                    <div>
                        <BalanceHistoryChartCard data={balanceOverTimeData} />
                    </div>

                    <div>
                        <BalanceSummaryCard accounts={accounts} />
                    </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-2 xl:gap-8">
                    <div className="xl:order-2">
                        <TasksCard tasks={tasks} />
                    </div>

                    <div className="xl:order-1">
                        <Card className="space-y-4">
                            <div className="text-2xl">Category Summary</div>

                            <div>(work in progress)</div>

                            <div className="space-y-4">
                                {categoryData.map((category) => (
                                    <div key={category.id}>
                                        <div>
                                            {category.name}: {category.spent}
                                        </div>

                                        {category.children && (
                                            <div className="pl-4">
                                                {category.children.map(
                                                    (childCategory) => (
                                                        <div
                                                            key={
                                                                childCategory.id
                                                            }
                                                        >
                                                            {childCategory.name}
                                                            :{' '}
                                                            {
                                                                childCategory.spent
                                                            }
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
