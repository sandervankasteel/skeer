import { Card } from '@/Components/UI';
import { HTMLAttributes } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface TransactionData {
    date: string;
    total_amount: number;
}

export default function TransactionsChartCard({
    className = '',
    transactionData,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    transactionData: TransactionData[];
}) {
    const processedTransactionData = transactionData.map((transaction) => ({
        ...transaction,
        fill: transaction.total_amount >= 0 ? '#82ca8d' : '#ff6b6b',
    }));

    return (
        <Card {...props} className={`${className}`}>
            <div className="text-xl">Transactions</div>

            <ResponsiveContainer className="mt-4" width="100%" height={400}>
                <BarChart data={processedTransactionData}>
                    <CartesianGrid stroke="#4a5568" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        stroke="#e2e8f0"
                        tick={{ fill: '#e2e8f0' }}
                    />
                    <YAxis stroke="#e2e8f0" tick={{ fill: '#e2e8f0' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#2d3748',
                            borderColor: '#4a5568',
                            color: '#e2e8f0',
                        }}
                        cursor={{ fill: '#4a5568' }}
                        formatter={(value: number) => [
                            new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'EUR',
                            }).format(value),
                            'Total Amount',
                        ]}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <ReferenceLine y={0} stroke="#fc0" />
                    <Bar dataKey="total_amount" barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}
