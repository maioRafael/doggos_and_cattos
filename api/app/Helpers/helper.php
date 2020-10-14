<?php
if (! function_exists('translate_date_diff')) {
    function clean_string($string)
    {
        $arr = explode(' ', trim($string));
        $s = strtolower($arr[0]);
        $s = str_replace(' ', '-', $s); // Replaces all spaces with hyphens.
        return preg_replace('/[^A-Za-z0-9\-]/', '', $s); // Removes special chars.
    }
}
if (! function_exists('translate_date_diff')) {
    function translate_date_diff($original_date, $type = 'Aprox. ')
    {
        try {
            $auxDate =  new \DateTime($original_date);
            $interval = $auxDate->diff(new \DateTime());
            $text = $type;
            if($type == 'Aprox. ' || $type == ''){
                if($interval->y<1){
                    if($interval->m===0){
                        $text = 'Menos de 1 mês';
                    } else{
                        $text .=  $interval->m  . ($interval->m==1 ? ' mês' : ' meses');
                    }
                } else {
                    $text .=  $interval->y . ($interval->y==1 ? ' ano' : ' anos');
                }
            } else {
                if($interval->y > 0){
                    $text .=  $interval->y  . ($interval->y==1 ? ' ano' : ' anos') . ' atrás';
                } else if($interval->m > 0){
                    $text .=  $interval->m  . ($interval->m==1 ? ' mês' : ' meses') . ' atrás';
                } else if($interval->d > 0){
                    $text .=  $interval->d  . ($interval->d==1 ? ' dia' : ' dias') . ' atrás';
                } else if($interval->h > 0){
                    $text .=  $interval->h  . ($interval->h==1 ? ' hora' : ' horas') . ' atrás';
                } else {
                    $text .=  'há menos de uma hora';
                }
            }
            return $text;
        } catch (Exception $e){
            return 'falha ao converter data. ' . $e->getMessage();
        }

    }
}
