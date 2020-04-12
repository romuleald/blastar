Feature: Room

    Scenario: En tant qu'utilisateur je veux pouvoir accéder au formulaire pour créer une room
        Given Je suis sur la homepage
        When Je click sur le bouton de création de room
        Then Je vois un formulaire me permettant de créer une room

    Scenario Outline: En tant qu'utilisateur je veux qu'un indicatif de room ait été généré afin de pouvoir inviter d'autres joueurs
        Given Je suis sur le formulaire de création de room
        When J'ai rempli mon pseudo
        And J'ai clické sur le bouton "Créer une room"
        Then Le bouton est <buttonStatus>
        Then Un indicatif de room <isRoomIdVisible>
    
    Examples:
        | buttonStatus | isRoomIdVisible |
        | désactivé    | visible         |
        | vert         | caché           |

    Scenario: En tant qu'utilisateur je veux pouvoir bénéficier d'un code de partage à copier/coller pour inviter des joueurs à rejoindre la room
        Given Je suis sur le formulaire de création de room
        And Le code de partage a été généré
        When Je click sur l'icone copier/coller
        Then Un message s'affiche m'indiquant que le message a été copié
        Then Le message disparait au bout de 3 secondes
        Then Le lien est copié dans le presse-papier
    
    Scenario Outline: En tant qu'utilisateur je veux pouvoir voir le statut de connexion d'un joueur avant de démarrer une partie
        Given Je suis sur le formulaire de création de room
        And Le pseudo du joueur s'affiche dans la liste
        When Un joueur <hasJoined> la room
        Then L'indicateur de statut est <statusColor>
    
        Examples:
        | statusColor | hasJoined       |
        | vert        | a rejoint       |
        | gris        | n'a pas rejoint |