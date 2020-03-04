<?php
namespace App\Events;


use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtAddSubscriber {

    public function updateJwtData(JWTCreatedEvent $event)
    {
        // 1. Récupérer l'utilisateur
        $user = $event->getUser();
        // 2. Enrichir les datas
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();

        $event->setData($data);
    }
}