<?php
namespace App\Events;


use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtAddSubscriber {

    public function updateJwtData(JWTCreatedEvent $event)
    {
     dd($event);
    }
}