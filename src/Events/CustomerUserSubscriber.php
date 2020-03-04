<?php
namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CustomerUserSubscriber implements EventSubscriberInterface {


    /**
     * @var Security
     */
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_VALIDATE]
        ];
    }

    /**
     * @param GetResponseForControllerResultEvent $event
     */
    public function encodePassword(GetResponseForControllerResultEvent $event)
    {
        $result = $event->getControllerResult(); // permet de recupérer l'evenement apres la deserialisation
        $method = $event->getRequest()->getMethod();
        if ($result instanceof Customer && $method === "POST") {
            // choper l'utilisateur actuellement connecté
            $user  = $this->security->getUser();
            $result->setUser($user);

            // Assigner l'utiliser au customer que nous sommes en train de crer
        }
    }
}