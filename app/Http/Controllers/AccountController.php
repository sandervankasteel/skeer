<?php

namespace App\Http\Controllers;

use App\Enums\AccountType;
use App\Models\Account;
use App\Models\Bank;
use App\Models\Currency;
use App\Rules\IBANRule;
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
        $accounts = $request->user()
            ->accounts()
            ->with([
                'bank',
                'currency',
            ])->get();

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
            'number' => ['required', 'string', 'unique:accounts', new IBANRule()],
            'type' => ['required', Rule::enum(AccountType::class)],
        ]);

        $request->user()->accounts()->create($validated);

        return back();
    }

    public function show(Request $request, Account $account)
    {
        dd('show', $account->toArray());
    }

    public function edit(Request $request, int $accountId): Response
    {
        $account = $request->user()
            ->accounts()
            ->with([
                'bank',
                'currency',
            ])
            ->findOrFail($accountId);
        $banks = Bank::all();
        $currencies = Currency::all();

        return Inertia::render('Account/Edit', [
            'account' => $account,
            'banks' => $banks,
            'currencies' => $currencies,
        ]);
    }

    public function update(Request $request, Account $account): RedirectResponse
    {
        $validated = $request->validate([
            'bank_id' => ['required', 'exists:banks,id'],
            'currency_id' => ['required', 'exists:currencies,id'],
            'name' => ['required', 'string'],
            'number' => ['required', 'string', 'unique:accounts,number,'.$account->id, new IBANRule()],
            'type' => ['required', Rule::enum(AccountType::class)],
        ]);

        $request->user()->accounts()->update($validated);

        return back();
    }

    public function destroy(Request $request, Account $account)
    {
        dd('destroy', $account->toArray());
    }
}
