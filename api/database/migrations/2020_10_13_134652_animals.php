<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Animals extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user')->nullable();
            $table->string('name');
            $table->string('description');
            $table->boolean('species');
            $table->boolean('gender');
            $table->boolean('is_birth_aprox');
            $table->date('birth_date');
            $table->integer('collect_date')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->timestamp('last_interaction')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('animals');
    }
}
