# Web Project

Le  script de postinstall mais bien les données dans la BD mais on a toujours une exception quand on manipule ces données.
Préferable d'utiliser l'application sans faire le postinstall.

##scénario 
 - creer d'abord des utilisateurs (2 au moins) avec la route `#/signup` 
 - puis se logger avec `#/login`
 - ajouter des amis (parmis les utilisateur qui existe déjà) via la route `#/friends`
 - sur `#/home` ajouter une facture avec sa description, son montant et le type de partage (**PART** ou **EQUAL**). *notez que pour le calcul seul PART a été implémenté(faute de temps)*
 - Cliquer sur la facture que vous venez d'ajouter afin de la modifier *(notamment ajouter des amis pour partager la somme)* 
 - se déconnecter puis se logger avec un utilisateur ajouté à une facture pour voir la facture apparaitre dans sa liste de facture.

## Pour test (avec le postinstall)
Pour utiliser postinstall decommenter les lignes 80 à  98 de `postinstall.js`
***les utilisateurs après le postinstall :*** 
user 1 : 
```json
{
	"password" : "passer33",
    "pseudo" : "psow"
}
```
user 2 :
```json
{
	"password" : "passer33",
    "pseudo" : "ouzera"
}
```