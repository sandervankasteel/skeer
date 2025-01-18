<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bank extends Model
{
    #region Eloquent Properties

    protected $fillable = [
        'name',
        'bic',
    ];

    #endregion

    #region Eloquent Relationships

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }

    #endregion
}
