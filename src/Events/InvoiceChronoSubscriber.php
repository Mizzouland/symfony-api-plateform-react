<?php
namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceChronoSubscriber implements EventSubscriberInterface {


    /**
     * @var Security
     */
    private $security;
    /**
     * @var InvoiceRepository
     */
    private $invoiceRepository;

    public function __construct(Security $security, InvoiceRepository $invoiceRepository)
    {
        $this->security = $security;
        $this->invoiceRepository = $invoiceRepository;
    }


    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }


    public function setChronoForInvoice(GetResponseForControllerResultEvent $event)
    {
        $result = $event->getControllerResult(); // permet de recupérer l'evenement apres la deserialisation
        $method = $event->getRequest()->getMethod();
        if ($result instanceof Invoice && $method === "POST") {
            // 1 - j'ai besoin de choper l'utilisateur actuellement connecté
            $user = $this->security->getUser();
            // 2 - j'ai besoin du repository des factures

            // 3 - choper la derniere facture qui a été inséré et choper son chrono
            $lastChrono = $this->invoiceRepository->findLastChrono($user);

            $nextChrono = $lastChrono + 1;
            // 4 - Dans cette nouvelle facture, on donne le dernier chrono +1
            $result->setChrono($nextChrono);
            $result->setSentAt(new \DateTime());

        }
    }



}