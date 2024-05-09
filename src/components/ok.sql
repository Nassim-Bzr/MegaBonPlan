CREATE TABLE Favoris (
    ID_Favoris INT PRIMARY KEY AUTO_INCREMENT,
    ID_Utilisateur INT NOT NULL,
    ID_BonPlan INT NOT NULL,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateurs(ID_Utilisateur),
    FOREIGN KEY (ID_BonPlan) REFERENCES BonPlans(ID_BonPlan)
);
