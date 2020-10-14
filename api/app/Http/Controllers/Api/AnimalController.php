<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function index($page = 1)
    {
        $pageSize = 2;
        if($page<1) $page = 1;
        $skip = $page == 1 ? 0 : ($page * $pageSize)-$pageSize;
        $animals = Animal::where('deleted_at', NULL)
            ->skip($skip)
            ->take($pageSize)
            ->orderBy('name')
            ->get();
        foreach ($animals as $key => $field) {
            if ($field['birth_date']) {
                //birth date
                $type = $field['is_birth_aprox'] ? 'Aprox. ' : '';
                $animals[$key]['years'] = translate_date_diff($animals[$key]['birth_date'], $type);
                //last interaction
                $animals[$key]['last_interaction_desc'] = translate_date_diff($animals[$key]['last_interaction'],'Atualizado ');
            }
        }
        return response()->json(['data' => $animals, 'page' => $page]);
    }

    public function getAnimal($id)
    {
        //$user = auth('api')->user();
        $animals = Animal::where('id',$id)->first();
        return response()->json($animals);
    }

    public function createAnimal(Request $request){

        $user = auth('api')->user();
        if(!$user->is_admin){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $auxData = $request->all();

        $timestamp = $auxData['birth_date'];
        $auxData['birth_date'] = new \DateTime("@$timestamp");
        $auxData['last_interaction'] = new \DateTime();
        $animal = new Animal($auxData);
        try{
            $animal->save();
            $base64 = $auxData['base64img'];
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64));
            $path = public_path()."\assets\img\animals\\" . $animal->id . '.png';
            file_put_contents($path, $imageData);
            return response()->json(['id' => $animal->id]);
        } catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 406);
        }
    }
}
