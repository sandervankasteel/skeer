<?php

namespace App\Domain\Task;

final readonly class TaskData
{
    public function __construct(
        public string $key,
        public string $name,
        public string $description,
        public string $route,
    ) {}
}
