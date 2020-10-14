<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Reciets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reciets', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->integer('id_animal');
            $table->boolean('type');
            $table->string('description')->nullable();
            $table->timestamp('date');
            $table->float('value')->nullable();
            $table->string('reciet')->nullable();
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
        Schema::dropIfExists('reciets');
    }
}
