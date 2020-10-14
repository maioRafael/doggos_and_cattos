<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'name',
        'description',
        'species',
        'gender',
        'is_birth_aprox',
        'birth_date',
        'last_interaction',
        'deleted_at'
    ];

    protected $casts = [
        'deleted_at' => 'datetime',
        'birth_date' => 'datetime',
        'created_at' => 'datetime',
        'last_interaction' => 'datetime',
        'updated_at' => 'datetime'
    ];

}
