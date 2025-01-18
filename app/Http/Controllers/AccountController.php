<?php

namespace App\Http\Controllers;

use App\Enums\AccountType;
use App\Models\Bank;
use App\Models\Currency;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AccountController
{
    public function index(Request $request): Response
    {
        $accounts = $request->user()->accounts;

        return Inertia::render('Account/Index', [
            'accounts' => $accounts,
        ]);
    }

    public function create(): Response
    {
        $banks = Bank::all();
        $currencies = Currency::all();

        return Inertia::render('Account/Create', [
            'banks' => $banks,
            'currencies' => $currencies,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'bank_id' => ['required', 'exists:banks,id'],
            'currency_id' => ['required', 'exists:currencies,id'],
            'name' => ['required', 'string'],
            'number' => ['required', 'string'], // todo: IBAN validation
            'type' => ['required', Rule::enum(AccountType::class)],
            'balance' => ['required', 'numeric'],
        ]);

        DB::transaction(static function () use ($request, $validated) {
            $request->user()->accounts()->create($validated);

            // todo: create transaction for initial balance
        });

        return back();
    }
}
