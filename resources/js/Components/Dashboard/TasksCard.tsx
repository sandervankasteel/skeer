import { Card } from '@/Components/UI';
import { TaskData } from '@/Data';
import { Link } from '@inertiajs/react';
import { HTMLAttributes } from 'react';

export default function TasksCard({
    className = '',
    tasks,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    tasks: TaskData[];
}) {
    return (
        <Card {...props} className={`space-y-4 ${className}`}>
            <div className="text-xl">Tasks</div>

            {tasks.length === 0 && (
                <div className="text-sm text-gray-400">
                    No tasks to complete.
                </div>
            )}

            {tasks.length > 0 &&
                tasks.map((task) => (
                    <Link
                        key={task.key}
                        className="block hover:bg-gray-800"
                        href={task.route}
                    >
                        <div>{task.name}</div>
                        <div className="text-sm text-gray-400">
                            {task.description}
                        </div>
                    </Link>
                ))}
        </Card>
    );
}
