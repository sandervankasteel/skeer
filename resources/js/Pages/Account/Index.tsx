import AppLayout from '@/Layouts/AppLayout';
import Account from '@/Models/Account';
import { Head } from '@inertiajs/react';

export default function Index({ accounts }: { accounts: Account[] }) {
    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Accounts
                </h2>
            }
        >
            <Head title="Accounts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Accounts index page

                            {accounts.map((account) => (
                                <div key={account.id}>
                                    <div>{account.name}</div>
                                    <div>{account.number}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
