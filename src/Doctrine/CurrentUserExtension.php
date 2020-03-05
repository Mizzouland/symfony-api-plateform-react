<?php
namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface , QueryItemExtensionInterface {

    /**
     * @var Security
     */
    private $security;

    /**
     * @var AuthorizationChecker
     */
    private $checker;

    public function __construct(Security $security, AuthorizationCheckerInterface $checker)
    {
        $this->security = $security;
        $this->checker = $checker;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }




    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass){
        // Quand doctrine va faire une requète pour choper une collection, il va se rendre compte qu'il y a une CurrentUserExtension
        // et appliquer des correctifs à la requete
        // il y a les queryBuilder qui va repartire
        // resourceClass est le nom de la class ex Invoice

        // 1 - obtenir l'utilisateur connecté
        $user = $this->security->getUser();

        // 2 - si on demande des factures(invoices) ou des clients(customers), alors il faut agire sur la requête puor qu'elle tiennt compte de l'utilisateur
        // connecté

        // 2 - 1 et si l'utilisateur est n'est pas ADMIN et si l'utilisateur est connécté
        if (
            ($resourceClass == Customer::class || $resourceClass == Invoice::class)
            &&
            !$this->checker->isGranted('ROLE_ADMIN')
            &&
            $user instanceof User
        ) {
            // "from" => array:1 [
            //     0 => From^ {#850
            //     #from: "App\Entity\Invoice"
            //     #alias: "o"
            //     #indexBy: null
            //     }
            // ]

            // Cela correspond
            // SELECT O FROM \App\Entity\Invoice AS O

            // et ce que l'on veut
            // WHERE O.user  = :user


            // 1 - il faut choper l'alias
            $rootAlias = $queryBuilder->getRootAliases()[0];

            if ($resourceClass === Customer::class) {
                $queryBuilder->andWhere("$rootAlias.user =: user");

            } elseif ($resourceClass === Invoice::class) {

                $queryBuilder->join("$rootAlias.customer", "c")
                    ->andWhere("c.user = :user");
            }

            $queryBuilder->setParameter("user", $user);
        }
    }
}